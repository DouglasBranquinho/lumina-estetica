"use client";

import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Plus,
  Share2,
  Check,
} from "lucide-react";
import { useClinic } from "@/context/ClinicContext";

interface NavbarProps {
  onOpenNewAppointment: () => void;
  selectedProfessionalId: string;
  setSelectedProfessionalId: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenNewAppointment,
  selectedProfessionalId,
  setSelectedProfessionalId,
}) => {
  const { tenant, professionals, selectedDate, setSelectedDate } = useClinic();
  const [copied, setCopied] = React.useState(false);

  // Formatar data em português: "Quinta-feira, 20 de Setembro"
  const formatDateDisplay = (dateString: string) => {
    const [year, month, day] = dateString.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      day: "numeric",
      month: "long",
    };
    const formatted = date.toLocaleDateString("pt-BR", options);
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  };

  const handlePrevDay = () => {
    const [y, m, d] = selectedDate.split("-").map(Number);
    const prev = new Date(y, m - 1, d - 1);
    const yStr = prev.getFullYear();
    const mStr = String(prev.getMonth() + 1).padStart(2, "0");
    const dStr = String(prev.getDate()).padStart(2, "0");
    setSelectedDate(`${yStr}-${mStr}-${dStr}`);
  };

  const handleNextDay = () => {
    const [y, m, d] = selectedDate.split("-").map(Number);
    const next = new Date(y, m - 1, d + 1);
    const yStr = next.getFullYear();
    const mStr = String(next.getMonth() + 1).padStart(2, "0");
    const dStr = String(next.getDate()).padStart(2, "0");
    setSelectedDate(`${yStr}-${mStr}-${dStr}`);
  };

  const handleToday = () => {
    setSelectedDate("2026-09-20");
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      const url = `${window.location.origin}/agendar/${tenant.slug}`;
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <header className="h-16 bg-[#FFFFFF] border-b border-[#EAE5DF] px-6 flex items-center justify-between shrink-0">
      {/* Date Navigation */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center bg-[#FAF8F5] border border-[#EAE5DF] rounded-lg p-1 space-x-1">
          <button
            onClick={handlePrevDay}
            className="p-1 rounded hover:bg-[#FFFFFF] text-[#544E49] transition-colors"
            title="Dia Anterior"
          >
            <ChevronLeft size={16} />
          </button>
          
          <button
            onClick={handleToday}
            className="px-2 py-0.5 text-xs font-medium text-[#544E49] hover:text-[#262220] transition-colors"
          >
            Hoje
          </button>

          <button
            onClick={handleNextDay}
            className="p-1 rounded hover:bg-[#FFFFFF] text-[#544E49] transition-colors"
            title="Próximo Dia"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        <div className="flex items-center space-x-2 text-sm font-semibold text-[#262220]">
          <CalendarIcon size={16} className="text-[#C49B88]" />
          <span>{formatDateDisplay(selectedDate)}</span>
        </div>
      </div>

      {/* Filter by Professional & Actions */}
      <div className="flex items-center space-x-3">
        <select
          value={selectedProfessionalId}
          onChange={(e) => setSelectedProfessionalId(e.target.value)}
          className="text-xs bg-[#FAF8F5] border border-[#EAE5DF] rounded-lg px-3 py-2 text-[#262220] font-medium focus:outline-none focus:ring-1 focus:ring-[#C49B88]"
        >
          <option value="all">Todas as Profissionais</option>
          {professionals.map((pro) => (
            <option key={pro.id} value={pro.id}>
              {pro.name} ({pro.role})
            </option>
          ))}
        </select>

        <button
          onClick={handleCopyLink}
          className="flex items-center space-x-1.5 px-3 py-2 rounded-lg border border-[#EAE5DF] bg-[#FFFFFF] hover:bg-[#FAF8F5] text-[#544E49] text-xs font-medium transition-colors"
          title="Copiar link de agendamento online da cliente"
        >
          {copied ? (
            <>
              <Check size={14} className="text-[#5B8266]" />
              <span className="text-[#5B8266]">Link Copiado!</span>
            </>
          ) : (
            <>
              <Share2 size={14} className="text-[#807770]" />
              <span>Link da Cliente</span>
            </>
          )}
        </button>

        <button
          onClick={onOpenNewAppointment}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-[#C49B88] hover:bg-[#B38672] text-[#FFFFFF] text-xs font-semibold shadow-sm transition-all active:scale-95"
        >
          <Plus size={16} />
          <span>Novo Agendamento</span>
        </button>
      </div>
    </header>
  );
};
