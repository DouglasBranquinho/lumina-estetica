"use client";

import React, { useState } from "react";
import {
  X,
  Clock,
  MapPin,
  Cpu,
  User,
  Phone,
  MessageCircle,
  CheckCircle2,
  Play,
  XCircle,
  AlertOctagon,
  CreditCard,
  FileText,
  ExternalLink,
} from "lucide-react";
import { Appointment, AppointmentStatus, PaymentMethod } from "@/types";
import { useClinic } from "@/context/ClinicContext";
import { formatCurrency, formatPhoneBR } from "@/lib/utils";
import {
  formatWhatsAppUrl,
  generateAppointmentConfirmationMessage,
  generateAppointmentReminderMessage,
  generatePostCareMessage,
} from "@/lib/whatsapp";

interface AppointmentDetailDrawerProps {
  appointment: Appointment | null;
  onClose: () => void;
  onOpenClientProfile: (clientId: string) => void;
}

export const AppointmentDetailDrawer: React.FC<AppointmentDetailDrawerProps> = ({
  appointment,
  onClose,
  onOpenClientProfile,
}) => {
  const { tenant, procedures, updateAppointmentStatus } = useClinic();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>(
    appointment?.paymentMethod || "pix"
  );

  if (!appointment) return null;

  const procedure = procedures.find((p) => p.id === appointment.procedureId);

  const handleStatusChange = (status: AppointmentStatus) => {
    updateAppointmentStatus(appointment.id, status);
  };

  const handleTogglePaid = (paid: boolean) => {
    updateAppointmentStatus(appointment.id, appointment.status, paid, selectedPaymentMethod);
  };

  const handleSendWhatsAppConfirmation = () => {
    const msg = generateAppointmentConfirmationMessage(appointment, tenant, procedure);
    const url = formatWhatsAppUrl(appointment.clientPhone, msg);
    window.open(url, "_blank");
  };

  const handleSendWhatsAppReminder = () => {
    const msg = generateAppointmentReminderMessage(appointment, tenant);
    const url = formatWhatsAppUrl(appointment.clientPhone, msg);
    window.open(url, "_blank");
  };

  const handleSendWhatsAppPostCare = () => {
    const msg = generatePostCareMessage(appointment, tenant, procedure);
    const url = formatWhatsAppUrl(appointment.clientPhone, msg);
    window.open(url, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#262220]/30 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-lg bg-[#FFFFFF] h-full shadow-2xl flex flex-col border-l border-[#EAE5DF] animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-6 border-b border-[#EAE5DF] flex items-center justify-between bg-[#FAF8F5]">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#C49B88]">
              Prontuário & Atendimento
            </span>
            <h2 className="font-serif text-xl font-semibold text-[#262220]">
              Detalhes do Horário
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#EAE5DF] text-[#807770] transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Card da Cliente */}
          <div className="p-4 rounded-xl border border-[#EAE5DF] bg-[#FBFBF9] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-11 h-11 rounded-full bg-[#EAE5DF] flex items-center justify-center text-sm font-semibold text-[#544E49]">
                  {appointment.clientName.charAt(0)}
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[#262220]">
                    {appointment.clientName}
                  </h3>
                  <p className="text-xs text-[#807770] flex items-center space-x-1">
                    <Phone size={11} />
                    <span>{formatPhoneBR(appointment.clientPhone)}</span>
                  </p>
                </div>
              </div>

              <button
                onClick={() => onOpenClientProfile(appointment.clientId)}
                className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg border border-[#EAE5DF] bg-[#FFFFFF] hover:bg-[#FAF8F5] text-xs font-medium text-[#262220] transition-colors"
              >
                <span>Ver Perfil</span>
                <ExternalLink size={12} className="text-[#807770]" />
              </button>
            </div>
          </div>

          {/* Procedimento e Horário */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#807770]">
              Procedimento & Recursos
            </h4>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg border border-[#EAE5DF] bg-[#FAF8F5]">
                <p className="text-[10px] text-[#807770] uppercase">Procedimento</p>
                <p className="font-semibold text-[#262220] mt-0.5">{appointment.procedureName}</p>
                <p className="text-[11px] text-[#807770] mt-0.5">Duração: {appointment.durationMinutes} min</p>
              </div>

              <div className="p-3 rounded-lg border border-[#EAE5DF] bg-[#FAF8F5]">
                <p className="text-[10px] text-[#807770] uppercase">Profissional</p>
                <p className="font-semibold text-[#262220] mt-0.5">{appointment.professionalName}</p>
                <p className="text-[11px] text-[#807770] mt-0.5">Data: {appointment.date}</p>
              </div>

              <div className="p-3 rounded-lg border border-[#EAE5DF] bg-[#FAF8F5]">
                <p className="text-[10px] text-[#807770] uppercase">Sala / Cabine</p>
                <p className="font-semibold text-[#262220] mt-0.5">
                  {appointment.roomName || "Sem sala fixa"}
                </p>
              </div>

              <div className="p-3 rounded-lg border border-[#EAE5DF] bg-[#FAF8F5]">
                <p className="text-[10px] text-[#807770] uppercase">Aparelho / Equipamento</p>
                <p className="font-semibold text-[#262220] mt-0.5">
                  {appointment.equipmentName || "Nenhum aparelho alocado"}
                </p>
              </div>
            </div>
          </div>

          {/* Status do Atendimento & Ações */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#807770]">
              Fluxo do Atendimento
            </h4>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleStatusChange("confirmado")}
                className={`flex items-center justify-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-medium border transition-colors ${
                  appointment.status === "confirmado"
                    ? "bg-[#EDF4EF] text-[#3C6547] border-[#CBE0D2] font-semibold"
                    : "bg-[#FFFFFF] text-[#544E49] border-[#EAE5DF] hover:bg-[#FAF8F5]"
                }`}
              >
                <CheckCircle2 size={14} className="text-[#3C6547]" />
                <span>Confirmar Presença</span>
              </button>

              <button
                onClick={() => handleStatusChange("em_atendimento")}
                className={`flex items-center justify-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-medium border transition-colors ${
                  appointment.status === "em_atendimento"
                    ? "bg-[#F0F4F8] text-[#3B5B75] border-[#D2E0EC] font-semibold"
                    : "bg-[#FFFFFF] text-[#544E49] border-[#EAE5DF] hover:bg-[#FAF8F5]"
                }`}
              >
                <Play size={14} className="text-[#3B5B75]" />
                <span>Iniciar Atendimento</span>
              </button>

              <button
                onClick={() => handleStatusChange("concluido")}
                className={`flex items-center justify-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-medium border transition-colors ${
                  appointment.status === "concluido"
                    ? "bg-[#EAF1ED] text-[#2F4D38] border-[#BCD3C4] font-semibold"
                    : "bg-[#FFFFFF] text-[#544E49] border-[#EAE5DF] hover:bg-[#FAF8F5]"
                }`}
              >
                <CheckCircle2 size={14} className="text-[#2F4D38]" />
                <span>Concluir Sessão</span>
              </button>

              <button
                onClick={() => handleStatusChange("faltou")}
                className={`flex items-center justify-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-medium border transition-colors ${
                  appointment.status === "faltou"
                    ? "bg-[#FDF0F1] text-[#94434B] border-[#F7CED2] font-semibold"
                    : "bg-[#FFFFFF] text-[#544E49] border-[#EAE5DF] hover:bg-[#FAF8F5]"
                }`}
              >
                <AlertOctagon size={14} className="text-[#94434B]" />
                <span>Marcar Falta</span>
              </button>
            </div>
          </div>

          {/* Cobrança & Checkout */}
          <div className="p-4 rounded-xl border border-[#EAE5DF] bg-[#FAF8F5] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#262220]">Valor da Sessão</span>
              <span className="text-base font-semibold text-[#262220] tabular-nums">
                {formatCurrency(appointment.price)}
              </span>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#EAE5DF]">
              <div className="flex items-center space-x-2">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    appointment.paid ? "bg-[#3C6547]" : "bg-[#D99B43]"
                  }`}
                />
                <span className="text-xs font-medium text-[#262220]">
                  {appointment.paid ? "Pagamento Recebido" : "Pagamento Pendente"}
                </span>
              </div>

              <button
                onClick={() => handleTogglePaid(!appointment.paid)}
                className="px-3 py-1 text-xs font-medium rounded-lg border border-[#EAE5DF] bg-[#FFFFFF] hover:bg-[#FBFBF9] transition-colors"
              >
                {appointment.paid ? "Marcar como Em Aberto" : "Registrar Recebimento"}
              </button>
            </div>
          </div>

          {/* Automações WhatsApp Sem Custos */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#807770]">
              Disparos WhatsApp (1 Clique)
            </h4>

            <div className="space-y-2">
              <button
                onClick={handleSendWhatsAppConfirmation}
                className="w-full flex items-center justify-between p-3 rounded-lg border border-[#EAE5DF] hover:border-[#C49B88] bg-[#FFFFFF] hover:bg-[#FAF8F5] text-xs font-medium text-[#262220] transition-colors text-left"
              >
                <div className="flex items-center space-x-2.5">
                  <MessageCircle size={16} className="text-[#3C6547]" />
                  <span>Enviar Confirmação com Endereço</span>
                </div>
                <ExternalLink size={13} className="text-[#807770]" />
              </button>

              <button
                onClick={handleSendWhatsAppReminder}
                className="w-full flex items-center justify-between p-3 rounded-lg border border-[#EAE5DF] hover:border-[#C49B88] bg-[#FFFFFF] hover:bg-[#FAF8F5] text-xs font-medium text-[#262220] transition-colors text-left"
              >
                <div className="flex items-center space-x-2.5">
                  <MessageCircle size={16} className="text-[#D99B43]" />
                  <span>Enviar Lembrete de Véspera</span>
                </div>
                <ExternalLink size={13} className="text-[#807770]" />
              </button>

              <button
                onClick={handleSendWhatsAppPostCare}
                className="w-full flex items-center justify-between p-3 rounded-lg border border-[#EAE5DF] hover:border-[#C49B88] bg-[#FFFFFF] hover:bg-[#FAF8F5] text-xs font-medium text-[#262220] transition-colors text-left"
              >
                <div className="flex items-center space-x-2.5">
                  <MessageCircle size={16} className="text-[#3B5B75]" />
                  <span>Enviar Cuidados Pós-Procedimento</span>
                </div>
                <ExternalLink size={13} className="text-[#807770]" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#EAE5DF] bg-[#FAF8F5] flex items-center justify-between">
          <button
            onClick={() => handleStatusChange("cancelado")}
            className="flex items-center space-x-1.5 text-xs text-[#94434B] hover:underline"
          >
            <XCircle size={14} />
            <span>Cancelar Horário</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-[#262220] hover:bg-[#3E3835] text-[#FFFFFF] text-xs font-semibold transition-colors"
          >
            Fechar Painel
          </button>
        </div>
      </div>
    </div>
  );
};
