"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, Sparkles, ArrowRight, MessageCircle, HelpCircle } from "lucide-react";

export function LandingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Preciso instalar algum programa pesado no meu computador?",
      answer:
        "Não! O Lumina é 100% em nuvem e funciona direto no navegador do seu celular, tablet ou computador (Windows, Mac, iOS ou Android). Você também pode adicioná-lo à tela inicial do seu celular como um aplicativo em apenas 1 toque.",
    },
    {
      question: "Como funciona a prevenção de conflitos de salas e aparelhos?",
      answer:
        "Diferente dos sistemas comuns que só checam a agenda do profissional, o Lumina valida simultaneamente: a Profissional + a Sala Física + o Equipamento (ex: Laser, Cabine LED) + o Tempo de Higienização. Se um laser já estiver alocado na Cabine 2, o sistema impede qualquer outra reserva naquele mesmo horário.",
    },
    {
      question: "Minha cliente precisa baixar algum aplicativo ou criar senha para agendar?",
      answer:
        "Absolutamente não! Uma das maiores causas de desistência é obrigar a cliente a baixar app ou criar login. Com o link do Lumina na sua bio, sua cliente escolhe o procedimento, a profissional e o horário em 30 segundos, de forma acolhedora e direta.",
    },
    {
      question: "O Lumina cobra comissão ou porcentagem por agendamento?",
      answer:
        "Não, nunca cobramos nenhuma comissão sobre seus atendimentos. O valor que suas clientes pagam pelos procedimentos é 100% seu. Você paga apenas o valor fixo e transparente da mensalidade do plano.",
    },
    {
      question: "Como funciona o Radar de Retorno no WhatsApp?",
      answer:
        "Você define a periodicidade ideal de cada procedimento (por exemplo, 18 a 21 dias para unhas de gel ou volume russo). O sistema monitora as datas e avisa quais clientes estão no momento exato da manutenção, gerando uma mensagem amigável e personalizada pronta para enviar no WhatsApp com 1 clique.",
    },
    {
      question: "Consigo migrar minha lista de clientes de outro sistema ou do caderno?",
      answer:
        "Sim! Nossa equipe auxilia você na importação da sua lista de contatos para que você não perca nenhum histórico ao começar com o Lumina.",
    },
    {
      question: "Preciso cadastrar cartão de crédito para fazer o teste grátis?",
      answer:
        "Não é necessário cadastrar cartão para iniciar o teste de 14 dias. Você tem acesso completo para experimentar com sua equipe e só decide assinar se realmente amar a experiência.",
    },
  ];

  return (
    <section id="faq" className="py-20 md:py-28 bg-[#FFFFFF] border-t border-[#EAE5DF]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#FAF8F5] text-[#807770] text-xs font-semibold border border-[#EAE5DF]">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Perguntas Frequentes</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#262220] tracking-tight">
            Tire suas dúvidas sobre o{" "}
            <span className="italic font-medium text-[#C49B88]">Lumina</span>
          </h2>

          <p className="text-sm text-[#544E49]">
            Tudo o que você precisa saber para começar com total segurança.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="border border-[#EAE5DF] rounded-2xl overflow-hidden transition-all bg-[#FBFBF9]"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between space-x-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-base font-semibold text-[#262220]">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full bg-[#FFFFFF] border border-[#EAE5DF] flex items-center justify-center shrink-0 text-[#807770] transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-[#C49B88]" : ""
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-[#544E49] leading-relaxed border-t border-[#EAE5DF]/60 bg-[#FFFFFF]">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* FINAL CONVERSION BANNER (Ação Imediata) */}
        <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#262220] via-[#332E2B] to-[#1C1918] text-white text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#C49B88]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white/10 text-[#C49B88] text-xs font-semibold border border-white/15">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Comece hoje sem compromisso</span>
          </div>

          <h3 className="font-serif text-2xl sm:text-4xl font-normal tracking-tight text-white max-w-xl mx-auto leading-snug">
            Pronta para elevar o padrão da sua clínica e recuperar seu tempo livre?
          </h3>

          <p className="text-xs sm:text-sm text-[#D8D0C7] max-w-lg mx-auto font-light leading-relaxed">
            Dê adeus ao caos das mensagens no WhatsApp e aos choques de horários. Experimente o Lumina gratuitamente por 14 dias.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="#precos"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-7 py-3.5 rounded-xl text-xs font-semibold bg-[#C49B88] text-[#FFFFFF] hover:bg-[#B38672] transition-all shadow-md group"
            >
              <span>Começar Teste Grátis de 14 Dias</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl text-xs font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/20 transition-all"
            >
              <span>Ver Sistema Ao Vivo</span>
            </Link>
          </div>

          <p className="text-[11px] text-[#A69E97]">
            Sem cartão de crédito • Instalação imediata no celular • Suporte no WhatsApp
          </p>
        </div>
      </div>
    </section>
  );
}
