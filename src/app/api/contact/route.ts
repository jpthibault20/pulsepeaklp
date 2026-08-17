import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const { name, email, message } = await request.json();

        if (!name || !email || !message) {
            return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
        }

        const htmlContent = `
        <div style="font-family: sans-serif; padding: 20px;">
            <h1 style="color: #2563eb;">Nouveau message — Contact PulsePeak</h1>
            <p><strong>Nom :</strong> ${name}</p>
            <p><strong>Email :</strong> ${email}</p>
            <p style="margin-top: 16px; white-space: pre-wrap;">${message}</p>
        </div>
        `;

        const data = await resend.emails.send({
            from: "PulsePeak Contact <thibault@jp-developpement.com>",
            to: ["thibault@jp-developpement.com"],
            replyTo: email,
            subject: `📩 Nouveau message de ${name}`,
            html: htmlContent,
        });

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: String(error) }, { status: 500 });
    }
}
