"use client"
import {NavBar} from "@/components/navbar"
import Footer from "@/components/footer"
import DetallesRifa from "@/components/detallesRifa";
import Button from "@/components/ui/button"
import { useState } from "react";

export default function Home() {
    const [modalConfirm, setmodalConfirm] = useState(true);
    
    return (
        <div className="bg-white">
            {/* Navbar, se quedará siempre en el top */}
            <NavBar />
        
            {/* Detalles de la rifa, irá el título, imagen representativa, precio, fecha de juego y botón de compra */}
            <div className="my-15 flex items-center justify-center">
                <DetallesRifa className="mt-30"/>
            </div>
            <Footer />
            {/* modal de confirmación */}
            {modalConfirm && (
            <div className="mx-3 fixed inset-0 flex items-center justify-center z-50 bg-transparent bg-opacity-30 backdrop-blur-sm">
                <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full">
                    <div className="flex flex-col items-center justify-center gap-3">
                        <div>
                            <h1><span className="text-black font-bold text-2xl">Terminos y Condiciones</span></h1>
                        </div>
                        <div>
                        <div className="flex flex-col text-left text-black gap-1 py-1">
                            <h2><span className="font-bold text-md">Título 1:</span></h2>
                            <p><span className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span></p>
                        </div>
                        <div className="flex flex-col text-left text-black gap-1 py-1">
                            <h2><span className="font-bold text-md">Título 2:</span></h2>
                            <p><span className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span></p>
                        </div>
                        <div className="flex flex-col text-left text-black gap-1 py-1">
                            <h2><span className="font-bold text-md">Título 3:</span></h2>
                            <p><span className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span></p>
                        </div>
                        <div className="flex flex-col text-left text-black gap-1 py-1">
                            <h2><span className="font-bold text-md">Título 4:</span></h2>
                            <p><span className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span></p>
                        </div>
                        </div>
                        <div className="w-full flex justify-center">
                            <Button
                                className="w-[50%] bg-orange rounded mt-5"
                                onClick={() => {setmodalConfirm(false)}}
                            >
                                Volver
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            )}
        </div>
    );
}
