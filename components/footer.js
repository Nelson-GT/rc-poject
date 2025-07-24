import Link from 'next/link'
import Image from "next/image";

const links = [
    { title: 'Inicio', href: '/' },
    { title: 'Terminos y Condiciones', href: '/terminos_condiciones' },
    { title: 'Conocenos', href: '#' },
    { title: 'Ubicación', href: '#' },
    { title: 'Contactanos', href: '#' },
]

export default function FooterSection() {
    return (
        <footer className="py-10 md:py-16 bg-orange">
            <div className="mx-auto max-w-5xl px-6">
                <div className="flex flex-row lg:flex-col w-full justify-between px-8 items-center">
                    <div>
                        <Link
                            href="/"
                            aria-label="go home"
                            className="mx-auto block size-fit">
                            <Image src="/corralitoOrange.jpg" width={175} height={175} style={{ objectFit: 'contain' }} alt="logo Corralitos"></Image>
                        </Link>
                    </div>
                    <div className="my-8 flex flex-col lg:flex-row text-end gap-3 lg:gap-6 text-sm">
                        {links.map((link, index) => (
                            <Link
                                key={index}
                                href={link.href}
                                className="text-muted-foreground hover:text-primary block duration-150">
                                <span className="font-medium">{link.title}</span>
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="my-8 mt-3 flex flex-wrap justify-center gap-6 text-sm">
                    <Link
                        href="https://www.instagram.com/corralitoswings"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                        className="text-muted-foreground hover:text-primary block">
                        <img
                            src="/instagram.svg"
                            alt="Icono para copiar"
                            className="h-5 w-5"
                        />
                    </Link>
                    <Link
                        href="https://wa.me/584124025369"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="WhatsApp"
                        className="text-muted-foreground hover:text-primary block">
                        <img
                            src="/whatsapp.svg"
                            alt="Icono para copiar"
                            className="h-5 w-5"
                        />
                    </Link>
                    <Link
                        href="https://linktr.ee/corralitoswings?fbclid=PAZXh0bgNhZW0CMTEAAaf0oERZZ9ieQF6BdLBgeLsjAQ06-bIXhF3ozBvQJX5zsAij9GcYfVlYwR-nqA_aem_8OgZ-zQMoimsjri8A6debQ"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        className="text-muted-foreground hover:text-primary block">
                        <img
                            src="/linktree.svg"
                            alt="Icono para copiar"
                            className="h-5 w-5"
                        />
                    </Link>
                </div>
                <span className="text-muted-foreground block text-center text-sm font-medium"> © {new Date().getFullYear()} Corralitos Wings, Todos los derechos reservados</span>
            </div>
        </footer>
    )
}