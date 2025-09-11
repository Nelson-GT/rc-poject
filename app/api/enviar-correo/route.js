import { NextResponse } from 'next/server';

export async function POST(request) {
    const { to, html, plain } = await request.json();

    const mailerooKey = process.env.MAILEROO_SENDING_KEY; 
    const correo_envio = process.env.SENDER_EMAIL; 
    if (!mailerooKey) {
        return NextResponse.json({ message: "Clave de API de Maileroo no encontrada." }, { status: 500 });
    }

    const url = "https://smtp.maileroo.com/api/v2/emails";

    const prueba = {
        "from": {
            "address": correo_envio,
            "display_name": "Rifa Corralitos"
        },
        "to": [
            {
            "address": to.address,
            "display_name": to.nombre
            }
        ],
        "subject": "Tus Boletos de la Rifa",
        "html": html,
        "plain": plain,
        "tracking": true,
        }

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${mailerooKey}` 
            },
            body: JSON.stringify(prueba),
        });

        const data = await response.json();

        if (response.ok) {
            console.log("Respuesta de Maileroo:", data);
            return NextResponse.json({ message: "Correo enviado con éxito", data }, { status: 200 });
        } else {
            console.error("Error de Maileroo:", data);
            return NextResponse.json({ message: "Error al enviar el correo", error: data.error }, { status: response.status });
        }
    } catch (error) {
        console.error("Error en la solicitud al servidor de Maileroo:", error);
        return NextResponse.json({ message: "Error interno del servidor", error: error.message }, { status: 500 });
    }
}