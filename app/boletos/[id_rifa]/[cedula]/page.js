"use client"
import RifaCard from "@/components/rifaCardDB"
import Button from "@/components/ui/button"
import { useParams, useRouter } from "next/navigation"
import { Ticket, Home } from "lucide-react"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase-client"

export default function Boletos() {
    const router = useRouter()
    const { id_rifa, cedula } = useParams()
    const [boletosAgrupados, setBoletosAgrupados] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!id_rifa || !cedula) {
            setLoading(false);
            return;
        }

        async function obtenerBoletos() {
            setLoading(true)
            setError(null)
            
            try {
                const { data, error } = await supabase
                    .from('Boletos')
                    .select('numero_boleto, fecha_compra')
                    .eq('id_rifa', id_rifa)
                    .eq('cedula_comprador', cedula)
                    .not('fecha_compra', 'is', null) // Asegurarse de que solo se traigan boletos comprados
                    .order('fecha_compra', { ascending: false }); // Ordenar por fecha de compra descendente
                
                if (error) {
                    throw error
                }
            
                if (data && data.length > 0) {
                    const groupedBoletos = groupBoletosByDate(data);
                    setBoletosAgrupados(groupedBoletos);
                } else {
                    console.error("No posee boletos en esta rifa");
                    setBoletosAgrupados({}); // Si no hay datos, inicializar como objeto vacío
                }
            } catch (err) {
                console.error("Error al obtener los boletos:", err);
                setError("No se pudieron cargar tus boletos. Intenta de nuevo más tarde.");
            } finally {
                setLoading(false);
            }
        }
        
        obtenerBoletos();
    }, [id_rifa, cedula]);

    // Función para agrupar los boletos por fecha y hora
    const groupBoletosByDate = (boletos) => {
        const grouped = {};
        boletos.forEach(boleto => {
            if (boleto.fecha_compra) {
                const date = new Date(boleto.fecha_compra);
                const fecha = date.toLocaleDateString('es-ES', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                });
                const hora = date.toLocaleTimeString('es-ES', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                });
                const key = `${fecha} a las ${hora}`;
                
                if (!grouped[key]) {
                    grouped[key] = [];
                }
                grouped[key].push(boleto);
            }
        });
        return grouped;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <p>Cargando tus boletos...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <p className="text-red-500">{error}</p>
            </div>
        )
    }

    const totalBoletos = Object.values(boletosAgrupados).flat().length;

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="pt-20 pb-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pt-8">
                    <RifaCard id_rifa={id_rifa} isFull />

                    <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
                        <div className="text-center space-y-8">
                            <div className="space-y-4">
                                <Ticket className="w-12 h-12 text-orange-500 mx-auto" />
                                <h1 className="text-3xl font-bold text-gray-900">¡Felicidades!</h1>
                                <p className="text-gray-600 text-lg">Estos son tus números de la suerte</p>
                                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                                    <p className="text-orange-800 font-medium">
                                        Total de boletos: <span className="font-bold">{totalBoletos}</span>
                                    </p>
                                </div>
                            </div>

                            {totalBoletos > 0 ? (
                                Object.keys(boletosAgrupados).map(fecha => (
                                    <div key={fecha} className="space-y-4">
                                        <div className="bg-gray-100 rounded-md p-2">
                                            <p className="text-sm font-medium text-gray-600">Comprados el {fecha}</p>
                                        </div>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                            {boletosAgrupados[fecha].map((boleto, index) => (
                                                <div
                                                    key={index}
                                                    className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl p-4 shadow-lg transform hover:scale-105 transition-transform duration-200"
                                                >
                                                    <div className="text-center">
                                                        <Ticket className="w-6 h-6 mx-auto mb-2 opacity-80" />
                                                        <p className="text-2xl font-bold">{boleto.numero_boleto}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="col-span-full text-gray-500">No tienes boletos para esta rifa.</p>
                            )}

                            <div className="space-y-4">
                                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                    <p className="text-green-800 text-sm">
                                        📧 Recibirás un correo de confirmación con todos los detalles de tu compra
                                    </p>
                                </div>

                                <Button size="lg" className="w-full sm:w-auto px-8" onClick={() => router.push(`/${id_rifa}`)}>
                                    <Home className="w-5 h-5 mr-2" />
                                    Volver a la Rifa
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}