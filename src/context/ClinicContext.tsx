"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  Tenant,
  Professional,
  Room,
  Equipment,
  Procedure,
  Client,
  Appointment,
  DailySummary,
  EvolutionRecord,
  AppointmentStatus,
  PaymentMethod,
  InventoryItem,
  ClientTechnicalProfile,
} from "@/types";
import {
  mockTenant,
  mockRooms,
  mockEquipments,
  mockProfessionals,
  mockProcedures,
  mockClients,
  mockAppointments,
  mockDailySummary,
  mockEvolutionRecords,
  mockInventory,
} from "@/lib/mockData";
import { checkResourceConflict, ConflictCheckResult, getAvailableTimeSlots } from "@/lib/bookingEngine";
import { collection, getDocs } from "firebase/firestore";
import { db, isFirebaseConfigured } from "@/lib/firebase";
import {
  initializeTenantData,
  syncProcedureToCloud,
  deleteProcedureFromCloud,
  syncRoomToCloud,
  deleteRoomFromCloud,
  syncEquipmentToCloud,
  deleteEquipmentFromCloud,
  syncAppointmentToCloud,
  syncClientToCloud,
  syncInventoryToCloud,
} from "@/lib/firestoreService";

interface ClinicContextType {
  tenant: Tenant;
  rooms: Room[];
  equipments: Equipment[];
  professionals: Professional[];
  procedures: Procedure[];
  clients: Client[];
  appointments: Appointment[];
  dailySummary: DailySummary;
  evolutionRecords: EvolutionRecord[];
  inventory: InventoryItem[];
  selectedDate: string; // YYYY-MM-DD
  setSelectedDate: (date: string) => void;
  // Ações
  bookAppointment: (data: {
    clientId: string;
    clientName: string;
    clientPhone: string;
    professionalId: string;
    procedureId: string;
    date: string;
    startTime: string;
    notes?: string;
  }) => { success: boolean; error?: string; appointment?: Appointment };
  updateAppointmentStatus: (
    id: string,
    status: AppointmentStatus,
    paid?: boolean,
    paymentMethod?: PaymentMethod
  ) => void;
  addClient: (client: Omit<Client, "id" | "tenantId" | "totalAppointments" | "totalSpent">) => Client;
  updateClientTechnicalProfile: (clientId: string, profile: ClientTechnicalProfile) => void;
  addEvolutionRecord: (record: Omit<EvolutionRecord, "id" | "tenantId">) => EvolutionRecord;
  addInventoryItem: (item: Omit<InventoryItem, "id" | "tenantId">) => InventoryItem;
  updateInventoryItem: (id: string, item: Partial<InventoryItem>) => void;
  addProcedure: (procedure: Omit<Procedure, "id" | "tenantId">) => Procedure;
  updateProcedure: (id: string, procedure: Partial<Procedure>) => void;
  deleteProcedure: (id: string) => void;
  addRoom: (room: Omit<Room, "id" | "tenantId">) => Room;
  updateRoom: (id: string, room: Partial<Room>) => void;
  deleteRoom: (id: string) => void;
  addEquipment: (equipment: Omit<Equipment, "id" | "tenantId">) => Equipment;
  updateEquipment: (id: string, equipment: Partial<Equipment>) => void;
  deleteEquipment: (id: string) => void;
  getSlotsForProcedureAndPro: (date: string, procedureId: string, professionalId: string) => string[];
  checkConflict: (
    date: string,
    startTime: string,
    procedureId: string,
    professionalId: string,
    excludeAppointmentId?: string
  ) => ConflictCheckResult;
}

const ClinicContext = createContext<ClinicContextType | undefined>(undefined);

const STORAGE_KEY_PREFIX = "lumina_clinic_";

