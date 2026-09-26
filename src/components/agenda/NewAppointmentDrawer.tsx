"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  AlertTriangle,
  Calendar,
  Clock,
  User,
  Sparkles,
  MapPin,
  Cpu,
  Check,
  Plus,
} from "lucide-react";
import { useClinic } from "@/context/ClinicContext";
import { formatCurrency } from "@/lib/utils";

interface NewAppointmentDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialStartTime?: string;
  initialProfessionalId?: string;
}

export const NewAppointmentDrawer: React.FC<NewAppointmentDrawerProps> = ({
  isOpen,
  onClose,
  initialStartTime = "10:00",
  initialProfessionalId,
}) => {
  const {
    clients,
    procedures,
    professionals,
    rooms,
    equipments,
    selectedDate,
    bookAppointment,
    addClient,
    checkConflict,
    getSlotsForProcedureAndPro,
  } = useClinic();

  const [selectedClientId, setSelectedClientId] = useState<string>("");
  const [isCreatingNewClient, setIsCreatingNewClient] = useState(false);
  const [newClientName, setNewClientName] = useState("");
  const [newClientPhone, setNewClientPhone] = useState("");

  const [selectedProcedureId, setSelectedProcedureId] = useState<string>(
    procedures[0]?.id || ""
  );
  const [selectedProfessionalId, setSelectedProfessionalId] = useState<string>(
    initialProfessionalId || professionals[0]?.id || ""
  );
  const [date, setDate] = useState<string>(selectedDate);
  const [startTime, setStartTime] = useState<string>(initialStartTime);
  const [notes, setNotes] = useState<string>("");
  const [conflictWarning, setConflictWarning] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Manter date sincronizado com a data selecionada na navbar
  useEffect(() => {
    setDate(selectedDate);
  }, [selectedDate]);

  // Se vier profissional inicial
  useEffect(() => {
    if (initialProfessionalId) {
      setSelectedProfessionalId(initialProfessionalId);
    }
  }, [initialProfessionalId]);

  // Checagem em tempo real de conflitos
  useEffect(() => {
    if (selectedProcedureId && selectedProfessionalId && date && startTime) {
      const result = checkConflict(date, startTime, selectedProcedureId, selectedProfessionalId);
      if (result.hasConflict) {
        setConflictWarning(result.reason || "Horário indisponível devido a conflito de recursos.");
      } else {
        setConflictWarning(null);
      }
    }
  }, [date, startTime, selectedProcedureId, selectedProfessionalId]);

  if (!isOpen) return null;

  const currentProcedure = procedures.find((p) => p.id === selectedProcedureId);
  const currentProfessional = professionals.find((p) => p.id === selectedProfessionalId);
  const requiredRoom = rooms.find((r) => r.id === currentProcedure?.requiredRoomId);
  const requiredEquipment = equipments.find((e) => e.id === currentProcedure?.requiredEquipmentId);

  // Sugestões de horários livres
  const availableSlots =
    currentProcedure && currentProfessional
      ? getSlotsForProcedureAndPro(date, currentProcedure.id, currentProfessional.id)
      : [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let finalClientId = selectedClientId;
    let finalClientName = "";
    let finalClientPhone = "";

    if (isCreatingNewClient) {
      if (!newClientName || !newClientPhone) {
        alert("Por favor, preencha o nome e o WhatsApp da nova cliente.");
        return;
      }
      const created = addClient({
        name: newClientName,
        phone: newClientPhone,
        tags: ["Novo Contato"],
      });
      finalClientId = created.id;
      finalClientName = created.name;
      finalClientPhone = created.phone;
    } else {
      const client = clients.find((c) => c.id === selectedClientId);
      if (!client) {
        alert("Por favor, selecione uma cliente.");
        return;
      }
      finalClientName = client.name;
      finalClientPhone = client.phone;
    }

    const result = bookAppointment({
      clientId: finalClientId,
      clientName: finalClientName,
      clientPhone: finalClientPhone,
      professionalId: selectedProfessionalId,
      procedureId: selectedProcedureId,
      date,
      startTime,
      notes,
    });

    if (result.success) {
      setSuccessMessage("Horário reservado com sucesso!");
      setTimeout(() => {
        setSuccessMessage(null);
        onClose();
      }, 1200);
    } else {
      setConflictWarning(result.error || "Erro ao agendar.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#262220]/30 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-lg bg-[#FFFFFF] h-full shadow-2xl flex flex-col border-l border-[#EAE5DF] animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-6 border-b border-[#EAE5DF] flex items-center justify-between bg-[#FAF8F5]">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#C49B88]">
              Agenda Inteligente
            </span>
            <h2 className="font-serif text-xl font-semibold text-[#262220]">
              Novo Agendamento
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#EAE5DF] text-[#807770] transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Sucesso Banner */}
          {successMessage && (
            <div className="p-3.5 rounded-xl bg-[#EDF4EF] border border-[#CBE0D2] text-[#3C6547] text-xs font-semibold flex items-center space-x-2">
              <Check size={16} />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Alerta de Conflito de Recurso */}
          {conflictWarning && (
            <div className="p-4 rounded-xl bg-[#FDF0F1] border border-[#F7CED2] text-[#94434B] text-xs space-y-1">
              <div className="flex items-center space-x-1.5 font-semibold">
                <AlertTriangle size={15} />
                <span>Conflito de Recursos Detectado:</span>
              </div>
              <p className="leading-relaxed pl-5">{conflictWarning}</p>
            </div>
          )}

          {/* 1. Seleção de Cliente */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#807770]">
                Cliente
              </label>
              <button
                type="button"
                onClick={() => setIsCreatingNewClient(!isCreatingNewClient)}
                className="text-xs font-medium text-[#C49B88] hover:underline flex items-center space-x-1"
              >
                <Plus size={12} />
                <span>{isCreatingNewClient ? "Selecionar Existente" : "+ Nova Cliente"}</span>
              </button>
            </div>

            {isCreatingNewClient ? (
              <div className="space-y-2 p-3.5 rounded-xl border border-[#EAE5DF] bg-[#FAF8F5]">
                <div>
                  <input
                    type="text"
                    placeholder="Nome completo da cliente"
                    value={newClientName}
                    onChange={(e) => setNewClientName(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-[#EAE5DF] bg-[#FFFFFF] focus:outline-none focus:ring-1 focus:ring-[#C49B88]"
                    required
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="WhatsApp (ex: 11987654321)"
                    value={newClientPhone}
                    onChange={(e) => setNewClientPhone(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-[#EAE5DF] bg-[#FFFFFF] focus:outline-none focus:ring-1 focus:ring-[#C49B88]"
                    required
                  />
                </div>
              </div>
            ) : (
              <select
                value={selectedClientId}
                onChange={(e) => setSelectedClientId(e.target.value)}
                className="w-full text-xs p-3 rounded-lg border border-[#EAE5DF] bg-[#FAF8F5] text-[#262220] focus:outline-none focus:ring-1 focus:ring-[#C49B88]"
                required
              >
                <option value="">Selecione uma cliente...</option>
                {clients.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} — {c.phone}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* 2. Seleção de Procedimento */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#807770]">
              Procedimento
            </label>
            <select
              value={selectedProcedureId}
              onChange={(e) => setSelectedProcedureId(e.target.value)}
              className="w-full text-xs p-3 rounded-lg border border-[#EAE5DF] bg-[#FAF8F5] text-[#262220] focus:outline-none focus:ring-1 focus:ring-[#C49B88]"
            >
              {procedures.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.durationMinutes} min) — {formatCurrency(p.price)}
                </option>
              ))}
            </select>

            {/* Informações dos Recursos Exigidos pelo Procedimento */}
            {currentProcedure && (
              <div className="p-3 rounded-lg border border-[#EAE5DF] bg-[#FAF8F5] text-[11px] text-[#544E49] space-y-1">
                <div className="flex items-center justify-between">
                  <span>Duração em Cabine:</span>
                  <strong className="text-[#262220]">{currentProcedure.durationMinutes} minutos</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>Tempo de Assepsia (Buffer):</span>
                  <strong className="text-[#262220]">{currentProcedure.bufferMinutes} minutos</strong>
                </div>
                {requiredRoom && (
                  <div className="flex items-center justify-between pt-1 border-t border-[#EAE5DF]/60">
                    <span className="flex items-center space-x-1">
                      <MapPin size={11} className="text-[#C49B88]" />
                      <span>Cabine Exigida:</span>
                    </span>
                    <strong className="text-[#262220]">{requiredRoom.name.split("—")[0]}</strong>
                  </div>
                )}
                {requiredEquipment && (
                  <div className="flex items-center justify-between pt-1 border-t border-[#EAE5DF]/60">
                    <span className="flex items-center space-x-1">
                      <Cpu size={11} className="text-[#3B5B75]" />
                      <span>Aparelho Exigido:</span>
                    </span>
                    <strong className="text-[#262220]">{requiredEquipment.name}</strong>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 3. Profissional Responsável */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#807770]">
              Profissional Responsável
            </label>
            <select
              value={selectedProfessionalId}
              onChange={(e) => setSelectedProfessionalId(e.target.value)}
              className="w-full text-xs p-3 rounded-lg border border-[#EAE5DF] bg-[#FAF8F5] text-[#262220] focus:outline-none focus:ring-1 focus:ring-[#C49B88]"
            >
              {professionals.map((pro) => (
                <option key={pro.id} value={pro.id}>
                  {pro.name} ({pro.role})
                </option>
              ))}
            </select>
          </div>

          {/* 4. Data e Horário */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#807770]">
                Data
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-[#EAE5DF] bg-[#FAF8F5] text-[#262220] focus:outline-none focus:ring-1 focus:ring-[#C49B88]"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#807770]">
                Horário de Início
              </label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-[#EAE5DF] bg-[#FAF8F5] text-[#262220] focus:outline-none focus:ring-1 focus:ring-[#C49B88]"
                required
              />
            </div>
          </div>

          {/* Horários Livres Sugeridos */}
          {availableSlots.length > 0 && (
            <div className="space-y-1.5">
              <span className="text-[11px] text-[#807770]">
                Horários livres recomendados para esta profissional e cabine:
              </span>
              <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto p-1">
                {availableSlots.slice(0, 10).map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setStartTime(slot)}
                    className={`px-2.5 py-1 rounded text-xs font-medium border transition-colors ${
                      startTime === slot
                        ? "bg-[#C49B88] text-[#FFFFFF] border-[#C49B88]"
                        : "bg-[#FAF8F5] text-[#544E49] border-[#EAE5DF] hover:bg-[#FFFFFF]"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 5. Observações */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#807770]">
              Observações ou Preferências
            </label>
            <textarea
              rows={2}
              placeholder="Ex: Primeira sessão do pacote de laser, pele sensível..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full text-xs p-3 rounded-lg border border-[#EAE5DF] bg-[#FAF8F5] text-[#262220] focus:outline-none focus:ring-1 focus:ring-[#C49B88]"
            />
          </div>

          {/* Submit Action */}
          <div className="pt-4 border-t border-[#EAE5DF]">
            <button
              type="submit"
              disabled={Boolean(conflictWarning)}
              className={`w-full py-3 rounded-xl text-xs font-semibold transition-all shadow-sm ${
                conflictWarning
                  ? "bg-[#EAE5DF] text-[#807770] cursor-not-allowed"
                  : "bg-[#C49B88] hover:bg-[#B38672] text-[#FFFFFF] active:scale-98"
              }`}
            >
              {conflictWarning ? "Impossível Agendar: Conflito Ativo" : "Confirmar Agendamento"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
