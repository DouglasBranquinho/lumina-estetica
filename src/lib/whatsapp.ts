import { Appointment, Procedure, Tenant } from "@/types";

export function formatWhatsAppUrl(phone: string, message: string): string {
  const cleanPhone = phone.replace(/\D/g, "");
  // Se não tiver DDI 55, adiciona automaticamente
  const fullPhone = cleanPhone.startsWith("55") ? cleanPhone : `55${cleanPhone}`;
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${fullPhone}?text=${encoded}`;
}

export function generateAppointmentConfirmationMessage(
  appointment: Appointment,
  tenant: Tenant,
  procedure?: Procedure
): string {
  const [year, month, day] = appointment.date.split("-");
  const formattedDate = `${day}/${month}/${year}`;

  let msg = `Olá, ${appointment.clientName}! 💕\n\n`;
  msg += `Seu agendamento na *${tenant.name}* foi confirmado com sucesso!\n\n`;
  msg += `🗓️ *Data:* ${formattedDate}\n`;
  msg += `⏰ *Horário:* ${appointment.startTime}\n`;
  msg += `💆🏻‍♀️ *Procedimento:* ${appointment.procedureName}\n`;
  msg += `👩🏻‍⚕️ *Profissional:* ${appointment.professionalName}\n`;

  if (tenant.address) {
    msg += `📍 *Endereço:* ${tenant.address}\n`;
  }

  if (procedure?.preCareInstructions) {
    msg += `\n⚠️ *Orientações importantes para o dia:* \n${procedure.preCareInstructions}\n`;
  }

  msg += `\nQualquer dúvida ou necessidade de reagendamento, estamos à disposição por aqui. Até breve! ✨`;

  return msg;
}

export function generateAppointmentReminderMessage(
  appointment: Appointment,
  tenant: Tenant
): string {
  const [year, month, day] = appointment.date.split("-");
  const formattedDate = `${day}/${month}/${year}`;

  let msg = `Olá, ${appointment.clientName}! 💕 Tudo bem?\n\n`;
  msg += `Passando para lembrar do seu horário amanhã na *${tenant.name}*:\n\n`;
  msg += `🗓️ *Data:* ${formattedDate}\n`;
  msg += `⏰ *Horário:* ${appointment.startTime}\n`;
  msg += `💆🏻‍♀️ *Procedimento:* ${appointment.procedureName}\n`;
  msg += `👩🏻‍⚕️ *Profissional:* ${appointment.professionalName}\n\n`;
  msg += `Podemos confirmar sua presença? Responda com *SIM* para confirmar ou nos avise caso precise remarcar. Aguardamos você com carinho! ✨`;

  return msg;
}

export function generatePostCareMessage(
  appointment: Appointment,
  tenant: Tenant,
  procedure?: Procedure
): string {
  let msg = `Olá, ${appointment.clientName}! Esperamos que você tenha adorado sua sessão de hoje na *${tenant.name}*! ✨🌸\n\n`;
  
  if (procedure?.postCareInstructions) {
    msg += `📝 *Cuidados recomendados para os próximos dias:*\n`;
    msg += `${procedure.postCareInstructions}\n\n`;
  } else {
    msg += `Lembre-se de manter a pele bem hidratada e usar protetor solar diariamente.\n\n`;
  }

  msg += `Qualquer dúvida ou reação incomum, nos chame imediatamente por aqui. Um abraço! 💕`;

  return msg;
}
