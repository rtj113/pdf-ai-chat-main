import Documents from "@/components/Documents"

function Dashboard() {
    return (
        <div className="h-full max-w-7xl mx-auto">
            <h1 className="text-3xl p-5 bg-gray-100 text-indigo-600 font-extralight">Mis Documentos</h1>
            <Documents />
        </div>
    )
}

export default Dashboard