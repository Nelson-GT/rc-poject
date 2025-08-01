"use client"

import Image from "next/image"
import { Calendar, DollarSign } from "lucide-react"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase-client"


export default function RifaCard({ children, id_rifa, isFull }) {
    const [rifaData, setRifaData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function fetchRifaData() {
            try {
                const { data, error } = await supabase
                    .from('Rifas')
                    .select('foto, precio, titulo, fecha_culminacion')
                    .eq('id', id_rifa)
                    .single()

                if (error) {
                    throw error
                }

                if (data) {
                    const fecha = new Date(data.fecha_culminacion)
                    const fechaFormateada = fecha.toLocaleDateString("es-ES", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                    })

                    setRifaData({
                        imagenRifa: data.foto,
                        precioBoleto: data.precio,
                        tituloRifa: data.titulo,
                        fechaFormateada: fechaFormateada
                    })
                }
            } catch (err) {
                console.error("Error al obtener los datos de la rifa:", err)
                setError("No se pudo cargar la información de la rifa.")
            } finally {
                setLoading(false)
            }
        }
        
        if (id_rifa) {
            fetchRifaData()
        }
    }, [id_rifa])

    if (loading) {
        return <p>Cargando...</p>
    }

    if (error) {
        return <p className="text-red-500">{error}</p>
    }

    if (!rifaData) {
        return <p>No se encontraron datos para la rifa especificada.</p>
    }

    // Aquí construimos las clases de forma más dinámica
    console.log(isFull)
    const cardWidthClasses = isFull ? "max-w-xl" : "max-w-sm";
    const baseClasses = "w-full bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden mx-auto";

    return (
        <div className={`${baseClasses} ${cardWidthClasses}`}>
            <div className="w-full p-5">
                <Image
                    src={rifaData.imagenRifa || "/placeholder.svg"}
                    width={400} // Puedes hacer la imagen más grande también
                    height={0}
                    alt="Imagen Rifa"
                    className="w-full h-auto object-contain mx-auto rounded-xl"
                    priority
                />
            </div>

            <div className="p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-5 h-5 text-orange-500" />
                        <span className="text-sm font-medium">{rifaData.fechaFormateada}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                        <DollarSign className="w-5 h-5 text-orange-500" />
                        <span className="text-sm font-medium">Precio:</span>
                        <span className="text-lg font-bold text-orange-600">Bs {rifaData.precioBoleto}</span>
                    </div>
                </div>

                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">{rifaData.tituloRifa.toUpperCase()}</h1>
                <div className="flex flex-row justify-center items-center">
                    {children}
                </div>
            </div>
        </div>
    )
}