"use client"
import {NavBar} from "@/components/navbar"
import Footer from "@/components/footer"
import DetallesRifa from "@/components/detallesRifaDB";
import { useParams } from "next/navigation";


export default function Home() {
    const { id } = useParams()

    return (
        <div className="bg-white">
            {/* Navbar, se quedará siempre en el top */}
            <NavBar />
        
            {/* Detalles de la rifa, irá el título, imagen representativa, precio, fecha de juego y botón de compra */}
            <div className="my-15 flex items-center justify-center">
                <DetallesRifa id_rifa={id} isFull={true}/>;
            </div>
            <Footer />
        </div>
    );
}
