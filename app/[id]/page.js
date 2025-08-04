"use client"
import DetallesRifa from "@/components/detallesRifaDB";
import { useParams } from "next/navigation";

export default function Home() {
    const { id } = useParams();

    return (
        <div className="bg-white">
            <div className="my-15 flex flex-col items-center justify-center">
                <DetallesRifa id_rifa={id} isFull={true} />
            </div>
        </div>
    );
}