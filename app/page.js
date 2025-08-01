"use client"

import { NavBar } from "@/components/navbar"
import Footer from "@/components/footer"
import Button from "@/components/ui/button"
import RifaCard from "@/components/rifaCardDB"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase-client"

export default function Home() {
    const router = useRouter()
    const [activeRifaIds, setActiveRifaIds] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [modalConfirm, setModalConfirm] = useState(true)

    useEffect(() => {
        async function fetchActiveRifaIds() {
        try {
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
        <NavBar />
        
        <div className="my-25 md:my-35 flex flex-wrap items-center justify-center gap-12 px-50">
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

        <Footer />

        {/* Modal de confirmación (sin cambios) */}
        {modalConfirm && (
            <div className="mx-3 fixed inset-0 flex items-center justify-center z-50 bg-transparent bg-opacity-30 backdrop-blur-sm">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full">
                <div className="flex flex-col items-center justify-center gap-3">
                <div>
                    <h1><span className="text-black font-bold text-2xl">Términos y Condiciones</span></h1>
                </div>
                <div>
                    <div className="flex flex-col text-left text-black gap-1 py-1">
                    <h2><span className="font-bold text-md">Título 1:</span></h2>
                    <p><span className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span></p>
                    </div>
                    <div className="flex flex-col text-left text-black gap-1 py-1">
                    <h2><span className="font-bold text-md">Título 2:</span></h2>
                    <p><span className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span></p>
                    </div>
                    <div className="flex flex-col text-left text-black gap-1 py-1">
                    <h2><span className="font-bold text-md">Título 3:</span></h2>
                    <p><span className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span></p>
                    </div>
                    <div className="flex flex-col text-left text-black gap-1 py-1">
                    <h2><span className="font-bold text-md">Título 4:</span></h2>
                    <p><span className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span></p>
                    </div>
                </div>
                <div className="w-full flex justify-center">
                    <button
                    className="w-[50%] bg-orange rounded mt-5"
                    onClick={() => setModalConfirm(false)}
                    >
                    Volver
                    </button>
                </div>
                </div>
            </div>
            </div>
        )}
        </div>
    );
}