"use client";

import React, { useState } from "react";
import { ClinicProvider } from "@/context/ClinicContext";
import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";
import { DailyMetricCards } from "@/components/dashboard/DailyMetricCards";
import { TimelineAgenda } from "@/components/agenda/TimelineAgenda";
import { AppointmentDetailDrawer } from "@/components/agenda/AppointmentDetailDrawer";
import { NewAppointmentDrawer } from "@/components/agenda/NewAppointmentDrawer";
import { ClientsView } from "@/components/clients/ClientsView";
import { ClientProfileDrawer } from "@/components/clients/ClientProfileDrawer";
import { ProceduresView } from "@/components/procedures/ProceduresView";
import { InventoryView } from "@/components/inventory/InventoryView";
import { Appointment } from "@/types";

function ClinicDashboardContent() {
  const [activeTab, setActiveTab] = useState<"agenda" | "clientes" | "procedimentos" | "estoque">("agenda");
  const [selectedProfessionalId, setSelectedProfessionalId] = useState<string>("all");

  // Estado dos drawers
  const [isNewAppointmentOpen, setIsNewAppointmentOpen] = useState(false);
  const [initialSlot, setInitialSlot] = useState<string>("09:00");
  const [initialProId, setInitialProId] = useState<string | undefined>(undefined);

  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);

  const handleOpenNewAppointmentAtSlot = (slot: string, proId?: string) => {
    setInitialSlot(slot);
    setInitialProId(proId);
    setIsNewAppointmentOpen(true);
  };

  const handleOpenClientProfile = (clientId: string) => {
    setSelectedClientId(clientId);
  };

  return (
    <div className="flex h-screen bg-[#FBFBF9] overflow-hidden">
      {/* Sidebar de Navegação */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Conteúdo Principal */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <Navbar
          onOpenNewAppointment={() => {
            setInitialSlot("10:00");
            setInitialProId(undefined);
            setIsNewAppointmentOpen(true);
          }}
          selectedProfessionalId={selectedProfessionalId}
          setSelectedProfessionalId={setSelectedProfessionalId}
        />

        {/* Área de Visualização com Scroll */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {activeTab === "agenda" && (
              <>
                {/* Resumo Diário Prático */}
                <DailyMetricCards />

                {/* Linha do Tempo da Agenda */}
                <TimelineAgenda
                  selectedProfessionalId={selectedProfessionalId}
                  onSelectAppointment={(app) => setSelectedAppointment(app)}
                  onNewAppointmentAtSlot={handleOpenNewAppointmentAtSlot}
                />
              </>
            )}

            {activeTab === "clientes" && (
              <ClientsView
                onSelectClient={(id) => setSelectedClientId(id)}
                onOpenNewClientModal={() => {
                  setInitialSlot("10:00");
                  setIsNewAppointmentOpen(true);
                }}
              />
            )}

            {activeTab === "procedimentos" && <ProceduresView />}

            {activeTab === "estoque" && <InventoryView />}
          </div>
        </main>
      </div>

      {/* Drawers e Modais Laterais */}
      <NewAppointmentDrawer
        isOpen={isNewAppointmentOpen}
        onClose={() => setIsNewAppointmentOpen(false)}
        initialStartTime={initialSlot}
        initialProfessionalId={initialProId}
      />

      <AppointmentDetailDrawer
        appointment={selectedAppointment}
        onClose={() => setSelectedAppointment(null)}
        onOpenClientProfile={handleOpenClientProfile}
      />

      <ClientProfileDrawer
        clientId={selectedClientId}
        onClose={() => setSelectedClientId(null)}
      />
    </div>
  );
}

export default function Home() {
  return (
    <ClinicProvider>
      <ClinicDashboardContent />
    </ClinicProvider>
  );
}
