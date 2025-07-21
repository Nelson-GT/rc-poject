import {NavBar} from "@/components/navbar"
import Footer from "@/components/footer"
import DetallesRifa from "@/components/detallesRifa";

export default function Home() {
  return (
    <div className="bg-white">
      {/* Navbar, se quedará siempre en el top */}
      <NavBar />
      
      {/* Detalles de la rifa, irá el título, imagen representativa, precio, fecha de juego y botón de compra */}
      <div className="my-30 flex items-center justify-center">
        <DetallesRifa className="mt-30"/>
      </div>
      <Footer />
    </div>
  );
}
