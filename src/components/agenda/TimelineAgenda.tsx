"use client";

import React from "react";
import {
  Clock,
  MapPin,
  Cpu,
  MessageCircle,
  CheckCircle,
  AlertCircle,
  User,
  Plus,
} from "lucide-react";
import { Appointment, AppointmentStatus } from "@/types";
import { useClinic } from "@/context/ClinicContext";
import { formatCurrency, formatPhoneBR } from "@/lib/utils";
import {
  formatWhatsAppUrl,
  generateAppointmentReminderMessage,
} from "@/lib/whatsapp";

interface TimelineAgendaProps {
  selectedProfessionalId: string;
  onSelectAppointment: (appointment: Appointment) => void;
  onNewAppointmentAtSlot: (startTime: string, professionalId?: string) => void;
}

const statusBadgeStyles: Record<
  AppointmentStatus,
  { bg: string; text: string; border: string; label: string }
> = {
  agendado: {
    bg: "bg-[#FEF8ED]",
    text: "text-[#966116]",
    border: "border-[#F8E5C4]",
    label: "Aguardando Confirmação",
  },
  confirmado: {
    bg: "bg-[#EDF4EF]",
    text: "text-[#3C6547]",
    border: "border-[#CBE0D2]",
    label: "Confirmado",
  },
  em_atendimento: {
    bg: "bg-[#F0F4F8]",
    text: "text-[#3B5B75]",
    border: "border-[#D2E0EC]",
    label: "Em Atendimento",
  },
  concluido: {
    bg: "bg-[#EAF1ED]",
    text: "text-[#2F4D38]",
    border: "border-[#BCD3C4]",
    label: "Concluído",
  },
  cancelado: {
    bg: "bg-[#FDF0F1]",
    text: "text-[#94434B]",
    border: "border-[#F7CED2]",
    label: "Cancelado",
  },
  faltou: {
    bg: "bg-[#FDF0F1]",
    text: "text-[#94434B]",
    border: "border-[#F7CED2]",
    label: "Faltou",
  },
};

