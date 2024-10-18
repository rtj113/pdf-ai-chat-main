"use client"

import { FormEvent, useEffect, useRef, useState, useTransition } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import {askQuestion} from "@/actions/askQuestion"
import { Loader2Icon } from "lucide-react"
//import { ChatMessage } from "@langchain/core/messages"
import ChatMessage from "./ChatMessage"
import {useCollection} from "react-firebase-hooks/firestore"
import {useUser} from "@clerk/nextjs"
import {collection, orderBy, query} from "firebase/firestore"
import { db } from "@/firebase"
import { useToast } from "@/hooks/use-toast"


export type Message = {
    id?: string
    role: "human"| "ai" | "placeholder"
    message: string
    createdAt: Date
}



function Chat({id}: {id: string}){
    const {user} = useUser()
    const {toast} = useToast()

    const [input, setInput] = useState("")
    const [isPending, startTransition] = useTransition()
    const [messages, setMessages] = useState<Message[]>([])
    const bottomOfChatRef = useRef<HTMLDivElement>(null)

    //Real-time listener to collection within the file
    const [snapshot, loading, error] = useCollection(user && query(collection(db, "users", user?.id, "files", id, "chat"), orderBy("createdAt", "asc")))

    useEffect(() => {
        bottomOfChatRef.current?.scrollIntoView({
            behavior: "smooth",
        })
    },[messages])
    
    
    useEffect(() => {
        if(!snapshot) return 
        console.log("Updated snapshot", snapshot.docs)

        setMessages((prevMessages) => {
            const lastMessage = prevMessages[prevMessages.length - 1];

            if (lastMessage?.role === "ai" && lastMessage.message === "Thinking . . . ") {
                return prevMessages;
            }

            const newMessages = snapshot.docs.map(doc => {
                const {role, message, createdAt} = doc.data();
                return {
                    id: doc.id,
                    role,
                    message,
                    createdAt: createdAt.toDate(),
                };
            });
            return newMessages;
        });
    }, [snapshot])

    //Fetch messages from the database
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        const q = input 
        setInput("")

        //Temporary store messages onto the store -- Optimistic update
        setMessages((prev) => [
            ...prev,
            {
                role: "human",
                message: q,
                createdAt: new Date()
            },
            {
                role: "ai",
                message: "Thinking . . . ",
                createdAt: new Date()
            },
        ])

        startTransition(async () => {
            const {success, message} = await askQuestion(id, q)

            //add toast nofification 
            if(!success) {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: message,
                })
                
                setMessages((prev)=> prev.slice(0, prev.length - 1).concat([{
                    role: "ai",
                    message: `Whoops . . . ${message}`,
                    createdAt: new Date()
                }]))
            }
        })

        //Ask a question to the LLM
        const res = await askQuestion(q, id)
    }


    return (
        <div className="flex flex-col h-full overflow-auto">
          <div className="flex-1 w-full text-white inset-0 bg-gradient-to-br from-blue-700/80 to-cyan-500 relative">

            {loading ? (
                <div className="flex items-center justify-center">
                    <Loader2Icon className="animate-spin h-20 w-20 text-indigo-600 mt-20"/>
                </div>
            ) : (
                <div className="p-5">
                  {messages.length === 0 && (
                    <ChatMessage
                    key={"placeholder"}
                    message={{
                        role: "ai", 
                        message: "Pregunte sobre el documento.", 
                        createdAt: new Date(),
                    }}
                    />
                )}

                    {messages.map((message, index) => (
                        <ChatMessage key={index} message={message} />
                    ))}

                    <div ref={bottomOfChatRef}/>

                </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="flex sticky bottom-0 space-x-2 p-5 bg-slate-200 text-slate-900 border-t border-slate-400"> 
            <Input placeholder="Haz una pregunta . . . " className="placeholder:text-muted-foreground flex-1 shadow-md bg-white" value={input} onChange={(e) => setInput(e.target.value)} />
            <Button className="bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-md" type="submit" disabled={!input || isPending}>
                {isPending ?(
                    <Loader2Icon className="w-4 h-4 animate-spin"/> ) : (
                    "Submit")}
                </Button>
          </form>
        </div>
    )
} 
export default Chat