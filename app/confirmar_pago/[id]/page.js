"use client"
import { NavBar } from "@/components/navbar"
import Footer from "@/components/footer"
import RifaCard from "@/components/rifaCard"
import Button from "@/components/ui/button"
import Input from "@/components/ui/input"
import Select from "@/components/ui/select"
import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { CreditCard, CheckCircle } from "lucide-react"
import { createClient } from "@supabase/supabase-js"
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function ConfirmarPago() {
    const router = useRouter()
    const { id } = useParams()
    const cantidad = Number.parseInt(id)

    const bancos = [
        { codigo: "0102", nombre: "BANCO DE VENEZUELA" },
        { codigo: "0156", nombre: "100% BANCO" },
        { codigo: "0172", nombre: "BANCAMIGA BANCO UNIVERSAL, C.A." },
        { codigo: "0114", nombre: "BANCARIBE" },
        { codigo: "0171", nombre: "BANCO ACTIVO" },
        { codigo: "0128", nombre: "BANCO CARONÍ" },
        { codigo: "0163", nombre: "BANCO DEL TESORO" },
        { codigo: "0175", nombre: "BANCO DIGITAL DE LOS TRABAJADORES, BANCO UNIVERSAL" },
        { codigo: "0115", nombre: "BANCO EXTERIOR" },
        { codigo: "0151", nombre: "BANCO FONDO COMÚN" },
        { codigo: "0105", nombre: "BANCO MERCANTIL" },
        { codigo: "0191", nombre: "BANCO NACIONAL DE CREDITO" },
        { codigo: "0138", nombre: "BANCO PLAZA" },
        { codigo: "0137", nombre: "BANCO SOFITASA" },
        { codigo: "0104", nombre: "BANCO VENEZOLANO DE CREDITO" },
        { codigo: "0168", nombre: "BANCRECER" },
        { codigo: "0134", nombre: "BANESCO" },
        { codigo: "0177", nombre: "BANFANB" },
        { codigo: "0146", nombre: "BANGENTE" },
        { codigo: "0174", nombre: "BANPLUS" },
        { codigo: "0108", nombre: "BBVA PROVINCIAL" },
        { codigo: "0157", nombre: "DELSUR BANCO UNIVERSAL" },
        { codigo: "0601", nombre: "INSTITUTO MUNICIPAL DE CREDITO POPULAR" },
        { codigo: "0178", nombre: "N58 BANCO DIGITAL BANCO MICROFINANCIERO S A" },
        { codigo: "0169", nombre: "R4 BANCO MICROFINANCIERO C.A." }
    ];


    const [form, setForm] = useState({
        referencia: "",
        banco: "0102",
        tipoTlf: "0412",
        telefono: "",
    })

    const [modalConfirm, setModalConfirm] = useState(false)
    const [errores, setErrores] = useState({})
    const [feedback, setFeedback] = useState("");
    const [loading, setLoading] = useState(false);

    const validar = () => {
        const nuevosErrores = {}

        if (!form.referencia.trim()) {
        nuevosErrores.referencia = "Número de referencia requerido"
        } else if (!/^\d{6,12}$/.test(form.referencia)) {
        nuevosErrores.referencia = "Debe tener entre 6 y 12 dígitos"
        }

        if (!/^\d{7}$/.test(form.telefono)) {
        nuevosErrores.telefono = "Número telefónico inválido (7 dígitos)"
        }

        setErrores(nuevosErrores)
        return Object.keys(nuevosErrores).length === 0
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        if (validar()) {
        setModalConfirm(true)
        }
    }

    async function confirmarCompra() {
        setLoading(true);
        setFeedback("");
        // Obtener los IDs de los boletos reservados
        let ids = [];
        if (typeof window !== "undefined") {
            const idsStr = localStorage.getItem("boletos_reservados");
            if (idsStr) ids = JSON.parse(idsStr);
        }
        if (!ids.length) {
            setFeedback("No se encontraron boletos reservados para confirmar.");
            setLoading(false);
            return;
        }
        // Actualizar los boletos a estado 'ocupado' y guardar datos de pago
        const datosUsuarioStr = localStorage.getItem("datos_usuario")
            let datosUsuario = {}
                if (datosUsuarioStr) {
                    datosUsuario = JSON.parse(datosUsuarioStr)
                }
        console.log("Datos del usuario:", datosUsuario);
        const { error } = await supabase
            .from("Boletos")
            .update({
                estado: "ocupado",
                fecha_compra: new Date().toISOString(),
                telefono_comprador: datosUsuario.tipoTlf + datosUsuario.telefono,
                nombre_comprador: datosUsuario.nombre,
                correo_comprador: datosUsuario.correo
            })
            .in("id", ids)
            .eq("estado", "reservado");
        if (error) {
            setFeedback("Error al confirmar el pago. Intenta de nuevo.");
            setLoading(false);
            return;
        }
        // Limpiar los IDs de localStorage
        if (typeof window !== "undefined") {
            localStorage.removeItem("boletos_reservados");
        }
        localStorage.removeItem("datos_usuario");
        setFeedback("");
        setLoading(false);
        setModalConfirm(true);
    }

    return (
        <div className="min-h-screen bg-gray-50">
        <NavBar />

        <div className="pt-20 pb-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pt-8">
            <RifaCard/>

            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
                <div className="text-center mb-8">
                <CreditCard className="w-8 h-8 text-orange-500 mx-auto mb-4" />
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Datos del Pago Móvil</h1>
                <p className="text-gray-600">Ingresa los datos de tu transferencia para verificar el pago</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                    <Input
                    label="Número de referencia *"
                    value={form.referencia}
                    onChange={(e) => setForm({ ...form, referencia: e.target.value })}
                    placeholder="0123456789"
                    error={errores.referencia}
                    />

                    <Select
                    label="Banco Emisor *"
                    value={form.banco}
                    onChange={(e) => setForm({ ...form, banco: e.target.value })}
                    error={errores.banco}
                    >
                    {bancos.map((banco) => (
                        <option key={banco.codigo} value={banco.codigo}>
                        {banco.codigo} - {banco.nombre}
                        </option>
                    ))}
                    </Select>

                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Número de teléfono (Emisor) *</label>
                    <div className="flex gap-3">
                        <Select
                        value={form.tipoTlf}
                        onChange={(e) => setForm({ ...form, tipoTlf: e.target.value })}
                        className="w-24"
                        >
                        <option value="0412">0412</option>
                        <option value="0422">0422</option>
                        <option value="0414">0414</option>
                        <option value="0424">0424</option>
                        <option value="0416">0416</option>
                        <option value="0426">0426</option>
                        </Select>
                        <Input
                        value={form.telefono}
                        onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                        placeholder="1234567"
                        maxLength={7}
                        error={errores.telefono}
                        />
                    </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                    <Button
                    type="button"
                    variant="outline"
                    className="flex-1 bg-transparent"
                    onClick={() => router.push(`/datos_usuario/${cantidad}`)}
                    >
                    Volver
                    </Button>
                    <Button type="submit" className="flex-1" onClick={confirmarCompra} disabled={loading}>
        {loading ? "Verificando..." : "Verificar Pago"}
    </Button>
                </div>
                {feedback && <div className="text-red-500 text-center mt-2">{feedback}</div>}
                </form>
            </div>
            </div>
        </div>

        {/* Modal de confirmación */}
        {modalConfirm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-transparent bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
                <div className="p-6 space-y-6 text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />

                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">¡Pago Recibido Exitosamente!</h2>
                    <p className="text-gray-600">
                    Has realizado correctamente la compra de tus boletos. A continuación se te mostrarán los números
                    elegidos.
                    </p>
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
                        router.push(`/boletos/${cantidad}`)
                    }}
                    >
                    Ver Boletos
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
