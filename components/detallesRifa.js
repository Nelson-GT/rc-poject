"use client"
import Link from 'next/link'
import Image from "next/image";
import Button from "@/components/ui/button"
import ButtonColors from "@/components/ui/buttonColors"
import RifaCard from "@/components/rifaCard"
import { useRouter } from "next/navigation";

export default function DetallesRifa() {
    const router = useRouter();
    
    const precioBoleto = 180.00;
    
    const fecha = new Date();
    const fechaFormateada = fecha.toLocaleDateString('es-ES', {day: '2-digit', month: 'long', year: 'numeric',});
    
    const imagenRifa = "/rifaEjemplo.png"
    const tituloRifa = "Gran rifa 10000 Boletos Moto 0Km | +10 premios a repartir";
    const detallesRifa = "Gran rifa con combo de Moto 0Km a realiza el día 20 de Júlio del 2025, a través de nuestras redes sociales"
    const premios = [
        {
            titulo: "Primer premio",
            descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
            imagen: "/motoRifa.jpeg"
            
        },
        {
            titulo: "Segundo Premio",
            descripcion: "incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco ",
            imagen: "/motoRifa.jpeg"
        },
        {
            titulo: "Tercer Premio",
            descripcion: "laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in",
            imagen: "/motoRifa.jpeg"
        },
        {
            titulo: "Cuarto Premio",
            descripcion: " reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat ",
            imagen: "/motoRifa.jpeg"
        },{
            titulo: "Quinto Premio",
            descripcion: "cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            imagen: "/motoRifa.jpeg"
        },
        {
            titulo: "premio Extra",
            descripcion: "pruecupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.ba",
            imagen: "/motoRifa.jpeg"
        },]
    return (
        <div className="w-full flex flex-col justify-center items-center">
            <div className="w-[90%] lg:w-[50%] py-8 md:py-10 rounded-4xl border border-gray-300 shadow-xl">
                <div className="px-5 flex flex-col gap-6">
                    <Image
                        src = {imagenRifa}
                        width={0}
                        height={0}
                        alt="Imagen Rifa"
                        className="w-[100%] rounded-2xl h-auto"
                        sizes="(max-width: 768px) 90vw, 175px"
                    />
                    <div className="flex justify-between items-center">
                        <div className="flex flex-row gap-2">
                            <img src="/calendar.svg" alt="Calendario" className="w-6 h-6" />
                            <span className="text-sm font-bold text-gray-700">{fechaFormateada}</span>
                        </div>
                        <div className="flex flex-col lg:flex-row text-end">
                            <span className="text-sm font-medium text-gray-700 mx-3">Precio</span>
                            <span className="text-sm font-bold text-gray-700 mx-3">Bs: {precioBoleto}</span>
                        </div>
                    </div>
                    <h1><span className="font-bold text-xl text-black">{tituloRifa.toUpperCase()}</span></h1>
                    <Button className="bg-orange text-white lg:m-3 lg:my-0"
                            onClick={() => router.push("/comprar")}>
                        Comprar Boletos
                    </Button>
                </div>
            </div>
            <div className="w-[90%] lg:w-[50%] mt-10 px-5 flex flex-col gap-6 text-start">
                <h2><span className="font-bold text-xl text-black">Detalles de la Rifa</span></h2>
                <div className="flex flex-wrap max-w-lg break-words">
                    <p className="text-dm font-medium text-black break-words">{detallesRifa}</p>
                </div>
            </div>
            <div className="w-[90%] lg:w-[50%] mt-10 px-5 flex flex-col gap-6 text-start">
                <h2><span className="font-bold text-xl text-black">Premios</span></h2>
                {premios.map((premio, index) => {
                    let contenido;
                    switch (index) {
                        case 0:
                        contenido = <p className="text-black text-start font-bold text-xl">🥇 {premio.titulo.toUpperCase()}</p>;
                        break;
                        case 1:
                        contenido = <p className="text-black font-bold text-xl">🥈 {premio.titulo.toUpperCase()}</p>;
                        break;
                        case 2:
                        contenido = <p className="text-black font-bold text-xl">🥉 {premio.titulo.toUpperCase()}</p>;
                        break;
                        default:
                        contenido = <p className="text-black font-bold text-xl">💎 {premio.titulo.toUpperCase()}</p>;
                    }

                    return (
                        <div key={index} className="flex flex-col border border-orange p-3 rounded-xl gap-3">
                            <div className="flex my-3">
                                <Image
                                    src = {premio.imagen}
                                    width={0}
                                    height={0}
                                    alt="Imagen premio"
                                    className="w-[100%] rounded-2xl h-auto"
                                    sizes="(max-width: 768px) 90vw, 175px"
                                />
                            </div>
                            {contenido}
                            <p><span className="text-black font-medium text-md">{premio.descripcion}</span></p>
                        </div>
                    );
                    })}
            </div>
        </div>
    )
}