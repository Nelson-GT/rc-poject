"use client"
import { NavBar } from "@/components/navbar"
import Footer from "@/components/footer"
import Button from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { FileText, ArrowLeft } from "lucide-react"

export default function TerminosCondiciones() {
    const router = useRouter()

    const terminos = [
        {
        titulo: "Participación",
        contenido:
            "Para participar en esta rifa, el usuario debe ser mayor de 18 años y proporcionar información veraz y completa. La compra de boletos constituye la aceptación total de estos términos y condiciones.",
        },
        {
        titulo: "Sorteo y Premios",
        contenido:
            "El sorteo se realizará en la fecha especificada a través de nuestras redes sociales oficiales. Los premios se entregarán según las condiciones establecidas y no podrán ser canjeados por dinero en efectivo.",
        },
        {
        titulo: "Responsabilidades",
        contenido:
            "La organización se reserva el derecho de verificar la identidad de los ganadores y descalificar cualquier participación fraudulenta. Los participantes son responsables de proporcionar datos correctos para el contacto.",
        },
        {
        titulo: "Modificaciones",
        contenido:
            "La organización se reserva el derecho de modificar estos términos y condiciones en cualquier momento. Cualquier cambio será comunicado a través de nuestros canales oficiales con la debida anticipación.",
        },
    ]

    return (
        <div className="min-h-screen bg-gray-50">
        <NavBar />

        <div className="pt-20 pb-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                {/* Header */}
                <div className="bg-orange-500 text-white p-6 sm:p-8">
                <div className="flex items-center gap-4 mb-4">
                    <FileText className="w-8 h-8" />
                    <h1 className="text-3xl font-bold">Términos y Condiciones</h1>
                </div>
                <p className="text-orange-100">Lee cuidadosamente nuestros términos y condiciones antes de participar</p>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8 space-y-8">
                {terminos.map((termino, index) => (
                    <div key={index} className="space-y-3">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <span className="bg-orange-100 text-orange-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                        </span>
                        {termino.titulo}
                    </h2>
                    <p className="text-gray-700 leading-relaxed pl-10">{termino.contenido}</p>
                    </div>
                ))}

                <div className="border-t border-gray-200 pt-8">
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
                    <p className="text-orange-800 text-sm">
                        <strong>Última actualización:</strong>{" "}
                        {new Date().toLocaleDateString("es-ES", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                        })}
                    </p>
                    </div>

                    <div className="text-center">
                    <Button size="lg" onClick={() => router.push("/")} className="px-8">
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Volver al Inicio
                    </Button>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>

        <Footer />
        </div>
    )
}
