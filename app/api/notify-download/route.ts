import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { recruiterName, recruiterCompany, recruiterRole, lang } = body;

    const userAgent = req.headers.get('user-agent') || 'Unknown';
    const forwardedFor = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'Unknown IP';
    const timestamp = new Date().toISOString();

    const eventData = {
      event: 'RESUME_DOWNLOAD',
      timestamp,
      recruiter: {
        name: recruiterName || 'Não identificado',
        company: recruiterCompany || 'Não informada',
        role: recruiterRole || 'Não informado',
      },
      clientInfo: {
        ip: forwardedFor.split(',')[0].trim(),
        userAgent,
        lang: lang || 'pt',
      }
    };

    console.log('[LEAD ALERT] Currículo baixado:', JSON.stringify(eventData, null, 2));

    // If a webhook URL is configured in environment, dispatch immediately
    const webhookUrl = process.env.NOTIFICATION_WEBHOOK_URL || process.env.DISCORD_WEBHOOK_URL || process.env.TELEGRAM_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            content: `📄 **Novo Download de Currículo Detectado!**\n👤 **Nome/Recrutador:** ${eventData.recruiter.name}\n🏢 **Empresa:** ${eventData.recruiter.company}\n🕒 **Data:** ${new Date().toLocaleString('pt-BR')}`,
            embeds: [
              {
                title: 'Alerta de Download de Currículo',
                color: 2276590, // Cyan
                fields: [
                  { name: 'Recrutador / Contato', value: eventData.recruiter.name, inline: true },
                  { name: 'Empresa', value: eventData.recruiter.company, inline: true },
                  { name: 'IP', value: eventData.clientInfo.ip, inline: true },
                  { name: 'Horário', value: timestamp, inline: false },
                ]
              }
            ]
          })
        });
      } catch (err) {
        console.error('Falha ao enviar webhook de notificação:', err);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Download registrado com sucesso.',
      timestamp,
    });
  } catch (error) {
    console.error('Erro na rota de notificação:', error);
    return NextResponse.json(
      { success: false, error: 'Falha ao processar registro' },
      { status: 500 }
    );
  }
}
