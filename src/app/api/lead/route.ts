import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const { email, tool, summary } = await request.json();

        if (!email || !tool || !summary) {
            return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
        }

        const userHtml = `
        <div style="font-family: sans-serif; padding: 20px;">
            <h1 style="color: #2563eb;">Vos résultats — ${tool}</h1>
            <p style="white-space: pre-wrap;">${summary}</p>
            <p style="margin-top: 24px; color: #64748b; font-size: 13px;">
                Calculé avec l'outil gratuit PulsePeak — <a href="https://pulsepeak.fr/outils">retrouvez tous nos outils</a>.
            </p>
        </div>
        `;

        const leadHtml = `
        <div style="font-family: sans-serif; padding: 20px;">
            <h1 style="color: #2563eb;">📩 Nouveau lead — ${tool}</h1>
            <p><strong>Email :</strong> ${email}</p>
            <p style="margin-top: 16px; white-space: pre-wrap;">${summary}</p>
        </div>
        `;

        await Promise.all([
            resend.emails.send({
                from: "PulsePeak <thibault@jp-developpement.com>",
                to: [email],
                subject: `Vos résultats PulsePeak — ${tool}`,
                html: userHtml,
            }),
            resend.emails.send({
                from: "PulsePeak Leads <thibault@jp-developpement.com>",
                to: ["thibault@jp-developpement.com"],
                replyTo: email,
                subject: `📩 Nouveau lead outil — ${tool}`,
                html: leadHtml,
            }),
        ]);

        return NextResponse.json({ ok: true });
    } catch (error) {
        return NextResponse.json({ error: String(error) }, { status: 500 });
    }
}
