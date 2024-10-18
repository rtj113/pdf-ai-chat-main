"use client"

import { MessageCircleOffIcon, PlusCircleIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import useSubscription from "@/hooks/useSubscription";

function PlaceholderDocument() {
    const {isOverFileLimit} = useSubscription()
    const router = useRouter()
    const handleClick = () => {
        //Checks if user is in pro or free tier, push to upgrade page.
        if(isOverFileLimit) {
          router.push("/dashboard/upgrade")
        } else {
          router.push("/dashboard/upload")
        }
    }
  return (
    <Button onClick={handleClick}
     className="flex flex-col items-center justify-center w-64 h-80 rounded-xl bg-gray-200 drop-shadow-md text-gray-400">
       {isOverFileLimit ? (
        <MessageCircleOffIcon className="h-16 w-16" />
       ) : (
        <PlusCircleIcon className="h-16 w-16" />
       )}
        <p>
          {isOverFileLimit ? "Actualizar a cuenta Profesional" : "Agregar un Documento"}
        </p>
    </Button>
  )
}

export default PlaceholderDocument
