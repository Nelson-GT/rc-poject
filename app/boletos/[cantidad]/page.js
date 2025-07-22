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
    const { cantidad } = useParams();

    const generarBoletos = (cantidad) => {
        const boletos = Array.from({ length: cantidad }, () => {
            const numero = Math.floor(Math.random() * 10000).toString().padStart(4, "0");
            return { numero };
        });
    return boletos;
    };

    const boletos = generarBoletos(cantidad);


    return (
        <div className="bg-white">
        <NavBar />
        <div className="my-30 mb-20">
            <RifaCard />
            <div className="w-full flex flex-col justify-center items-center">
                <div className="mt-5 flex flex-col justify-center items-center text-black w-[90%] lg:w-[50%]">
                    <h1 className="text-black font-bold text-2xl">Boletos</h1>
                    <div className="mt-5 flex flex-wrap justify-center items-center gap-2">
                        {boletos.map(boleto => (
                            <div key={boleto.numero} className="flex justify-center items-center w-[40%] border border-orange rounded-xl p-3">
                            <p className="font-semibold">{boleto.numero}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <Button className="mt-10 w-[50%] bg-orange hover:bg-gray-500 hover:text-white" onClick={() => {router.push("/")}}>
                    Volver a Inicio
                </Button>
            </div>
        </div>
        <Footer />
        </div>
    );
}