"use client";

import React from "react";
import {
  CalendarDays,
  Banknote,
  Users,
  AlertCircle,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { useClinic } from "@/context/ClinicContext";
import { formatCurrency } from "@/lib/utils";

export const DailyMetricCards: React.FC = () => {
  const { dailySummary, appointments, selectedDate } = useClinic();

  const dayAppointments = appointments.filter((a) => a.date === selectedDate);
  const pendingConfirmations = dayAppointments.filter((a) => a.status === "agendado").length;
  const inProgressCount = dayAppointments.filter((a) => a.status === "em_atendimento").length;

  return (
    <div className="space-y-3 mb-6">
      {/* Cards de Métricas do Dia */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Atendimentos Hoje */}
        <div className="bg-[#FFFFFF] p-4 rounded-xl border border-[#EAE5DF] shadow-[0_1px_2px_rgba(0,0,0,0.02)] flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-lg bg-[#FAF8F5] border border-[#EAE5DF] flex items-center justify-center text-[#C49B88]">
            <CalendarDays size={20} />
          </div>
          <div>
            <p className="text-[11px] font-medium tracking-wide text-[#807770] uppercase">
              Atendimentos Hoje
            </p>
            <div className="flex items-baseline space-x-2">
              <span className="text-xl font-semibold text-[#262220] tabular-nums">
                {dailySummary.totalAppointments}
              </span>
              <span className="text-xs text-[#544E49]">agendados</span>
            </div>
          </div>
        </div>

        {/* Faturamento Recebido */}
        <div className="bg-[#FFFFFF] p-4 rounded-xl border border-[#EAE5DF] shadow-[0_1px_2px_rgba(0,0,0,0.02)] flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-lg bg-[#FAF8F5] border border-[#EAE5DF] flex items-center justify-center text-[#5B8266]">
            <Banknote size={20} />
          </div>
          <div>
            <p className="text-[11px] font-medium tracking-wide text-[#807770] uppercase">
              Faturamento Recebido
            </p>
            <div className="flex items-baseline space-x-2">
              <span className="text-xl font-semibold text-[#262220] tabular-nums">
                {formatCurrency(dailySummary.totalRevenue)}
              </span>
            </div>
          </div>
        </div>

        {/* Concluídos / Em Atendimento */}
        <div className="bg-[#FFFFFF] p-4 rounded-xl border border-[#EAE5DF] shadow-[0_1px_2px_rgba(0,0,0,0.02)] flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-lg bg-[#FAF8F5] border border-[#EAE5DF] flex items-center justify-center text-[#3B5B75]">
            <CheckCircle2 size={20} />
          </div>
          <div>
            <p className="text-[11px] font-medium tracking-wide text-[#807770] uppercase">
              Status Atual
            </p>
            <div className="flex items-baseline space-x-2">
              <span className="text-xl font-semibold text-[#262220] tabular-nums">
                {dailySummary.completedCount}
              </span>
              <span className="text-xs text-[#544E49]">
                concluídos {inProgressCount > 0 ? `(${inProgressCount} na cabine)` : ""}
              </span>
            </div>
          </div>
        </div>

        {/* Pagamentos Pendentes */}
        <div className="bg-[#FFFFFF] p-4 rounded-xl border border-[#EAE5DF] shadow-[0_1px_2px_rgba(0,0,0,0.02)] flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-lg bg-[#FAF8F5] border border-[#EAE5DF] flex items-center justify-center text-[#D99B43]">
            <Clock size={20} />
          </div>
          <div>
            <p className="text-[11px] font-medium tracking-wide text-[#807770] uppercase">
              Pagamentos Pendentes
            </p>
            <div className="flex items-baseline space-x-2">
              <span className="text-xl font-semibold text-[#D99B43] tabular-nums">
                {dailySummary.pendingPaymentCount}
              </span>
              <span className="text-xs text-[#807770]">em aberto</span>
            </div>
          </div>
        </div>
      </div>

      {/* Faixa de Alertas Operacionais */}
      {(pendingConfirmations > 0 || dailySummary.pendingPaymentCount > 0) && (
        <div className="bg-[#FAF8F5] border border-[#EAE5DF] rounded-xl px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2 text-[#544E49]">
            <AlertCircle size={15} className="text-[#C49B88]" />
            <span className="font-semibold text-[#262220]">Avisos Rápidos:</span>
          </div>

          <div className="flex items-center space-x-4">
            {pendingConfirmations > 0 && (
              <span className="text-[#807770]">
                • <strong className="text-[#262220]">{pendingConfirmations}</strong> confirmações pendentes de resposta via WhatsApp
              </span>
            )}
            {dailySummary.pendingPaymentCount > 0 && (
              <span className="text-[#807770]">
                • <strong className="text-[#262220]">{dailySummary.pendingPaymentCount}</strong> atendimentos com pagamento a receber no checkout
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
