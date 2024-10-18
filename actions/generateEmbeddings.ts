"use server"

import { generateEmbeddingsInPineconeVectorStore } from "@/lib/langchain"
import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"

export async function generateEmbeddings(docId: string) {
	try {
		auth().protect()

		// Turns PDF into embeddings 
		await generateEmbeddingsInPineconeVectorStore(docId)

		revalidatePath("/dashboard")
		return { complete: true }
	} catch (error) {
		console.error("Error generating embeddings:", error)
		return { complete: false, error: "Failed to generate embeddings" }
	}
}