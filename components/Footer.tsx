import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-indigo-900 py-6 px-4 w-full mt-auto">
            <div className="max-w-screen-xl mx-auto">
                <div className="border-t border-gray-200 pt-4" />
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="text-center md:text-left mb-4 md:mb-0">
                        <p className="text-sm text-white">
                            &copy; {new Date().getFullYear()} Platika. All rights reserved.
                        </p>
                    </div>
                    <div className="flex flex-wrap justify-center md:justify-end gap-4">
                        <Link href="#" className="text-sm text-white hover:text-gray-600">Terms</Link>
                        <Link href="#" className="text-sm text-white hover:text-gray-600">Privacy Policy</Link>
                        <Link href="#" className="text-sm text-white hover:text-gray-600">Cookie Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}