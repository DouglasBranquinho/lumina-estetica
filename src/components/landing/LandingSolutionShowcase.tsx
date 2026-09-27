"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Calendar,
  Sparkles,
  Smartphone,
  MessageCircle,
  FileText,
  Boxes,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Shield,
  Layers,
} from "lucide-react";

export function LandingSolutionShowcase() {
  const [activeTab, setActiveTab] = useState<"agenda" | "portal" | "radar" | "prontuario" | "estoque">("agenda");

  return (
    <section id="solucao" className="py-20 md:py-28 bg-[#FBFBF9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#F5EBE6] text-[#C49B88] text-xs font-semibold border border-[#EAE5DF]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>O Ecossistema Lumina</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#262220] tracking-tight">
            A tecnologia que coloca sua clínica no{" "}
            <span className="italic font-medium text-[#C49B88]">
              piloto automático de luxo.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-[#544E49] leading-relaxed">
            Desenvolvido ouvindo donas de clínicas, esteticistas, lash designers e manicures. Nada de menus confusos ou termos técnicos: apenas o que você precisa para faturar mais e atender com perfeição.
          </p>
        </div>

        {/* 5 Core Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {/* Card 1 */}
          <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#EAE5DF] shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#F5EBE6] text-[#C49B88] flex items-center justify-center">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-[#262220]">
                1. Agenda Inteligente Anticonflito
              </h3>
              <p className="text-xs sm:text-sm text-[#544E49] leading-relaxed">
                O único sistema que valida simultaneamente: <strong>Profissional + Sala + Equipamento + Tempo de Higienização</strong>. Se o laser já estiver ocupado na Cabine 2, o sistema impede a reserva automaticamente.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#EAE5DF] text-xs text-[#3C6547] font-medium flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Zero risco de constrangimento na recepção</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#EAE5DF] shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#F5EBE6] text-[#C49B88] flex items-center justify-center">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-[#262220]">
                2. Portal da Cliente (Link na Bio)
              </h3>
              <p className="text-xs sm:text-sm text-[#544E49] leading-relaxed">
                Um link sofisticado e exclusivo para colocar no Instagram e enviar no WhatsApp. Sua cliente escolhe o procedimento, a profissional e o horário livre em 4 passos sem fricção.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#EAE5DF] text-xs text-[#3C6547] font-medium flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Sua clínica agendando 24h por dia no automático</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#EAE5DF] shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#EDF4EF] text-[#3C6547] flex items-center justify-center">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-[#262220]">
                3. Radar de Retorno WhatsApp
              </h3>
              <p className="text-xs sm:text-sm text-[#544E49] leading-relaxed">
                Monitore o ciclo ideal de cada cliente (15, 20 ou 30 dias). O sistema avisa quem precisa voltar para manutenção e gera mensagens acolhedoras e personalizadas com 1 clique no WhatsApp.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#EAE5DF] text-xs text-[#3C6547] font-medium flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Aumento comprovado de +35% na retenção</span>
            </div>
          </div>

          {/* Card 4 */}
          <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#EAE5DF] shadow-xs hover:shadow-md transition-all flex flex-col justify-between md:col-span-1 lg:col-span-1">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#F5EBE6] text-[#C49B88] flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-[#262220]">
                4. Prontuários &amp; Fichas por Nicho
              </h3>
              <p className="text-xs sm:text-sm text-[#544E49] leading-relaxed">
                Fichas feitas para Lash (mapping de curvatura e espessura), Nails (formato e cor de gel), Cabelos (fórmulas Majirel/OX) e Facial. Tudo salvo no histórico da cliente.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#EAE5DF] text-xs text-[#3C6547] font-medium flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Atendimento com precisão e segurança jurídica</span>
            </div>
          </div>

          {/* Card 5 */}
          <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#EAE5DF] shadow-xs hover:shadow-md transition-all flex flex-col justify-between md:col-span-2 lg:col-span-2">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#FAF8F5] text-[#262220] flex items-center justify-center border border-[#EAE5DF]">
                <Boxes className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-[#262220]">
                5. Controle de Insumos de Bancada &amp; Revenda Home Care
              </h3>
              <p className="text-xs sm:text-sm text-[#544E49] leading-relaxed">
                Dê baixa rápida em insumos consumidos nas macas (géis, colas, ampolas) e controle o estoque de revenda no balcão (óleos, séruns) com cálculo de margem e alertas antes que o estoque acabe.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#EAE5DF] text-xs text-[#3C6547] font-medium flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Nunca mais fique sem produtos essenciais no fim de semana</span>
            </div>
          </div>
        </div>

        {/* BEFORE X AFTER COMPARISON TABLE */}
        <div id="comparativo" className="mb-24 pt-8">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
            <span className="text-xs font-semibold text-[#C49B88] uppercase tracking-widest">
              Comparativo de Realidade
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#262220]">
              O que muda na sua rotina com o Lumina?
            </h3>
          </div>

          <div className="max-w-4xl mx-auto overflow-hidden rounded-2xl border border-[#EAE5DF] bg-[#FFFFFF] shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#EAE5DF]">
              {/* Without Lumina */}
              <div className="p-6 sm:p-8 bg-[#FDFBFB] space-y-6">
                <div className="flex items-center space-x-3 pb-4 border-b border-[#EAE5DF]">
                  <div className="w-8 h-8 rounded-full bg-[#FDF0F1] text-[#94434B] flex items-center justify-center">
                    <XCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif font-semibold text-base text-[#262220]">
                      Sem o Lumina
                    </h4>
                    <p className="text-xs text-[#807770]">
                      Cadernos, planilhas e WhatsApp solto
                    </p>
                  </div>
                </div>

                <ul className="space-y-4 text-xs sm:text-sm text-[#544E49]">
                  <li className="flex items-start space-x-2.5">
                    <XCircle className="w-4 h-4 text-[#94434B] shrink-0 mt-0.5" />
                    <span>Perda de 2 a 3 horas diárias respondendo clientes com dúvidas de preços e horários livres.</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <XCircle className="w-4 h-4 text-[#94434B] shrink-0 mt-0.5" />
                    <span>Duas profissionais agendadas ao mesmo tempo para usar o mesmo laser ou a mesma cabine.</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <XCircle className="w-4 h-4 text-[#94434B] shrink-0 mt-0.5" />
                    <span>Clientes de unhas e cílios esquecem o retorno e você só percebe semanas depois.</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <XCircle className="w-4 h-4 text-[#94434B] shrink-0 mt-0.5" />
                    <span>Fichas de clientes perdidas em pastas de papel ou anotações incompletas no celular.</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <XCircle className="w-4 h-4 text-[#94434B] shrink-0 mt-0.5" />
                    <span>Surpresa no fim do mês sem saber o lucro líquido e se o produto rendeu o esperado.</span>
                  </li>
                </ul>
              </div>

              {/* With Lumina */}
              <div className="p-6 sm:p-8 bg-[#FFFFFF] space-y-6">
                <div className="flex items-center space-x-3 pb-4 border-b border-[#EAE5DF]">
                  <div className="w-8 h-8 rounded-full bg-[#EDF4EF] text-[#3C6547] flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif font-semibold text-base text-[#262220]">
                      Com o Lumina
                    </h4>
                    <p className="text-xs text-[#3C6547] font-medium">
                      Gestão inteligente, automática e elegante
                    </p>
                  </div>
                </div>

                <ul className="space-y-4 text-xs sm:text-sm text-[#262220]">
                  <li className="flex items-start space-x-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#3C6547] shrink-0 mt-0.5" />
                    <span>Link no Instagram onde a cliente escolhe o horário sozinha com confirmação direta.</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#3C6547] shrink-0 mt-0.5" />
                    <span>Trava automática que impede agendamento duplo de salas, macas e aparelhos caros.</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#3C6547] shrink-0 mt-0.5" />
                    <span>Radar WhatsApp que avisa quem está completando 18-21 dias e manda mensagem pronta.</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#3C6547] shrink-0 mt-0.5" />
                    <span>Fichas técnicas digitais com histórico de fotos, fórmulas e preferências em 1 clique.</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#3C6547] shrink-0 mt-0.5" />
                    <span>Visão clara do estoque e do rendimento de cada procedimento em tempo real.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* INTERACTIVE SHOWCASE TABS (Mostre, Não Apenas Fale) */}
        <div className="max-w-5xl mx-auto rounded-3xl bg-[#FFFFFF] border border-[#EAE5DF] p-6 sm:p-10 shadow-lg">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C49B88]">
              Degustação Interativa
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#262220]">
              Veja o sistema em ação por dentro
            </h3>
            <p className="text-xs sm:text-sm text-[#544E49]">
              Clique nas abas abaixo para ver como cada tela foi desenhada para a máxima facilidade de uso:
            </p>
          </div>

          {/* Tabs Selector */}
          <div className="flex flex-wrap items-center justify-center gap-2 pb-6 border-b border-[#EAE5DF]">
            <button
              onClick={() => setActiveTab("agenda")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === "agenda"
                  ? "bg-[#262220] text-[#FFFFFF] shadow-xs"
                  : "bg-[#FBFBF9] text-[#544E49] hover:text-[#262220] border border-[#EAE5DF]"
              }`}
            >
              Agenda Anticonflito
            </button>
            <button
              onClick={() => setActiveTab("portal")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === "portal"
                  ? "bg-[#262220] text-[#FFFFFF] shadow-xs"
                  : "bg-[#FBFBF9] text-[#544E49] hover:text-[#262220] border border-[#EAE5DF]"
              }`}
            >
              Portal da Cliente (Bio)
            </button>
            <button
              onClick={() => setActiveTab("radar")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === "radar"
                  ? "bg-[#262220] text-[#FFFFFF] shadow-xs"
                  : "bg-[#FBFBF9] text-[#544E49] hover:text-[#262220] border border-[#EAE5DF]"
              }`}
            >
              Radar WhatsApp
            </button>
            <button
              onClick={() => setActiveTab("prontuario")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === "prontuario"
                  ? "bg-[#262220] text-[#FFFFFF] shadow-xs"
                  : "bg-[#FBFBF9] text-[#544E49] hover:text-[#262220] border border-[#EAE5DF]"
              }`}
            >
              Fichas Especializadas
            </button>
            <button
              onClick={() => setActiveTab("estoque")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === "estoque"
                  ? "bg-[#262220] text-[#FFFFFF] shadow-xs"
                  : "bg-[#FBFBF9] text-[#544E49] hover:text-[#262220] border border-[#EAE5DF]"
              }`}
            >
              Controle de Estoque
            </button>
          </div>

          {/* Active Tab Showcase View */}
          <div className="pt-6">
            {activeTab === "agenda" && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="p-4 sm:p-6 bg-[#FAF8F5] rounded-2xl border border-[#EAE5DF] space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h4 className="font-serif font-semibold text-lg text-[#262220]">
                        Visualização Diária com Alerta de Sala &amp; Equipamento
                      </h4>
                      <p className="text-xs text-[#807770]">
                        Controle por cores de profissional, status e verificação de máquina
                      </p>
                    </div>
                    <Link
                      href="/"
                      className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[#C49B88] hover:underline"
                    >
                      <span>Abrir Agenda Real</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-white rounded-xl border border-[#EAE5DF] shadow-xs space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-[#262220]">10:00 — Depilação a Laser Completa</span>
                        <span className="px-2 py-0.5 rounded-full bg-[#EDF4EF] text-[#3C6547] text-[10px] font-medium">Confirmado</span>
                      </div>
                      <p className="text-[11px] text-[#544E49]">Cliente: Larissa Borges • Especialista: Dra. Camila</p>
                      <div className="flex items-center space-x-2 text-[10px] text-[#807770]">
                        <span>Cabine 2 (Laser Soprano)</span>
                        <span>•</span>
                        <span>Duração: 60min + 15min higienização</span>
                      </div>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-[#EAE5DF] shadow-xs space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-[#262220]">11:30 — Alongamento em Gel Slim</span>
                        <span className="px-2 py-0.5 rounded-full bg-[#FEF8ED] text-[#966116] text-[10px] font-medium">Aguardando</span>
                      </div>
                      <p className="text-[11px] text-[#544E49]">Cliente: Fernanda Lima • Nail Designer: Vanessa</p>
                      <div className="flex items-center space-x-2 text-[10px] text-[#807770]">
                        <span>Bancada 01 • Cabine LED UV</span>
                        <span>•</span>
                        <span>Duração: 90min</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "portal" && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="p-4 sm:p-6 bg-[#FAF8F5] rounded-2xl border border-[#EAE5DF] space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h4 className="font-serif font-semibold text-lg text-[#262220]">
                        Experiência Premium no Celular da Sua Cliente
                      </h4>
                      <p className="text-xs text-[#807770]">
                        A cliente seleciona o procedimento e vê apenas horários realmente vagos
                      </p>
                    </div>
                    <Link
                      href="/agendar/lumina"
                      target="_blank"
                      className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[#C49B88] hover:underline"
                    >
                      <span>Testar Página da Cliente</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  <div className="max-w-md mx-auto p-4 bg-white rounded-2xl border border-[#EAE5DF] shadow-sm space-y-3 text-xs">
                    <div className="flex items-center justify-between border-b pb-2">
                      <span className="text-[11px] font-medium text-[#807770]">Passo 2 de 4: Horários Disponíveis</span>
                      <span className="text-[11px] font-semibold text-[#C49B88]">Sábado, 28/09</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <button className="py-2 rounded-lg bg-[#F5EBE6] text-[#262220] font-semibold border border-[#E8DCD5]">09:30</button>
                      <button className="py-2 rounded-lg bg-[#FBFBF9] text-[#544E49] border border-[#EAE5DF]">11:00</button>
                      <button className="py-2 rounded-lg bg-[#FBFBF9] text-[#544E49] border border-[#EAE5DF]">14:30</button>
                    </div>
                    <p className="text-[10px] text-center text-[#807770]">
                      Horários protegidos por validação em tempo real no banco de dados.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "radar" && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="p-4 sm:p-6 bg-[#FAF8F5] rounded-2xl border border-[#EAE5DF] space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h4 className="font-serif font-semibold text-lg text-[#262220]">
                        Automação de Retorno Ativo com Disparo de WhatsApp
                      </h4>
                      <p className="text-xs text-[#807770]">
                        Nunca mais perca o momento em que a cliente precisa refazer o procedimento
                      </p>
                    </div>
                    <Link
                      href="/"
                      className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[#C49B88] hover:underline"
                    >
                      <span>Ver no Sistema</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  <div className="p-4 bg-white rounded-xl border border-[#EAE5DF] space-y-2 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-[#262220]">Renata Albuquerque — Cílios Volume Fox</span>
                      <span className="px-2 py-0.5 rounded-full bg-[#FEF8ED] text-[#966116] text-[10px] font-semibold">19 dias decorridos</span>
                    </div>
                    <div className="bg-[#FAF8F5] p-3 rounded-lg border border-[#EAE5DF] text-[11px] text-[#544E49]">
                      &ldquo;Olá Renata! Seu olhar impecável completa 19 dias hoje. Podemos reservar a sua manutenção para sexta-feira às 15h?&rdquo;
                    </div>
                    <div className="flex justify-end pt-1">
                      <button className="px-4 py-1.5 rounded-lg bg-[#25D366] text-white text-xs font-semibold flex items-center space-x-1.5 shadow-xs">
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Enviar pelo WhatsApp</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "prontuario" && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="p-4 sm:p-6 bg-[#FAF8F5] rounded-2xl border border-[#EAE5DF] space-y-4">
                  <h4 className="font-serif font-semibold text-lg text-[#262220]">
                    Fichas Técnicas Personalizadas para o seu Nicho
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="p-3 bg-white rounded-xl border border-[#EAE5DF]">
                      <span className="font-semibold text-[#C49B88] block mb-1">Lash Designer</span>
                      <p className="text-[11px] text-[#544E49]">Mapping, Curvatura (C, D, L), Espessura, Cola utilizada e data de abertura do frasco.</p>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-[#EAE5DF]">
                      <span className="font-semibold text-[#C49B88] block mb-1">Nail Designer</span>
                      <p className="text-[11px] text-[#544E49]">Formato (Almond, Bailarina, Quadrada), gel base, esmalte favorito e sensibilidade à cabine.</p>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-[#EAE5DF]">
                      <span className="font-semibold text-[#C49B88] block mb-1">Cabelo &amp; Estética</span>
                      <p className="text-[11px] text-[#544E49]">Fórmulas de coloração, histórico de mechas, anamnese facial e contraindicações.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "estoque" && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="p-4 sm:p-6 bg-[#FAF8F5] rounded-2xl border border-[#EAE5DF] space-y-4">
                  <h4 className="font-serif font-semibold text-lg text-[#262220]">
                    Separação Clara: Insumos de Bancada vs Produtos de Revenda
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-white rounded-xl border border-[#EAE5DF] space-y-1">
                      <span className="font-semibold text-[#262220]">Insumos de Consumo Interno</span>
                      <p className="text-[11px] text-[#807770]">Baixa rápida com 1 clique ao finalizar atendimento. Alertas de reposição antes do estoque zerar.</p>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-[#EAE5DF] space-y-1">
                      <span className="font-semibold text-[#262220]">Venda de Balcão (Home Care)</span>
                      <p className="text-[11px] text-[#807770]">Cálculo automático de margem de lucro por produto vendido e integração com o faturamento.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
