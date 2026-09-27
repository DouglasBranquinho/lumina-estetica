"use client";

import React from "react";
import { MessageCircle } from "lucide-react";

export function FloatingWhatsApp() {
  return (
    <aside
      aria-label="Atendimento pelo WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex items-center group"
    >
      <div className="mr-3 px-3 py-1.5 rounded-xl bg-white border border-[#EAE5DF] shadow-md text-xs font-medium text-[#262220] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden sm:block">
        Falar com Especialista 👋
      </div>
      <a
        href="https://wa.me/5511999999999?text=Olá!%20Estou%20na%20página%20do%20Lumina%20e%20gostaria%20de%20tirar%20algumas%20dúvidas"
        target="_blank"
        rel="noopener noreferrer"
        className="w-13 h-13 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:scale-110 hover:bg-[#1EBE5D] transition-all"
        aria-label="Abrir conversa no WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
      </a>
    </aside>
  );
}
