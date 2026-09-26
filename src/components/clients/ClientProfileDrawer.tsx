"use client";

import React, { useState } from "react";
import {
  X,
  Phone,
  Calendar,
  Sparkles,
  Clock,
  Plus,
  Image as ImageIcon,
  CheckCircle,
  FileText,
  MessageCircle,
} from "lucide-react";
import { Client, EvolutionRecord } from "@/types";
import { useClinic } from "@/context/ClinicContext";
import { formatCurrency, formatPhoneBR } from "@/lib/utils";
import { formatWhatsAppUrl } from "@/lib/whatsapp";

interface ClientProfileDrawerProps {
  clientId: string | null;
  onClose: () => void;
}

export const ClientProfileDrawer: React.FC<ClientProfileDrawerProps> = ({
  clientId,
  onClose,
}) => {
  const { clients, appointments, evolutionRecords, addEvolutionRecord, updateClientTechnicalProfile, tenant } = useClinic();
  const client = clients.find((c) => c.id === clientId);
  const [activeTab, setActiveTab] = useState<"historico" | "ficha" | "evolucao">("ficha");

  // Estado da Ficha Técnica
  const [hairFormula, setHairFormula] = useState("");
  const [nailShape, setNailShape] = useState("");
  const [lashMapping, setLashMapping] = useState("");
  const [browHenna, setBrowHenna] = useState("");
  const [allergies, setAllergies] = useState("");
  const [savedFichaMsg, setSavedFichaMsg] = useState(false);

  React.useEffect(() => {
    if (client?.technicalProfile) {
      setHairFormula(client.technicalProfile.hairFormula || "");
      setNailShape(client.technicalProfile.nailShape || "");
      setLashMapping(client.technicalProfile.lashMapping || "");
      setBrowHenna(client.technicalProfile.browHenna || "");
      setAllergies(client.technicalProfile.allergies || "");
    } else {
      setHairFormula("");
      setNailShape("");
      setLashMapping("");
      setBrowHenna("");
      setAllergies("");
    }
  }, [client]);

  // Form para novo registro de evolução estética
  const [isAddingEvolution, setIsAddingEvolution] = useState(false);
  const [evoProcedure, setEvoProcedure] = useState("");
  const [evoProName, setEvoProName] = useState("");
  const [evoObservations, setEvoObservations] = useState("");
  const [evoParameters, setEvoParameters] = useState("");
  const [evoSkinReaction, setEvoSkinReaction] = useState("");

  if (!clientId || !client) return null;

  const clientAppointments = appointments.filter((a) => a.clientId === client.id);
  const clientEvolutions = evolutionRecords.filter((e) => e.clientId === client.id);

  const handleSaveFicha = (e: React.FormEvent) => {
    e.preventDefault();
    updateClientTechnicalProfile(client.id, {
      hairFormula,
      nailShape,
      lashMapping,
      browHenna,
      allergies,
    });
    setSavedFichaMsg(true);
    setTimeout(() => setSavedFichaMsg(false), 2000);
  };

  const handleSendReturnRadar = () => {
    const text = `Olá, ${client.name}! 💕 Tudo bem?\n\nPassando para lembrar que seu ciclo de manutenção (cílios / unhas / raiz) está se aproximando!\n\nPodemos garantir seu horário para esta semana para manter seu visual impecável? ✨`;
    const url = formatWhatsAppUrl(client.phone, text);
    window.open(url, "_blank");
  };

  const handleCreateEvolution = (e: React.FormEvent) => {
    e.preventDefault();
    if (!evoProcedure || !evoObservations) return;

    addEvolutionRecord({
      clientId: client.id,
      date: new Date().toISOString().split("T")[0],
      procedureName: evoProcedure,
      professionalName: evoProName || "Profissional Responsável",
      observations: evoObservations,
      parametersUsed: evoParameters,
      skinReaction: evoSkinReaction,
    });

    setIsAddingEvolution(false);
    setEvoProcedure("");
    setEvoObservations("");
    setEvoParameters("");
    setEvoSkinReaction("");
  };

  const handleOpenWhatsApp = () => {
    const url = formatWhatsAppUrl(client.phone, `Olá, ${client.name}! Tudo bem? 💕`);
    window.open(url, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#262220]/30 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-xl bg-[#FFFFFF] h-full shadow-2xl flex flex-col border-l border-[#EAE5DF] animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-6 border-b border-[#EAE5DF] flex items-center justify-between bg-[#FAF8F5]">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#C49B88]">
              Prontuário da Cliente
            </span>
            <h2 className="font-serif text-xl font-semibold text-[#262220]">
              {client.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#EAE5DF] text-[#807770] transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Card Resumo da Cliente */}
          <div className="p-4 rounded-xl border border-[#EAE5DF] bg-[#FBFBF9] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-[#EAE5DF] flex items-center justify-center text-base font-semibold text-[#544E49]">
                  {client.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[#262220]">{client.name}</h3>
                  <p className="text-xs text-[#807770] flex items-center space-x-1 mt-0.5">
                    <Phone size={12} />
                    <span>{formatPhoneBR(client.phone)}</span>
                  </p>
                </div>
              </div>

              <button
                onClick={handleOpenWhatsApp}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-[#CBE0D2] bg-[#EDF4EF] hover:bg-[#E1EFE4] text-[#3C6547] text-xs font-medium transition-colors"
              >
                <MessageCircle size={14} />
                <span>Conversar</span>
              </button>
            </div>

            {/* Tags e Preferências */}
            {client.tags && client.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-2">
                {client.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#FAF8F5] border border-[#EAE5DF] text-[#544E49]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {client.notes && (
              <p className="text-xs text-[#544E49] bg-[#FFFFFF] p-2.5 rounded-lg border border-[#EAE5DF] italic">
                "{client.notes}"
              </p>
            )}

            {/* Métricas rápidas da cliente e Radar de Retorno */}
            <div className="grid grid-cols-2 gap-3 pt-2 text-xs border-t border-[#EAE5DF]">
              <div>
                <span className="text-[10px] uppercase text-[#807770]">Atendimentos Realizados</span>
                <p className="font-semibold text-[#262220] tabular-nums">
                  {client.totalAppointments} sessões
                </p>
              </div>
              <div>
                <span className="text-[10px] uppercase text-[#807770]">Total Investido</span>
                <p className="font-semibold text-[#262220] tabular-nums">
                  {formatCurrency(client.totalSpent)}
                </p>
              </div>
            </div>

            {/* Radar de Retorno (Ciclo de 15/21 dias) */}
            <div className="pt-2 border-t border-[#EAE5DF] flex items-center justify-between">
              <span className="text-[11px] text-[#807770]">
                Última visita: <strong>{client.lastAppointmentAt || "Sem registro"}</strong>
              </span>
              <button
                onClick={handleSendReturnRadar}
                className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-[#FAF8F5] hover:bg-[#FFFFFF] border border-[#EAE5DF] hover:border-[#C49B88] text-xs font-semibold text-[#262220] transition-colors"
                title="Lembrar cliente do ciclo de manutenção de cílios/unhas/raiz"
              >
                <Clock size={12} className="text-[#C49B88]" />
                <span>Radar de Retorno (WhatsApp)</span>
              </button>
            </div>
          </div>

          {/* Abas: Ficha Técnica vs Histórico vs Evolução */}
          <div className="flex border-b border-[#EAE5DF] text-xs">
            <button
              onClick={() => setActiveTab("ficha")}
              className={`pb-3 px-3 font-semibold border-b-2 transition-colors flex items-center space-x-1 ${
                activeTab === "ficha"
                  ? "border-[#C49B88] text-[#262220]"
                  : "border-transparent text-[#807770] hover:text-[#262220]"
              }`}
            >
              <FileText size={13} className="text-[#C49B88]" />
              <span>Ficha Técnica Especializada</span>
            </button>
            <button
              onClick={() => setActiveTab("historico")}
              className={`pb-3 px-3 font-semibold border-b-2 transition-colors ${
                activeTab === "historico"
                  ? "border-[#C49B88] text-[#262220]"
                  : "border-transparent text-[#807770] hover:text-[#262220]"
              }`}
            >
              Histórico ({clientAppointments.length})
            </button>
            <button
              onClick={() => setActiveTab("evolucao")}
              className={`pb-3 px-3 font-semibold border-b-2 transition-colors flex items-center space-x-1 ${
                activeTab === "evolucao"
                  ? "border-[#C49B88] text-[#262220]"
                  : "border-transparent text-[#807770] hover:text-[#262220]"
              }`}
            >
              <Sparkles size={13} className="text-[#C49B88]" />
              <span>Evolução ({clientEvolutions.length})</span>
            </button>
          </div>

          {/* Conteúdo da Aba Ficha Técnica */}
          {activeTab === "ficha" && (
            <form onSubmit={handleSaveFicha} className="space-y-4 text-xs animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-2 border-b border-[#EAE5DF]">
                <p className="text-[#807770]">
                  Memória técnica para a cabeleireira, manicure e lash designer não errarem nada.
                </p>
                {savedFichaMsg && (
                  <span className="text-[#3C6547] font-semibold flex items-center space-x-1">
                    <CheckCircle size={13} />
                    <span>Ficha Salva!</span>
                  </span>
                )}
              </div>

              {/* Cabelo */}
              <div className="p-3.5 rounded-xl border border-[#EAE5DF] bg-[#FAF8F5] space-y-1.5">
                <label className="font-semibold text-[#262220] block">
                  Cabelos & Coloração (Fórmula de Tinta / Mechas)
                </label>
                <textarea
                  rows={2}
                  placeholder="Ex: Raiz: Majirel 6.0 (35g) + 6.1 (15g) com OX 20 vol (75g). Usar Sebastian Dark Oil..."
                  value={hairFormula}
                  onChange={(e) => setHairFormula(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-[#EAE5DF] bg-[#FFFFFF] text-xs focus:ring-1 focus:ring-[#C49B88]"
                />
              </div>

              {/* Unhas */}
              <div className="p-3.5 rounded-xl border border-[#EAE5DF] bg-[#FAF8F5] space-y-1.5">
                <label className="font-semibold text-[#262220] block">
                  Unhas & Alongamento (Formato, Gel e Cor Preferida)
                </label>
                <textarea
                  rows={2}
                  placeholder="Ex: Formato Amendoada clássica, Gel Vòlia Classic Nude, Top Coat fosco..."
                  value={nailShape}
                  onChange={(e) => setNailShape(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-[#EAE5DF] bg-[#FFFFFF] text-xs focus:ring-1 focus:ring-[#C49B88]"
                />
              </div>

              {/* Cílios */}
              <div className="p-3.5 rounded-xl border border-[#EAE5DF] bg-[#FAF8F5] space-y-1.5">
                <label className="font-semibold text-[#262220] block">
                  Extensão de Cílios (Mapping, Tamanhos e Curvatura)
                </label>
                <textarea
                  rows={2}
                  placeholder="Ex: Volume Brasileiro, Curvatura D, tamanhos 10 a 13mm (Efeito Boneca)..."
                  value={lashMapping}
                  onChange={(e) => setLashMapping(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-[#EAE5DF] bg-[#FFFFFF] text-xs focus:ring-1 focus:ring-[#C49B88]"
                />
              </div>

              {/* Sobrancelhas */}
              <div className="p-3.5 rounded-xl border border-[#EAE5DF] bg-[#FAF8F5] space-y-1.5">
                <label className="font-semibold text-[#262220] block">
                  Design de Sobrancelhas (Tom de Henna & Tempo de Ação)
                </label>
                <textarea
                  rows={2}
                  placeholder="Ex: Tom Castanho Médio, tempo de ação exato de 7 minutos para não escurecer..."
                  value={browHenna}
                  onChange={(e) => setBrowHenna(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-[#EAE5DF] bg-[#FFFFFF] text-xs focus:ring-1 focus:ring-[#C49B88]"
                />
              </div>

              {/* Alergias / Sensibilidades */}
              <div className="p-3.5 rounded-xl border border-[#F7CED2] bg-[#FDF0F1] space-y-1.5">
                <label className="font-semibold text-[#94434B] block">
                  Sensibilidades, Alergias ou Cuidados Especiais
                </label>
                <input
                  type="text"
                  placeholder="Ex: Alergia a esmalte tradicional, couro cabeludo sensível a descolorante direto..."
                  value={allergies}
                  onChange={(e) => setAllergies(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-[#F7CED2] bg-[#FFFFFF] text-xs text-[#262220] focus:ring-1 focus:ring-[#94434B]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#C49B88] hover:bg-[#B38672] text-[#FFFFFF] font-semibold transition-all shadow-xs"
              >
                Salvar Ficha Técnica da Cliente
              </button>
            </form>
          )}

          {/* Conteúdo da Aba Histórico */}
          {activeTab === "historico" && (
            <div className="space-y-3">
              {clientAppointments.length === 0 ? (
                <p className="text-xs text-[#807770] text-center py-6">
                  Nenhum agendamento registrado ainda.
                </p>
              ) : (
                clientAppointments.map((app) => (
                  <div
                    key={app.id}
                    className="p-3.5 rounded-xl border border-[#EAE5DF] bg-[#FAF8F5] space-y-1.5 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-[#262220]">{app.procedureName}</span>
                      <span className="text-[#807770] tabular-nums">{app.date}</span>
                    </div>
                    <div className="flex items-center justify-between text-[#544E49] text-[11px]">
                      <span>Profissional: {app.professionalName}</span>
                      <span className="font-semibold tabular-nums">{formatCurrency(app.price)}</span>
                    </div>
                    {app.notes && (
                      <p className="text-[11px] text-[#807770] pt-1 border-t border-[#EAE5DF]/60">
                        Obs: {app.notes}
                      </p>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

          {/* Conteúdo da Aba Evolução Estética */}
          {activeTab === "evolucao" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#544E49]">
                  Acompanhamento Clínico de Resultados
                </span>
                <button
                  onClick={() => setIsAddingEvolution(!isAddingEvolution)}
                  className="inline-flex items-center space-x-1 px-3 py-1 rounded-lg border border-[#EAE5DF] bg-[#FFFFFF] hover:bg-[#FAF8F5] text-xs font-medium text-[#262220] transition-colors"
                >
                  <Plus size={12} className="text-[#C49B88]" />
                  <span>Novo Registro de Evolução</span>
                </button>
              </div>

              {/* Form de Novo Registro de Evolução */}
              {isAddingEvolution && (
                <form
                  onSubmit={handleCreateEvolution}
                  className="p-4 rounded-xl border border-[#C49B88] bg-[#FAF8F5] space-y-3 text-xs"
                >
                  <h5 className="font-semibold text-[#262220]">Registrar Pós-Sessão / Evolução</h5>
                  <div>
                    <input
                      type="text"
                      placeholder="Procedimento realizado (ex: Laser, Botox)"
                      value={evoProcedure}
                      onChange={(e) => setEvoProcedure(e.target.value)}
                      className="w-full p-2 rounded-lg border border-[#EAE5DF] bg-[#FFFFFF]"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Parâmetros ou produtos usados (ex: 14J/cm², Ácido Mandélico 10%)"
                      value={evoParameters}
                      onChange={(e) => setEvoParameters(e.target.value)}
                      className="w-full p-2 rounded-lg border border-[#EAE5DF] bg-[#FFFFFF]"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Reação tecidual ou da pele (ex: eritema leve, sem intercorrências)"
                      value={evoSkinReaction}
                      onChange={(e) => setEvoSkinReaction(e.target.value)}
                      className="w-full p-2 rounded-lg border border-[#EAE5DF] bg-[#FFFFFF]"
                    />
                  </div>
                  <div>
                    <textarea
                      rows={2}
                      placeholder="Observações da evolução estética e recomendações..."
                      value={evoObservations}
                      onChange={(e) => setEvoObservations(e.target.value)}
                      className="w-full p-2 rounded-lg border border-[#EAE5DF] bg-[#FFFFFF]"
                      required
                    />
                  </div>

                  <div className="flex justify-end space-x-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsAddingEvolution(false)}
                      className="px-3 py-1.5 rounded-lg border border-[#EAE5DF] text-[#544E49]"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-3 py-1.5 rounded-lg bg-[#C49B88] text-[#FFFFFF] font-semibold"
                    >
                      Salvar Evolução
                    </button>
                  </div>
                </form>
              )}

              {/* Lista de Registros de Evolução */}
              <div className="space-y-4">
                {clientEvolutions.length === 0 ? (
                  <div className="p-6 text-center text-xs text-[#807770] border border-dashed border-[#EAE5DF] rounded-xl">
                    <ImageIcon size={28} className="mx-auto text-[#EAE5DF] mb-2" />
                    <p>Nenhum registro de evolução ou foto cadastrada.</p>
                    <p className="text-[11px] text-[#807770]">
                      Adicione notas pós-atendimento e parâmetros aplicados para acompanhar o resultado da cliente.
                    </p>
                  </div>
                ) : (
                  clientEvolutions.map((evo) => (
                    <div
                      key={evo.id}
                      className="p-4 rounded-xl border border-[#EAE5DF] bg-[#FAF8F5] space-y-2.5 text-xs"
                    >
                      <div className="flex items-center justify-between border-b border-[#EAE5DF] pb-2">
                        <div>
                          <span className="font-semibold text-[#262220]">{evo.procedureName}</span>
                          <p className="text-[11px] text-[#807770]">Por: {evo.professionalName}</p>
                        </div>
                        <span className="text-[11px] text-[#807770] tabular-nums">{evo.date}</span>
                      </div>

                      {evo.parametersUsed && (
                        <div className="bg-[#FFFFFF] p-2 rounded-lg border border-[#EAE5DF] text-[11px]">
                          <strong className="text-[#262220]">Parâmetros/Produtos: </strong>
                          <span className="text-[#544E49]">{evo.parametersUsed}</span>
                        </div>
                      )}

                      {evo.skinReaction && (
                        <div className="text-[11px] text-[#544E49]">
                          <strong className="text-[#262220]">Resposta da pele: </strong>
                          <span>{evo.skinReaction}</span>
                        </div>
                      )}

                      <p className="text-xs text-[#544E49] pt-1 leading-relaxed">
                        {evo.observations}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#EAE5DF] bg-[#FAF8F5] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-[#262220] hover:bg-[#3E3835] text-[#FFFFFF] text-xs font-semibold transition-colors"
          >
            Concluir
          </button>
        </div>
      </div>
    </div>
  );
};
