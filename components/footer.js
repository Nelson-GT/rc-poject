import Link from "next/link"
import Image from "next/image"
import { Instagram, MessageCircleHeart, ExternalLink, Palmtree } from "lucide-react"

const links = [
    { title: "Inicio", href: "/" },
    { title: "Términos y Condiciones", href: "/terminos_condiciones" },
    { title: "Ubicación", href: "/ubicacion" },
    { title: "Contáctanos", href: "https://wa.me/584124025369" },
]

export default function Footer() {
    return (
        <footer className="bg-orange-500 text-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                    {/* Logo */}
                    <div className="flex justify-center lg:justify-start">
                        <Link href="/" aria-label="go home" className="block">
                        <Image
                            src="/corralitoOrange.jpg"
                            width={120}
                            height={120}
                            className="rounded-full object-cover shadow-lg"
                            alt="logo Corralitos"
                        />
                        </Link>
                    </div>

                    {/* Links */}
                    <div className="flex flex-col items-center space-y-4">
                        <nav className="flex flex-col lg:flex-row gap-3 text-center">
                        {links.map((link, index) => (
                            <Link
                            key={index}
                            href={link.href}
                            className="text-orange-100 hover:text-white px-3 py-2 rounded-md transition-colors duration-200 text-sm font-medium"
                            >
                            {link.title}
                            </Link>
                        ))}
                        </nav>
                    </div>

                    {/* Social Media */}
                    <div className="flex justify-center lg:justify-end">
                        <div className="flex items-center space-x-4">
                        <Link
                            href="https://www.instagram.com/corralitoswings"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram"
                            className="p-3 bg-orange-600 rounded-full hover:bg-orange-700 transition-colors duration-200"
                        >
                            <Instagram className="w-5 h-5" />
                        </Link>
                        <Link
                            href="https://wa.me/584124025369"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="WhatsApp"
                            className="p-3 bg-orange-600 rounded-full hover:bg-orange-700 transition-colors duration-200"
                        >
                            <MessageCircleHeart className="w-5 h-5" />
                        </Link>
                        <Link
                            href="https://linktr.ee/corralitoswings"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Linktree"
                            className="p-3 bg-orange-600 rounded-full hover:bg-orange-700 transition-colors duration-200"
                        >
                            <Palmtree className="w-5 h-5" />
                        </Link>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-orange-400 text-center">
                    <p className="text-orange-100 text-sm">
                        © {new Date().getFullYear()} Corralitos Wings. Todos los derechos reservados.
                    </p>
                </div>
            </div>
        </footer>
    )
}
