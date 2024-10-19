"use client"
import { SignedIn, SignedOut, UserButton, SignInButton, SignUpButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "./ui/button";
import { FilePlus2 } from "lucide-react";
import UpgradeButton from "./UpgradeButton";

export default function Header() {
  return (
    <div className="flex justify-between bg-white shadow-sm items-center p-5">
      <Link href="/" className="text-2xl font-bold tracking-tight">
        Platika. <span className="text-indigo-600">PDF</span>
      </Link>

      <div className="flex items-center space-x-4 mr-2">
        <SignedOut>
          <Button asChild variant="link" className="hidden md:flex">
            <Link href="/pricing">Precios</Link>
          </Button>
        </SignedOut>
        <SignedIn>
          <Button asChild variant="link" className="hidden md:flex">
            <Link href="/dashboard/upgrade">Precios</Link>
          </Button>
        </SignedIn>
        <Button asChild variant="link" className="hidden md:flex">
          <Link href="/about">Acerca de Nosotros</Link>
        </Button>

        <SignedIn>
          <Button asChild variant="outline" className="">
            <Link href="/dashboard/">Mis Documentos</Link>
          </Button>
          <Button asChild variant="outline" className="">
            <Link href="/dashboard/upload">
              <FilePlus2 className="text-indigo-600" />
            </Link>
          </Button>
          <UpgradeButton />
          <UserButton />
        </SignedIn>

        <SignedOut>
          <SignInButton mode="modal">
            <Button variant="outline">Login</Button>
          </SignInButton>
          <SignUpButton mode="modal">
            <Button variant="outline">Register</Button>
          </SignUpButton>
        </SignedOut>
      </div>
    </div>
  )
}
