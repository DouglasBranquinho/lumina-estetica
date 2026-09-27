"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Calendar,
  Users,
  Sparkles,
  Package,
  ExternalLink,
  Store,
} from "lucide-react";
import { useClinic } from "@/context/ClinicContext";

interface SidebarProps {
  activeTab: "agenda" | "clientes" | "procedimentos" | "estoque";
  setActiveTab: (tab: "agenda" | "clientes" | "procedimentos" | "estoque") => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const { tenant } = useClinic();

  const navItems = [
    {
      id: "agenda",
      label: "Agenda Operacional",
      icon: Calendar,
    },
    {
      id: "clientes",
      label: "Clientes & Prontuários",
      icon: Users,
    },
    {
      id: "procedimentos",
      label: "Serviços & Bancadas",
      icon: Sparkles,
    },
    {
      id: "estoque",
      label: "Controle de Estoque",
      icon: Package,
    },
  ] as const;

  return (
    <aside className="w-64 bg-[#FFFFFF] border-r border-[#EAE5DF] flex flex-col justify-between shrink-0 select-none">
      {/* Top Brand Header */}
      <div>
        <div className="p-6 border-b border-[#EAE5DF]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-[#F5EBE6] text-[#C49B88] flex items-center justify-center font-serif text-lg font-bold border border-[#EAE5DF]">
              L
            </div>
            <div>
              <h1 className="font-serif font-semibold text-[#262220] tracking-wide text-base leading-tight">
                {tenant.name}
              </h1>
              <span className="text-[11px] font-medium tracking-widest text-[#807770] uppercase">
                Estética & Bem-estar
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4 space-y-1.5">
          <div className="px-3 pb-2 text-[10px] font-semibold tracking-wider text-[#807770] uppercase">
            Gestão da Clínica
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-[#F5EBE6] text-[#262220] font-semibold border border-[#E8DCD5]"
                    : "text-[#544E49] hover:bg-[#FBFBF9] hover:text-[#262220]"
                }`}
              >
                <Icon
                  size={18}
                  className={isActive ? "text-[#C49B88]" : "text-[#807770]"}
                />
                <span>{item.label}</span>
              </button>
            );
          })}

          <div className="pt-6 px-3 pb-2 text-[10px] font-semibold tracking-wider text-[#807770] uppercase">
            Portal da Cliente
          </div>

          <Link
            href={`/agendar/${tenant.slug}`}
            target="_blank"
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium text-[#544E49] hover:bg-[#FBFBF9] hover:text-[#262220] border border-dashed border-[#EAE5DF] transition-all group"
          >
            <div className="flex items-center space-x-3">
              <Store size={18} className="text-[#C49B88]" />
              <span>Link de Agendamento</span>
            </div>
            <ExternalLink size={14} className="text-[#807770] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>

          <Link
            href="/lp"
            className="w-full flex items-center justify-between px-3.5 py-2 rounded-lg text-xs font-medium text-[#807770] hover:bg-[#FBFBF9] hover:text-[#262220] transition-all group"
          >
            <div className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C49B88]" />
              <span>Página Institucional &amp; Planos</span>
            </div>
            <ExternalLink size={12} className="text-[#807770] group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </nav>
      </div>

      {/* Footer Profile */}
      <div className="p-4 border-t border-[#EAE5DF] bg-[#FAF8F5]/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-[#EAE5DF] flex items-center justify-center text-xs font-semibold text-[#544E49]">
              RC
            </div>
            <div className="text-left">
              <p className="text-xs font-semibold text-[#262220]">Recepção & Gestão</p>
              <p className="text-[11px] text-[#807770]">Unidade Paulista</p>
            </div>
          </div>
          <span className="inline-block w-2 h-2 rounded-full bg-[#5B8266]" title="Sistema Online" />
        </div>
      </div>
    </aside>
  );
};
