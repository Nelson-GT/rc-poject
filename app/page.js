"use client"

import Button from "@/components/ui/button"
import RifaCard from "@/components/rifaCardDB"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase-client"
import { FileText, ArrowLeft } from "lucide-react"

export default function Home() {

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

    const router = useRouter()
    const [activeRifaIds, setActiveRifaIds] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [modalConfirm, setModalConfirm] = useState(true)


    useEffect(() => {
        async function fetchActiveRifaIds() {
        try {
            const { data: updateData, error: updateError } = await supabase.rpc('actualizar_rifas');
            if (updateError) {
                console.error('Error al actualizar las rifas:', updateError);
            } else {
                console.log('El estado de las rifas se ha actualizado correctamente.');
            }
            const { data, error } = await supabase
            .from('Rifas')
            .select('id')
            .eq('estado', 'activa')

            if (error) {
            throw error
            }

            if (data) {
            // Extrae solo los IDs del array de objetos
            const ids = data.map(rifa => rifa.id)
            setActiveRifaIds(ids)
            }
        } catch (err) {
            console.error("Error al obtener los IDs de las rifas activas:", err)
            setError("No se pudieron cargar las rifas activas.")
        } finally {
            setLoading(false)
        }
        }

        fetchActiveRifaIds()
    }, []) // El array de dependencias está vacío para que se ejecute solo una vez al montar

    if (loading) {
        return <p>Cargando rifas activas...</p>
    }

    if (error) {
        return <p className="text-red-500 text-center">{error}</p>
    }

    return (
        <div className="bg-white">
        <div className="my-25 md:my-35 flex flex-wrap items-center justify-center gap-12 px-5 md:px-30">
            {activeRifaIds.length > 0 ? (
            activeRifaIds.map(id => (
                <RifaCard className="" key={id} id_rifa={id} isFull={false}>
                    <Button onClick={() => router.push(`/${id}`)} className="w-full sm:w-auto">
                        Ver más
                    </Button>
                </RifaCard>
            ))
            ) : (
            <p className="text-center text-gray-500">No hay rifas activas en este momento.</p>
            )}
        </div>

        {/* Modal de confirmación (sin cambios) */}
        {modalConfirm && (
            <div className="mx-3 fixed inset-0 flex items-center justify-center z-50 bg-transparent bg-opacity-30 backdrop-blur-sm">
                <div className="bg-white rounded-xl shadow-lg max-h-[90vh] md:max-h-[80vh] overflow-y-auto w-full max-w-lg md:max-w-2xl">
                    {/* Header */}
                    <div className="bg-orange-500 text-white p-6 sticky top-0 z-10">
                        <div className="flex items-center gap-3 mb-2">
                            <FileText className="w-6 h-6" />
                            <h1 className="text-2xl font-bold">Términos y Condiciones</h1>
                        </div>
                        <p className="text-orange-100 text-sm">Lee cuidadosamente nuestros términos y condiciones antes de participar.</p>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-6">
                        {terminos.map((termino, index) => (
                            <div key={index} className="space-y-2">
                                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                    <span className="bg-orange-100 text-orange-600 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                                        {index + 1}
                                    </span>
                                    {termino.titulo}
                                </h2>
                                <p className="text-gray-700 leading-relaxed text-sm pl-8">{termino.contenido}</p>
                            </div>
                        ))}
                    </div>
                    <div className="p-6 border-t border-gray-200 sticky bottom-0 bg-white">
                        <div className="text-center">
                            <Button size="lg" onClick={() => setModalConfirm(false)} className="px-8">
                                <ArrowLeft className="w-5 h-5 mr-2" />
                                Aceptar
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        )}
        </div>
    );
}