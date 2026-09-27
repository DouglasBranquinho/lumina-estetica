"use client";

import React from "react";
import { Star, ShieldCheck, TrendingUp, Users, Clock, Award } from "lucide-react";

export function LandingSocialProof() {
  const testimonials = [
    {
      name: "Dra. Camila Duarte",
      role: "Fundadora • Clínica Dermato & Laser",
      city: "São Paulo, SP",
      avatarLetter: "C",
      rating: 5,
      comment:
        "O que mais me impressionou foi a trava de equipamentos físicos. Eu tinha constante dor de cabeça com esteticistas tentando usar o mesmo laser no mesmo horário em salas diferentes. Com o Lumina esse problema simplesmente acabou.",
      highlight: "Zero conflitos de salas e aparelhos",
    },
    {
      name: "Mariana Siqueira",
      role: "Lash Master & Proprietária • Studio Mari Lash",
      city: "Curitiba, PR",
      avatarLetter: "M",
      rating: 5,
      comment:
        "O Radar de Retorno no WhatsApp é surreal! Na correria dos atendimentos eu esquecia de chamar as clientes no ciclo de 18 a 21 dias. Só na primeira semana de uso recuperamos 11 manutenções de volume russo que teriam ido para a concorrência.",
      highlight: "+R$ 2.400 recuperados logo no primeiro mês",
    },
    {
      name: "Beatriz Albuquerque",
      role: "Nail Designer & Sócia • Lumina Beauty Spa",
      city: "Belo Horizonte, MG",
      avatarLetter: "B",
      rating: 5,
      comment:
        "O visual do Lumina é incomparável. Todos os outros sistemas do mercado parecem planilhas cinzas dos anos 2000. O Lumina tem a paleta porcelana que transmite o luxo e o padrão elevado que minhas clientes esperam.",
      highlight: "Design boutique acolhedor e intuitivo",
    },
  ];

  return (
    <section id="depoimentos" className="py-20 md:py-28 bg-[#FFFFFF] border-y border-[#EAE5DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Real Numbers & Metrics Banner */}
        <div className="mb-20 max-w-5xl mx-auto rounded-3xl bg-[#FAF8F5] border border-[#EAE5DF] p-8 sm:p-12 shadow-xs">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y sm:divide-y-0 sm:divide-x divide-[#EAE5DF]/70">
            <div className="space-y-1">
              <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#262220] tabular-nums">
                +35%
              </span>
              <p className="text-xs text-[#807770]">Taxa de Retorno de Clientes</p>
            </div>

            <div className="space-y-1 pt-4 sm:pt-0">
              <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#3C6547] tabular-nums">
                0
              </span>
              <p className="text-xs text-[#807770]">Choque de Salas ou Lasers</p>
            </div>

            <div className="space-y-1 pt-4 sm:pt-0">
              <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#C49B88] tabular-nums">
                14h
              </span>
              <p className="text-xs text-[#807770]">Economizadas no WhatsApp/Semana</p>
            </div>

            <div className="space-y-1 pt-4 sm:pt-0">
              <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#262220] tabular-nums">
                99.9%
              </span>
              <p className="text-xs text-[#807770]">Disponibilidade Google Cloud</p>
            </div>
          </div>
        </div>

        {/* Testimonials Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#EDF4EF] text-[#3C6547] text-xs font-semibold border border-[#CBE0D2]">
            <Award className="w-3.5 h-3.5" />
            <span>Casos Reais de Quem Usa e Recomenda</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#262220] tracking-tight">
            Aprovado por quem vive a rotina de um{" "}
            <span className="italic font-medium text-[#C49B88]">
              estúdio de beleza de sucesso.
            </span>
          </h2>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="p-6 sm:p-8 rounded-2xl bg-[#FBFBF9] border border-[#EAE5DF] shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* 5 Stars */}
                <div className="flex items-center space-x-1 text-[#D8A48F]">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                {/* Highlight Quote */}
                <p className="text-xs font-semibold text-[#C49B88] uppercase tracking-wide">
                  &ldquo;{item.highlight}&rdquo;
                </p>

                {/* Comment */}
                <p className="text-xs sm:text-sm text-[#544E49] leading-relaxed italic">
                  &ldquo;{item.comment}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="mt-6 pt-4 border-t border-[#EAE5DF] flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-[#F5EBE6] text-[#C49B88] flex items-center justify-center font-serif font-bold text-sm border border-[#EAE5DF]">
                  {item.avatarLetter}
                </div>
                <div>
                  <h4 className="font-semibold text-xs text-[#262220]">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-[#807770] leading-tight">
                    {item.role}
                  </p>
                  <p className="text-[10px] text-[#807770] mt-0.5">{item.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges Bar */}
        <div className="mt-16 pt-8 border-t border-[#EAE5DF] flex flex-wrap items-center justify-center gap-8 text-xs text-[#807770]">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-[#3C6547]" />
            <span>Infraestrutura em Nuvem Google Firebase</span>
          </div>
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-[#3C6547]" />
            <span>Backup automático diário dos seus dados</span>
          </div>
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-[#3C6547]" />
            <span>Conformidade com a LGPD</span>
          </div>
        </div>
      </div>
    </section>
  );
}
