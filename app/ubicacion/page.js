"use client"
import { NavBar } from "@/components/navbar"
import Footer from "@/components/footer"
import Button from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { MapPinned, AlarmClockCheck, DoorOpen, Hamburger, MapPin, ArrowLeft } from "lucide-react"

export default function UbicacionPage() {
    const router = useRouter()

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <NavBar />
            
            <main className="flex-grow pt-20 pb-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto pt-8">
                    {/* Header */}
                    <div className="bg-orange-500 text-white p-6 rounded-t-xl">
                        <div className="flex items-center gap-4">
                            <MapPinned className="w-8 h-8" />
                            <h1 className="text-2xl sm:text-3xl font-bold">Ubicación</h1>
                        </div>
                    </div>
                    
                    {/* Content */}
                    <div className="bg-white rounded-b-xl shadow-lg overflow-hidden p-6">
                        <div className="flex flex-col lg:flex-row gap-8 items-center">
                            {/* Map */}
                            <div className="w-full lg:w-1/2">
                                <div className="aspect-w-16 aspect-h-9 w-full">
                                    <iframe 
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3553.119316237237!2d-67.9975274!3d10.2353784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e805d08602ac69f%3A0x92da7f2cf213bfdd!2sCorralitos%20Wings!5e1!3m2!1ses-419!2sve!4v1753720541364!5m2!1ses-419!2sve" 
                                        className="w-full h-64 sm:h-80 md:h-96 rounded-lg border-0"
                                        allowFullScreen 
                                        loading="lazy" 
                                        referrerPolicy="no-referrer-when-downgrade"
                                        aria-label="Mapa de ubicación de Corralitos Wings"
                                    />
                                </div>
                            </div>
                            
                            {/* Info */}
                            <div className="w-full lg:w-1/2 space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="bg-orange-500 p-2 rounded-full text-white">
                                        <AlarmClockCheck className="w-5 h-5"/>
                                    </div>
                                    <p className="text-black font-medium text-base sm:text-lg">
                                        12:00pm - 01:00am
                                    </p>
                                </div>
                                
                                <div className="flex items-center gap-4">
                                    <div className="bg-orange-500 p-2 rounded-full text-white">
                                        <DoorOpen className="w-5 h-5"/>
                                    </div>
                                    <p className="text-black font-medium text-base sm:text-lg">
                                        Abiertos de Lunes a Domingo
                                    </p>
                                </div>
                                
                                <div className="flex items-center gap-4">
                                    <div className="bg-orange-500 p-2 rounded-full text-white">
                                        <Hamburger className="w-5 h-5"/>
                                    </div>
                                    <p className="text-black font-medium text-base sm:text-lg">
                                        Alitas, Hamburguesas & Granjeros
                                    </p>
                                </div>
                                
                                <div className="flex items-start gap-4">
                                    <div className="bg-orange-500 p-2 rounded-full text-white mt-1">
                                        <MapPin className="w-5 h-5"/>
                                    </div>
                                    <p className="text-black font-medium text-base sm:text-lg">
                                        Sede Jardín Mañongo, 62P2+5X3, Avenida 2, Naguanagua 2005, Carabobo
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-200 pt-8">
                    <div className="text-center">
                    <Button size="lg" onClick={() => router.push("/")} className="px-8">
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Volver al Inicio
                    </Button>
                    </div>
                </div>
            </main>
            
            <Footer />
        </div>
    )
}