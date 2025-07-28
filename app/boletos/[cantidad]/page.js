"use client"
import { NavBar } from "@/components/navbar"
import Footer from "@/components/footer"
import RifaCard from "@/components/rifaCard"
import Button from "@/components/ui/button"
import { useParams, useRouter } from "next/navigation"
import { Ticket, Home } from "lucide-react"

export default function Boletos() {
    const router = useRouter()
    const { cantidad } = useParams()

    const generarBoletos = (cantidad) => {
        const boletos = Array.from({ length: Number.parseInt(cantidad) }, (_, index) => {
        const numero = Math.floor(Math.random() * 10000)
            .toString()
            .padStart(4, "0")
        return { numero, id: index }
        })
        return boletos
    }

    const boletos = generarBoletos(cantidad)

    return (
        <div className="min-h-screen bg-gray-50">
        <NavBar />

        <div className="pt-20 pb-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pt-8">
            <RifaCard />

            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
                <div className="text-center space-y-8">
                <div className="space-y-4">
                    <Ticket className="w-12 h-12 text-orange-500 mx-auto" />
                    <h1 className="text-3xl font-bold text-gray-900">¡Felicidades!</h1>
                    <p className="text-gray-600 text-lg">Estos son tus números de la suerte</p>
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <p className="text-orange-800 font-medium">
                        Total de boletos: <span className="font-bold">{cantidad}</span>
                    </p>
                    </div>
                </div>

                {/* Opcion para que queden centrados
                <div className="flex flex-wrap gap-4 justify-center">
                    {boletos.map((boleto) => (
                    <div
                        key={boleto.id}
                        className="w-[45%] sm:w-[30%] md:w-[20%] lg:w-[18%] bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl p-4 shadow-lg transform hover:scale-105 transition-transform duration-200"
                    >
                        <div className="text-center">
                        <Ticket className="w-6 h-6 mx-auto mb-2 opacity-80" />
                        <p className="text-2xl font-bold">{boleto.numero}</p>
                        </div>
                    </div>
                    ))}
                </div>
                */}

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {boletos.map((boleto) => (
                    <div
                        key={boleto.id}
                        className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl p-4 shadow-lg transform hover:scale-105 transition-transform duration-200"
                    >
                        <div className="text-center">
                        <Ticket className="w-6 h-6 mx-auto mb-2 opacity-80" />
                        <p className="text-2xl font-bold">{boleto.numero}</p>
                        </div>
                    </div>
                    ))}
                </div>

                <div className="space-y-4">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-green-800 text-sm">
                        📧 Recibirás un correo de confirmación con todos los detalles de tu compra
                    </p>
                    </div>

                    <Button size="lg" className="w-full sm:w-auto px-8" onClick={() => router.push("/")}>
                    <Home className="w-5 h-5 mr-2" />
                    Volver al Inicio
                    </Button>
                </div>
                </div>
            </div>
            </div>
        </div>

        <Footer />
        </div>
    )
}
