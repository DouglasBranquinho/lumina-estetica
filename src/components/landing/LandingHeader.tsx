"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, Menu, X } from "lucide-react";

export function LandingHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#FFFFFF]/90 backdrop-blur-md border-b border-[#EAE5DF] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/lp" className="flex items-center space-x-3 group">
          <div className="w-11 h-11 rounded-full bg-[#F5EBE6] text-[#C49B88] flex items-center justify-center font-serif text-xl font-bold border border-[#EAE5DF] shadow-xs group-hover:scale-105 transition-transform">
            L
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-serif font-semibold text-lg tracking-wide text-[#262220]">
                Lumina
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full bg-[#F5EBE6] text-[#C49B88]">
                Boutique
              </span>
            </div>
            <p className="text-[11px] text-[#807770] tracking-wider uppercase">
              Gestão &amp; Relacionamento
            </p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-[#544E49]">
          <a
            href="#problema"
            className="hover:text-[#262220] transition-colors"
          >
            O Desafio
          </a>
          <a
            href="#solucao"
            className="hover:text-[#262220] transition-colors"
          >
            Funcionalidades
          </a>
          <a
            href="#comparativo"
            className="hover:text-[#262220] transition-colors"
          >
            Antes x Depois
          </a>
          <a
            href="#depoimentos"
            className="hover:text-[#262220] transition-colors"
          >
            Resultados
          </a>
          <a
            href="#precos"
            className="hover:text-[#262220] transition-colors"
          >
            Planos
          </a>
          <a
            href="#faq"
            className="hover:text-[#262220] transition-colors"
          >
            Dúvidas
          </a>
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center space-x-3">
          <Link
            href="/"
            className="px-4 py-2 text-xs font-semibold text-[#544E49] hover:text-[#262220] border border-[#EAE5DF] hover:border-[#D8D0C7] rounded-lg transition-all hover:bg-[#FBFBF9]"
          >
            Acessar Sistema
          </Link>
          <a
            href="#precos"
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-semibold bg-[#262220] text-[#FFFFFF] hover:bg-[#3D3734] transition-all shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C49B88]" />
            <span>Testar Grátis por 14 Dias</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-2">
          <Link
            href="/"
            className="px-3 py-1.5 text-xs font-semibold text-[#544E49] border border-[#EAE5DF] rounded-lg"
          >
            Entrar
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#544E49] hover:text-[#262220] focus:outline-none"
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FFFFFF] border-b border-[#EAE5DF] px-4 pt-2 pb-6 space-y-3">
          <a
            href="#problema"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-[#544E49] hover:text-[#262220]"
          >
            O Desafio
          </a>
          <a
            href="#solucao"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-[#544E49] hover:text-[#262220]"
          >
            Funcionalidades
          </a>
          <a
            href="#comparativo"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-[#544E49] hover:text-[#262220]"
          >
            Antes x Depois
          </a>
          <a
            href="#depoimentos"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-[#544E49] hover:text-[#262220]"
          >
            Resultados
          </a>
          <a
            href="#precos"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-[#544E49] hover:text-[#262220]"
          >
            Planos &amp; Preços
          </a>
          <a
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-[#544E49] hover:text-[#262220]"
          >
            Perguntas Frequentes
          </a>
          <div className="pt-3 border-t border-[#EAE5DF] space-y-2">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full block text-center py-2.5 text-xs font-semibold text-[#544E49] border border-[#EAE5DF] rounded-lg"
            >
              Acessar Demonstração da Clínica
            </Link>
            <a
              href="#precos"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center space-x-2 py-2.5 text-xs font-semibold bg-[#262220] text-[#FFFFFF] rounded-lg shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C49B88]" />
              <span>Experimentar Grátis 14 Dias</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