export const TimelineAgenda: React.FC<TimelineAgendaProps> = ({
  selectedProfessionalId,
  onSelectAppointment,
  onNewAppointmentAtSlot,
}) => {
  const { appointments, professionals, selectedDate, tenant } = useClinic();

  // Filtrar agendamentos do dia selecionado
  const dayAppointments = appointments.filter((app) => app.date === selectedDate);

  // Filtrar profissionais ativos
  const visibleProfessionals =
    selectedProfessionalId === "all"
      ? professionals
      : professionals.filter((p) => p.id === selectedProfessionalId);

  const handleQuickWhatsApp = (e: React.MouseEvent, app: Appointment) => {
    e.stopPropagation();
    const msg = generateAppointmentReminderMessage(app, tenant);
    const url = formatWhatsAppUrl(app.clientPhone, msg);
    window.open(url, "_blank");
  };

  return (
    <div className="bg-[#FFFFFF] border border-[#EAE5DF] rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between pb-4 border-b border-[#EAE5DF] mb-6">
        <div>
          <h2 className="font-serif text-lg font-semibold text-[#262220]">
            Mapa de Atendimentos
          </h2>
          <p className="text-xs text-[#807770]">
            Visão dividida por profissional e controle de salas/equipamentos
          </p>
        </div>

        <div className="flex items-center space-x-4 text-xs">
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#3C6547]" />
            <span className="text-[#544E49]">Confirmado</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#966116]" />
            <span className="text-[#544E49]">Pendente</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#3B5B75]" />
            <span className="text-[#544E49]">Na Cabine</span>
          </div>
        </div>
      </div>

      {/* Grid de Colunas por Profissional */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {visibleProfessionals.map((pro) => {
          const proAppointments = dayAppointments
            .filter((a) => a.professionalId === pro.id)
            .sort((a, b) => a.startTime.localeCompare(b.startTime));

          return (
            <div
              key={pro.id}
              className="bg-[#FBFBF9] border border-[#EAE5DF] rounded-xl flex flex-col h-full min-h-[480px]"
            >
              {/* Header da Profissional */}
              <div className="p-4 border-b border-[#EAE5DF] bg-[#FFFFFF] rounded-t-xl flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center font-medium text-xs text-[#FFFFFF]"
                    style={{ backgroundColor: pro.colorTag || "#C49B88" }}
                  >
                    {pro.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[#262220]">{pro.name}</h3>
                    <p className="text-[11px] text-[#807770]">{pro.role}</p>
                  </div>
                </div>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-[#FAF8F5] border border-[#EAE5DF] text-[#544E49] tabular-nums">
                  {proAppointments.length} atend.
                </span>
              </div>

              {/* Lista de Atendimentos da Profissional */}
              <div className="p-3 space-y-3 flex-1 overflow-y-auto">
                {proAppointments.length === 0 ? (
                  <div className="h-full min-h-[220px] flex flex-col items-center justify-center text-center p-4 text-[#807770]">
                    <Clock size={28} className="text-[#EAE5DF] mb-2" />
                    <p className="text-xs font-medium text-[#544E49]">Sem atendimentos agendados</p>
                    <p className="text-[11px] text-[#807770] mb-3">Agenda livre para novos agendamentos</p>
                    <button
                      onClick={() => onNewAppointmentAtSlot("09:00", pro.id)}
                      className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-[#EAE5DF] bg-[#FFFFFF] hover:bg-[#FAF8F5] text-[11px] font-medium text-[#262220] transition-colors"
                    >
                      <Plus size={13} className="text-[#C49B88]" />
                      <span>Agendar Horário</span>
                    </button>
                  </div>
                ) : (
                  proAppointments.map((app) => {
                    const statusInfo = statusBadgeStyles[app.status];
                    return (
                      <div
                        key={app.id}
                        onClick={() => onSelectAppointment(app)}
                        className="bg-[#FFFFFF] border border-[#EAE5DF] hover:border-[#C49B88] rounded-xl p-3.5 shadow-sm transition-all cursor-pointer hover:shadow-md group relative"
                      >
                        {/* Top: Horário e Status */}
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-1.5 text-xs font-semibold text-[#262220] tabular-nums">
                            <Clock size={13} className="text-[#C49B88]" />
                            <span>
                              {app.startTime} — {app.endTime}
                            </span>
                            <span className="text-[10px] text-[#807770] font-normal">
                              ({app.durationMinutes}m)
                            </span>
                          </div>

                          <span
                            className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${statusInfo.bg} ${statusInfo.text} ${statusInfo.border}`}
                          >
                            {statusInfo.label}
                          </span>
                        </div>

                        {/* Nome da Cliente */}
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center space-x-2">
                            <User size={14} className="text-[#807770]" />
                            <span className="text-sm font-semibold text-[#262220] group-hover:text-[#B38672] transition-colors">
                              {app.clientName}
                            </span>
                          </div>

                          {/* Botão de WhatsApp Rápido */}
                          <button
                            onClick={(e) => handleQuickWhatsApp(e, app)}
                            className="p-1.5 rounded-full hover:bg-[#EDF4EF] text-[#3C6547] transition-colors"
                            title="Enviar lembrete pelo WhatsApp"
                          >
                            <MessageCircle size={15} />
                          </button>
                        </div>

                        {/* Procedimento e Preço */}
                        <div className="text-xs text-[#544E49] mb-2 font-medium">
                          {app.procedureName}
                        </div>

                        {/* Badges de Recursos Físicos (Sala & Aparelho) */}
                        <div className="pt-2 border-t border-[#F5F2ED] flex flex-wrap items-center justify-between gap-1 text-[11px] text-[#807770]">
                          <div className="flex items-center space-x-2">
                            {app.roomName && (
                              <span
                                className="flex items-center space-x-1 px-1.5 py-0.5 rounded bg-[#FAF8F5] border border-[#EAE5DF]"
                                title={app.roomName}
                              >
                                <MapPin size={11} className="text-[#C49B88]" />
                                <span className="truncate max-w-[110px]">{app.roomName.split("—")[0]}</span>
                              </span>
                            )}
                            {app.equipmentName && (
                              <span
                                className="flex items-center space-x-1 px-1.5 py-0.5 rounded bg-[#FAF8F5] border border-[#EAE5DF]"
                                title={app.equipmentName}
                              >
                                <Cpu size={11} className="text-[#3B5B75]" />
                                <span className="truncate max-w-[110px]">{app.equipmentName}</span>
                              </span>
                            )}
                          </div>

                          <span className="font-semibold text-[#262220] tabular-nums">
                            {formatCurrency(app.price)}
                          </span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
