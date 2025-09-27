"use client"
import RifaCard from "@/components/rifaCardDB"
import Button from "@/components/ui/button"
import Input from "@/components/ui/input"
import Select from "@/components/ui/select"
import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { User, Copy, Check, CreditCard, CheckCircle } from "lucide-react"
import { supabase } from "@/lib/supabase-client"

export default function UnificarVistas() {
    const router = useRouter()
    const params = useParams()
    const id_reserva = params.id_reserva
    const [activeTab, setActiveTab] = useState("datos")
    const [boletos_reservados_lista, setBoletosReservadosLista] = useState([])
    const [id_rifa, setIdRifa] = useState(null)
    const [loadingBoletos, setLoadingBoletos] = useState(true)
    const [precioRifa, setPrecioRifa] = useState(0);

    const [formDatos, setFormDatos] = useState({
        nombre: "",
        tipoCedula: "V-",
        cedula: "",
        tipoTlf: "0412",
        telefono: "",
        correo: "",
    })

    const [formPago, setFormPago] = useState({
        monto: 0.0,
        tipoCedula: "V",
        cedula: "",
        tipoTelefono: "58412",
        telefono: "",
        referencia: "",
        fecha: "",
    })

    const [modalConfirmPago, setModalConfirmPago] = useState(false)
    const [modalCompraExitosa, setModalCompraExitosa] = useState(false)
    const [erroresDatos, setErroresDatos] = useState({})
    const [erroresPago, setErroresPago] = useState({})
    const [copiedField, setCopiedField] = useState(null)
    const [feedback, setFeedback] = useState("")
    const [loadingConfirmar, setLoadingConfirmar] = useState(false)

    useEffect(() => {
        async function fetchBoletos() {
            setLoadingBoletos(true)
            if (id_reserva) {
                const { data, error } = await supabase
                    .from('Boletos')
                    .select('id, id_rifa, numero_boleto')
                    .eq('id_reserva', id_reserva)

                if (error) {
                    console.error("Error al obtener los boletos:", error)
                    setFeedback("No se pudieron cargar los boletos de la reserva.")
                    setLoadingBoletos(false)
                    return
                }

                if (data && data.length > 0) {
                    setBoletosReservadosLista(data)
                    setIdRifa(data[0].id_rifa)
                }
            }
            setLoadingBoletos(false)
        }
        fetchBoletos()
    }, [id_reserva])

    async function fetchRifa() {
        if (id_rifa === null || isNaN(Number(id_rifa))) {
            console.warn("id_rifa inválido:", id_rifa);
            return;
        }

        try {
            const { data, error } = await supabase
            .from('Rifas')
            .select('precio')
            .eq('id', id_rifa)
            .single();

            if (error) throw error;
            if (data) {
            setPrecioRifa(data.precio);
            }
        } catch (err) {
            console.error("Error al obtener el precio de los boletos:", err);
        }
    }

    
    useEffect(() => {
        if (id_rifa) {
            fetchRifa()
        }
    }, [id_rifa])

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

    const copiarTexto = async (texto, field) => {
        try {
            await navigator.clipboard.writeText(texto)
            setCopiedField(field)
            setTimeout(() => setCopiedField(null), 2000)
        } catch (err) {
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

    const isValidDatos = () => {
        return (
            formDatos.nombre.trim() !== "" &&
            /^\d{6,8}$/.test(formDatos.cedula) &&
            /^\d{7}$/.test(formDatos.telefono) &&
            /^[^@]+@[^@]+\.[a-z]{2,}$/.test(formDatos.correo)
        )
    }

    const validarDatos = () => {
        const nuevosErrores = {}
        if (!formDatos.nombre.trim()) nuevosErrores.nombre = "Nombre requerido"
        if (!/^\d{6,8}$/.test(formDatos.cedula)) nuevosErrores.cedula = "Cédula inválida (6-8 dígitos)"
        if (!/^\d{7}$/.test(formDatos.telefono)) nuevosErrores.telefono = "Teléfono inválido (7 dígitos)"
        if (!/^[^@]+@[^@]+\.[a-z]{2,}$/.test(formDatos.correo)) nuevosErrores.correo = "Correo inválido"
        setErroresDatos(nuevosErrores)
        return Object.keys(nuevosErrores).length === 0
    }

    const validarPago = () => {
        console.log(`Monto: ${formPago.monto}\nReferencia: ${formPago.referencia}\nCédula: ${formPago.tipoCedula}${formPago.cedula}\nN° teléfono: ${formPago.tipoTelefono}${formPago.telefono}\nFecha: ${formPago.fecha}`)
        const nuevosErrores = {}
        if (!formPago.referencia.trim()) {
            nuevosErrores.referencia = "Número de referencia requerido"
        } else if (!/^\d{6}$/.test(formPago.referencia)) {
            nuevosErrores.referencia = "Debe tener 6 dígitos"
        }
        if (!/^\d{7}$/.test(formPago.telefono)) {
            nuevosErrores.telefono = "Número telefónico inválido (7 dígitos)"
        }
        
        if (!/^\d{7,8}$/.test(formPago.cedula)) {
            nuevosErrores.cedula = "Formato de cédula incorrecto"
        }
        
        if (formPago.monto < 0 ) {
            nuevosErrores.cedula = "El monto no puede ser negativo"
        }
        
        setErroresPago(nuevosErrores)
        return Object.keys(nuevosErrores).length === 0
    }

    const handleDatosSubmit = (e) => {
        e.preventDefault()
        if (validarDatos()) {
            setActiveTab("pago")
        }
    }

    const generateEmailHtml = (boletos, totalBoletos) => {
        const listaBoletosHtml = boletos.map(boleto => `
            <div style="background-color: #FA5400; color: #fff; border-radius: 0.75rem; padding: 1rem; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1); transform: var(--tw-transform); transition-property: transform; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 0.2s;">
                <div style="text-align: center;">
                    <p style="font-size: 1.5rem; line-height: 2rem; font-weight: 700; color: #fff;">${boleto.numero_boleto}</p>
                </div>
            </div>
        `).join('')

        return `
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Tus Boletos de la Rifa</title>
            </head>
            <body style="font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'; background-color: #f9fafb; margin: 0; padding: 0;">
                <div style="min-height: 100vh; background-color: #f9fafb;">
                    <div style="padding-top: 5rem; padding-bottom: 3rem;">
                        <div style="max-width: 960px; margin-left: auto; margin-right: auto; padding-left: 1rem; padding-right: 1rem;">
                            <div style="background-color: #fff; border-radius: 0.75rem; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1); padding: 1.5rem;">
                                <div style="text-align: center; padding-top: 2rem;">
                                    <div style="margin-top: 1rem;">
                                        <h1 style="font-size: 1.875rem; line-height: 2.25rem; font-weight: 700; color: #111827;">¡Felicidades!</h1>
                                        <p style="color: #4b5563; font-size: 1.125rem; line-height: 1.75rem;">Estos son tus números de la suerte</p>
                                        <div style="background-color: #fff7ed; border: 1px solid #fed7aa; border-radius: 0.5rem; padding: 1rem;">
                                            <p style="color: #9a3412; font-weight: 500; font-size: 0.875rem; line-height: 1.25rem;">
                                                Total de boletos: <span style="font-weight: 700;">${boletos.length}</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; padding: 1rem; justify-content: center;">
                                        ${listaBoletosHtml}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
            </html>
        `;
    };

    const handlePagoSubmit = async (e) => {
        e.preventDefault()
        if (validarPago()) {
            setLoadingConfirmar(true)
            setFeedback("")

            if (!boletos_reservados_lista || boletos_reservados_lista.length === 0) {
                setFeedback("No se encontraron boletos para esta reserva.")
                setLoadingConfirmar(false)
                return
            }
            
            const boletosIds = boletos_reservados_lista.map(boleto => boleto.id)
            const boletosNumeros = boletos_reservados_lista.map(boleto => boleto.numero_boleto)

            const { error } = await supabase
                .from("Boletos")
                .update({
                    estado: "ocupado",
                    fecha_compra: new Date().toISOString(),
                    nombre_comprador: formDatos.nombre,
                    cedula_comprador: formDatos.tipoCedula + formDatos.cedula,
                    telefono_comprador: formDatos.tipoTlf + formDatos.telefono,
                    correo_comprador: formDatos.correo,
                    id_reserva : null,
                })
                .in("id", boletosIds)
                .eq("estado", "reservado");

            if (error) {
                console.error("Error al confirmar el pago:", error)
                setFeedback("Error al confirmar el pago. Por favor, intenta de nuevo.")
                setLoadingConfirmar(false)
                return
            }
/*
            // Genera el HTML para el correo
            const emailHtmlContent = generateEmailHtml(boletos_reservados_lista, boletos_reservados_lista.length);
            
            // Llama a tu propia ruta de API
            const res = await fetch('/api/enviar-correo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "to" : {
                        "address" : formDatos.correo,
                        "nombre" : formDatos.nombre
                    },
                    "html": emailHtmlContent,
                    "plain": boletosNumeros.join(', '), // Corregido 'pailn' a 'plain'
                }),
            });

            const result = await res.json();

            if (res.ok) {
                console.log("Correo enviado con éxito (a través de la API local):", result);
            } else {
                console.error("Error al enviar el correo (a través de la API local):", result.message);
            }
*/
            setModalCompraExitosa(true);
        }
    }

    const cedulaPM = "1234567"
    const bancoPM = "Banco Mercantil (0105)"
    const telefonoPM = "04121234567"
    const precioBoleto = boletos_reservados_lista.length > 0 ? precioRifa : 0
    const montoTotal = boletos_reservados_lista.length * precioBoleto

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="pt-20 pb-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pt-8">
                    {loadingBoletos ? (
                        <p>Cargando información de la reserva...</p>
                    ) : (
                        id_rifa && <RifaCard id_rifa={id_rifa} />
                    )}

                    <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
                        <div className="flex justify-around mb-6 border-b border-gray-200">
                            <button
                                onClick={() => setActiveTab("datos")}
                                className={`py-4 px-1 text-lg font-semibold transition-colors duration-300 ${activeTab === "datos" ? "text-orange-600 border-b-2 border-orange-600" : "text-gray-500 hover:text-orange-600"}`}
                            >
                                Ingresar Datos
                            </button>
                            <button
                                onClick={() => setActiveTab("pago")}
                                className={`py-4 px-1 text-lg font-semibold transition-colors duration-300 ${activeTab === "pago" ? "text-orange-600 border-b-2 border-orange-600" : "text-gray-500 hover:text-orange-600"}`}
                                disabled={!isValidDatos()}
                            >
                                Confirmar Pago
                            </button>
                        </div>

                        {activeTab === "datos" && (
                            <div className="space-y-6">
                                <div className="text-center mb-8">
                                    <User className="w-8 h-8 text-orange-500 mx-auto mb-4" />
                                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Indica tus datos</h1>
                                    <p className="text-gray-600">Completa la información para procesar tu compra</p>
                                </div>
                                <form onSubmit={handleDatosSubmit} className="space-y-6">
                                    <Input label="Nombre Completo *" value={formDatos.nombre} onChange={(e) => setFormDatos({ ...formDatos, nombre: e.target.value })} placeholder="Pedro Pérez" error={erroresDatos.nombre} />
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Cédula *</label>
                                        <div className="flex gap-3">
                                            <Select value={formDatos.tipoCedula} onChange={(e) => setFormDatos({ ...formDatos, tipoCedula: e.target.value })} className="w-24">
                                                <option value="V-">V</option>
                                                <option value="E-">E</option>
                                            </Select>
                                            <Input value={formDatos.cedula} onChange={(e) => setFormDatos({ ...formDatos, cedula: e.target.value })} placeholder="12345678" maxLength={8} error={erroresDatos.cedula} />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Número de teléfono *</label>
                                        <div className="flex gap-3">
                                            <Select value={formDatos.tipoTlf} onChange={(e) => setFormDatos({ ...formDatos, tipoTlf: e.target.value })} className="w-24">
                                                <option value="0412">0412</option>
                                                <option value="0422">0422</option>
                                                <option value="0414">0414</option>
                                                <option value="0424">0424</option>
                                                <option value="0416">0416</option>
                                                <option value="0426">0426</option>
                                            </Select>
                                            <Input value={formDatos.telefono} onChange={(e) => setFormDatos({ ...formDatos, telefono: e.target.value })} placeholder="1234567" maxLength={7} error={erroresDatos.telefono} />
                                        </div>
                                    </div>
                                    <Input label="Correo electrónico *" type="email" value={formDatos.correo} onChange={(e) => setFormDatos({ ...formDatos, correo: e.target.value })} placeholder="correo@ejemplo.com" error={erroresDatos.correo} />
                                    <div className="flex flex-col sm:flex-row gap-4 pt-6">
                                        <Button type="button" variant="outline" className="flex-1 bg-transparent" onClick={() => router.push("/comprar")}>
                                            Volver
                                        </Button>
                                        <Button type="submit" className="flex-1" onClick={() => {
                                            if (validarDatos()) setModalConfirmPago(true)
                                        }}>
                                            Continuar
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        )}

                        {activeTab === "pago" && (
                            <div className="space-y-6">
                                <div className="text-center mb-8">
                                    <CreditCard className="w-8 h-8 text-orange-500 mx-auto mb-4" />
                                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Datos del Pago Móvil</h1>
                                    <p className="text-gray-600">Ingresa los datos de tu transferencia para verificar el pago</p>
                                    <Button type="submit" className="flex-1 mt-5" onClick={() => {setModalConfirmPago(true)}}>
                                        Ver datos
                                    </Button>
                                </div>
                                <form onSubmit={handlePagoSubmit} className="space-y-6">
                                    <Input type="number" label="Monto" value={formPago.monto} onChange={(e) => setFormPago({ ...formPago, monto: e.target.value })} placeholder="10.0" error={erroresPago.monto} required/>
                                    
                                    <Input label="Número de referencia (Últimos 6 dígitos)*" value={formPago.referencia} onChange={(e) => setFormPago({ ...formPago, referencia: e.target.value })} placeholder="123456" error={erroresPago.referencia} maxLength={6} minLength={6} required/>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Cédula (Emisor)*</label>
                                        <div className="flex gap-3">
                                            <Select value={formPago.tipoCedula} onChange={(e) => setFormPago({ ...formPago, tipoCedula: e.target.value })} className="w-24" required>
                                                <option value="V">V</option>
                                                <option value="E">E</option>
                                            </Select>
                                            <Input value={formPago.cedula} onChange={(e) => setFormPago({ ...formPago, cedula: e.target.value })} placeholder="1234567" maxLength={8} minLength={7} error={erroresPago.telefono} required/>
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Número de teléfono (Emisor) *</label>
                                        <div className="flex gap-3">
                                            <Select value={formPago.tipoTelefono} onChange={(e) => setFormPago({ ...formPago, tipoTelefono: e.target.value })} className="w-24" required>
                                                <option value="58412">0412</option>
                                                <option value="58422">0422</option>
                                                <option value="58414">0414</option>
                                                <option value="58424">0424</option>
                                                <option value="58416">0416</option>
                                                <option value="58426">0426</option>
                                            </Select>
                                            <Input value={formPago.telefono} onChange={(e) => setFormPago({ ...formPago, telefono: e.target.value })} placeholder="1234567" maxLength={7} minLength={7} error={erroresPago.telefono} required/>
                                        </div>
                                    </div>
                                    
                                    <Input type="date" label="Fecha de Emisión*" value={formPago.fecha} onChange={(e) => setFormPago({ ...formPago, fecha: e.target.value })} placeholder="" error={erroresPago.referencia} required/>
                                    
                                    {feedback && <div className="text-red-500 text-center mt-2">{feedback}</div>}
                                    <div className="flex flex-col sm:flex-row gap-4 pt-6">
                                        <Button type="button" variant="outline" className="flex-1 bg-transparent" onClick={() => setActiveTab("datos")}>
                                            Volver
                                        </Button>
                                        <Button type="submit" className="flex-1" disabled={loadingConfirmar}>
                                            {loadingConfirmar ? "Verificando..." : "Verificar Pago"}
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal de pago móvil */}
            {modalConfirmPago && (
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
                                    { label: "Cédula", value: cedulaPM, field: "cedula" },
                                    { label: "Banco", value: bancoPM, field: "banco" },
                                    { label: "Teléfono", value: telefonoPM, field: "telefono" },
                                    { label: `Monto (${boletos_reservados_lista.length} boletos)`, value: `${montoTotal} bs`, field: "monto" },
                                ].map(({ label, value, field }) => (
                                    <div key={field} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                                        <div>
                                            <span className="text-sm font-medium text-gray-600">{label}:</span>
                                            <p className="font-bold text-gray-900">{value}</p>
                                        </div>
                                        <button type="button" onClick={() => copiarTexto(value.replace(" bs", ""), field)} className="p-2 hover:bg-gray-200 rounded-full transition-colors duration-200">
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
                                <Button variant="secondary" className="flex-1" onClick={() => setModalConfirmPago(false)}>
                                    Cancelar
                                </Button>
                                <Button
                                    variant="success"
                                    className="flex-1"
                                    onClick={() => {
                                        setModalConfirmPago(false)
                                        setActiveTab("pago")
                                    }}
                                >
                                    Continuar
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
            {/* Modal de confirmación final */}
            {modalCompraExitosa && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-transparent bg-opacity-50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
                        <div className="p-6 space-y-6 text-center">
                            <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">¡Pago Recibido Exitosamente!</h2>
                                <p className="text-gray-600">
                                    Has realizado correctamente la compra de tus boletos. A continuación se te mostrarán los números elegidos.
                                </p>
                            </div>
                            <div className="flex gap-3">
                                <Button
                                    variant="success"
                                    className="flex-1"
                                    onClick={() => {
                                        setModalCompraExitosa(false)
                                        router.push(`/boletos/${id_rifa}/${formDatos.tipoCedula + formDatos.cedula}`)
                                    }}
                                >
                                    Ver Boletos
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}