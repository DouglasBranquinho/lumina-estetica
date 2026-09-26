"use client";

import React, { useState } from "react";
import {
  Sparkles,
  MapPin,
  Cpu,
  Clock,
  Info,
  Plus,
  Trash2,
  Pencil,
  X,
  Check,
  Calendar,
  DollarSign,
  Users,
  AlertCircle,
  Wrench,
} from "lucide-react";
import { useClinic } from "@/context/ClinicContext";
import { Procedure, ProcedureCategory, Room, Equipment, RoomType, RoomStatus } from "@/types";
import { formatCurrency } from "@/lib/utils";

const categoryLabels: Record<ProcedureCategory, string> = {
  cabelo: "Cabelos",
  unhas: "Unhas & Alongamento",
  cilios: "Cílios",
  sobrancelhas: "Sobrancelhas",
  facial: "Estética Facial",
  corporal: "Corporal",
  laser: "Laser",
};

export const roomTypeLabels: Record<RoomType, string> = {
  bancada_cabelo: "Bancada de Cabelo / Espelho",
  mesa_unhas: "Mesa de Unhas / Nail Bar",
  maca_cabine: "Maca / Cabine Isolada",
  lavatorio: "Lavatório Spa",
  sala_vip: "Sala VIP / Noivas",
  outro: "Outro Espaço Físico",
};

