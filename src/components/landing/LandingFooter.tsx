"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, MessageCircle, Heart } from "lucide-react";

export function LandingFooter() {
  return (
    <footer className="bg-[#FAF8F5] border-t border-[#EAE5DF] text-[#544E49] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-[#F5EBE6] text-[#C49B88] flex items-center justify-center font-serif text-lg font-bold border border-[#EAE5DF]">
                L
              </div>
              <div>
                <span className="font-serif font-semibold text-base tracking-wide text-[#262220]">
                  Lumina
                </span>
                <p className="text-[10px] text-[#807770] uppercase tracking-wider">
                  Boutique de Gestão &amp; Agenda
                </p>
              </div>
            </div>

            <p className="text-[11px] text-[#807770] leading-relaxed">
              A plataforma inteligente desenhada para elevar o padrão de clínicas e estúdios de estética feminina em todo o Brasil.
            </p>

            <div className="inline-flex items-center space-x-1.5 text-[10px] text-[#3C6547] bg-[#EDF4EF] px-2.5 py-1 rounded-full border border-[#CBE0D2]">
              <ShieldCheck className="w-3 h-3" />
              <span>Google Firebase Cloud • 100% Seguro</span>
            </div>
          </div>

          {/* Quick Platform Links */}
          <div className="space-y-3">
            <h4 className="font-serif font-semibold text-xs text-[#262220] uppercase tracking-wider">
              Acesso Rápido
            </h4>
            <ul className="space-y-2 text-[11px]">
              <li>
                <Link href="/" className="hover:text-[#262220] transition-colors">
                  Acessar Painel da Clínica
                </Link>
              </li>
              <li>
                <Link
                  href="/agendar/lumina"
                  target="_blank"
                  className="hover:text-[#262220] transition-colors"
                >
                  Portal da Cliente (Exemplo na Bio)
                </Link>
              </li>
              <li>
                <a href="#solucao" className="hover:text-[#262220] transition-colors">
                  Funcionalidades Principais
                </a>
              </li>
              <li>
                <a href="#precos" className="hover:text-[#262220] transition-colors">
                  Tabela de Planos &amp; Preços
                </a>
              </li>
            </ul>
          </div>

          {/* Niches & Specializations */}
          <div className="space-y-3">
            <h4 className="font-serif font-semibold text-xs text-[#262220] uppercase tracking-wider">
              Especialidades
            </h4>
            <ul className="space-y-2 text-[11px] text-[#807770]">
              <li>Clínicas de Estética Avançada &amp; Laser</li>
              <li>Estúdios de Lash &amp; Brow Designer</li>
              <li>Nail Designers &amp; Alongamento em Gel</li>
              <li>Salões Boutique, Coloração &amp; Mechas</li>
              <li>Harmonização Facial &amp; Corporal</li>
            </ul>
          </div>

          {/* Direct Support */}
          <div className="space-y-3">
            <h4 className="font-serif font-semibold text-xs text-[#262220] uppercase tracking-wider">
              Atendimento Especializado
            </h4>
            <p className="text-[11px] text-[#807770] leading-relaxed">
              Dúvidas sobre como implantar na sua clínica ou deseja uma apresentação personalizada?
            </p>
            <a
              href="https://wa.me/5511999999999?text=Olá!%20Gostaria%20de%20tirar%20dúvidas%20sobre%20o%20Lumina"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-lg bg-[#25D366] text-white text-[11px] font-semibold hover:bg-[#1EBE5D] transition-colors shadow-xs"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Chamar no WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-12 pt-6 border-t border-[#EAE5DF] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#807770] space-y-2 sm:space-y-0">
          <p>© {new Date().getFullYear()} Lumina Tecnologia &amp; Beleza. Todos os direitos reservados.</p>
          <div className="flex items-center space-x-4">
            <span className="hover:text-[#262220] cursor-pointer">Termos de Uso</span>
            <span>•</span>
            <span className="hover:text-[#262220] cursor-pointer">Privacidade &amp; LGPD</span>
            <span>•</span>
            <span className="flex items-center space-x-1">
              <span>Feito com</span>
              <Heart className="w-3 h-3 text-[#C49B88] fill-current" />
              <span>para a estética brasileira</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
