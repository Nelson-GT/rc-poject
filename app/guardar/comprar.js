"use client"
import { NavBar } from "@/components/navbar"
import Footer from "@/components/footer"
import RifaCard from "@/components/rifaCard"
import Button from "@/components/ui/button"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Minus, Plus, ShoppingCart } from "lucide-react"

export default function Comprar() {
    const router = useRouter()
    const [cantidad, setCantidad] = useState(1)
    const [modalConfirm, setModalConfirm] = useState(false)
    const precio = 180

    const cantidadesPredefinidas = [1, 2, 5, 10, 20, 50]

    return (
        <div className="min-h-screen bg-gray-50">
        <NavBar />

        <div className="pt-20 pb-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pt-8">
                <RifaCard />

                <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
                    <div className="text-center space-y-8">
                        <div className="space-y-2">
                            <ShoppingCart className="w-8 h-8 text-orange-500 mx-auto" />
                            <h1 className="text-3xl font-bold text-gray-900">Adquiere tus tickets aquí</h1>
                            <p className="text-gray-600">Selecciona la cantidad de boletos que deseas comprar</p>
                        </div>

                    {/* Cantidades predefinidas */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-700">Cantidades populares</h3>
                        <div className="grid grid-cols-3 gap-3 sm:gap-4">
                        {cantidadesPredefinidas.map((num) => (
                            <Button
                            key={num}
                            variant={cantidad === num ? "default" : "outline"}
                            className="h-12 text-lg font-bold"
                            onClick={() => setCantidad(num)}
                            >
                            {num}
                            </Button>
                        ))}
                        </div>
                    </div>

                    {/* Selector personalizado */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-700">Cantidad personalizada</h3>
                        <div className="flex items-center justify-center gap-4">
                            <Button
                                variant="outline"
                                size="lg"
                                onClick={() => cantidad > 1 && setCantidad(cantidad - 1)}
                                disabled={cantidad <= 1}
                                className="w-12 h-12 p-0 font-bold text-xl"
                            >
                                -
                            </Button>

                            <div className="bg-gray-50 border-2 border-gray-200 rounded-lg px-6 py-3 min-w-[100px]">
                                <span className="text-2xl font-bold text-gray-900">{cantidad}</span>
                            </div>

                            <Button
                                variant="outline"
                                size="lg"
                                onClick={() => cantidad < 100 && setCantidad(cantidad + 1)}
                                disabled={cantidad >= 100}
                                className="w-12 h-12 p-0 font-bold text-xl"
                            >
                                +
                            </Button>
                        </div>
                    </div>

                    {/* Resumen y botón de compra */}
                        <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 space-y-4">
                            <div className="flex justify-between items-center text-lg">
                                <span className="font-medium text-gray-700">Total:</span>
                                <span className="font-bold text-2xl text-orange-600">Bs {(cantidad * precio).toLocaleString()}</span>
                            </div>

                            <Button size="lg" className="w-full sm:w-auto px-8" onClick={() => setModalConfirm(true)}>
                                Continuar con {cantidad} ticket{cantidad !== 1 ? "s" : ""}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Modal de confirmación */}
        {modalConfirm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-tansparent bg-opacity-50 backdrop-blur-sm">
                <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
                    <div className="p-6 space-y-6">
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Confirmación de monto</h2>
                            <p className="text-gray-600">Por favor verifica el monto antes de continuar</p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center py-3 px-3 border-b border-gray-200">
                                <span className="font-medium text-gray-700">Precio unitario:</span>
                                <span className="text-black font-bold text-lg">Bs {precio}</span>
                            </div>
                            <div className="flex justify-between items-center py-3 px-3 border-b border-gray-200">
                                <span className="font-medium text-gray-700">Cantidad de tickets:</span>
                                <span className="text-black font-bold text-lg">{cantidad}</span>
                            </div>
                            <div className="flex justify-between items-center py-3 bg-orange-50 rounded-lg px-4">
                                <span className="font-bold text-lg text-gray-900">Total:</span>
                                <span className="font-bold text-2xl text-orange-600">Bs {(cantidad * precio).toLocaleString()}</span>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <Button variant="secondary" className="flex-1" onClick={() => setModalConfirm(false)}>
                                Cancelar
                            </Button>
                            <Button
                            variant="success"
                            className="flex-1"
                            onClick={() => {
                                setModalConfirm(false)
                                router.push(`/datos_usuario/${cantidad}`)
                            }}
                            >
                            Aceptar
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        )}

        <Footer />
        </div>
    )
}
