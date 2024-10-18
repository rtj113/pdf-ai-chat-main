import { ChatOpenAI } from "@langchain/openai";
import {PDFLoader} from "@langchain/community/document_loaders/fs/pdf";
import {RecursiveCharacterTextSplitter} from "langchain/text_splitter";
import {OpenAIEmbeddings} from "@langchain/openai";
import {createStuffDocumentsChain} from "langchain/chains/combine_documents"
import { ChatPromptTemplate } from "@langchain/core/prompts";
import {createRetrievalChain} from "langchain/chains/retrieval"
import {createHistoryAwareRetriever} from "langchain/chains/history_aware_retriever"
import { HumanMessage, AIMessage } from "@langchain/core/messages";
import pineconeClient from "./pinecone";
import {PineconeStore} from "@langchain/pinecone";
import { PineconeConflictError } from "@pinecone-database/pinecone/dist/errors";
import {Index, RecordMetadata} from "@pinecone-database/pinecone";
import { adminDb } from "@/firebaseAdmin";
import { auth } from "@clerk/nextjs/server";


const model = new ChatOpenAI({
    apiKey: process.env.OPENAI_API_key,
    modelName: "gpt-4o",
})

export const indexName = "pdfchat"

async function fetchMessagesFromDB(docId: string) {
    const { userId } = await auth();
    if (!userId) {
        throw new Error("User not found.");
    }
    const LIMIT = 20;
    // Fetch messages from the firestore database
    const chats = await adminDb
        .collection("users")
        .doc(userId)
        .collection("files")
        .doc(docId)
        .collection("chat")
        .orderBy("createdAt", "desc")
        .limit(LIMIT)
        .get();

    const chatHistory = chats.docs.map((doc) => 
        doc.data().role === "human" ? new HumanMessage(doc.data().message) : new AIMessage(doc.data().message)
    );
    console.log(`--- Fetched ${chatHistory.length} messages successfully.`)
    console.log(chatHistory.map((msg) => msg.content.toString()))

    return chatHistory;
}

export async function generateDocs(docId: string){
    const {userId} = await auth() 
    if(!userId){
        throw new Error("User not found.")
    }
    console.log("--Fetching URL from Firebase . . . ")
    const firebaseRef = await adminDb
    .collection("users")
    .doc(userId)
    .collection("docs")
    .doc(docId)
    .get()

    const downloadUrl = firebaseRef.data()?.downloadUrl
    if(!downloadUrl){
        throw new Error("Document not found.")
    }
    console.log(`--Downloading PDF from ${downloadUrl} . . . `)

    //Fetches the PDF from the specified URL
    const response = await fetch(downloadUrl)

    //Loads the PDF into a PDFDocument object
    const data = await response.blob()

    //Uses a loader to load the PDF doc from the specific path
    console.log("---Loading PDF . . . ")
    const loader = new PDFLoader(data)
    const docs = await loader.load()

    //Split the characters up into chunks
    console.log("---Splitting PDF into chunks . . . ")
    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200,
    });
    const splitDocs = await splitter.splitDocuments(docs);
    console.log(`---Split into ${splitDocs.length} parts ---`)

    return splitDocs
}

async function namespaceExists(index: Index<RecordMetadata>, namespace: string){
    if(namespace === null) throw new Error("Namespace not found.")
        const {namespaces} = await index.describeIndexStats()
    //Checking if namespace exists
    return namespaces?.[namespace] != undefined
}

export async function generateEmbeddingsInPineconeVectorStore(docId: string){
    const {userId} = await auth()

    if(!userId){
        throw new Error("User not found.")
    }
    let pineconeVectorStore

    console.log("--- Generating embeddings...")
    const embeddings = new OpenAIEmbeddings()

    const index = await pineconeClient.index(indexName)
    const namespaceAlreadyExists = await namespaceExists(index, docId)

    if(namespaceAlreadyExists){
        console.log(`--Namespace ${docId} already exists. Reusing existing embeddings . . . `)

        return pineconeVectorStore
    } else {
        //If namespace doesn't exist, download PDF from firestore via sotred Download URL and generate embeddings and store into Piencone vector store
        const splitDocs = await generateDocs(docId)

        //Store embeddings
        console.log(`
            ---Storing the embeddings in namespace ${docId} in the ${indexName} Pinecone vector store . . . `)

            pineconeVectorStore = await PineconeStore.fromDocuments(splitDocs, embeddings, {
                pineconeIndex: index,
                namespace: docId,
            })
            return pineconeVectorStore
    }
}

const generateLangchainCompletion = async (docId: string, question: string) => {
    let pineconeVectorStore

  pineconeVectorStore = await generateEmbeddingsInPineconeVectorStore(docId)

  //Creates a retriever from the vector store
  if(!pineconeVectorStore){
    throw new Error("Pinecone vector store not found.")
  }
  console.log("--- Creating a retriever . .  ---")
  const retriever = pineconeVectorStore.asRetriever()

  //Fetch database messages
  const chatHistory = await fetchMessagesFromDB(docId)

  //Defines a prompt template for the chat history
  console.log("-- Creating a prompt template . . . ---")
  const historyAwarePrompt = ChatPromptTemplate.fromMessages([
    ...chatHistory,
    ["user", "{input}"],
    [
        "user",
        "Given the conversation, generate a search query to look up in order to get information relevant to the conversation.",
    ],
])

    //Generate a hjistory of the retrieval chain
    console.log("--- Generating a history of the retrieval chain . . . ---")
    const historyAwareRetrieverChain = await createHistoryAwareRetriever({
        llm: model,
        retriever,
        rephrasePrompt: historyAwarePrompt,
    })

    //Defines prompt template for answering questions based on contextf
    console.log("--- Defining a prompt template for answering questions based on context . . . ---")
    const historyAwareRetrievalPrompt = ChatPromptTemplate.fromMessages([
        [
            "system",
            "Answer the uer's questions based on the below contet:\n\n{context}"
        ],
        ...chatHistory,
        ["user", "{input}"],
    ])

    //Creates a chain to cimbine retrieved documents into a response
    //Takes the prompt and combines it with the retrieved documents
    console.log("--- Creating a chain to combine retrieved documents into a response . . . ---")
    const historyAwareCombineDocsChain = await createStuffDocumentsChain({
        llm: model,
        prompt: historyAwareRetrievalPrompt,
    })

    //Creates main retrieval chain combining history-aware and docs combine chains
    console.log("--- Creating the main retrieval chain . . . ---")
    const conversationalRetrievalChain = await createRetrievalChain({
        retriever: historyAwareRetrieverChain,
        combineDocsChain: historyAwareCombineDocsChain,
    })

    //Run chain wtih sample conversation
    console.log("--- Running the chain with a sample conversation . . . ---")
    const reply = await conversationalRetrievalChain.invoke({
        chat_history: chatHistory,
        input: question, 
    })
    console.log(reply.answer)
    return reply.answer
}

export {model, generateLangchainCompletion}