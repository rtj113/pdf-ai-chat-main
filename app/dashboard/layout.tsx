import { ClerkLoaded } from "@clerk/nextjs"

function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <ClerkLoaded>
            <div className="flex-1 flex flex-col h-screen">
                
                <main className="flex-1">
                    {children}
                </main>
            </div>
        </ClerkLoaded>
    )
}

export default DashboardLayout