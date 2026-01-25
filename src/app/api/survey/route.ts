import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { answers } = body;

        // On construit le HTML de l'email dynamiquement
        // On vérifie si la réponse est un tableau (classement) ou un texte simple
        const htmlContent = `
        <div style="font-family: sans-serif; padding: 20px;">
            <h1 style="color: #06b6d4;">Nouveau résultat Sondage PulsePeak 🚀</h1>
            <p>Voici les réponses récoltées :</p>
            
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                ${Object.entries(answers).map(([key, value]) => `
                    <tr style="border-bottom: 1px solid #e2e8f0;">
                        <td style="padding: 12px; font-weight: bold; color: #475569;">${key}</td>
                        <td style="padding: 12px;">
                            ${Array.isArray(value) 
                                ? `<ol style="margin: 0; padding-left: 20px;">${value.map(v => `<li>${v}</li>`).join('')}</ol>` 
                                : `<strong>${value}</strong>`
                            }
                        </td>
                    </tr>
                `).join('')}
            </table>
        </div>
        `;

        const data = await resend.emails.send({
            from: 'PulsePeak Survey <onboarding@resend.dev>', // Utilise ton domaine si tu l'as configuré, sinon garde onboarding@resend.dev
            to: ['thibault@jp-developpement.com'], 
            subject: '🎯 Nouveau Feedback Utilisateur (Sondage V1)',
            html: htmlContent,
        });

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}
