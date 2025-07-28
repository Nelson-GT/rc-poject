"use client"
import { NavBar } from "@/components/navbar"
import Footer from "@/components/footer"
import RifaCard from "@/components/rifaCard"
import Button from "@/components/ui/button"
import Input from "@/components/ui/input"
import Select from "@/components/ui/select"
import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { User, Copy, Check } from "lucide-react"

export default function DatosUsuario() {
    const router = useRouter()
    const { id } = useParams()
    const cantidad = Number.parseInt(id)
    const precio = 180

    const cedula = "1234567"
    const banco = "Banco Mercantil (0105)"
    const telefono = "04121234567"

    const [form, setForm] = useState({
        nombre: "",
        tipoCedula: "V-",
        cedula: "",
        tipoTlf: "0412",
        telefono: "",
        correo: "",
    })

    const [modalConfirm, setModalConfirm] = useState(false)
    const [errores, setErrores] = useState({})
    const [copiedField, setCopiedField] = useState(null)

    const copiarTexto = async (texto, field) => {
        try {
        await navigator.clipboard.writeText(texto)
        setCopiedField(field)
        setTimeout(() => setCopiedField(null), 2000)
        } catch (err) {
        // Fallback para navegadores que no soportan clipboard API
        const textarea = document.createElement("textarea")
        textarea.value = texto
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand("copy")
        document.body.removeChild(textarea)
        setCopiedField(field)
        setTimeout(() => setCopiedField(null), 2000)
        }
    }

    const validar = () => {
        const nuevosErrores = {}
        if (!form.nombre.trim()) nuevosErrores.nombre = "Nombre requerido"
        if (!/^\d{6,8}$/.test(form.cedula)) nuevosErrores.cedula = "Cédula inválida (6-8 dígitos)"
        if (!/^\d{7}$/.test(form.telefono)) nuevosErrores.telefono = "Teléfono inválido (7 dígitos)"
        if (!/^[^@]+@[^@]+\.[a-z]{2,}$/.test(form.correo)) nuevosErrores.correo = "Correo inválido"

        setErrores(nuevosErrores)
        return Object.keys(nuevosErrores).length === 0
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (validar()) {
        setModalConfirm(true)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
        <NavBar />

        <div className="pt-20 pb-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pt-8">
            <RifaCard />

            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
                <div className="text-center mb-8">
                <User className="w-8 h-8 text-orange-500 mx-auto mb-4" />
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Indica tus datos</h1>
                <p className="text-gray-600">Completa la información para procesar tu compra</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                    <Input
                    label="Nombre Completo *"
                    value={form.nombre}
                    onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                    placeholder="Pedro Pérez"
                    error={errores.nombre}
                    />

                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cédula *</label>
                    <div className="flex gap-3">
                        <Select
                        value={form.tipoCedula}
                        onChange={(e) => setForm({ ...form, tipoCedula: e.target.value })}
                        className="w-24"
                        >
                        <option value="V-">V</option>
                        <option value="E-">E</option>
                        </Select>
                        <Input
                        value={form.cedula}
                        onChange={(e) => setForm({ ...form, cedula: e.target.value })}
                        placeholder="12345678"
                        maxLength={8}
                        error={errores.cedula}
                        />
                    </div>
                    </div>

                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Número de teléfono *</label>
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

                    <Input
                    label="Correo electrónico *"
                    type="email"
                    value={form.correo}
                    onChange={(e) => setForm({ ...form, correo: e.target.value })}
                    placeholder="correo@ejemplo.com"
                    error={errores.correo}
                    />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                    <Button
                    type="button"
                    variant="outline"
                    className="flex-1 bg-transparent"
                    onClick={() => router.push("/comprar")}
                    >
                    Volver
                    </Button>
                    <Button type="submit" className="flex-1">
                    Continuar
                    </Button>
                </div>
                </form>
            </div>
            </div>
        </div>

        {/* Modal de pago móvil */}
        {modalConfirm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-transparent bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6 space-y-6">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Realiza el Pago Móvil</h2>
                    <p className="text-gray-600">
                    Para confirmar la compra de tus tickets, realiza un pago móvil con los siguientes datos
                    </p>
                </div>

                <div className="space-y-3">
                    {[
                    { label: "Cédula", value: cedula, field: "cedula" },
                    { label: "Banco", value: banco, field: "banco" },
                    { label: "Teléfono", value: telefono, field: "telefono" },
                    { label: `Monto (${cantidad} tickets)`, value: `${cantidad * precio} bs`, field: "monto" },
                    ].map(({ label, value, field }) => (
                    <div key={field} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                        <div>
                        <span className="text-sm font-medium text-gray-600">{label}:</span>
                        <p className="font-bold text-gray-900">{value}</p>
                        </div>
                        <button
                        type="button"
                        onClick={() => copiarTexto(value.replace(" bs", ""), field)}
                        className="p-2 hover:bg-gray-200 rounded-full transition-colors duration-200"
                        >
                        {copiedField === field ? (
                            <Check className="w-4 h-4 text-green-500" />
                        ) : (
                            <Copy className="w-4 h-4 text-gray-500" />
                        )}
                        </button>
                    </div>
                    ))}
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
                        router.push(`/confirmar_pago/${cantidad}`)
                    }}
                    >
                    Continuar
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
