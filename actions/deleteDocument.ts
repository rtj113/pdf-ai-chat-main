"use server"

import { adminDb, adminStorage } from "@/firebaseAdmin"
import { indexName } from "@/lib/langchain"
import pineconeClient from "@/lib/pinecone"
import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"

export async function deleteDocument(docId: string){
    auth().protect()

    const {userId} = await auth()

    //Removes document from the Firebase db
    await adminDb
    .collection("users")
    .doc(userId!)
    .collection("files")
    .doc(docId)
    .delete()

    //Removes from FB storage
    await adminStorage
    .bucket(process.env.FIREBASE_STORAGE_BUCKET)
    .file(`users/${userId}/files/${docId}`)
    .delete()

    //Removes all embeddings from Pinecone re:Document
    const index = await pineconeClient.index(indexName)
    await index.namespace(docId).deleteAll()

    //Revalidates dashboard page to ensure docs are up to date
    revalidatePath("/dashboard")
}