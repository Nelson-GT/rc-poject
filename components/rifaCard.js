import Image from "next/image";

const fecha = new Date();

const fechaFormateada = fecha.toLocaleDateString('es-ES', {day: '2-digit', month: 'long', year: 'numeric',});

const imagenRifa = "/rifaEjemplo.png"

const precioBoleto = 180.00;

const tituloRifa = "Gran rifa 10000 Boletos Moto 0Km | +10 premios a repartir";

export default function DetallesRifa({children}) {
    return (
        <div className="w-full flex flex-col justify-center items-center">
            <div className="w-[90%] lg:w-[50%] py-8 md:py-10 rounded-4xl border border-gray-300 shadow-xl">
                <div className="px-5 flex flex-col gap-6">
                    <Image
                        src = {imagenRifa}
                        width={0}
                        height={0}
                        alt="Imagen Rifa"
                        className="w-[100%] rounded-2xl h-auto"
                        sizes="(max-width: 768px) 90vw, 175px"
                    />
                    <div className="flex justify-between items-center">
                        <div className="flex flex-row gap-2">
                            <img src="/calendar.svg" alt="Calendario" className="w-6 h-6" />
                            <span className="text-sm font-bold text-gray-700">{fechaFormateada}</span>
                        </div>
                        <div className="flex flex-col lg:flex-row text-end">
                            <span className="text-sm font-medium text-gray-700 mx-3">Precio</span>
                            <span className="text-sm font-bold text-gray-700 mx-3">Bs: {precioBoleto}</span>
                        </div>
                    </div>
                    <h1><span className="font-bold text-xl text-black">{tituloRifa.toUpperCase()}</span></h1>
                    {children}
                </div>
            </div>
        </div>
    )
}
