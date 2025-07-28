"use client"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import React from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"

const menuItems = [
    { title: "Inicio", href: "/" },
    { title: "Términos y Condiciones", href: "/terminos_condiciones" },
    { title: "Ubicación", href: "/ubicacion" },
    { title: "Contáctanos", href: "https://wa.me/584124025369" },
]

export const NavBar = () => {
    const [menuState, setMenuState] = React.useState(false)

    return (
        <header className="fixed top-0 z-50 w-full">
        <nav className="bg-orange-500 backdrop-blur-md border-b border-orange-600 shadow-lg">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    {/* Logo */}
                    <Link href="/" aria-label="home" className="flex items-center space-x-2 flex-shrink-0">
                    <Image
                        src="/corralitoOrange.jpg"
                        width={45}
                        height={45}
                        className="rounded-full object-cover"
                        alt="Logo Corralitos"
                    />
                    <span className="hidden sm:block text-white font-bold text-lg">Corralitos</span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden lg:block">
                    <ul className="flex items-center space-x-8">
                        {menuItems.map((item, index) => (
                        <li key={index}>
                            <Link
                            href={item.href}
                            className="text-white hover:text-orange-200 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                            >
                            {item.title}
                            </Link>
                        </li>
                        ))}
                    </ul>
                    </div>

                    {/* Mobile menu button */}
                    <button
                    onClick={() => setMenuState(!menuState)}
                    aria-label={menuState ? "Cerrar Menu" : "Abrir Menu"}
                    className="lg:hidden relative z-50 p-2 rounded-md text-white hover:bg-orange-600 transition-colors duration-200"
                    >
                    <Menu
                        className={`w-6 h-6 transition-all duration-300 ${menuState ? "rotate-180 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"}`}
                    />
                    <X
                        className={`absolute inset-2 w-6 h-6 transition-all duration-300 ${menuState ? "rotate-0 scale-100 opacity-100" : "-rotate-180 scale-0 opacity-0"}`}
                    />
                    </button>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`lg:hidden transition-all duration-300 ease-in-out ${
                    menuState ? "max-h-96 opacity-100 pb-4" : "max-h-0 opacity-0 overflow-hidden"
                    }`}
                >
                    <div className="px-2 pt-2 pb-3 space-y-1 bg-orange-600 rounded-lg mt-2">
                    {menuItems.map((item, index) => (
                        <Link
                        key={index}
                        href={item.href}
                        className="text-white hover:text-orange-200 hover:bg-orange-700 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                        onClick={() => setMenuState(false)}
                        >
                        {item.title}
                        </Link>
                    ))}
                    </div>
                </div>
            </div>
        </nav>
        </header>
    )
}
