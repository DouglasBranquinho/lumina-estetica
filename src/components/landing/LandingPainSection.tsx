"use client";

import React from "react";
import { MessageSquareOff, CalendarX2, UserX, FileSpreadsheet, AlertTriangle } from "lucide-react";

export function LandingPainSection() {
  const pains = [
    {
      icon: MessageSquareOff,
      badge: "Perda de Tempo & Estresse",
      title: "O WhatsApp virou uma prisão no seu dia a dia?",
      description:
        "Você passa horas respondendo 'qual o valor?', 'tem horário pra sábado?', mandando áudios e tentando conciliar a agenda enquanto está no meio de um procedimento ou tarde da noite.",
      impact: "Média de 14 horas perdidas por semana só negociando horários.",
    },
    {
      icon: CalendarX2,
      badge: "Constrangimento na Recepção",
      title: "O choque de salas e aparelhos caros entre profissionais",
      description:
        "Duas clientes chegam no mesmo horário para fazer procedimentos que usam a mesma cabine de laser ou a mesma maca. O resultado? Espera longa, desconforto e queima da reputação da clínica.",
      impact: "A maioria dos sistemas só olha o profissional, esquecendo a máquina e a sala.",
    },
    {
      icon: UserX,
      badge: "Faturamento Deixado na Mesa",
      title: "Clientes que fazem o procedimento e somem?",
      description:
        "Alongamento em gel, volume de cílios e tratamentos faciais exigem ciclos de 15 a 21 dias. Sem um alerta inteligente, você esquece de chamar a cliente no momento exato — e ela vai para a concorrente.",
      impact: "Até 40% das clientes não retornam por pura falta de contato ativo no timing certo.",
    },
    {
      icon: FileSpreadsheet,
      badge: "Cegueira Financeira & Insumos",
      title: "Planilhas confusas e sem controle de estoque",
      description:
        "Você gasta rios de dinheiro com géis Vòlia, colas de cílios, toxina e ampolas, mas não sabe o rendimento real de cada item e muitas vezes descobre que o produto acabou bem no sábado de manhã.",
      impact: "Desperdício silencioso que corrói até 25% da sua margem líquida.",
    },
  ];

  return (
    <section id="problema" className="py-20 md:py-28 bg-[#FFFFFF] border-y border-[#EAE5DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#FDF0F1] text-[#94434B] text-xs font-semibold border border-[#F7CED2]">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Identifique a Realidade do Seu Negócio</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-normal text-[#262220] tracking-tight">
            Gerenciar uma clínica de estética{" "}
            <span className="italic font-medium text-[#94434B]">
              não deveria ser tão desgastante.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-[#544E49] leading-relaxed">
            Se você se identifica com uma ou mais das situações abaixo, saiba que o problema não é a sua dedicação — é a falta de uma ferramenta desenhada especificamente para a complexidade da estética.
          </p>
        </div>

        {/* Pains Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {pains.map((pain, index) => {
            const Icon = pain.icon;
            return (
              <div
                key={index}
                className="p-6 sm:p-8 rounded-2xl bg-[#FBFBF9] border border-[#EAE5DF] hover:border-[#D8A48F] transition-all duration-300 flex flex-col justify-between group shadow-xs hover:shadow-md"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-[#FFFFFF] border border-[#EAE5DF] flex items-center justify-center text-[#94434B] group-hover:scale-105 transition-transform shadow-xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold text-[#807770] uppercase tracking-wider bg-[#FFFFFF] px-2.5 py-1 rounded-md border border-[#EAE5DF]">
                      {pain.badge}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg sm:text-xl font-semibold text-[#262220] leading-snug">
                    {pain.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#544E49] leading-relaxed">
                    {pain.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#EAE5DF]/80 flex items-center space-x-2 text-xs text-[#94434B] font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#94434B]" />
                  <span>{pain.impact}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Problem to Solution Bridge */}
        <div className="mt-16 text-center">
          <p className="text-sm font-medium text-[#807770]">
            Existe uma forma muito mais inteligente, leve e lucrativa de trabalhar.
          </p>
          <div className="mt-3 flex justify-center">
            <a
              href="#solucao"
              className="inline-flex items-center space-x-2 text-xs font-semibold text-[#C49B88] hover:text-[#B38672] uppercase tracking-widest transition-colors"
            >
              <span>Conheça a Solução Lumina</span>
              <span>↓</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
