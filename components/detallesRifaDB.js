"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Calendar, Trophy, User, Ticket, TicketCheck } from "lucide-react"
import Button from "@/components/ui/button"
import RifaCard from "@/components/rifaCardDB"
import Input from "@/components/ui/input" // Importa Input
import Select from "@/components/ui/select" // Importa Select
import { supabase } from "@/lib/supabase-client"

async function liberarBoletosExpirados(id_rifa) {
    const { data, error } = await supabase
        .from("Boletos")
        .select("id, fecha_compra")
        .eq("id_rifa", id_rifa)
        .eq("estado", "reservado");
    if (error) return;
    const ahora = new Date();
    for (const boleto of data) {
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
    const router = useRouter();

    // Mueve los Hooks al principio del componente
    const [rifaData, setRifaData] = useState({ detallesRifa: "", premios: [] });
    const [loading, setLoading] = useState(true); // Cambiado a true para mostrar el estado de carga inicial
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formCedula, setFormCedula] = useState({
        tipoCedula: "V-",
        cedula: "",
    });
    const [errorModal, setErrorModal] = useState("");

    // useEffect para obtener los datos de la rifa
    useEffect(() => {
        async function fetchRifaData() {
            try {
                const { data: rifa, error: rifaError } = await supabase
                    .from('Rifas')
                    .select('detalles')
                    .eq('id', id_rifa)
                    .single();

                if (rifaError) {
                    throw rifaError;
                }

                const { data: premios, error: premiosError } = await supabase
                    .from('Premios')
                    .select('titulo, descripcion, foto_url')
                    .eq('id_rifa', id_rifa);

                if (premiosError) {
                    throw premiosError;
                }
                
                setRifaData({
                    detallesRifa: rifa.detalles,
                    premios: premios || []
                });

            } catch (err) {
                console.error("Error al obtener los datos de la rifa y premios:", err);
                setError("No se pudo cargar la información de los detalles y premios.");
            } finally {
                setLoading(false);
            }
        }

        if (id_rifa) {
            fetchRifaData();
        }
    }, [id_rifa]);

    // useEffect para el intervalo de liberación de boletos
    useEffect(() => {
        const interval = setInterval(() => {
            liberarBoletosExpirados(id_rifa);
        }, 2 * 60 * 1000);
        return () => clearInterval(interval);
    }, [id_rifa]);

    const getEmojiForPrize = (index) => {
        switch (index) {
            case 0: return "🥇";
            case 1: return "🥈";
            case 2: return "🥉";
            default: return "🎁";
        }
    };

    const validarCedula = () => {
        if (!/^\d{6,8}$/.test(formCedula.cedula)) {
            setErrorModal("Cédula inválida (6-8 dígitos)"); // Usar el estado de error del modal
            return false;
        }
        setErrorModal("");
        return true;
    };

    const handleConsultar = () => {
        if (validarCedula()) {
            router.push(`/boletos/${id}/${formCedula.tipoCedula}${formCedula.cedula}`);
            setIsModalOpen(false);
        }
    };

    // Renderizado condicional
    if (loading) {
        return <p>Cargando detalles de la rifa y premios...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    if (!rifaData.detallesRifa && rifaData.premios.length === 0) {
        return <p>No se encontraron datos para la rifa especificada.</p>;
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-20 pb-12 rounded-xl">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                {/* Tarjeta principal de la rifa */}
                <RifaCard id_rifa={id_rifa} isFull={isFull}>
                    <Button size="lg" className="w-full sm:w-auto" onClick={() => {router.push(`/comprar/${id}`);}}>
                        <div className="flex items-center justify-between gap-3">
                            <Ticket className="w-7 h-7 text-white-500"/>
                            <p className="text-lg">Comprar Boletos</p>
                        </div>
                    </Button>
                </RifaCard>

                {/* Consultar boletos comprados en la rifa */}
                <div className="flex w-full justify-center">
                        <Button type="button" variant="outline" onClick={() => setIsModalOpen(true)}>
                            <div className="flex items-center justify-between gap-3">
                                <TicketCheck className="w-7 h-7 text-white-500"/>
                                <p className="text-lg">Consultar Boletos</p>
                            </div>
                        </Button>
                </div>

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
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-transparent bg-opacity-50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
                        <div className="p-6 space-y-6">
                            <div className="text-center">
                                <User className="w-8 h-8 text-orange-500 mx-auto mb-4" />
                                <h2 className="text-2xl font-bold text-gray-900">Consultar Boletos</h2>
                                <p className="text-gray-600">Ingresa tu cédula para ver tus boletos.</p>
                            </div>
                            <div className="space-y-4">
                                <label className="block text-sm font-medium text-gray-700">Cédula *</label>
                                <div className="flex gap-3">
                                    <Select
                                        value={formCedula.tipoCedula}
                                        onChange={(e) => setFormCedula({ ...formCedula, tipoCedula: e.target.value })}
                                        className="w-24"
                                    >
                                        <option value="V-">V</option>
                                        <option value="E-">E</option>
                                    </Select>
                                    <Input
                                        value={formCedula.cedula}
                                        onChange={(e) => setFormCedula({ ...formCedula, cedula: e.target.value })}
                                        placeholder="12345678"
                                        maxLength={8}
                                        error={errorModal}
                                    />
                                </div>
                                {errorModal && <p className="text-red-500 text-sm mt-2">{errorModal}</p>}
                            </div>
                            <div className="flex gap-3">
                                <Button
                                    variant="outline"
                                    className="flex-1 bg-transparent"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    className="flex-1"
                                    onClick={handleConsultar}
                                >
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