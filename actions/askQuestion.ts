"use server"

import { adminDb } from "@/firebaseAdmin"
import { generateLangchainCompletion } from "@/lib/langchain"
import { auth } from "@clerk/nextjs/server"
import {Message} from "@/components/Chat"

// import { generateLangchainCompletion} from "@/lib/langchain"

const FREE_LIMIT = 2
const PRO_LIMIT = 20

export async function askQuestion(id: string, question: string) {

    auth().protect()
    const {userId} = await auth()

    //reference to chat messages
    const chatRef = adminDb
    .collection("users")
    .doc(userId!)
    .collection("files")
    .doc(id)
    .collection("chat")

    //Get the chat history
    const chatSnapshot = await chatRef.get()
    const userMessages = chatSnapshot.docs.filter(
        (doc) => doc.data().role === "human")
    

    //Get the user document 
    const userRef = await adminDb.collection("users").doc(userId!).get()

    //Limit the number of mesages based on overall plan
    //Checks if the user is on free plan and has asked more than specified number of questions
    if (!userRef.data()?.hasActiveMembership){
        if(userMessages.length >= FREE_LIMIT){
            return {
                success: false,
                message: `You'll need to upgrade to the Pro Account to ask more than ${FREE_LIMIT} questions!`,
            }
        }
    }
    //Check if they are on a pro plan
    if(userRef.data()?.hasActiveMembership){
        if (userMessages.length >= PRO_LIMIT){
            return {
                success: false,
                message: `You've reached the Pro Account limit of ${PRO_LIMIT} questions per document!`,
            }
        }
    }


    const userMessage: Message = {
        role: "human",
        message: question,
        createdAt: new Date(),
    }
    await chatRef.add(userMessage)

    //Generate a response from the AI
    const reply = await generateLangchainCompletion(id, question)

    const aiMessage: Message = {
        role: "ai",
        message: reply,
        createdAt: new Date(),
    }
    await chatRef.add(aiMessage)

    return {success: true, message: null}
}

