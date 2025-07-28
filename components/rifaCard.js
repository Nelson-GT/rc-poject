import Image from "next/image"
import { Calendar, DollarSign } from "lucide-react"

const fecha = new Date()
const fechaFormateada = fecha.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "long",
    year: "numeric",
})

const imagenRifa = "/rifaEjemplo.png"
const precioBoleto = 180.0
const tituloRifa = "Gran rifa 10000 Boletos Moto 0Km | +10 premios a repartir"

export default function RifaCard({ children }) {
    return (
        <div className="w-full flex justify-center px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                <div className="relative">
                    <Image
                        src={imagenRifa || "/placeholder.svg"}
                        width={800}
                        height={0}
                        alt="Imagen Rifa"
                        className="w-full h-auto object-contain mx-auto"
                    />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>

                <div className="p-6 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div className="flex items-center gap-2 text-gray-600">
                            <Calendar className="w-5 h-5 text-orange-500" />
                            <span className="text-sm font-medium">{fechaFormateada}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                            <DollarSign className="w-5 h-5 text-orange-500" />
                            <span className="text-sm font-medium">Precio:</span>
                            <span className="text-lg font-bold text-orange-600">Bs {precioBoleto}</span>
                        </div>
                    </div>

                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">{tituloRifa.toUpperCase()}</h1>
                    <div className="flex flex-row justify-center items-center">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}
