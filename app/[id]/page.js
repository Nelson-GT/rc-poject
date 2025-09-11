"use client"

import DetallesRifa from "@/components/detallesRifaDB";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase-client";

export default function Home() {
    const { id } = useParams();

    useEffect(() => {
        async function liberarBoletos() {
            const { data: data, error: error } = await supabase.rpc('liberar_boletos_reservados');
            if (error) {
                console.error('Error al liberar boletos:', error);
            } else {
                console.log('Boletos expirados liberados con éxito.');
            }
        }
        
        liberarBoletos();
    }, []);

    return (
        <div className="bg-white">
            <div className="my-15 flex flex-col items-center justify-center">
                <DetallesRifa id_rifa={id} isFull={true} />
            </div>
        </div>
    );
}