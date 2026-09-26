"use client";

import React, { useState } from "react";
import {
  Search,
  Plus,
  Phone,
  Calendar,
  Sparkles,
  MessageCircle,
} from "lucide-react";
import { useClinic } from "@/context/ClinicContext";
import { formatCurrency, formatPhoneBR } from "@/lib/utils";
import { formatWhatsAppUrl } from "@/lib/whatsapp";

interface ClientsViewProps {
  onSelectClient: (clientId: string) => void;
  onOpenNewClientModal: () => void;
}

export const ClientsView: React.FC<ClientsViewProps> = ({
  onSelectClient,
  onOpenNewClientModal,
}) => {
  const { clients, tenant } = useClinic();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredClients = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm) ||
      c.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleWhatsApp = (e: React.MouseEvent, phone: string, name: string) => {
    e.stopPropagation();
    const url = formatWhatsAppUrl(phone, `Olá, ${name}! Tudo bem? 💕 Passando para falar da ${tenant.name}.`);
    window.open(url, "_blank");
  };

  return (
    <div className="bg-[#FFFFFF] border border-[#EAE5DF] rounded-2xl p-6 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#EAE5DF]">
        <div>
          <h2 className="font-serif text-lg font-semibold text-[#262220]">
            Cadastro de Clientes & Prontuários
          </h2>
          <p className="text-xs text-[#807770]">
            Histórico completo, preferências e acompanhamento de evolução
          </p>
        </div>

        <button
          onClick={onOpenNewClientModal}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-[#C49B88] hover:bg-[#B38672] text-[#FFFFFF] text-xs font-semibold shadow-sm transition-all active:scale-95"
        >
          <Plus size={16} />
          <span>Cadastrar Cliente</span>
        </button>
      </div>

      {/* Barra de Pesquisa */}
      <div className="relative">
        <Search
          size={16}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#807770]"
        />
        <input
          type="text"
          placeholder="Buscar por nome, telefone ou tag (ex: Botox, Laser, VIP)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#EAE5DF] bg-[#FAF8F5] text-xs text-[#262220] focus:outline-none focus:ring-1 focus:ring-[#C49B88]"
        />
      </div>

      {/* Grid de Cards de Clientes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredClients.map((client) => (
          <div
            key={client.id}
            onClick={() => onSelectClient(client.id)}
            className="p-4 rounded-xl border border-[#EAE5DF] hover:border-[#C49B88] bg-[#FAF8F5]/60 hover:bg-[#FFFFFF] transition-all cursor-pointer shadow-xs hover:shadow-md group space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-[#EAE5DF] flex items-center justify-center font-semibold text-xs text-[#544E49] group-hover:bg-[#F5EBE6] group-hover:text-[#C49B88] transition-colors">
                  {client.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#262220] group-hover:text-[#B38672] transition-colors">
                    {client.name}
                  </h3>
                  <p className="text-[11px] text-[#807770] flex items-center space-x-1">
                    <Phone size={10} />
                    <span>{formatPhoneBR(client.phone)}</span>
                  </p>
                </div>
              </div>

              <button
                onClick={(e) => handleWhatsApp(e, client.phone, client.name)}
                className="p-1.5 rounded-full hover:bg-[#EDF4EF] text-[#3C6547] transition-colors"
                title="Conversar no WhatsApp"
              >
                <MessageCircle size={15} />
              </button>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1">
              {client.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#FFFFFF] border border-[#EAE5DF] text-[#544E49]"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Rodapé do Card */}
            <div className="pt-2 border-t border-[#EAE5DF]/70 flex items-center justify-between text-[11px] text-[#807770]">
              <span>{client.totalAppointments} atendimentos</span>
              <span className="font-semibold text-[#262220] tabular-nums">
                {formatCurrency(client.totalSpent)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
