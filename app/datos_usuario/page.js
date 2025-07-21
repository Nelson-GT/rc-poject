"use client";
import { NavBar } from "@/components/navbar";
import Footer from "@/components/footer";
import RifaCard from "@/components/rifaCard";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Select from "@/components/ui/select";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Comprar() {
    const router = useRouter();
    const cedula = "1234567";
    const banco = "Banco Mercantil (0105)";
    const telefono = "04121234567";
    const cantidad = 2;
    const precio = 180;
    
    const [form, setForm] = useState({
        nombre: "",
        tipoCedula: "V-",
        cedula: "",
        tipoTlf: "0412",
        telefono: "",
        correo: "",
    });

    const [modalConfirm, setModalConfirm] = useState(false);
    const [errores, setErrores] = useState({});

    const validar = () => {
        const nuevosErrores = {};
        if (!form.nombre.trim()) nuevosErrores.nombre = "Nombre requerido";
        if (!/^\d{6,8}$/.test(form.cedula)) nuevosErrores.cedula = "Cédula inválida";
        if (!/^\d{7}$/.test(form.telefono)) nuevosErrores.telefono = "Teléfono inválido";
        if (!/^[^@]+@[^@]+\.[a-z]{2,}$/.test(form.correo)) nuevosErrores.correo = "Correo inválido";

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
                    <h1 className="text-black font-bold text-2xl">Indica tus datos</h1>
                    <div className="flex flex-col justify-center items-center gap-2 lg:gap-5 mt-5">
                        <div className="w-[90%] lg:w-[50%] flex flex-col items-center gap-2 lg:gap-5">
                            {/* Nombre */}
                            <div className="w-full mx-2 text-start">
                            <label className="text-black ml-4">Nombre Completo *</label>
                            <Input
                                value={form.nombre}
                                onChange={e => setForm({ ...form, nombre: e.target.value })}
                                placeholder="Pedro Perez"
                                className="text-black w-full"
                            />
                            {errores.nombre && <p className="text-red-500 ml-4 text-sm">{errores.nombre}</p>}
                            </div>

                            {/* Cédula */}
                            <div className="w-full mx-2 text-start">
                            <label className="text-black ml-4">Cédula *</label>
                            <div className="flex flex-row w-full gap-3">
                                <Select
                                value={form.tipoCedula}
                                onChange={e => setForm({ ...form, tipoCedula: e.target.value })}
                                className="text-black w-[30%] text-center border border-orange focus:outline-none"
                                >
                                <option value="V-">V</option>
                                <option value="E-">E</option>
                                <option value="J-">J</option>
                                </Select>
                                <Input
                                value={form.cedula}
                                onChange={e => setForm({ ...form, cedula: e.target.value })}
                                placeholder="12345678"
                                className="text-black w-[70%]"
                                maxlenght={8}
                                minlenght={6}
                                />
                            </div>
                            {errores.cedula && <p className="text-red-500 ml-4 text-sm">{errores.cedula}</p>}
                            </div>

                            {/* Teléfono */}
                            <div className="w-full mx-2 text-start">
                            <label className="text-black ml-4">Número de teléfono *</label>
                            <div className="flex flex-row w-full gap-3">
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
                                placeholder="12345678"
                                className="text-black w-[70%]"
                                />
                            </div>
                            {errores.telefono && <p className="text-red-500 ml-4 text-sm">{errores.telefono}</p>}
                            </div>

                            {/* Correo */}
                            <div className="w-full mx-2 text-start">
                            <label className="text-black ml-4">Correo *:</label>
                            <Input
                                value={form.correo}
                                onChange={e => setForm({ ...form, correo: e.target.value })}
                                placeholder="correo@ejemplo.com"
                                className="text-black w-full"
                            />
                            {errores.correo && <p className="text-red-500 ml-4 text-sm">{errores.correo}</p>}
                            </div>
                        </div>
                        {/* Botones */}
                        <div className="mt-5 w-[90%] lg:w-[50%] flex flex-row justify-center items-center gap-2 lg:gap-5">
                            <Button className="text-black border border-orange w-[50%]" type="button" onClick={() => router.push("/comprar")}>
                            Volver
                            </Button>
                            <Button className="text-white bg-orange border border-orange w-[50%]" type="submit">
                            Continuar
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </div>

        {modalConfirm && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-transparent bg-opacity-30 backdrop-blur-sm">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full">
                <p className="text-black text-center text-2xl font-bold mb-3">Realiza el Pago Móvil</p>
                <div className="flex flex-col gap-3">
                    <p className="text-black text-center text-md font-medium mb-3">Para confirmar la comprar de tus tickets, por favor realiza un pagomovil a los siguientes datos</p>
                    <div className="flex justify-between border border-orange rounded-lg p-3">
                        <span className="text-black">Cédula:</span>
                        <span className="text-black font-bold">{cedula}</span>
                    </div>
                    <div className="flex justify-between border border-orange rounded-lg p-3">
                        <span className="text-black">Banco:</span>
                        <span className="text-black font-bold">{banco}</span>
                    </div>
                    <div className="flex justify-between border border-orange rounded-lg p-3">
                        <span className="text-black">Número de teléfono:</span>
                        <span className="text-black font-bold">{telefono}</span>
                    </div>
                    <div className="flex justify-between border border-orange rounded-lg p-3">
                        <span className="text-black">Monto ({cantidad} tickets):</span>
                        <span className="text-black font-bold">{cantidad * precio} bs</span>
                    </div>
                </div>
                <div className="flex justify-center gap-3 mt-5">
                <Button className="w-[50%] bg-green-500 hover:bg-green-600 hover:text-white" onClick={() => setModalConfirm(false)}>
                    Aceptar
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