export const ProceduresView: React.FC = () => {
  const {
    procedures,
    rooms,
    equipments,
    professionals,
    addProcedure,
    updateProcedure,
    deleteProcedure,
    addRoom,
    updateRoom,
    deleteRoom,
    addEquipment,
    updateEquipment,
    deleteEquipment,
  } = useClinic();

  // Estados para Modal de Procedimentos
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProcedureId, setEditingProcedureId] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [category, setCategory] = useState<ProcedureCategory>("cabelo");
  const [price, setPrice] = useState<number>(150);
  const [durationMinutes, setDurationMinutes] = useState<number>(60);
  const [bufferMinutes, setBufferMinutes] = useState<number>(15);
  const [processingTimeMinutes, setProcessingTimeMinutes] = useState<number | undefined>(undefined);
  const [requiredRoomId, setRequiredRoomId] = useState<string>("");
  const [requiredEquipmentId, setRequiredEquipmentId] = useState<string>("");
  const [description, setDescription] = useState("");
  const [preCareInstructions, setPreCareInstructions] = useState("");
  const [postCareInstructions, setPostCareInstructions] = useState("");

  // Estados para Modal de Salas/Cabines Físicas
  const [isRoomModalOpen, setIsRoomModalOpen] = useState(false);
  const [editingRoomId, setEditingRoomId] = useState<string | null>(null);
  const [roomName, setRoomName] = useState("");
  const [roomDescription, setRoomDescription] = useState("");
  const [roomType, setRoomType] = useState<RoomType>("bancada_cabelo");
  const [roomCapacity, setRoomCapacity] = useState<number>(1);
  const [roomStatus, setRoomStatus] = useState<RoomStatus>("ativo");
  const [roomDefaultProId, setRoomDefaultProId] = useState<string>("");

  // Estados para Modal de Aparelhos/Equipamentos
  const [isEquipModalOpen, setIsEquipModalOpen] = useState(false);
  const [editingEquipId, setEditingEquipId] = useState<string | null>(null);
  const [equipName, setEquipName] = useState("");
  const [equipBrandModel, setEquipBrandModel] = useState("");
  const [equipSerialNumber, setEquipSerialNumber] = useState("");
  const [equipPurchaseDate, setEquipPurchaseDate] = useState("");
  const [equipPurchasePrice, setEquipPurchasePrice] = useState<number | undefined>(undefined);

  const getUsageDuration = (dateStr?: string) => {
    if (!dateStr) return null;
    const purchase = new Date(dateStr + "T12:00:00");
    const now = new Date();
    const diffMonths = (now.getFullYear() - purchase.getFullYear()) * 12 + (now.getMonth() - purchase.getMonth());
    if (diffMonths < 1) return "Menos de 1 mês de uso";
    if (diffMonths < 12) return `${diffMonths} meses de uso`;
    const years = Math.floor(diffMonths / 12);
    const remMonths = diffMonths % 12;
    return `${years} ano${years > 1 ? "s" : ""}${remMonths > 0 ? ` e ${remMonths} m` : ""} de uso`;
  };

  // Handlers para Salas / Cabines
  const handleOpenCreateRoom = () => {
    setEditingRoomId(null);
    setRoomName("");
    setRoomDescription("");
    setRoomType("bancada_cabelo");
    setRoomCapacity(1);
    setRoomStatus("ativo");
    setRoomDefaultProId("");
    setIsRoomModalOpen(true);
  };

  const handleOpenEditRoom = (room: Room) => {
    setEditingRoomId(room.id);
    setRoomName(room.name);
    setRoomDescription(room.description || "");
    setRoomType(room.type || "bancada_cabelo");
    setRoomCapacity(room.capacity || 1);
    setRoomStatus(room.status || "ativo");
    setRoomDefaultProId(room.defaultProfessionalId || "");
    setIsRoomModalOpen(true);
  };

  const handleSubmitRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomName.trim()) return;

    if (editingRoomId) {
      updateRoom(editingRoomId, {
        name: roomName.trim(),
        type: roomType,
        capacity: Number(roomCapacity) || 1,
        status: roomStatus,
        defaultProfessionalId: roomDefaultProId || undefined,
        description: roomDescription.trim() || undefined,
      });
    } else {
      addRoom({
        name: roomName.trim(),
        type: roomType,
        capacity: Number(roomCapacity) || 1,
        status: roomStatus,
        defaultProfessionalId: roomDefaultProId || undefined,
        description: roomDescription.trim() || undefined,
      });
    }
    setIsRoomModalOpen(false);
  };

  const handleDeleteRoom = (id: string, name: string) => {
    if (confirm(`Deseja realmente remover o espaço "${name}"? Os serviços vinculados a ele serão liberados.`)) {
      deleteRoom(id);
    }
  };

  // Handlers para Equipamentos / Aparelhos
  const handleOpenCreateEquip = () => {
    setEditingEquipId(null);
    setEquipName("");
    setEquipBrandModel("");
    setEquipSerialNumber("");
    setEquipPurchaseDate("");
    setEquipPurchasePrice(undefined);
    setIsEquipModalOpen(true);
  };

  const handleOpenEditEquip = (equip: Equipment) => {
    setEditingEquipId(equip.id);
    setEquipName(equip.name);
    setEquipBrandModel(equip.brandModel || "");
    setEquipSerialNumber(equip.serialNumber || "");
    setEquipPurchaseDate(equip.purchaseDate || "");
    setEquipPurchasePrice(equip.purchasePrice);
    setIsEquipModalOpen(true);
  };

  const handleSubmitEquip = (e: React.FormEvent) => {
    e.preventDefault();
    if (!equipName.trim()) return;

    if (editingEquipId) {
      updateEquipment(editingEquipId, {
        name: equipName.trim(),
        brandModel: equipBrandModel.trim() || undefined,
        serialNumber: equipSerialNumber.trim() || undefined,
        purchaseDate: equipPurchaseDate || undefined,
        purchasePrice: equipPurchasePrice !== undefined && !isNaN(equipPurchasePrice) ? Number(equipPurchasePrice) : undefined,
      });
    } else {
      addEquipment({
        name: equipName.trim(),
        brandModel: equipBrandModel.trim() || undefined,
        serialNumber: equipSerialNumber.trim() || undefined,
        purchaseDate: equipPurchaseDate || undefined,
        purchasePrice: equipPurchasePrice !== undefined && !isNaN(equipPurchasePrice) ? Number(equipPurchasePrice) : undefined,
      });
    }
    setIsEquipModalOpen(false);
  };

  const handleDeleteEquip = (id: string, name: string) => {
    if (confirm(`Deseja realmente remover o aparelho "${name}"? Os serviços vinculados a ele serão liberados.`)) {
      deleteEquipment(id);
    }
  };

  const handleOpenCreateModal = () => {
    setEditingProcedureId(null);
    setName("");
    setCategory("cabelo");
    setPrice(150);
    setDurationMinutes(60);
    setBufferMinutes(15);
    setProcessingTimeMinutes(undefined);
    setRequiredRoomId("");
    setRequiredEquipmentId("");
    setDescription("");
    setPreCareInstructions("");
    setPostCareInstructions("");
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (proc: Procedure) => {
    setEditingProcedureId(proc.id);
    setName(proc.name);
    setCategory(proc.category);
    setPrice(proc.price);
    setDurationMinutes(proc.durationMinutes);
    setBufferMinutes(proc.bufferMinutes);
    setProcessingTimeMinutes(proc.processingTimeMinutes);
    setRequiredRoomId(proc.requiredRoomId || "");
    setRequiredEquipmentId(proc.requiredEquipmentId || "");
    setDescription(proc.description || "");
    setPreCareInstructions(proc.preCareInstructions || "");
    setPostCareInstructions(proc.postCareInstructions || "");
    setIsModalOpen(true);
  };

  const handleSubmitProcedure = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || price <= 0 || durationMinutes <= 0) return;

    if (editingProcedureId) {
      updateProcedure(editingProcedureId, {
        name,
        category,
        price: Number(price),
        durationMinutes: Number(durationMinutes),
        bufferMinutes: Number(bufferMinutes),
        processingTimeMinutes: processingTimeMinutes ? Number(processingTimeMinutes) : undefined,
        requiredRoomId: requiredRoomId || undefined,
        requiredEquipmentId: requiredEquipmentId || undefined,
        description: description || undefined,
        preCareInstructions: preCareInstructions || undefined,
        postCareInstructions: postCareInstructions || undefined,
      });
    } else {
      addProcedure({
        name,
        category,
        price: Number(price),
        durationMinutes: Number(durationMinutes),
        bufferMinutes: Number(bufferMinutes),
        processingTimeMinutes: processingTimeMinutes ? Number(processingTimeMinutes) : undefined,
        requiredRoomId: requiredRoomId || undefined,
        requiredEquipmentId: requiredEquipmentId || undefined,
        description: description || undefined,
        preCareInstructions: preCareInstructions || undefined,
        postCareInstructions: postCareInstructions || undefined,
      });
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string, procName: string) => {
    if (confirm(`Deseja realmente remover o serviço "${procName}"?`)) {
      deleteProcedure(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Banner Explicativo de Inteligência de Recursos */}
      <div className="bg-[#FAF8F5] border border-[#EAE5DF] rounded-2xl p-5 flex items-start space-x-3.5">
        <div className="p-2 rounded-lg bg-[#F5EBE6] text-[#C49B88] shrink-0 mt-0.5">
          <Info size={18} />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-[#262220]">
            Inteligência de Recursos & Anticonflito
          </h3>
          <p className="text-xs text-[#544E49] mt-1 leading-relaxed">
            Ao cadastrar um serviço, você pode vincular a <strong>cabine física / bancada</strong> e o <strong>equipamento necessário</strong>. 
            O sistema impede automaticamente que duas clientes agendem no mesmo horário a mesma cabine ou máquina.
          </p>
        </div>
      </div>

      {/* Grid de Procedimentos */}
      <div className="bg-[#FFFFFF] border border-[#EAE5DF] rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#EAE5DF]">
          <div>
            <h2 className="font-serif text-lg font-semibold text-[#262220]">
              Serviços Cadastrados ({procedures.length})
            </h2>
            <p className="text-xs text-[#807770]">
              Serviços ativos para a recepção e para o portal de agendamento online da cliente
            </p>
          </div>

          <button
            onClick={handleOpenCreateModal}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-[#C49B88] hover:bg-[#B38672] text-[#FFFFFF] text-xs font-semibold shadow-sm transition-all active:scale-95 self-start sm:self-auto"
          >
            <Plus size={16} />
            <span>Cadastrar Novo Serviço</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {procedures.map((proc) => {
            const room = rooms.find((r) => r.id === proc.requiredRoomId);
            const equipment = equipments.find((e) => e.id === proc.requiredEquipmentId);

            return (
              <div
                key={proc.id}
                className="p-5 rounded-xl border border-[#EAE5DF] bg-[#FAF8F5]/60 hover:bg-[#FFFFFF] hover:border-[#C49B88] transition-all space-y-3 shadow-xs group relative"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#C49B88]">
                      {categoryLabels[proc.category] || proc.category}
                    </span>
                    <h3 className="text-base font-semibold text-[#262220]">{proc.name}</h3>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-base font-semibold text-[#262220] tabular-nums mr-1.5">
                      {formatCurrency(proc.price)}
                    </span>
                    <button
                      onClick={() => handleOpenEditModal(proc)}
                      className="p-1.5 rounded-lg text-[#807770] hover:text-[#C49B88] hover:bg-[#FAF8F5] transition-colors"
                      title="Editar Serviço"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(proc.id, proc.name)}
                      className="p-1.5 rounded-lg text-[#807770] hover:text-[#94434B] hover:bg-[#FDF0F1] transition-colors"
                      title="Excluir Serviço"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                {proc.description && (
                  <p className="text-xs text-[#544E49] leading-relaxed">
                    {proc.description}
                  </p>
                )}

                {/* Tempo e Buffer */}
                <div className="flex items-center space-x-4 text-xs text-[#544E49] pt-2 border-t border-[#EAE5DF]/70">
                  <div className="flex items-center space-x-1.5">
                    <Clock size={13} className="text-[#C49B88]" />
                    <span>{proc.durationMinutes} min em atendimento</span>
                  </div>
                  <div className="flex items-center space-x-1.5 text-[#807770]">
                    <span>+ {proc.bufferMinutes} min limpeza</span>
                  </div>
                  {proc.processingTimeMinutes && (
                    <div className="flex items-center space-x-1 text-[#3B5B75]">
                      <span>({proc.processingTimeMinutes}m pausa química)</span>
                    </div>
                  )}
                </div>

                {/* Vínculo de Recursos Físicos */}
                <div className="flex flex-wrap gap-2 pt-1 text-[11px]">
                  {room && (
                    <span className="flex items-center space-x-1 px-2 py-0.5 rounded bg-[#FFFFFF] border border-[#EAE5DF] text-[#544E49]">
                      <MapPin size={11} className="text-[#C49B88]" />
                      <span>{room.name.split("—")[0]}</span>
                    </span>
                  )}
                  {equipment && (
                    <span className="flex items-center space-x-1 px-2 py-0.5 rounded bg-[#FFFFFF] border border-[#EAE5DF] text-[#544E49]">
                      <Cpu size={11} className="text-[#3B5B75]" />
                      <span>{equipment.name}</span>
                    </span>
                  )}
                </div>

                {/* Orientações Pré e Pós */}
                {(proc.preCareInstructions || proc.postCareInstructions) && (
                  <div className="pt-2 text-[11px] text-[#807770] space-y-1">
                    {proc.preCareInstructions && (
                      <p>
                        <strong className="text-[#262220]">Pré-Cuidado:</strong> {proc.preCareInstructions}
                      </p>
                    )}
                    {proc.postCareInstructions && (
                      <p>
                        <strong className="text-[#262220]">Pós-Cuidado:</strong> {proc.postCareInstructions}
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Grid de Salas e Equipamentos Físicos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Cabines / Salas / Bancadas */}
        <div className="bg-[#FFFFFF] border border-[#EAE5DF] rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#EAE5DF]">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 rounded-lg bg-[#F5EBE6] text-[#C49B88]">
                <MapPin size={16} />
              </div>
              <div>
                <h3 className="font-serif font-semibold text-sm text-[#262220]">
                  Espaços & Cabines Físicas ({rooms.length})
                </h3>
                <p className="text-[11px] text-[#807770]">Bancadas, salas e macas de atendimento</p>
              </div>
            </div>
            <button
              onClick={handleOpenCreateRoom}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-[#C49B88] text-[#C49B88] hover:bg-[#F5EBE6] text-xs font-semibold transition-all active:scale-95"
            >
              <Plus size={14} />
              <span>Adicionar Espaço</span>
            </button>
          </div>
          
          <div className="space-y-2.5">
            {rooms.map((room) => {
              const boundProcs = procedures.filter((p) => p.requiredRoomId === room.id);
              const defaultPro = professionals.find((p) => p.id === room.defaultProfessionalId);
              const isMaintenance = room.status === "manutencao";

              return (
                <div
                  key={room.id}
                  className={`p-3.5 rounded-xl border transition-all flex items-start justify-between group ${
                    isMaintenance
                      ? "border-[#E8C5B0] bg-[#FCF8F5]"
                      : "border-[#EAE5DF] bg-[#FAF8F5]/80 hover:bg-[#FFFFFF] hover:border-[#C49B88]/40"
                  }`}
                >
                  <div className="space-y-1.5 pr-2">
                    <div className="flex items-center flex-wrap gap-1.5">
                      <p className="font-semibold text-xs text-[#262220]">{room.name}</p>
                      
                      {/* Badge de Status */}
                      {isMaintenance ? (
                        <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#FDEEE9] text-[#A84832] border border-[#F5C7B8]">
                          <Wrench size={10} />
                          <span>Em Manutenção</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center space-x-1 px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-[#EBF5ED] text-[#2F6D3E]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#3EA858]" />
                          <span>Ativo</span>
                        </span>
                      )}

                      {/* Tipo de Estrutura */}
                      {room.type && (
                        <span className="text-[10px] text-[#807770] bg-[#FFFFFF] px-2 py-0.5 rounded border border-[#EAE5DF]">
                          {roomTypeLabels[room.type] || room.type}
                        </span>
                      )}
                    </div>

                    {room.description && (
                      <p className="text-[11px] text-[#807770] leading-tight">{room.description}</p>
                    )}

                    {/* Metadados: Capacidade e Profissional Titular */}
                    <div className="flex items-center flex-wrap gap-3 text-[11px] text-[#544E49] pt-1">
                      <div className="flex items-center space-x-1">
                        <Users size={12} className="text-[#C49B88]" />
                        <span>
                          {room.capacity && room.capacity > 1
                            ? `${room.capacity} atendimentos simultâneos`
                            : "1 atendimento simultâneo"}
                        </span>
                      </div>

                      {defaultPro && (
                        <div className="flex items-center space-x-1">
                          <span className="text-[#807770]">Titular:</span>
                          <strong className="text-[#262220]">{defaultPro.name}</strong>
                        </div>
                      )}
                    </div>

                    {boundProcs.length > 0 && (
                      <span className="inline-block text-[10px] text-[#C49B88] font-medium bg-[#FFFFFF] px-2 py-0.5 rounded border border-[#EAE5DF] mt-1">
                        {boundProcs.length} {boundProcs.length === 1 ? "serviço vinculado" : "serviços vinculados"}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-1 shrink-0 opacity-80 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleOpenEditRoom(room)}
                      className="p-1.5 rounded-lg text-[#807770] hover:text-[#C49B88] hover:bg-[#FAF8F5] transition-colors"
                      title="Editar Espaço"
                    >
                      <Pencil size={13} />
                    </button>
                    <button
                      onClick={() => handleDeleteRoom(room.id, room.name)}
                      className="p-1.5 rounded-lg text-[#807770] hover:text-[#94434B] hover:bg-[#FDF0F1] transition-colors"
                      title="Excluir Espaço"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Equipamentos & Aparelhos */}
        <div className="bg-[#FFFFFF] border border-[#EAE5DF] rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#EAE5DF]">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 rounded-lg bg-[#EBF2F7] text-[#3B5B75]">
                <Cpu size={16} />
              </div>
              <div>
                <h3 className="font-serif font-semibold text-sm text-[#262220]">
                  Aparelhos & Tecnologias ({equipments.length})
                </h3>
                <p className="text-[11px] text-[#807770]">Máquinas e aparelhos compartilhados</p>
              </div>
            </div>
            <button
              onClick={handleOpenCreateEquip}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-[#3B5B75] text-[#3B5B75] hover:bg-[#EBF2F7] text-xs font-semibold transition-all active:scale-95"
            >
              <Plus size={14} />
              <span>Adicionar Aparelho</span>
            </button>
          </div>

          <div className="space-y-2.5">
            {equipments.map((equip) => {
              const boundProcs = procedures.filter((p) => p.requiredEquipmentId === equip.id);
              return (
                <div
                  key={equip.id}
                  className="p-3.5 rounded-xl border border-[#EAE5DF] bg-[#FAF8F5]/80 hover:bg-[#FFFFFF] hover:border-[#3B5B75]/40 transition-all flex items-start justify-between group"
                >
                  <div className="space-y-1 pr-2">
                    <p className="font-semibold text-xs text-[#262220]">{equip.name}</p>
                    {equip.brandModel && (
                      <p className="text-[11px] text-[#807770]">Modelo: {equip.brandModel}</p>
                    )}
                    {equip.serialNumber && (
                      <p className="text-[10px] text-[#A69E97]">S/N: {equip.serialNumber}</p>
                    )}
                    {equip.purchaseDate && (
                      <div className="flex items-center space-x-1.5 text-[11px] text-[#544E49] pt-0.5">
                        <Calendar size={12} className="text-[#3B5B75] shrink-0" />
                        <span>
                          Comprado em {new Date(equip.purchaseDate + "T12:00:00").toLocaleDateString("pt-BR")}
                          <span className="text-[#807770]"> • </span>
                          <strong className="text-[#3B5B75] font-semibold">{getUsageDuration(equip.purchaseDate)}</strong>
                        </span>
                      </div>
                    )}
                    {equip.purchasePrice !== undefined && equip.purchasePrice > 0 && (
                      <div className="flex items-center space-x-1 text-[11px] text-[#262220] pt-0.5">
                        <span className="text-[#807770]">Valor pago:</span>
                        <strong className="text-[#3B5B75] font-semibold">{formatCurrency(equip.purchasePrice)}</strong>
                      </div>
                    )}
                    {boundProcs.length > 0 && (
                      <span className="inline-block text-[10px] text-[#3B5B75] font-medium bg-[#FFFFFF] px-2 py-0.5 rounded border border-[#EAE5DF] mt-1">
                        {boundProcs.length} {boundProcs.length === 1 ? "serviço vinculado" : "serviços vinculados"}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-1 shrink-0 opacity-80 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleOpenEditEquip(equip)}
                      className="p-1.5 rounded-lg text-[#807770] hover:text-[#3B5B75] hover:bg-[#FAF8F5] transition-colors"
                      title="Editar Aparelho"
                    >
                      <Pencil size={13} />
                    </button>
                    <button
                      onClick={() => handleDeleteEquip(equip.id, equip.name)}
                      className="p-1.5 rounded-lg text-[#807770] hover:text-[#94434B] hover:bg-[#FDF0F1] transition-colors"
                      title="Excluir Aparelho"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Modal para Cadastrar Novo Serviço */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-[#262220]/30 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FFFFFF] w-full max-w-lg rounded-2xl border border-[#EAE5DF] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-5 border-b border-[#EAE5DF] bg-[#FAF8F5] flex items-center justify-between">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#C49B88]">
                  Menu de Serviços
                </span>
                <h3 className="font-serif text-lg font-semibold text-[#262220]">
                  {editingProcedureId ? "Editar Serviço" : "Cadastrar Novo Serviço"}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-full hover:bg-[#EAE5DF] text-[#807770]"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmitProcedure} className="p-6 space-y-4 text-xs max-h-[80vh] overflow-y-auto">
              <div className="space-y-1">
                <label className="font-semibold text-[#262220]">Nome do Serviço / Procedimento</label>
                <input
                  type="text"
                  placeholder="Ex: Morena Iluminada, Alongamento Fibra de Vidro, Lash Lifting"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-[#EAE5DF] bg-[#FAF8F5] focus:ring-1 focus:ring-[#C49B88]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-[#262220]">Categoria</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ProcedureCategory)}
                    className="w-full p-2.5 rounded-lg border border-[#EAE5DF] bg-[#FAF8F5]"
                  >
                    <option value="cabelo">Cabelos</option>
                    <option value="unhas">Unhas & Alongamento</option>
                    <option value="cilios">Cílios</option>
                    <option value="sobrancelhas">Sobrancelhas</option>
                    <option value="facial">Estética Facial</option>
                    <option value="corporal">Corporal</option>
                    <option value="laser">Laser</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#262220]">Preço (R$)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full p-2.5 rounded-lg border border-[#EAE5DF] bg-[#FAF8F5]"
                    min={1}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-[#262220]">Duração (min)</label>
                  <input
                    type="number"
                    value={durationMinutes}
                    onChange={(e) => setDurationMinutes(Number(e.target.value))}
                    className="w-full p-2.5 rounded-lg border border-[#EAE5DF] bg-[#FAF8F5]"
                    min={15}
                    step={5}
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#262220]">Limpeza (min)</label>
                  <input
                    type="number"
                    value={bufferMinutes}
                    onChange={(e) => setBufferMinutes(Number(e.target.value))}
                    className="w-full p-2.5 rounded-lg border border-[#EAE5DF] bg-[#FAF8F5]"
                    min={0}
                    step={5}
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#262220]">Pausa Química</label>
                  <input
                    type="number"
                    placeholder="Ex: 35 min"
                    value={processingTimeMinutes || ""}
                    onChange={(e) => setProcessingTimeMinutes(e.target.value ? Number(e.target.value) : undefined)}
                    className="w-full p-2.5 rounded-lg border border-[#EAE5DF] bg-[#FAF8F5]"
                    min={0}
                    step={5}
                  />
                </div>
              </div>

              {/* Recursos Físicos Exigidos */}
              <div className="p-3.5 rounded-xl border border-[#EAE5DF] bg-[#FAF8F5] space-y-3">
                <p className="font-semibold text-[#262220]">Recursos Físicos Necessários (Anticonflito)</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] text-[#807770]">Cabine / Espaço Físico</label>
                    <select
                      value={requiredRoomId}
                      onChange={(e) => setRequiredRoomId(e.target.value)}
                      className="w-full p-2 rounded-lg border border-[#EAE5DF] bg-[#FFFFFF]"
                    >
                      <option value="">Qualquer espaço livre</option>
                      {rooms.map((r) => (
                        <option key={r.id} value={r.id}>
                          {r.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] text-[#807770]">Equipamento / Aparelho</label>
                    <select
                      value={requiredEquipmentId}
                      onChange={(e) => setRequiredEquipmentId(e.target.value)}
                      className="w-full p-2 rounded-lg border border-[#EAE5DF] bg-[#FFFFFF]"
                    >
                      <option value="">Nenhum aparelho exigido</option>
                      {equipments.map((eq) => (
                        <option key={eq.id} value={eq.id}>
                          {eq.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#262220]">Descrição para a Cliente</label>
                <textarea
                  rows={2}
                  placeholder="Explique os benefícios para a cliente ver no link de agendamento online..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-[#EAE5DF] bg-[#FAF8F5]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-[#262220]">Orientações Pré-Cuidado</label>
                  <input
                    type="text"
                    placeholder="Ex: Vir sem rímel, cabelo sem lavar 24h..."
                    value={preCareInstructions}
                    onChange={(e) => setPreCareInstructions(e.target.value)}
                    className="w-full p-2 rounded-lg border border-[#EAE5DF] bg-[#FAF8F5]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#262220]">Orientações Pós-Cuidado</label>
                  <input
                    type="text"
                    placeholder="Ex: Não molhar por 24h, usar shampoo sem sal..."
                    value={postCareInstructions}
                    onChange={(e) => setPostCareInstructions(e.target.value)}
                    className="w-full p-2 rounded-lg border border-[#EAE5DF] bg-[#FAF8F5]"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-[#EAE5DF]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-[#EAE5DF] text-[#544E49]"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#C49B88] hover:bg-[#B38672] text-[#FFFFFF] font-semibold"
                >
                  {editingProcedureId ? "Salvar Alterações" : "Salvar Serviço"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal para Cadastrar/Editar Espaço ou Cabine */}
      {isRoomModalOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-[#262220]/30 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FFFFFF] w-full max-w-md rounded-2xl border border-[#EAE5DF] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-5 border-b border-[#EAE5DF] bg-[#FAF8F5] flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-lg bg-[#F5EBE6] text-[#C49B88]">
                  <MapPin size={18} />
                </div>
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#C49B88]">
                    Estrutura Física
                  </span>
                  <h3 className="font-serif text-base font-semibold text-[#262220]">
                    {editingRoomId ? "Editar Espaço / Cabine" : "Novo Espaço / Cabine"}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setIsRoomModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-[#EAE5DF] text-[#807770]"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmitRoom} className="p-6 space-y-4 text-xs max-h-[85vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-[#262220]">Nome do Espaço / Bancada</label>
                  <input
                    type="text"
                    placeholder="Ex: Bancada Nail 2, Cadeira Noivas, Lavatório Spa"
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-[#EAE5DF] bg-[#FAF8F5] focus:ring-1 focus:ring-[#C49B88]"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#262220]">Tipo de Estrutura Física</label>
                  <select
                    value={roomType}
                    onChange={(e) => setRoomType(e.target.value as RoomType)}
                    className="w-full p-2.5 rounded-lg border border-[#EAE5DF] bg-[#FAF8F5]"
                  >
                    <option value="bancada_cabelo">Bancada de Cabelo / Espelho</option>
                    <option value="mesa_unhas">Mesa de Unhas / Nail Bar</option>
                    <option value="maca_cabine">Maca / Cabine Isolada (Cílios/Facial)</option>
                    <option value="lavatorio">Lavatório Spa</option>
                    <option value="sala_vip">Sala VIP / Noivas</option>
                    <option value="outro">Outro Espaço Físico</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-[#262220]">Capacidade Simultânea</label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={roomCapacity}
                    onChange={(e) => setRoomCapacity(Number(e.target.value))}
                    className="w-full p-2.5 rounded-lg border border-[#EAE5DF] bg-[#FAF8F5]"
                    required
                  />
                  <p className="text-[10px] text-[#807770]">Atendimentos juntos</p>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#262220]">Status Operacional</label>
                  <select
                    value={roomStatus}
                    onChange={(e) => setRoomStatus(e.target.value as RoomStatus)}
                    className="w-full p-2.5 rounded-lg border border-[#EAE5DF] bg-[#FAF8F5]"
                  >
                    <option value="ativo">Disponível / Ativo</option>
                    <option value="manutencao">Em Manutenção</option>
                  </select>
                  <p className="text-[10px] text-[#807770]">Bloqueia agendamento</p>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#262220]">Profissional Titular</label>
                  <select
                    value={roomDefaultProId}
                    onChange={(e) => setRoomDefaultProId(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-[#EAE5DF] bg-[#FAF8F5]"
                  >
                    <option value="">Livre para todas</option>
                    {professionals.map((pro) => (
                      <option key={pro.id} value={pro.id}>
                        {pro.name}
                      </option>
                    ))}
                  </select>
                  <p className="text-[10px] text-[#807770]">Cadeira cativa (opcional)</p>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#262220]">Descrição / Características (Opcional)</label>
                <textarea
                  rows={2}
                  placeholder="Ex: Espelho camarim com luz neutra, maca reclinável de luxo, aspirador de pó embutido..."
                  value={roomDescription}
                  onChange={(e) => setRoomDescription(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-[#EAE5DF] bg-[#FAF8F5] focus:ring-1 focus:ring-[#C49B88]"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-[#EAE5DF]">
                <button
                  type="button"
                  onClick={() => setIsRoomModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-[#EAE5DF] text-[#544E49]"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#C49B88] hover:bg-[#B38672] text-[#FFFFFF] font-semibold transition-all"
                >
                  {editingRoomId ? "Salvar Alterações" : "Salvar Espaço"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal para Cadastrar/Editar Aparelho ou Tecnologia */}
      {isEquipModalOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-[#262220]/30 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FFFFFF] w-full max-w-md rounded-2xl border border-[#EAE5DF] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-5 border-b border-[#EAE5DF] bg-[#FAF8F5] flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-lg bg-[#EBF2F7] text-[#3B5B75]">
                  <Cpu size={18} />
                </div>
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#3B5B75]">
                    Tecnologia Compartilhada
                  </span>
                  <h3 className="font-serif text-base font-semibold text-[#262220]">
                    {editingEquipId ? "Editar Aparelho" : "Novo Aparelho / Máquina"}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setIsEquipModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-[#EAE5DF] text-[#807770]"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmitEquip} className="p-5 space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-[#262220]">Nome do Aparelho / Tecnologia</label>
                <input
                  type="text"
                  placeholder="Ex: Cabine LED Sun 5 Plus, Laser Soprano, Dermo Pen"
                  value={equipName}
                  onChange={(e) => setEquipName(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-[#EAE5DF] bg-[#FAF8F5] focus:ring-1 focus:ring-[#3B5B75]"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#262220]">Marca / Modelo (Opcional)</label>
                <input
                  type="text"
                  placeholder="Ex: SunUV 48W, Alma Lasers, Cosmobr"
                  value={equipBrandModel}
                  onChange={(e) => setEquipBrandModel(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-[#EAE5DF] bg-[#FAF8F5] focus:ring-1 focus:ring-[#3B5B75]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#262220]">Nº de Série / Patrimônio (Opcional)</label>
                <input
                  type="text"
                  placeholder="Ex: SN-2024-8891 ou TAG-04"
                  value={equipSerialNumber}
                  onChange={(e) => setEquipSerialNumber(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-[#EAE5DF] bg-[#FAF8F5] focus:ring-1 focus:ring-[#3B5B75]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-[#262220]">Data da Compra (Opcional)</label>
                  <input
                    type="date"
                    value={equipPurchaseDate}
                    onChange={(e) => setEquipPurchaseDate(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-[#EAE5DF] bg-[#FAF8F5] focus:ring-1 focus:ring-[#3B5B75]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#262220]">Valor Pago / Compra (R$)</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Ex: 3500.00"
                    value={equipPurchasePrice !== undefined && !isNaN(equipPurchasePrice) ? equipPurchasePrice : ""}
                    onChange={(e) => setEquipPurchasePrice(e.target.value ? Number(e.target.value) : undefined)}
                    className="w-full p-2.5 rounded-lg border border-[#EAE5DF] bg-[#FAF8F5] focus:ring-1 focus:ring-[#3B5B75]"
                    min={0}
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-[#EAE5DF]">
                <button
                  type="button"
                  onClick={() => setIsEquipModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-[#EAE5DF] text-[#544E49]"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#3B5B75] hover:bg-[#2C465C] text-[#FFFFFF] font-semibold transition-all"
                >
                  {editingEquipId ? "Salvar Alterações" : "Salvar Aparelho"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
