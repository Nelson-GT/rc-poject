"use client"
import {NavBar} from "@/components/navbar"
import Footer from "@/components/footer"
import RifaCard from "@/components/rifaCard";
import Button from "@/components/ui/button"
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Comprar() {
    const [cantidad, setcantidad] = useState(1);
    const [modalConfirm, setmodalConfirm] = useState(false);

    const precio = 180;

    return (
        <div className="bg-white">
            {/* Navbar, se quedará siempre en el top */}
            <NavBar />
            <div className="my-30 mb-20">
                {/* Información crucial de la rifa, solo nombre, imagen, fecha y precio */}
                <RifaCard>
                </RifaCard>
                <div className="flex flex-col justify-center items-center mt-8">
                    <div className="w-full text-center">
                        <h1><span className="text-black font-bold text-2xl">Adquiere tus tickets aquí</span></h1>
                        <div className="flex flex-col justify-center items-center gap-2 lg:gap-5 mt-5">
                            <div className="w-full flex flex-row justify-center items-center gap-2 lg:gap-5">
                                <Button className={`w-[30%] lg:w-[20%] border border-orange ${cantidad === 1 ? "bg-orange text-white" : "bg-white text-black"}`}
                                        onClick = {() => {setcantidad(1)}}>
                                    <p><span className="font-bold text-lg">1</span></p>
                                </Button>
                                <Button className={`w-[30%] lg:w-[20%] border border-orange ${cantidad === 2 ? "bg-orange text-white" : "bg-white text-black"}`}
                                        onClick = {() => {setcantidad(2)}}>
                                    <p><span className="font-bold text-lg">2</span></p>
                                </Button>
                                <Button className={`w-[30%] lg:w-[20%] border border-orange ${cantidad === 5 ? "bg-orange text-white" : "bg-white text-black"}`}
                                        onClick = {() => {setcantidad(5)}}>
                                    <p><span className="font-bold text-lg">5</span></p>
                                </Button>
                            </div>
                            <div className="w-full flex flex-row justify-center items-center gap-2 lg:gap-5">
                                <Button className={`w-[30%] lg:w-[20%] border border-orange ${cantidad === 10 ? "bg-orange text-white" : "bg-white text-black"}`}
                                        onClick = {() => {setcantidad(10)}}>
                                    <p><span className="font-bold text-lg">10</span></p>
                                </Button>
                                <Button className={`w-[30%] lg:w-[20%] border border-orange ${cantidad === 20 ? "bg-orange text-white" : "bg-white text-black"}`}
                                        onClick = {() => {setcantidad(20)}}>
                                    <p><span className="font-bold text-lg">20</span></p>
                                </Button>
                                <Button className={`w-[30%] lg:w-[20%] border border-orange ${cantidad === 50 ? "bg-orange text-white" : "bg-white text-black"}`}
                                        onClick = {() => {setcantidad(50)}}>
                                    <p><span className="font-bold text-lg">50</span></p>
                                </Button>
                            </div>
                            <div className="w-full flex flex-col lg:flex-row lg:flex-row justify-center items-center gap-2 lg:gap-5 mt-5">
                                <div className="w-[50%] lg:w-[15%] flex flex-row border border-orange rounded-xl justify-between items-center">
                                    <Button className="text-white font-bold text-xl bg-orange"
                                            onClick = {() => {if (cantidad > 1) {
                                                setcantidad(cantidad - 1)
                                            }}}>
                                        ↓
                                    </Button>
                                    <p><span className="text-black font-bold text-xl">{cantidad}</span></p>
                                    <Button className="text-white font-bold text-xl bg-orange"
                                            onClick = {() => {if (cantidad < 100) {
                                                        setcantidad(cantidad + 1)
                                                    }}}>
                                        ↑
                                    </Button>
                                </div>
                                <div className="w-[50%] lg:w-[10%]">
                                    <Button className="w-full bg-orange"
                                        onClick={() => {setmodalConfirm(true)}}>
                                        <p><span className="text-bold text-white">Continuar con:<br></br> {cantidad} ticket(s)</span></p>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* modal de confirmación */}
            {modalConfirm && (
                <div className="mx-3 fixed inset-0 flex items-center justify-center z-50 bg-transparent bg-opacity-30 backdrop-blur-sm">
                    <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full">
                        <p className="text-black text-center text-2xl font-bold mt-2 mb-3">Confirmación de monto</p>
                        <p className="text-black text-center text-medium mt-2 mb-4">Para continuar, por favor verifica el monto.</p>
                        <div className="flex flex-col justify-center items-center my-3">
                            <div className="w-full flex flex-row justify-between items-center my-3">
                                <p><span className="text-black font-medium text-lg">Precio unitario:</span></p>
                                <p><span className="text-black font-bold text-lg">{precio} bs</span></p>
                            </div>
                            <br className="border border-gray-300"></br>
                            <div className="w-full flex flex-row justify-between items-center my-3">
                                <p><span className="text-black font-medium text-lg">Cantidad de tickets:</span></p>
                                <p><span className="text-black font-bold text-lg">{cantidad}</span></p>
                            </div>
                            <br className="border border-gray-300"></br>
                            <div className="w-full flex flex-row justify-between items-center my-3">
                                <p><span className="text-black font-medium text-lg">Total:</span></p>
                                <p><span className="text-black font-bold text-lg">{cantidad * precio} bs</span></p>
                            </div>
                        </div>
                        <div className="flex items-center justify-center mt-3 gap-3">
                            <Button
                            className="w-[50%] bg-green-500 hover:bg-green-600 hover:text-white rounded"
                            onClick={() => {setmodalConfirm(false)}}
                            >
                                Aceptar
                            </Button>
                            <Button
                            className="w-[50%] bg-gray-400 hover:bg-gray-500 hover:text-white rounded"
                            onClick={() => {setmodalConfirm(false)}}
                            >
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
