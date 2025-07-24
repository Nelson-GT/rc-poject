
'use client'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import React from 'react'
import Image from 'next/image';
import { useRouter } from "next/navigation"; 

const menuItems = [
    { name: 'Inicio', href: '/' },
    { name: 'Terminos y Condiciones', href: '/terminos_condiciones' },
    { name: 'Conocenos', href: '#' },
    { name: 'Ubicación', href: '#' },
    { name: 'Contactanos', href: '#' },
]

export const NavBar = () => {
    const [menuState, setMenuState] = React.useState(false)
    const router = useRouter();
    return (
        <header>
            <nav
                data-state={menuState && 'active'}
                className="bg-orange fixed top-0 z-20 w-full border-b backdrop-blur-3xl">
                <div className="mx-auto max-w-6xl transition-all duration-300">
                    <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4 px-6">
                        <div className="flex w-full items-center justify-between gap-12">
                            <Link
                                href="/"
                                aria-label="home"
                                className="flex items-center space-x-2">
                                <Image src="/corralitoOrange.jpg" width={50} height={50} style={{ objectFit: 'contain' }} alt="Logo Corralitos"></Image>
                            </Link>

                            <button
                                onClick={() => setMenuState(!menuState)}
                                aria-label={menuState == true ? 'Cerrar Menu' : 'Abrir Menu'}
                                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden">
                                <Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                                <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
                            </button>

                            <div className="hidden lg:block">
                                <ul className="flex gap-8 text-sm">
                                    {menuItems.map((item, index) => (
                                        <li key={index}>
                                            <Link
                                                href={item.href}
                                                className="text-muted-foreground hover:text-accent-foreground block duration-150">
                                                <span className="font-medium">{item.name}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="bg-background in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
                            <div className="lg:hidden">
                                <ul className="space-y-6 text-base">
                                    {menuItems.map((item, index) => (
                                        <li key={index}>
                                            <Link
                                                href={item.href}
                                                className="text-muted-foreground hover:text-accent-foreground block duration-150">
                                                <span>{item.name}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}