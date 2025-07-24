"use client"
import {NavBar} from "@/components/navbar"
import Footer from "@/components/footer"
import Button from "@/components/ui/button"
import { useRouter } from "next/navigation";

export default function Comprar() {
    const router = useRouter();

    return (
        <div className="bg-white">
            <NavBar />
            <div className="my-30 mb-20">                
                <div className="flex flex-col justify-center items-center mt-8">
                    <div className="w-[90%] lg:w-[50%] text-center border border-orange rounded-xl p-5 gap-3">
                        <h1><span className="text-black font-bold text-2xl">Terminos y Condiciones</span></h1>
                        <div className="flex flex-col text-left text-black gap-3 p-5">
                            <h2><span className="font-bold text-lg">Título 1:</span></h2>
                            <p><span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</span></p>
                        </div>
                        <div className="flex flex-col text-left text-black gap-3 p-5">
                            <h2><span className="font-bold text-lg">Título 2:</span></h2>
                            <p><span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</span></p>
                        </div>
                        <div className="flex flex-col text-left text-black gap-3 p-5">
                            <h2><span className="font-bold text-lg">Título 3:</span></h2>
                            <p><span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</span></p>
                        </div>
                        <div className="flex flex-col text-left text-black gap-3 p-5">
                            <h2><span className="font-bold text-lg">Título 4:</span></h2>
                            <p><span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</span></p>
                        </div>
                        <Button
                            className="w-[50%] bg-orange rounded mt-5"
                            onClick={() => {router.push(`/`)}}
                        >
                            Volver
                        </Button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
