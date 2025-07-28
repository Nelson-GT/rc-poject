"use client"
import Image from "next/image"
import Button from "@/components/ui/button"
import RifaCard from "@/components/rifaCard"
import { useRouter } from "next/navigation"
import { Calendar, Trophy } from "lucide-react"

export default function DetallesRifa() {
    const router = useRouter()

    const detallesRifa =
        "Gran rifa con combo de Moto 0Km a realizar el día 20 de Julio del 2025, a través de nuestras redes sociales. ¡No te pierdas esta increíble oportunidad de ganar!"

    const premios = [
        {
        titulo: "Primer premio",
        descripcion: "Moto 0Km completamente nueva con todos los documentos en regla y garantía del fabricante.",
        imagen: "/motoRifa.jpeg",
        },
        {
        titulo: "Segundo Premio",
        descripcion: "Smartphone de última generación con todos los accesorios incluidos y garantía extendida.",
        imagen: "/motoRifa.jpeg",
        },
        {
        titulo: "Tercer Premio",
        descripcion: "Tablet premium con teclado y stylus incluidos, perfecta para trabajo y entretenimiento.",
        imagen: "/motoRifa.jpeg",
        },
        {
        titulo: "Cuarto Premio",
        descripcion: "Auriculares inalámbricos de alta gama con cancelación de ruido activa.",
        imagen: "/motoRifa.jpeg",
        },
        {
        titulo: "Quinto Premio",
        descripcion: "Smartwatch deportivo con GPS y monitor de salud integrado.",
        imagen: "/motoRifa.jpeg",
        },
        {
        titulo: "Premio Extra",
        descripcion: "Voucher de compras por valor de Bs 500 en tiendas participantes.",
        imagen: "/motoRifa.jpeg",
        },
    ]

    const getEmojiForPrize = (index) => {
        switch (index) {
        case 0:
            return "🥇"
        case 1:
            return "🥈"
        case 2:
            return "🥉"
        default:
            return "🎁"
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-20 pb-12 rounded-xl">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                {/* Tarjeta principal de la rifa */}
                <RifaCard>
                    <Button size="lg" className="w-full sm:w-auto" onClick={() => router.push("/comprar")}>
                        🎫 Comprar Boletos
                    </Button>
                </RifaCard>

                {/* Detalles de la rifa */}
                <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <Calendar className="w-6 h-6 text-orange-500" />
                        <h2 className="text-2xl font-bold text-gray-900">Detalles de la Rifa</h2>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-lg">{detallesRifa}</p>
                </div>

                {/* Premios */}
                <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
                    <div className="flex items-center gap-3 mb-8">
                        <Trophy className="w-6 h-6 text-orange-500" />
                        <h2 className="text-2xl font-bold text-gray-900">Premios</h2>
                    </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {premios.map((premio, index) => (
                    <div
                        key={index}
                        className="group bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105"
                    >
                        <div className="relative mb-4 overflow-hidden rounded-lg">
                        <Image
                            src={premio.imagen || "/placeholder.svg"}
                            width={400}
                            height={0}
                            alt={`Imagen ${premio.titulo}`}
                            className="w-full h-auto object-contain mx-auto group-hover:scale-110 transition-transform duration-300"
                        />
                        </div>

                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-2xl">{getEmojiForPrize(index)}</span>
                            <h3 className="text-xl font-bold text-gray-900">{premio.titulo.toUpperCase()}</h3>
                        </div>

                        <p className="text-gray-700 leading-relaxed">{premio.descripcion}</p>
                    </div>
                    ))}
                </div>
                </div>
            </div>
        </div>
    )
}