export const ClinicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tenant] = useState<Tenant>(mockTenant);
  const [rooms, setRooms] = useState<Room[]>(mockRooms);
  const [equipments, setEquipments] = useState<Equipment[]>(mockEquipments);
  const [professionals] = useState<Professional[]>(mockProfessionals);
  const [procedures, setProcedures] = useState<Procedure[]>(mockProcedures);
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [evolutionRecords, setEvolutionRecords] = useState<EvolutionRecord[]>(mockEvolutionRecords);
  const [inventory, setInventory] = useState<InventoryItem[]>(mockInventory);
  const [selectedDate, setSelectedDate] = useState<string>("2026-09-20");

  // Carregar do localStorage se existir
  useEffect(() => {
    try {
      const savedApps = localStorage.getItem(`${STORAGE_KEY_PREFIX}appointments`);
      if (savedApps) setAppointments(JSON.parse(savedApps));

      const savedClients = localStorage.getItem(`${STORAGE_KEY_PREFIX}clients`);
      if (savedClients) setClients(JSON.parse(savedClients));

      const savedEvo = localStorage.getItem(`${STORAGE_KEY_PREFIX}evolution`);
      if (savedEvo) setEvolutionRecords(JSON.parse(savedEvo));

      const savedInv = localStorage.getItem(`${STORAGE_KEY_PREFIX}inventory`);
      if (savedInv) setInventory(JSON.parse(savedInv));

      const savedProc = localStorage.getItem(`${STORAGE_KEY_PREFIX}procedures`);
      if (savedProc) setProcedures(JSON.parse(savedProc));

      const savedRooms = localStorage.getItem(`${STORAGE_KEY_PREFIX}rooms`);
      if (savedRooms) setRooms(JSON.parse(savedRooms));

      const savedEquip = localStorage.getItem(`${STORAGE_KEY_PREFIX}equipments`);
      if (savedEquip) setEquipments(JSON.parse(savedEquip));
    } catch {
      // fallback para os mocks
    }
  }, []);

  // Sincronizar com o Firebase Firestore na nuvem
  useEffect(() => {
    if (!isFirebaseConfigured || !db) return;

    const loadCloudData = async () => {
      try {
        await initializeTenantData(tenant.id);
        const [procSnap, roomSnap, equipSnap, clientSnap, appSnap, invSnap] = await Promise.all([
          getDocs(collection(db!, "tenants", tenant.id, "procedures")),
          getDocs(collection(db!, "tenants", tenant.id, "rooms")),
          getDocs(collection(db!, "tenants", tenant.id, "equipments")),
          getDocs(collection(db!, "tenants", tenant.id, "clients")),
          getDocs(collection(db!, "tenants", tenant.id, "appointments")),
          getDocs(collection(db!, "tenants", tenant.id, "inventory")),
        ]);

        if (!procSnap.empty) setProcedures(procSnap.docs.map((d) => d.data() as Procedure));
        if (!roomSnap.empty) setRooms(roomSnap.docs.map((d) => d.data() as Room));
        if (!equipSnap.empty) setEquipments(equipSnap.docs.map((d) => d.data() as Equipment));
        if (!clientSnap.empty) setClients(clientSnap.docs.map((d) => d.data() as Client));
        if (!appSnap.empty) setAppointments(appSnap.docs.map((d) => d.data() as Appointment));
        if (!invSnap.empty) setInventory(invSnap.docs.map((d) => d.data() as InventoryItem));
        console.log("[Firebase] Dados da clínica sincronizados com a nuvem!");
      } catch (err) {
        console.error("[Firebase] Erro ao sincronizar dados na nuvem:", err);
      }
    };

    loadCloudData();
  }, [tenant.id]);

  // Salvar alterações
  const persistProcedures = (newProcs: Procedure[]) => {
    setProcedures(newProcs);
    try {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}procedures`, JSON.stringify(newProcs));
    } catch {}
  };

  const persistRooms = (newRooms: Room[]) => {
    setRooms(newRooms);
    try {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}rooms`, JSON.stringify(newRooms));
    } catch {}
  };

  const persistEquipments = (newEquip: Equipment[]) => {
    setEquipments(newEquip);
    try {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}equipments`, JSON.stringify(newEquip));
    } catch {}
  };

  const persistInventory = (newInv: InventoryItem[]) => {
    setInventory(newInv);
    try {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}inventory`, JSON.stringify(newInv));
    } catch {}
  };

  const persistAppointments = (newApps: Appointment[]) => {
    setAppointments(newApps);
    try {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}appointments`, JSON.stringify(newApps));
    } catch {}
  };

  const persistClients = (newClients: Client[]) => {
    setClients(newClients);
    try {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}clients`, JSON.stringify(newClients));
    } catch {}
  };

  const persistEvolution = (newEvo: EvolutionRecord[]) => {
    setEvolutionRecords(newEvo);
    try {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}evolution`, JSON.stringify(newEvo));
    } catch {}
  };

  // Resumo diário calculado
  const dayAppointments = appointments.filter((app) => app.date === selectedDate);
  const dailySummary: DailySummary = {
    date: selectedDate,
    tenantId: tenant.id,
    totalAppointments: dayAppointments.length,
    totalRevenue: dayAppointments.reduce((acc, app) => acc + (app.paid ? app.price : 0), 0),
    completedCount: dayAppointments.filter((a) => a.status === "concluido").length,
    canceledCount: dayAppointments.filter((a) => a.status === "cancelado").length,
    missedCount: dayAppointments.filter((a) => a.status === "faltou").length,
    pendingPaymentCount: dayAppointments.filter((a) => !a.paid && a.status !== "cancelado").length,
  };

  const checkConflict = (
    date: string,
    startTime: string,
    procedureId: string,
    professionalId: string,
    excludeAppointmentId?: string
  ): ConflictCheckResult => {
    const proc = procedures.find((p) => p.id === procedureId);
    if (!proc) return { hasConflict: true, reason: "Procedimento não encontrado." };

    const room = rooms.find((r) => r.id === proc.requiredRoomId);
    return checkResourceConflict({
      date,
      startTime,
      durationMinutes: proc.durationMinutes,
      bufferMinutes: proc.bufferMinutes,
      professionalId,
      roomId: proc.requiredRoomId,
      roomCapacity: room?.capacity || 1,
      isRoomUnderMaintenance: room?.status === "manutencao",
      equipmentId: proc.requiredEquipmentId,
      existingAppointments: appointments,
      excludeAppointmentId,
    });
  };

  const getSlotsForProcedureAndPro = (
    date: string,
    procedureId: string,
    professionalId: string
  ): string[] => {
    const proc = procedures.find((p) => p.id === procedureId);
    const pro = professionals.find((p) => p.id === professionalId);
    if (!proc || !pro) return [];

    const room = rooms.find((r) => r.id === proc.requiredRoomId);
    return getAvailableTimeSlots({
      date,
      procedure: proc,
      professional: pro,
      roomId: proc.requiredRoomId,
      roomCapacity: room?.capacity || 1,
      isRoomUnderMaintenance: room?.status === "manutencao",
      equipmentId: proc.requiredEquipmentId,
      existingAppointments: appointments,
    });
  };

  const bookAppointment = (data: {
    clientId: string;
    clientName: string;
    clientPhone: string;
    professionalId: string;
    procedureId: string;
    date: string;
    startTime: string;
    notes?: string;
  }) => {
    const proc = procedures.find((p) => p.id === data.procedureId);
    const pro = professionals.find((p) => p.id === data.professionalId);
    if (!proc) return { success: false, error: "Procedimento inválido" };
    if (!pro) return { success: false, error: "Profissional inválida" };

    // Validar conflito de recursos
    const conflict = checkConflict(data.date, data.startTime, data.procedureId, data.professionalId);
    if (conflict.hasConflict) {
      return { success: false, error: conflict.reason };
    }

    // Calcular endTime
    const [h, m] = data.startTime.split(":").map(Number);
    const startMin = h * 60 + m;
    const endMin = startMin + proc.durationMinutes;
    const endHour = Math.floor(endMin / 60);
    const endMinute = endMin % 60;
    const endTime = `${String(endHour).padStart(2, "0")}:${String(endMinute).padStart(2, "0")}`;

    const room = rooms.find((r) => r.id === proc.requiredRoomId);
    const equipment = equipments.find((e) => e.id === proc.requiredEquipmentId);

    const newAppointment: Appointment = {
      id: `app-${Date.now()}`,
      tenantId: tenant.id,
      clientId: data.clientId,
      clientName: data.clientName,
      clientPhone: data.clientPhone,
      professionalId: pro.id,
      professionalName: pro.name,
      procedureId: proc.id,
      procedureName: proc.name,
      roomId: room?.id,
      roomName: room?.name,
      equipmentId: equipment?.id,
      equipmentName: equipment?.name,
      date: data.date,
      startTime: data.startTime,
      endTime,
      durationMinutes: proc.durationMinutes,
      bufferMinutes: proc.bufferMinutes,
      price: proc.price,
      status: "agendado",
      notes: data.notes,
      paid: false,
      createdAt: new Date().toISOString(),
    };

    const updatedAppointments = [...appointments, newAppointment];
    persistAppointments(updatedAppointments);
    syncAppointmentToCloud(tenant.id, newAppointment);

    // Atualizar estatísticas da cliente
    const updatedClients = clients.map((c) => {
      if (c.id === data.clientId) {
        return {
          ...c,
          totalAppointments: c.totalAppointments + 1,
          lastAppointmentAt: data.date,
        };
      }
      return c;
    });
    persistClients(updatedClients);
    const targetCli = updatedClients.find((c) => c.id === data.clientId);
    if (targetCli) syncClientToCloud(tenant.id, targetCli);

    return { success: true, appointment: newAppointment };
  };

  const updateAppointmentStatus = (
    id: string,
    status: AppointmentStatus,
    paid?: boolean,
    paymentMethod?: PaymentMethod
  ) => {
    const updated = appointments.map((app) => {
      if (app.id === id) {
        return {
          ...app,
          status,
          paid: paid !== undefined ? paid : app.paid,
          paymentMethod: paymentMethod || app.paymentMethod,
        };
      }
      return app;
    });
    persistAppointments(updated);
    const updatedApp = updated.find((a) => a.id === id);
    if (updatedApp) syncAppointmentToCloud(tenant.id, updatedApp);
  };

  const addClient = (clientData: Omit<Client, "id" | "tenantId" | "totalAppointments" | "totalSpent">): Client => {
    const newClient: Client = {
      ...clientData,
      id: `cli-${Date.now()}`,
      tenantId: tenant.id,
      totalAppointments: 0,
      totalSpent: 0,
    };
    const updated = [newClient, ...clients];
    persistClients(updated);
    syncClientToCloud(tenant.id, newClient);
    return newClient;
  };

  const addEvolutionRecord = (recordData: Omit<EvolutionRecord, "id" | "tenantId">): EvolutionRecord => {
    const newRecord: EvolutionRecord = {
      ...recordData,
      id: `evo-${Date.now()}`,
      tenantId: tenant.id,
    };
    const updated = [newRecord, ...evolutionRecords];
    persistEvolution(updated);
    return newRecord;
  };

  const updateClientTechnicalProfile = (clientId: string, profile: ClientTechnicalProfile) => {
    const updated = clients.map((c) => {
      if (c.id === clientId) {
        return {
          ...c,
          technicalProfile: {
            ...c.technicalProfile,
            ...profile,
          },
        };
      }
      return c;
    });
    persistClients(updated);
    const clientTarget = updated.find((c) => c.id === clientId);
    if (clientTarget) syncClientToCloud(tenant.id, clientTarget);
  };

  const addInventoryItem = (itemData: Omit<InventoryItem, "id" | "tenantId">): InventoryItem => {
    const newItem: InventoryItem = {
      ...itemData,
      id: `inv-${Date.now()}`,
      tenantId: tenant.id,
    };
    const updated = [newItem, ...inventory];
    persistInventory(updated);
    syncInventoryToCloud(tenant.id, newItem);
    return newItem;
  };

  const updateInventoryItem = (id: string, partialItem: Partial<InventoryItem>) => {
    const updated = inventory.map((item) => {
      if (item.id === id) {
        return { ...item, ...partialItem };
      }
      return item;
    });
    persistInventory(updated);
    const itemTarget = updated.find((i) => i.id === id);
    if (itemTarget) syncInventoryToCloud(tenant.id, itemTarget);
  };

  const addProcedure = (procedureData: Omit<Procedure, "id" | "tenantId">): Procedure => {
    const newProc: Procedure = {
      ...procedureData,
      id: `proc-${Date.now()}`,
      tenantId: tenant.id,
    };
    const updated = [...procedures, newProc];
    persistProcedures(updated);
    syncProcedureToCloud(tenant.id, newProc);
    return newProc;
  };

  const updateProcedure = (id: string, partialData: Partial<Procedure>) => {
    const updated = procedures.map((p) => {
      if (p.id === id) {
        return { ...p, ...partialData };
      }
      return p;
    });
    persistProcedures(updated);
    const procTarget = updated.find((p) => p.id === id);
    if (procTarget) syncProcedureToCloud(tenant.id, procTarget);
  };

  const deleteProcedure = (id: string) => {
    const updated = procedures.filter((p) => p.id !== id);
    persistProcedures(updated);
    deleteProcedureFromCloud(tenant.id, id);
  };

  const addRoom = (roomData: Omit<Room, "id" | "tenantId">): Room => {
    const newRoom: Room = {
      ...roomData,
      id: `room-${Date.now()}`,
      tenantId: tenant.id,
    };
    const updated = [...rooms, newRoom];
    persistRooms(updated);
    syncRoomToCloud(tenant.id, newRoom);
    return newRoom;
  };

  const updateRoom = (id: string, partialData: Partial<Room>) => {
    const updated = rooms.map((r) => (r.id === id ? { ...r, ...partialData } : r));
    persistRooms(updated);
    const roomTarget = updated.find((r) => r.id === id);
    if (roomTarget) syncRoomToCloud(tenant.id, roomTarget);
  };

  const deleteRoom = (id: string) => {
    const updated = rooms.filter((r) => r.id !== id);
    persistRooms(updated);
    deleteRoomFromCloud(tenant.id, id);
    // Desvincular de procedimentos que exigiam esta sala
    const updatedProcs = procedures.map((p) =>
      p.requiredRoomId === id ? { ...p, requiredRoomId: undefined } : p
    );
    persistProcedures(updatedProcs);
  };

  const addEquipment = (equipmentData: Omit<Equipment, "id" | "tenantId">): Equipment => {
    const newEquip: Equipment = {
      ...equipmentData,
      id: `eq-${Date.now()}`,
      tenantId: tenant.id,
    };
    const updated = [...equipments, newEquip];
    persistEquipments(updated);
    syncEquipmentToCloud(tenant.id, newEquip);
    return newEquip;
  };

  const updateEquipment = (id: string, partialData: Partial<Equipment>) => {
    const updated = equipments.map((eq) => (eq.id === id ? { ...eq, ...partialData } : eq));
    persistEquipments(updated);
    const equipTarget = updated.find((e) => e.id === id);
    if (equipTarget) syncEquipmentToCloud(tenant.id, equipTarget);
  };

  const deleteEquipment = (id: string) => {
    const updated = equipments.filter((eq) => eq.id !== id);
    persistEquipments(updated);
    deleteEquipmentFromCloud(tenant.id, id);
    // Desvincular de procedimentos que exigiam este aparelho
    const updatedProcs = procedures.map((p) =>
      p.requiredEquipmentId === id ? { ...p, requiredEquipmentId: undefined } : p
    );
    persistProcedures(updatedProcs);
  };

  return (
    <ClinicContext.Provider
      value={{
        tenant,
        rooms,
        equipments,
        professionals,
        procedures,
        clients,
        appointments,
        dailySummary,
        evolutionRecords,
        inventory,
        selectedDate,
        setSelectedDate,
        bookAppointment,
        updateAppointmentStatus,
        addClient,
        updateClientTechnicalProfile,
        addEvolutionRecord,
        addInventoryItem,
        updateInventoryItem,
        addProcedure,
        updateProcedure,
        deleteProcedure,
        addRoom,
        updateRoom,
        deleteRoom,
        addEquipment,
        updateEquipment,
        deleteEquipment,
        getSlotsForProcedureAndPro,
        checkConflict,
      }}
    >
      {children}
    </ClinicContext.Provider>
  );
};

export const useClinic = () => {
  const context = useContext(ClinicContext);
  if (!context) {
    throw new Error("useClinic must be used within a ClinicProvider");
  }
  return context;
};
