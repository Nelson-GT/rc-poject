"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Calendar, Trophy } from "lucide-react"
import Button from "@/components/ui/button"
import RifaCard from "@/components/rifaCardDB"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

function getExpirationDate() {
  // 30 minutos desde ahora
  return new Date(Date.now() + 30 * 60 * 1000);
}

async function liberarBoletosExpirados(id_rifa) {
  // Busca boletos reservados hace más de 30 minutos y los libera
  const { data, error } = await supabase
    .from("Boletos")
    .select("id, fecha_compra")
    .eq("id_rifa", id_rifa)
    .eq("estado", "reservado");
  if (error) return;
  const ahora = new Date();
  for (const boleto of data) {
    // fecha_compra se usa como timestamp de reserva
    if (boleto.fecha_compra && new Date(boleto.fecha_compra).getTime() + 30 * 60 * 1000 < ahora.getTime()) {
      await supabase
        .from("Boletos")
        .update({ estado: "disponible", nombre_comprador: null, correo_comprador: null, telefono_comprador: null, fecha_compra: null })
        .eq("id", boleto.id);
    }
  }
}

export default function DetallesRifa({ id_rifa, isFull }) {
    const id = id_rifa;
    const router = useRouter()
    const [rifaData, setRifaData] = useState({ detallesRifa: "", premios: [] })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

    useEffect(() => {
        async function fetchRifaData() {
            try {
                // Obtener detalles de la rifa
                const { data: rifa, error: rifaError } = await supabase
                    .from('Rifas')
                    .select('detalles')
                    .eq('id', id_rifa)
                    .single()

                if (rifaError) {
                    throw rifaError
                }

                // Obtener premios de la rifa
                const { data: premios, error: premiosError } = await supabase
                    .from('Premios')
                    .select('titulo, descripcion, foto_url')
                    .eq('id_rifa', id_rifa);

                if (premiosError) {
                    throw premiosError
                }
                
                setRifaData({
                    detallesRifa: rifa.detalles,
                    premios: premios || []
                })
                console.log(premios)

            } catch (err) {
                console.error("Error al obtener los datos de la rifa y premios:", err)
                setError("No se pudo cargar la información de los detalles y premios.")
            } finally {
                setLoading(false)
            }
        }

        if (id_rifa) {
            fetchRifaData()
        }
    }, [id_rifa])

    useEffect(() => {
        // Liberar boletos expirados cada 2 minutos
        const interval = setInterval(() => {
            liberarBoletosExpirados(id_rifa);
        }, 2 * 60 * 1000);
        return () => clearInterval(interval);
    }, [id_rifa]);

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

    async function reservarBoleto(numero_boleto, nombre, correo, telefono) {
        setLoading(true);
        setError(null);
        setSuccess(null);
        // Actualiza el boleto a reservado
        const { data, error } = await supabase
          .from("Boletos")
          .update({
            nombre_comprador: nombre,
            correo_comprador: correo,
            telefono_comprador: telefono,
            estado: "reservado",
            fecha_compra: new Date().toISOString(), // timestamp de reserva
          })
          .eq("id_rifa", id_rifa)
          .eq("numero_boleto", numero_boleto)
          .eq("estado", "disponible")
          .select();
        if (error || !data || data.length === 0) {
          setError("No se pudo reservar el boleto. Puede que ya esté reservado.");
          setLoading(false);
          return;
        }
        setSuccess("Boleto reservado. Tienes 30 minutos para confirmar el pago.");
        setLoading(false);
      }

      async function confirmarBoleto(numero_boleto) {
        setLoading(true);
        setError(null);
        setSuccess(null);
        // Cambia el estado a ocupado
        const { data, error } = await supabase
          .from("Boletos")
          .update({
            estado: "ocupado",
            fecha_compra: new Date().toISOString(),
          })
          .eq("id_rifa", id_rifa)
          .eq("numero_boleto", numero_boleto)
          .eq("estado", "reservado")
          .select();
        if (error || !data || data.length === 0) {
          setError("No se pudo confirmar el boleto. Puede que ya haya expirado la reserva.");
          setLoading(false);
          return;
        }
        setSuccess("Boleto confirmado y registrado.");
        setLoading(false);
      }

    if (loading) {
        return <p>Cargando detalles de la rifa y premios...</p>
    }

    if (error) {
        return <p className="text-red-500">{error}</p>
    }

    if (!rifaData.detallesRifa && rifaData.premios.length === 0) {
        return <p>No se encontraron datos para la rifa especificada.</p>
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-20 pb-12 rounded-xl">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                {/* Tarjeta principal de la rifa */}
                <RifaCard id_rifa={id_rifa} isFull={isFull}>
                    <Button size="lg" className="w-full sm:w-auto" onClick={() => {router.push(`/comprar/${id}`);}}>
                        🎫 Comprar Boletos
                    </Button>
                </RifaCard>

                {/* Detalles de la rifa */}
                <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <Calendar className="w-6 h-6 text-orange-500" />
                        <h2 className="text-2xl font-bold text-gray-900">Detalles de la Rifa</h2>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-lg">{rifaData.detallesRifa}</p>
                </div>

                {/* Premios */}
                <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
                    <div className="flex items-center gap-3 mb-8">
                        <Trophy className="w-6 h-6 text-orange-500" />
                        <h2 className="text-2xl font-bold text-gray-900">Premios</h2>
                    </div>

                    {rifaData.premios.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {rifaData.premios.map((premio, index) => (
                                <div
                                    key={index}
                                    className="group bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105"
                                >
                                    <div className="relative mb-4 overflow-hidden rounded-lg">
                                        <Image
                                            src={premio.foto_url || "/placeholder.svg"}
                                            width={400}
                                            height={0}
                                            alt={`Imagen ${premio.titulo}`}
                                            className="w-full h-auto object-contain mx-auto group-hover:scale-110 transition-transform duration-300"
                                            priority
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
                    ) : (
                        <p className="text-center text-gray-500">No se encontraron premios para esta rifa.</p>
                    )}
                </div>
            </div>
        </div>
    )
}