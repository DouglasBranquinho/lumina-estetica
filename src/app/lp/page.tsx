import React from "react";
import type { Metadata } from "next";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { LandingHero } from "@/components/landing/LandingHero";
import { LandingPainSection } from "@/components/landing/LandingPainSection";
import { LandingSolutionShowcase } from "@/components/landing/LandingSolutionShowcase";
import { LandingSocialProof } from "@/components/landing/LandingSocialProof";
import { LandingPricing } from "@/components/landing/LandingPricing";
import { LandingFAQ } from "@/components/landing/LandingFAQ";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { FloatingWhatsApp } from "@/components/landing/FloatingWhatsApp";

export const metadata: Metadata = {
  title: "Lumina — Gestão, Agenda Anticonflito & Relacionamento para Estética",
  description:
    "A plataforma inteligente desenhada para elevar o padrão de clínicas e estúdios de estética, lash, unhas e harmonização. Conheça e teste grátis por 14 dias.",
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FBFBF9] text-[#262220] selection:bg-[#F5EBE6] selection:text-[#262220] flex flex-col justify-between">
      <LandingHeader />
      <main className="flex-1">
        <LandingHero />
        <LandingPainSection />
        <LandingSolutionShowcase />
        <LandingSocialProof />
        <LandingPricing />
        <LandingFAQ />
      </main>
      <LandingFooter />
      <FloatingWhatsApp />
    </div>
  );
}
