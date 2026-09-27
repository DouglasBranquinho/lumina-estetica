"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, Sparkles, Shield, ArrowRight, HelpCircle } from "lucide-react";

export function LandingPricing() {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: "Solo & Estúdio",
      tagline: "Para profissionais autônomas e estúdios independentes.",
      monthlyPrice: 79,
      annualPrice: 59,
      popular: false,
      features: [
        "1 Profissional / Especialista",
        "Portal de Agendamento da Cliente na Bio",
        "Agenda Anticonflito Individual",
        "Prontuários e Fichas de Anamnese Básicas",
        "Lembretes de Confirmação no WhatsApp",
        "Acesso ilimitado no celular e computador",
      ],
      ctaText: "Começar Teste Grátis",
      ctaLink: "/?trial=solo",
    },
    {
      name: "Boutique",
      tagline: "O plano mais amado por estúdios de unhas, lash e clínicas integradas.",
      monthlyPrice: 149,
      annualPrice: 119,
      popular: true,
      features: [
        "Até 6 Profissionais com agendas individuais",
        "Gestão Anticonflito de Salas & Equipamentos (Laser, Cabines LED)",
        "Radar de Retorno WhatsApp com 1 Clique (Manutenção 15-21 dias)",
        "Portal de Agendamento da Cliente com escolha de especialista",
        "Fichas Técnicas por Nicho (Lash Mapping, Gel, Fórmulas)",
        "Controle de Insumos de Bancada & Revenda Home Care",
        "Suporte humanizado prioritário pelo WhatsApp",
      ],
      ctaText: "Experimentar 14 Dias Grátis",
      ctaLink: "/?trial=boutique",
    },
    {
      name: "Clinic Prime",
      tagline: "Para clínicas de estética avançada, franquias e equipes completas.",
      monthlyPrice: 249,
      annualPrice: 199,
      popular: false,
      features: [
        "Profissionais e Especialistas ilimitados",
        "Salas, Macas e Equipamentos ilimitados",
        "Multi-unidades / Filiais integradas",
        "Métricas e Relatórios Financeiros avançados",
        "Migração gratuita da sua base de dados anterior",
        "Consultoria de Implantação e treinamento da equipe",
        "Gerente de conta exclusivo no WhatsApp",
      ],
      ctaText: "Falar com Consultor",
      ctaLink: "https://wa.me/5511999999999?text=Olá!%20Gostaria%20de%20conhecer%20o%20Plano%20Prime%20do%20Lumina",
    },
  ];

  return (
    <section id="precos" className="py-20 md:py-28 bg-[#FBFBF9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#F5EBE6] text-[#C49B88] text-xs font-semibold border border-[#EAE5DF]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Investimento Transparente</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#262220] tracking-tight">
            Planos simples que cabem no bolso e{" "}
            <span className="italic font-medium text-[#C49B88]">
              se pagam no primeiro dia.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-[#544E49] leading-relaxed">
            Sem pegadinhas, sem taxas por agendamento e sem contratos de fidelidade. Teste gratuitamente por 14 dias sem precisar cadastrar cartão de crédito.
          </p>

          {/* Billing Interval Toggle */}
          <div className="pt-4 flex items-center justify-center space-x-3">
            <span
              className={`text-xs font-semibold ${
                !isAnnual ? "text-[#262220]" : "text-[#807770]"
              }`}
            >
              Cobrança Mensal
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative w-14 h-7 bg-[#EAE5DF] rounded-full p-1 transition-colors focus:outline-none"
              aria-label="Alternar entre cobrança mensal e anual"
            >
              <div
                className={`w-5 h-5 bg-[#262220] rounded-full shadow-md transform transition-transform ${
                  isAnnual ? "translate-x-7" : "translate-x-0"
                }`}
              />
            </button>
            <div className="flex items-center space-x-1.5">
              <span
                className={`text-xs font-semibold ${
                  isAnnual ? "text-[#262220]" : "text-[#807770]"
                }`}
              >
                Cobrança Anual
              </span>
              <span className="text-[10px] font-bold text-[#3C6547] bg-[#EDF4EF] px-2 py-0.5 rounded-full border border-[#CBE0D2]">
                Economize 20%
              </span>
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
          {plans.map((plan, index) => {
            const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;

            return (
              <div
                key={index}
                className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
                  plan.popular
                    ? "bg-[#FFFFFF] border-2 border-[#C49B88] shadow-xl lg:-translate-y-2"
                    : "bg-[#FFFFFF] border border-[#EAE5DF] shadow-xs hover:shadow-md"
                }`}
              >
                {/* Popular Pill */}
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#C49B88] text-[#FFFFFF] text-[11px] font-semibold tracking-wider uppercase shadow-xs flex items-center space-x-1">
                    <Sparkles className="w-3 h-3" />
                    <span>Mais Escolhido</span>
                  </div>
                )}

                <div className="space-y-6">
                  {/* Plan Title & Tagline */}
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#262220]">
                      {plan.name}
                    </h3>
                    <p className="text-xs text-[#807770] mt-1 leading-snug">
                      {plan.tagline}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline space-x-1 border-b border-[#EAE5DF] pb-6">
                    <span className="text-xs font-semibold text-[#807770]">R$</span>
                    <span className="font-serif text-4xl sm:text-5xl font-semibold text-[#262220] tabular-nums">
                      {price}
                    </span>
                    <span className="text-xs text-[#807770]">
                      /mês {isAnnual && <span className="block text-[10px] text-[#3C6547] font-semibold">faturado anualmente</span>}
                    </span>
                  </div>

                  {/* Feature List */}
                  <div className="space-y-3">
                    <p className="text-[11px] font-semibold text-[#807770] uppercase tracking-wider">
                      O que está incluso:
                    </p>
                    <ul className="space-y-3 text-xs text-[#544E49]">
                      {plan.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-start space-x-2.5">
                          <Check className="w-4 h-4 text-[#3C6547] shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Plan CTA */}
                <div className="pt-8">
                  <Link
                    href={plan.ctaLink}
                    className={`w-full py-3.5 rounded-xl text-xs font-semibold flex items-center justify-center space-x-2 transition-all shadow-xs ${
                      plan.popular
                        ? "bg-[#262220] text-[#FFFFFF] hover:bg-[#3D3734] shadow-md"
                        : "bg-[#F5EBE6] text-[#262220] hover:bg-[#EBDDD5] border border-[#E8DCD5]"
                    }`}
                  >
                    <span>{plan.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <p className="text-[10px] text-center text-[#807770] mt-2">
                    14 dias grátis • Sem cartão de crédito
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* COMPARATIVE FEATURE TABLE */}
        <div className="mt-20 max-w-5xl mx-auto">
          <div className="text-center space-y-3 mb-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C49B88]">
              Visão Detalhada
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#262220]">
              Compare todos os recursos lado a lado
            </h3>
            <p className="text-xs sm:text-sm text-[#544E49]">
              Entenda exatamente o que está incluso em cada plano para fazer a melhor escolha para o seu momento.
            </p>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-[#EAE5DF] bg-[#FFFFFF] shadow-sm">
            <table className="w-full text-left border-collapse min-w-[620px]">
              <thead>
                <tr className="border-b border-[#EAE5DF] bg-[#FAF8F5]">
                  <th className="py-4 px-6 text-xs font-semibold text-[#807770] uppercase tracking-wider w-2/5">
                    Funcionalidade
                  </th>
                  <th className="py-4 px-4 text-xs font-semibold text-[#262220] text-center w-1/5">
                    Solo &amp; Estúdio
                    <span className="block text-[11px] font-normal text-[#807770]">R$ 59/mês</span>
                  </th>
                  <th className="py-4 px-4 text-xs font-bold text-[#C49B88] text-center w-1/5 bg-[#FDF9F7] border-x border-[#EAE5DF]">
                    <div className="inline-flex items-center space-x-1">
                      <span>Boutique</span>
                      <Sparkles className="w-3 h-3 text-[#C49B88]" />
                    </div>
                    <span className="block text-[11px] font-semibold text-[#262220]">R$ 119/mês</span>
                  </th>
                  <th className="py-4 px-4 text-xs font-semibold text-[#262220] text-center w-1/5">
                    Clinic Prime 👑
                    <span className="block text-[11px] font-normal text-[#807770]">R$ 199/mês</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAE5DF] text-xs">
                {/* Row 1 */}
                <tr className="hover:bg-[#FBFBF9] transition-colors">
                  <td className="py-3.5 px-6 font-medium text-[#262220]">
                    Profissionais / Especialistas
                  </td>
                  <td className="py-3.5 px-4 text-center text-[#544E49] font-medium">1</td>
                  <td className="py-3.5 px-4 text-center font-bold text-[#262220] bg-[#FDF9F7] border-x border-[#EAE5DF]">
                    Até 6
                  </td>
                  <td className="py-3.5 px-4 text-center font-semibold text-[#3C6547]">Ilimitadas</td>
                </tr>

                {/* Row 2 */}
                <tr className="hover:bg-[#FBFBF9] transition-colors">
                  <td className="py-3.5 px-6 font-medium text-[#262220]">
                    Link de Agendamento na Bio do Instagram
                  </td>
                  <td className="py-3.5 px-4 text-center text-[#3C6547] font-semibold">
                    <span className="inline-flex items-center space-x-1">
                      <Check className="w-4 h-4 inline" /> <span>Sim</span>
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center text-[#3C6547] font-bold bg-[#FDF9F7] border-x border-[#EAE5DF]">
                    <span className="inline-flex items-center space-x-1">
                      <Check className="w-4 h-4 inline" /> <span>Sim</span>
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center text-[#3C6547] font-semibold">
                    <span className="inline-flex items-center space-x-1">
                      <Check className="w-4 h-4 inline" /> <span>Sim</span>
                    </span>
                  </td>
                </tr>

                {/* Row 3 - The Key Differentiator */}
                <tr className="hover:bg-[#FBFBF9] transition-colors bg-[#FAF8F5]/30">
                  <td className="py-3.5 px-6 font-medium text-[#262220]">
                    Prevenção de Choque de Salas &amp; Lasers
                    <span className="block text-[10px] text-[#807770]">Trava inteligente de equipamentos caros e cabines</span>
                  </td>
                  <td className="py-3.5 px-4 text-center text-[#94434B] font-medium">✕ Não</td>
                  <td className="py-3.5 px-4 text-center text-[#3C6547] font-bold bg-[#FDF9F7] border-x border-[#EAE5DF]">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#EDF4EF] text-[#3C6547] text-[10px] font-bold">
                      ✓ Sim (Exclusivo)
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center text-[#3C6547] font-semibold">✓ Sim</td>
                </tr>

                {/* Row 4 - The Retention Engine */}
                <tr className="hover:bg-[#FBFBF9] transition-colors bg-[#FAF8F5]/30">
                  <td className="py-3.5 px-6 font-medium text-[#262220]">
                    Radar de Retorno WhatsApp (15 a 21 dias)
                    <span className="block text-[10px] text-[#807770]">Disparo pronto para resgatar manutenção de unhas e cílios</span>
                  </td>
                  <td className="py-3.5 px-4 text-center text-[#94434B] font-medium">✕ Não</td>
                  <td className="py-3.5 px-4 text-center text-[#3C6547] font-bold bg-[#FDF9F7] border-x border-[#EAE5DF]">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#EDF4EF] text-[#3C6547] text-[10px] font-bold">
                      ✓ Sim (1 Clique)
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center text-[#3C6547] font-semibold">✓ Sim</td>
                </tr>

                {/* Row 5 */}
                <tr className="hover:bg-[#FBFBF9] transition-colors">
                  <td className="py-3.5 px-6 font-medium text-[#262220]">
                    Fichas Técnicas Lash / Nails / Cabelo
                  </td>
                  <td className="py-3.5 px-4 text-center text-[#544E49]">Básica</td>
                  <td className="py-3.5 px-4 text-center text-[#3C6547] font-bold bg-[#FDF9F7] border-x border-[#EAE5DF]">
                    ✓ Completa
                  </td>
                  <td className="py-3.5 px-4 text-center text-[#3C6547] font-semibold">✓ Completa</td>
                </tr>

                {/* Row 6 */}
                <tr className="hover:bg-[#FBFBF9] transition-colors">
                  <td className="py-3.5 px-6 font-medium text-[#262220]">
                    Controle de Insumos &amp; Revenda Home Care
                  </td>
                  <td className="py-3.5 px-4 text-center text-[#94434B] font-medium">✕ Não</td>
                  <td className="py-3.5 px-4 text-center text-[#3C6547] font-bold bg-[#FDF9F7] border-x border-[#EAE5DF]">
                    ✓ Sim
                  </td>
                  <td className="py-3.5 px-4 text-center text-[#3C6547] font-semibold">✓ Sim</td>
                </tr>

                {/* Row 7 */}
                <tr className="hover:bg-[#FBFBF9] transition-colors">
                  <td className="py-3.5 px-6 font-medium text-[#262220]">
                    Multi-Unidades (Múltiplas Filiais)
                  </td>
                  <td className="py-3.5 px-4 text-center text-[#94434B] font-medium">✕ Não</td>
                  <td className="py-3.5 px-4 text-center text-[#94434B] font-medium bg-[#FDF9F7] border-x border-[#EAE5DF]">
                    ✕ Não
                  </td>
                  <td className="py-3.5 px-4 text-center text-[#3C6547] font-bold">✓ Sim</td>
                </tr>

                {/* Row 8 */}
                <tr className="hover:bg-[#FBFBF9] transition-colors">
                  <td className="py-3.5 px-6 font-medium text-[#262220]">
                    Migração Gratuita de Dados do Sistema Anterior
                  </td>
                  <td className="py-3.5 px-4 text-center text-[#94434B] font-medium">✕ Não</td>
                  <td className="py-3.5 px-4 text-center text-[#94434B] font-medium bg-[#FDF9F7] border-x border-[#EAE5DF]">
                    ✕ Não
                  </td>
                  <td className="py-3.5 px-4 text-center text-[#3C6547] font-bold">✓ Sim</td>
                </tr>

                {/* Row 9 */}
                <tr className="hover:bg-[#FBFBF9] transition-colors">
                  <td className="py-3.5 px-6 font-medium text-[#262220]">
                    Nível de Suporte
                  </td>
                  <td className="py-3.5 px-4 text-center text-[#544E49]">Padrão</td>
                  <td className="py-3.5 px-4 text-center text-[#262220] font-bold bg-[#FDF9F7] border-x border-[#EAE5DF]">
                    Prioritário no WhatsApp
                  </td>
                  <td className="py-3.5 px-4 text-center text-[#C49B88] font-bold">Gerente de Conta VIP</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Risk-free Guarantee Box */}
        <div className="mt-16 max-w-4xl mx-auto rounded-2xl bg-[#FFFFFF] border border-[#EAE5DF] p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <div className="w-14 h-14 rounded-2xl bg-[#EDF4EF] text-[#3C6547] flex items-center justify-center shrink-0">
            <Shield className="w-7 h-7" />
          </div>
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-serif text-base font-semibold text-[#262220]">
              Garantia Incondicional de Tranquilidade
            </h4>
            <p className="text-xs text-[#544E49] leading-relaxed">
              Use o Lumina por 14 dias com toda a sua equipe. Se você não sentir que sua rotina ficou mais leve e que os agendamentos fluíram com muito mais elegância, basta não continuar. Sem multas, sem taxas ocultas e sem constrangimento.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
