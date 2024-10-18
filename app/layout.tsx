import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/Header";
import { Toaster } from "@/components/ui/toaster";
import ConditionalFooter from "@/components/ConditionalFooter";



export const metadata: Metadata = {
  title: "Platika: Tu Asistente de IA para Documentos",
  description: "Explore la IA para documentos con Platika. Encuentra respuestas rápidas, resúmenes y más. Empieza ahora gratis.",
};

const inter = Inter({
  weight: ["300", "400", "500", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"]
});

const RootLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <ClerkProvider>
      <html lang="en" className="h-full">
        <body className={`${inter} flex flex-col min-h-screen h-screen`}>
          <Header />
          <div className="flex-grow flex flex-col">
            <main className="flex-grow">
              <Toaster /> 
              {children}
            </main>
            <ConditionalFooter />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}

export default RootLayout;
