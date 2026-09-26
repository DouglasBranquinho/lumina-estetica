import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  writeBatch,
  onSnapshot,
} from "firebase/firestore";
import { db } from "./firebase";
import {
  Procedure,
  Room,
  Equipment,
  Client,
  Appointment,
  InventoryItem,
  EvolutionRecord,
} from "@/types";
import {
  mockProcedures,
  mockRooms,
  mockEquipments,
  mockClients,
  mockAppointments,
  mockInventory,
  mockEvolutionRecords,
} from "./mockData";

/**
 * Verifica se o banco na nuvem já possui dados da clínica.
 * Se estiver vazio, realiza a carga inicial automática (seed)
 * para que a dona nunca comece com tela em branco.
 */
export async function initializeTenantData(tenantId: string) {
  if (!db) return;

  try {
    const procsRef = collection(db, "tenants", tenantId, "procedures");
    const snapshot = await getDocs(procsRef);

    if (snapshot.empty) {
      console.log(`[Firebase] Populando dados iniciais da clínica ${tenantId}...`);
      const batch = writeBatch(db);

      // Procedimentos
      mockProcedures.forEach((proc) => {
        const ref = doc(db!, "tenants", tenantId, "procedures", proc.id);
        batch.set(ref, proc);
      });

      // Salas e Cabines
      mockRooms.forEach((room) => {
        const ref = doc(db!, "tenants", tenantId, "rooms", room.id);
        batch.set(ref, room);
      });

      // Equipamentos
      mockEquipments.forEach((equip) => {
        const ref = doc(db!, "tenants", tenantId, "equipments", equip.id);
        batch.set(ref, equip);
      });

      // Clientes
      mockClients.forEach((client) => {
        const ref = doc(db!, "tenants", tenantId, "clients", client.id);
        batch.set(ref, client);
      });

      // Agendamentos
      mockAppointments.forEach((app) => {
        const ref = doc(db!, "tenants", tenantId, "appointments", app.id);
        batch.set(ref, app);
      });

      // Estoque
      mockInventory.forEach((item) => {
        const ref = doc(db!, "tenants", tenantId, "inventory", item.id);
        batch.set(ref, item);
      });

      await batch.commit();
      console.log(`[Firebase] Dados iniciais carregados com sucesso no Firestore!`);
    }
  } catch (error) {
    console.error("[Firebase] Erro ao inicializar dados da clínica:", error);
  }
}

/**
 * Salva ou atualiza um procedimento no Firestore
 */
export async function syncProcedureToCloud(tenantId: string, procedure: Procedure) {
  if (!db) return;
  try {
    const ref = doc(db, "tenants", tenantId, "procedures", procedure.id);
    await setDoc(ref, procedure, { merge: true });
  } catch (error) {
    console.error("[Firebase] Erro ao salvar procedimento:", error);
  }
}

/**
 * Exclui um procedimento do Firestore
 */
export async function deleteProcedureFromCloud(tenantId: string, procedureId: string) {
  if (!db) return;
  try {
    const ref = doc(db, "tenants", tenantId, "procedures", procedureId);
    await deleteDoc(ref);
  } catch (error) {
    console.error("[Firebase] Erro ao excluir procedimento:", error);
  }
}

/**
 * Salva ou atualiza uma sala/cabine no Firestore
 */
export async function syncRoomToCloud(tenantId: string, room: Room) {
  if (!db) return;
  try {
    const ref = doc(db, "tenants", tenantId, "rooms", room.id);
    await setDoc(ref, room, { merge: true });
  } catch (error) {
    console.error("[Firebase] Erro ao salvar sala:", error);
  }
}

/**
 * Exclui uma sala/cabine do Firestore
 */
export async function deleteRoomFromCloud(tenantId: string, roomId: string) {
  if (!db) return;
  try {
    const ref = doc(db, "tenants", tenantId, "rooms", roomId);
    await deleteDoc(ref);
  } catch (error) {
    console.error("[Firebase] Erro ao excluir sala:", error);
  }
}

/**
 * Salva ou atualiza um equipamento no Firestore
 */
export async function syncEquipmentToCloud(tenantId: string, equipment: Equipment) {
  if (!db) return;
  try {
    const ref = doc(db, "tenants", tenantId, "equipments", equipment.id);
    await setDoc(ref, equipment, { merge: true });
  } catch (error) {
    console.error("[Firebase] Erro ao salvar equipamento:", error);
  }
}

/**
 * Exclui um equipamento do Firestore
 */
export async function deleteEquipmentFromCloud(tenantId: string, equipmentId: string) {
  if (!db) return;
  try {
    const ref = doc(db, "tenants", tenantId, "equipments", equipmentId);
    await deleteDoc(ref);
  } catch (error) {
    console.error("[Firebase] Erro ao excluir equipamento:", error);
  }
}

/**
 * Salva ou atualiza um agendamento no Firestore
 */
export async function syncAppointmentToCloud(tenantId: string, appointment: Appointment) {
  if (!db) return;
  try {
    const ref = doc(db, "tenants", tenantId, "appointments", appointment.id);
    await setDoc(ref, appointment, { merge: true });
  } catch (error) {
    console.error("[Firebase] Erro ao salvar agendamento:", error);
  }
}

/**
 * Salva ou atualiza uma cliente no Firestore
 */
export async function syncClientToCloud(tenantId: string, client: Client) {
  if (!db) return;
  try {
    const ref = doc(db, "tenants", tenantId, "clients", client.id);
    await setDoc(ref, client, { merge: true });
  } catch (error) {
    console.error("[Firebase] Erro ao salvar cliente:", error);
  }
}

/**
 * Salva ou atualiza um item de estoque no Firestore
 */
export async function syncInventoryToCloud(tenantId: string, item: InventoryItem) {
  if (!db) return;
  try {
    const ref = doc(db, "tenants", tenantId, "inventory", item.id);
    await setDoc(ref, item, { merge: true });
  } catch (error) {
    console.error("[Firebase] Erro ao salvar item de estoque:", error);
  }
}
