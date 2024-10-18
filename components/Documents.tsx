import { auth } from "@clerk/nextjs/server";
import PlaceholderDocument from "./PlaceholderDocument";
import { adminDb } from "@/firebaseAdmin";
import Document from "./Document";

async function Documents() {
    auth().protect()
    const { userId } = auth();
    if (!userId) {
        throw new Error("User not found")
    }

    const documentSnapshot = await adminDb
        .collection("users")
        .doc(userId)
        .collection("files")
        .orderBy("createdAt", "desc") 
        .get()

    return (
        <div className="flex flex-wrap p-5 bg-gray-100 justify-center lg:justify-start rounded-md gap-5 max-w-7xl mx-auto">
            {documentSnapshot.docs.map((doc) => {
                const { name, downloadUrl, size } = doc.data();
                return (
                    <Document
                        key={doc.id}
                        id={doc.id}
                        name={name}
                        size={size}
                        downloadUrl={downloadUrl}
                    />
                );
            })}
            <PlaceholderDocument />
        </div>
    )
}

export default Documents