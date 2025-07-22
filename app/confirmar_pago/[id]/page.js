"use client";
import { NavBar } from "@/components/navbar";
import Footer from "@/components/footer";
import RifaCard from "@/components/rifaCard";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Select from "@/components/ui/select";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function Comprar() {
    const router = useRouter();
    const { id } = useParams();
    const cantidad = parseInt(id)

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
        banco: "0102 - Banco de Venezuela",
        tipoTlf: "0412",
        telefono: ""
    });

    const [modalConfirm, setModalConfirm] = useState(false);
    const [errores, setErrores] = useState({});

    const validar = () => {
        const nuevosErrores = {};

        // Número de referencia
        if (!form.referencia.trim()) {
            nuevosErrores.referencia = "Número de referencia requerido";
        } else if (!/^\d{6,12}$/.test(form.referencia)) {
            nuevosErrores.referencia = "Debe tener entre 6 y 12 dígitos";
        }

        // Teléfono
        if (!form.tipoTlf || !["0412", "0422", "0414", "0424", "0416", "0426"].includes(form.tipoTlf)) {
        nuevosErrores.tipoTlf = "Prefijo inválido";
        }
        if (!/^\d{7}$/.test(form.telefono)) {
        nuevosErrores.telefono = "Número telefónico inválido";
        }

        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validar()) {
            setModalConfirm(true);
        }
    };

    return (
        <div className="bg-white">
            <NavBar />
            <div className="my-30 mb-20">
                <RifaCard />
                <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center mt-8">
                    <div className="w-full text-center">
                        <h1 className="text-black font-bold text-2xl">Datos del Pagomovil</h1>
                        <div className="flex flex-col justify-center items-center gap-2 lg:gap-5 mt-5">
                            <div className="w-[90%] lg:w-[50%] flex flex-col items-center gap-5">
                                <div className="w-full mx-2 text-start gap-3">
                                    <label className="text-black ml-4">Número de referencia *</label>
                                    <Input
                                        value={form.referencia}
                                        onChange={e => setForm({ ...form, referencia: e.target.value })}
                                        placeholder="0123456789"
                                        className="text-black w-full mt-2"
                                    />
                                    {errores.referencia && <p className="text-red-500 ml-4 text-sm">{errores.referencia}</p>}
                                </div>
                                <div className="w-full mx-2 text-start">
                                    <label className="text-black ml-4">Banco Emisor *</label>
                                    <div className="flex flex-row w-full gap-3">
                                        <Select
                                        value={form.banco}
                                        onChange={e => setForm({ ...form, banco: e.target.value })}
                                        className="text-black w-full text-left border border-orange focus:outline-none mt-2"
                                        >
                                        {bancos.map(banco => (
                                            <option key={banco.codigo} value={banco.codigo}>
                                            {banco.codigo} - {banco.nombre}
                                            </option>
                                        ))}
                                        </Select>
                                    </div>
                                    {errores.banco && <p className="text-red-500 ml-4 text-sm">{errores.banco}</p>}
                                </div>
                                <div className="w-full mx-2 text-start">
                                    <label className="text-black ml-4">Número de teléfono (Emisor)*</label>
                                    <div className="flex flex-row w-full gap-3 mt-2">
                                        <Select
                                        value={form.tipoTlf}
                                        onChange={e => setForm({ ...form, tipoTlf: e.target.value })}
                                        className="text-black w-[30%] text-center border border-orange focus:outline-none"
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
                                        onChange={e => setForm({ ...form, telefono: e.target.value })}
                                        placeholder="1234567"
                                        className="text-black w-[70%]"
                                        />
                                    </div>
                                    {errores.telefono && <p className="text-red-500 ml-4 text-sm">{errores.telefono}</p>}
                                </div>
                            </div>
                            <div className="mt-5 w-[90%] lg:w-[50%] flex flex-row justify-center items-center gap-2 lg:gap-5">
                                <Button
                                className="text-black border border-orange w-[50%]"
                                type="button"
                                onClick={() => router.push(`/datos_usuario/${cantidad}`)}
                                >
                                Volver
                                </Button>
                                <Button
                                className="text-white bg-orange border border-orange w-[50%]"
                                type="submit"
                                >
                                Continuar
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            {modalConfirm && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-transparent bg-opacity-30 backdrop-blur-sm">
                    <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm lg:max-w-md w-full">
                        <p className="text-black text-center text-2xl font-bold mb-3">Pago Recibido Exitosamente</p>
                        <p className="text-black text-center text-md font-medium mb-3">Haz realizado correctamente la compra de tus boletos, a continuación se te indicarán cuales son los números elegidos</p>
                        <div className="flex justify-center gap-3 mt-5">
                            <Button className="w-[50%] bg-green-500 hover:bg-green-600 hover:text-white" 
                            onClick={() => {setModalConfirm(false);
                                            router.push(`/boletos/${cantidad}`);
                            }}>
                                Continuar
                            </Button>
                            <Button className="w-[50%] bg-gray-400 hover:bg-gray-500 hover:text-white" onClick={() => setModalConfirm(false)}>
                                Cancelar
                            </Button>
                        </div>
                    </div>
                </div>
            )}
            <Footer />
        </div>
    );
}