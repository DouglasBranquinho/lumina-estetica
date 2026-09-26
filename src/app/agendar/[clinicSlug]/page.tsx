"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  CheckCircle2,
  Sparkles,
  MapPin,
  Phone,
  ArrowRight,
  ArrowLeft,
  MessageCircle,
  User,
  ShieldCheck,
} from "lucide-react";
import {
  mockTenant,
  mockProcedures,
  mockProfessionals,
  mockAppointments,
} from "@/lib/mockData";
import { getAvailableTimeSlots } from "@/lib/bookingEngine";
import { formatCurrency, formatPhoneBR } from "@/lib/utils";
import { formatWhatsAppUrl } from "@/lib/whatsapp";

export default function ClientBookingPage({
  params,
}: {
  params: Promise<{ clinicSlug: string }>;
}) {
  const resolvedParams = use(params);
  const tenant = mockTenant; // No V1 usa o tenant correspondente

  // Etapas do fluxo
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Seleções da cliente
  const [selectedProcedureId, setSelectedProcedureId] = useState<string>("");
  const [selectedProfessionalId, setSelectedProfessionalId] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("2026-09-21");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [clientName, setClientName] = useState<string>("");
  const [clientPhone, setClientPhone] = useState<string>("");

  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const procedure = mockProcedures.find((p) => p.id === selectedProcedureId);
  const professional = mockProfessionals.find((p) => p.id === selectedProfessionalId);

  // Filtrar procedimentos pela categoria selecionada
  const filteredProcedures =
    categoryFilter === "all"
      ? mockProcedures
      : mockProcedures.filter((p) => p.category === categoryFilter);

  // Profissionais habilitadas para o procedimento escolhido
  const availableProfessionals = procedure
    ? mockProfessionals.filter((p) => p.qualifiedProcedureIds.includes(procedure.id))
    : mockProfessionals;

  // Horários disponíveis calculados pelo motor de conflito
  const availableSlots =
    procedure && professional
      ? getAvailableTimeSlots({
          date: selectedDate,
          procedure,
          professional,
          existingAppointments: mockAppointments,
        })
      : [];

  const handleFinishBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientPhone) return;
    setStep(5); // Confirmação
  };

  const getWhatsAppBookingLink = () => {
    if (!procedure || !professional) return "#";
    const [y, m, d] = selectedDate.split("-");
    const formattedDate = `${d}/${m}/${y}`;
    const text = `Olá, ${tenant.name}! 💕 Gostaria de confirmar meu agendamento feito pelo site:\n\n💆🏻‍♀️ *Procedimento:* ${procedure.name}\n👩🏻‍⚕️ *Profissional:* ${professional.name}\n🗓️ *Data:* ${formattedDate} às ${selectedTime}\n👩🏻 *Nome:* ${clientName}`;
    return formatWhatsAppUrl(tenant.phone, text);
  };

  return (
    <div className="min-h-screen bg-[#FBFBF9] text-[#262220] flex flex-col justify-between selection:bg-[#F5EBE6]">
      {/* Top Header Boutique */}
      <header className="bg-[#FFFFFF] border-b border-[#EAE5DF] px-6 py-4 sticky top-0 z-20">
        <div className="max-w-xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-[#F5EBE6] text-[#C49B88] flex items-center justify-center font-serif text-lg font-bold border border-[#EAE5DF]">
              L
            </div>
            <div>
              <h1 className="font-serif font-semibold text-[#262220] text-sm tracking-wide">
                {tenant.name}
              </h1>
              <p className="text-[11px] text-[#807770]">Agendamento Online Exclusivo</p>
            </div>
          </div>

          <div className="flex items-center space-x-1.5 text-xs text-[#544E49] bg-[#FAF8F5] px-2.5 py-1 rounded-full border border-[#EAE5DF]">
            <ShieldCheck size={14} className="text-[#5B8266]" />
            <span>Ambiente Seguro</span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-xl w-full mx-auto p-5 md:p-6">
        {/* Barra de Progresso */}
        {step < 5 && (
          <div className="mb-6 space-y-2">
            <div className="flex items-center justify-between text-xs text-[#807770]">
              <span>Passo {step} de 4</span>
              <span className="font-medium text-[#262220]">
                {step === 1 && "Escolha o Procedimento"}
                {step === 2 && "Escolha a Especialista"}
                {step === 3 && "Data & Horário"}
                {step === 4 && "Seus Dados"}
              </span>
            </div>
            <div className="w-full bg-[#EAE5DF] h-1 rounded-full overflow-hidden">
              <div
                className="bg-[#C49B88] h-full transition-all duration-300 rounded-full"
                style={{ width: `${(step / 4) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* ETAPA 1: Procedimentos */}
        {step === 1 && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div>
              <h2 className="font-serif text-xl font-semibold text-[#262220]">
                Qual cuidado você merece hoje?
              </h2>
              <p className="text-xs text-[#807770] mt-0.5">
                Selecione o procedimento para ver as especialistas e horários
              </p>
            </div>

            {/* Filtros de Categoria (Limpos e Elegantes) */}
            <div className="flex flex-wrap gap-2 pb-1">
              {[
                { id: "all", label: "Todos os serviços" },
                { id: "cabelo", label: "Cabelos" },
                { id: "unhas", label: "Unhas & Alongamento" },
                { id: "cilios", label: "Cílios" },
                { id: "sobrancelhas", label: "Sobrancelhas" },
                { id: "facial", label: "Estética Facial" },
              ].map((cat) => {
                const isActive = categoryFilter === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setCategoryFilter(cat.id)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      isActive
                        ? "bg-[#262220] text-[#FFFFFF] shadow-xs"
                        : "bg-[#FFFFFF] text-[#544E49] border border-[#EAE5DF] hover:bg-[#FAF8F5] hover:text-[#262220]"
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            <div className="space-y-3">
              {filteredProcedures.map((proc) => (
                <div
                  key={proc.id}
                  onClick={() => {
                    setSelectedProcedureId(proc.id);
                    setStep(2);
                  }}
                  className="p-4 rounded-xl border border-[#EAE5DF] hover:border-[#C49B88] bg-[#FFFFFF] hover:bg-[#FAF8F5]/80 transition-all cursor-pointer shadow-xs group"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[#C49B88]">
                        {proc.category}
                      </span>
                      <h3 className="text-sm font-semibold text-[#262220] group-hover:text-[#B38672] transition-colors">
                        {proc.name}
                      </h3>
                      {proc.description && (
                        <p className="text-xs text-[#544E49] mt-1 leading-relaxed">
                          {proc.description}
                        </p>
                      )}
                    </div>
                    <span className="text-sm font-semibold text-[#262220] tabular-nums shrink-0 ml-3">
                      {formatCurrency(proc.price)}
                    </span>
                  </div>

                  <div className="flex items-center space-x-3 text-[11px] text-[#807770] mt-3 pt-2 border-t border-[#F5F2ED]">
                    <span className="flex items-center space-x-1">
                      <Clock size={12} />
                      <span>{proc.durationMinutes} minutos</span>
                    </span>
                    <span>•</span>
                    <span>Avaliação individual</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ETAPA 2: Profissional */}
        {step === 2 && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <button
              onClick={() => setStep(1)}
              className="text-xs text-[#807770] hover:text-[#262220] flex items-center space-x-1 mb-2"
            >
              <ArrowLeft size={13} />
              <span>Voltar aos procedimentos</span>
            </button>

            <div>
              <h2 className="font-serif text-xl font-semibold text-[#262220]">
                Escolha sua especialista
              </h2>
              <p className="text-xs text-[#807770] mt-0.5">
                Profissionais qualificadas para {procedure?.name}
              </p>
            </div>

            <div className="space-y-3">
              {availableProfessionals.map((pro) => (
                <div
                  key={pro.id}
                  onClick={() => {
                    setSelectedProfessionalId(pro.id);
                    setStep(3);
                  }}
                  className="p-4 rounded-xl border border-[#EAE5DF] hover:border-[#C49B88] bg-[#FFFFFF] hover:bg-[#FAF8F5] transition-all cursor-pointer shadow-xs flex items-center justify-between group"
                >
                  <div className="flex items-center space-x-3.5">
                    <div
                      className="w-11 h-11 rounded-full flex items-center justify-center font-medium text-xs text-[#FFFFFF]"
                      style={{ backgroundColor: pro.colorTag || "#C49B88" }}
                    >
                      {pro.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-[#262220] group-hover:text-[#B38672] transition-colors">
                        {pro.name}
                      </h3>
                      <p className="text-xs text-[#807770]">{pro.role}</p>
                    </div>
                  </div>

                  <ArrowRight size={16} className="text-[#807770] group-hover:translate-x-1 transition-transform" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ETAPA 3: Data e Horário */}
        {step === 3 && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <button
              onClick={() => setStep(2)}
              className="text-xs text-[#807770] hover:text-[#262220] flex items-center space-x-1 mb-2"
            >
              <ArrowLeft size={13} />
              <span>Voltar para especialistas</span>
            </button>

            <div>
              <h2 className="font-serif text-xl font-semibold text-[#262220]">
                Escolha o dia e o horário
              </h2>
              <p className="text-xs text-[#807770] mt-0.5">
                Horários livres e confirmados em tempo real
              </p>
            </div>

            {/* Seletor de Data */}
            <div className="p-4 rounded-xl border border-[#EAE5DF] bg-[#FFFFFF] space-y-2">
              <label className="text-xs font-semibold text-[#262220]">Data desejada:</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => {
                  setSelectedDate(e.target.value);
                  setSelectedTime("");
                }}
                className="w-full text-xs p-3 rounded-lg border border-[#EAE5DF] bg-[#FAF8F5] focus:outline-none focus:ring-1 focus:ring-[#C49B88]"
              />
            </div>

            {/* Grid de Horários Livres */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#262220]">Horários disponíveis:</label>
              {availableSlots.length === 0 ? (
                <div className="p-6 text-center text-xs text-[#807770] bg-[#FFFFFF] border border-dashed border-[#EAE5DF] rounded-xl">
                  Nenhum horário livre nesta data. Por favor, escolha outro dia acima.
                </div>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {availableSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedTime(slot)}
                      className={`py-3 rounded-lg text-xs font-semibold border transition-all ${
                        selectedTime === slot
                          ? "bg-[#C49B88] text-[#FFFFFF] border-[#C49B88] shadow-xs"
                          : "bg-[#FFFFFF] text-[#262220] border-[#EAE5DF] hover:bg-[#FAF8F5]"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {selectedTime && (
              <button
                onClick={() => setStep(4)}
                className="w-full py-3.5 rounded-xl bg-[#262220] hover:bg-[#3E3835] text-[#FFFFFF] text-xs font-semibold shadow-sm transition-all mt-4"
              >
                Avançar para Identificação
              </button>
            )}
          </div>
        )}

        {/* ETAPA 4: Identificação da Cliente */}
        {step === 4 && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <button
              onClick={() => setStep(3)}
              className="text-xs text-[#807770] hover:text-[#262220] flex items-center space-x-1 mb-2"
            >
              <ArrowLeft size={13} />
              <span>Voltar aos horários</span>
            </button>

            <div>
              <h2 className="font-serif text-xl font-semibold text-[#262220]">
                Quase lá! Como podemos te chamar?
              </h2>
              <p className="text-xs text-[#807770] mt-0.5">
                Seu WhatsApp receberá a confirmação e o endereço da clínica
              </p>
            </div>

            <form onSubmit={handleFinishBooking} className="space-y-4 bg-[#FFFFFF] p-5 rounded-2xl border border-[#EAE5DF]">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#262220]">Seu Nome Completo</label>
                <input
                  type="text"
                  placeholder="Ex: Mariana Alencar"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-[#EAE5DF] bg-[#FAF8F5] focus:outline-none focus:ring-1 focus:ring-[#C49B88]"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#262220]">Seu WhatsApp com DDD</label>
                <input
                  type="tel"
                  placeholder="Ex: 11991234567"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-[#EAE5DF] bg-[#FAF8F5] focus:outline-none focus:ring-1 focus:ring-[#C49B88]"
                  required
                />
              </div>

              {/* Resumo do Horário Selecionado */}
              <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#EAE5DF] text-xs space-y-1.5 text-[#544E49]">
                <div className="flex justify-between">
                  <span>Procedimento:</span>
                  <strong className="text-[#262220]">{procedure?.name}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Especialista:</span>
                  <strong className="text-[#262220]">{professional?.name}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Horário:</span>
                  <strong className="text-[#262220]">{selectedDate} às {selectedTime}</strong>
                </div>
                <div className="flex justify-between pt-1 border-t border-[#EAE5DF]">
                  <span>Valor Estimado:</span>
                  <strong className="text-[#262220]">{formatCurrency(procedure?.price || 0)}</strong>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#C49B88] hover:bg-[#B38672] text-[#FFFFFF] text-xs font-semibold shadow-sm transition-all active:scale-98"
              >
                Concluir e Confirmar Horário
              </button>
            </form>
          </div>
        )}

        {/* ETAPA 5: Confirmação e Sucesso */}
        {step === 5 && (
          <div className="space-y-6 text-center py-6 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-[#EDF4EF] text-[#3C6547] flex items-center justify-center mx-auto border border-[#CBE0D2]">
              <CheckCircle2 size={32} />
            </div>

            <div>
              <h2 className="font-serif text-2xl font-semibold text-[#262220]">
                Agendamento Confirmado
              </h2>
              <p className="text-xs text-[#544E49] mt-1 max-w-sm mx-auto">
                Olá, {clientName}! Seu momento de cuidado está reservado na <strong>{tenant.name}</strong>.
              </p>
            </div>

            <div className="bg-[#FFFFFF] p-5 rounded-2xl border border-[#EAE5DF] text-xs text-left space-y-2.5 max-w-md mx-auto shadow-xs">
              <div className="flex items-center space-x-2 text-[#262220] font-semibold pb-2 border-b border-[#EAE5DF]">
                <Sparkles size={16} className="text-[#C49B88]" />
                <span>Resumo da sua Reserva</span>
              </div>
              <p>
                <strong className="text-[#262220]">Procedimento:</strong> {procedure?.name}
              </p>
              <p>
                <strong className="text-[#262220]">Especialista:</strong> {professional?.name}
              </p>
              <p>
                <strong className="text-[#262220]">Data & Horário:</strong> {selectedDate} às {selectedTime}
              </p>
              {tenant.address && (
                <p className="text-[11px] text-[#807770] pt-1">
                  <strong className="text-[#262220]">Endereço:</strong> {tenant.address}
                </p>
              )}
            </div>

            <div className="space-y-3 max-w-md mx-auto">
              <a
                href={getWhatsAppBookingLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center space-x-2 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-[#FFFFFF] text-xs font-semibold shadow-sm transition-all"
              >
                <MessageCircle size={16} />
                <span>Enviar Confirmação pelo WhatsApp</span>
              </a>

              <Link
                href="/"
                className="inline-block text-xs text-[#807770] hover:text-[#262220] transition-colors"
              >
                Voltar à página inicial
              </Link>
            </div>
          </div>
        )}
      </main>

      {/* Footer da Página */}
      <footer className="p-6 text-center text-[11px] text-[#807770] border-t border-[#EAE5DF] bg-[#FFFFFF]">
        <p>{tenant.name} • Gestão Inteligente para Estética Feminina</p>
      </footer>
    </div>
  );
}
