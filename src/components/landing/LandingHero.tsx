"use client";

import React from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Clock,
  Users,
  AlertCircle,
  MessageCircle,
} from "lucide-react";

export function LandingHero() {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-16 md:pb-28 bg-gradient-to-b from-[#FFFFFF] via-[#FBFBF9] to-[#F5F2ED]">
      {/* Decorative luxury blur spheres */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#F5EBE6]/60 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-40 right-10 w-[350px] h-[350px] bg-[#F9F1EE]/50 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Tag / Pill */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#FFFFFF] border border-[#EAE5DF] shadow-xs text-xs text-[#544E49] font-medium">
            <span className="flex h-2 w-2 rounded-full bg-[#C49B88] animate-pulse" />
            <span className="font-semibold text-[#262220]">Lumina 2.0</span>
            <span className="text-[#807770]">|</span>
            <span>A plataforma feita sob medida para a estética de alto padrão</span>
          </div>
        </div>

        {/* Hero Title & Promise */}
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#262220] leading-[1.15]">
            A gestão elegante e a agenda anticonflito que a sua clínica{" "}
            <span className="italic font-medium text-[#C49B88]">
              sempre mereceu.
            </span>
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-[#544E49] max-w-2xl mx-auto font-normal leading-relaxed">
            Elimine furos de agenda, acabe de vez com o choque de salas e aparelhos
            caros, automatize reservas pelo WhatsApp e fidelize clientes com o
            Radar de Retorno — <strong>sem planilhas e sem taxas abusivas</strong>.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <a
              href="#precos"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 px-7 py-3.5 rounded-xl text-sm font-semibold bg-[#262220] text-[#FFFFFF] hover:bg-[#3D3734] transition-all shadow-md hover:shadow-lg group"
            >
              <Sparkles className="w-4 h-4 text-[#C49B88]" />
              <span>Experimentar Grátis por 14 Dias</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-[#262220] bg-[#FFFFFF] hover:bg-[#FAF8F5] border border-[#EAE5DF] hover:border-[#D8D0C7] transition-all shadow-xs"
            >
              <span>Ver Demonstração Interativa</span>
            </Link>
          </div>

          {/* Assurance bullet points */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-2 text-xs text-[#807770]">
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#3C6547]" />
              <span>Sem cartão de crédito</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#3C6547]" />
              <span>Instalação imediata no celular e PC</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#3C6547]" />
              <span>Suporte e migração inclusos</span>
            </div>
          </div>
        </div>

        {/* Hero Interactive Visual Mockup */}
        <div className="mt-12 sm:mt-16 max-w-5xl mx-auto">
          <div className="relative rounded-2xl border border-[#EAE5DF] bg-[#FFFFFF] shadow-2xl p-2 sm:p-4">
            {/* Window header simulation */}
            <div className="flex items-center justify-between pb-3 px-2 border-b border-[#EAE5DF]">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-[#EAE5DF]" />
                <div className="w-3 h-3 rounded-full bg-[#EAE5DF]" />
                <div className="w-3 h-3 rounded-full bg-[#EAE5DF]" />
                <span className="text-[11px] font-mono text-[#807770] ml-2 hidden sm:inline">
                  lumina-gestao.web.app
                </span>
              </div>
              <div className="flex items-center space-x-3 text-xs text-[#807770]">
                <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-[#EDF4EF] text-[#3C6547] text-[10px] font-medium border border-[#CBE0D2]">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Nuvem Ativa</span>
                </span>
                <span className="font-serif italic text-[#C49B88] font-medium">
                  Lumina Studio &amp; Spa
                </span>
              </div>
            </div>

            {/* Mockup Content Grid */}
            <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#FBFBF9]/50 rounded-b-xl">
              {/* Card 1: Agenda Anticonflito */}
              <div className="bg-[#FFFFFF] p-4 rounded-xl border border-[#EAE5DF] shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="p-1.5 rounded-lg bg-[#F5EBE6] text-[#C49B88]">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-semibold text-[#262220]">
                      Agenda do Dia
                    </span>
                  </div>
                  <span className="text-[10px] font-medium text-[#3C6547] bg-[#EDF4EF] px-2 py-0.5 rounded-full">
                    3/3 Cabines Livres
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-[#FAF8F5] border border-[#EAE5DF] flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-[#262220]">
                        Mariana Vasconcelos
                      </p>
                      <p className="text-[10px] text-[#807770]">
                        Volume Brasileiro • Camila Duarte
                      </p>
                    </div>
                    <span className="text-[11px] font-medium text-[#C49B88]">
                      14:00
                    </span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-[#FAF8F5] border border-[#EAE5DF] flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-[#262220]">
                        Beatriz Silveira
                      </p>
                      <p className="text-[10px] text-[#807770]">
                        Laser Soprano • Cabine 2 (Reservado)
                      </p>
                    </div>
                    <span className="text-[11px] font-medium text-[#C49B88]">
                      15:30
                    </span>
                  </div>
                </div>

                <div className="pt-1 flex items-center space-x-1.5 text-[11px] text-[#3C6547]">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Zero choque de equipamentos ou salas</span>
                </div>
              </div>

              {/* Card 2: Radar de Retorno WhatsApp */}
              <div className="bg-[#FFFFFF] p-4 rounded-xl border border-[#EAE5DF] shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="p-1.5 rounded-lg bg-[#EDF4EF] text-[#3C6547]">
                      <MessageCircle className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-semibold text-[#262220]">
                      Radar de Retorno (Zap)
                    </span>
                  </div>
                  <span className="text-[10px] font-medium text-[#966116] bg-[#FEF8ED] px-2 py-0.5 rounded-full">
                    4 Clientes no Ciclo
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-[#FDF9F7] border border-[#E8DCD5] space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#262220]">
                      Juliana Mendes (18 dias)
                    </span>
                    <span className="text-[10px] text-[#C49B88] font-medium">
                      Manutenção de Gel
                    </span>
                  </div>
                  <p className="text-[11px] text-[#544E49] leading-snug italic bg-white p-2 rounded border border-[#EAE5DF]">
                    &ldquo;Oi Ju! Suas unhas completam 18 dias hoje. Vamos garantir
                    seu horário para manter o alinhamento impecável? ✨&rdquo;
                  </p>
                  <button className="w-full py-1.5 rounded-md text-[11px] font-semibold bg-[#25D366] text-white hover:bg-[#1EBE5D] transition-colors flex items-center justify-center space-x-1.5 shadow-xs">
                    <MessageCircle className="w-3 h-3" />
                    <span>Disparar no WhatsApp em 1 Clique</span>
                  </button>
                </div>

                <div className="pt-1 flex items-center space-x-1.5 text-[11px] text-[#807770]">
                  <span>+35% de agendamentos recuperados</span>
                </div>
              </div>

              {/* Card 3: Link de Agendamento da Cliente */}
              <div className="bg-[#FFFFFF] p-4 rounded-xl border border-[#EAE5DF] shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="p-1.5 rounded-lg bg-[#F5EBE6] text-[#C49B88]">
                      <Users className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-semibold text-[#262220]">
                      Portal da Cliente (Bio)
                    </span>
                  </div>
                  <span className="text-[10px] font-medium text-[#3C6547] bg-[#EDF4EF] px-2 py-0.5 rounded-full">
                    24h Aberto
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-[#FAF8F5] border border-[#EAE5DF] text-xs space-y-2">
                  <p className="text-[11px] text-[#544E49]">
                    Sua cliente escolhe o procedimento, a profissional e o
                    horário ideal pelo celular sem precisar mandar direct.
                  </p>
                  <div className="bg-white p-2 rounded border border-[#EAE5DF] flex items-center justify-between">
                    <span className="text-[11px] font-mono text-[#807770] truncate">
                      lumina.app/agendar/suaclinica
                    </span>
                    <Link
                      href="/agendar/lumina"
                      className="text-[10px] font-semibold text-[#C49B88] hover:underline shrink-0 ml-2"
                      target="_blank"
                    >
                      Testar Link
                    </Link>
                  </div>
                  <div className="flex items-center justify-between pt-1 text-[11px]">
                    <span className="text-[#807770]">Horários em tempo real</span>
                    <span className="text-[#3C6547] font-semibold">100% Sincronizado</span>
                  </div>
                </div>

                <div className="pt-1 flex items-center space-x-1.5 text-[11px] text-[#3C6547]">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Economize 14h de WhatsApp por semana</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
