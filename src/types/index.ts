export type AppointmentStatus =
  | "agendado"
  | "confirmado"
  | "em_atendimento"
  | "concluido"
  | "cancelado"
  | "faltou";

export type PaymentMethod = "pix" | "cartao_credito" | "cartao_debito" | "dinheiro" | "pacote";

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  phone: string;
  instagram?: string;
  address?: string;
  logoUrl?: string;
  accentColor?: string;
}

export interface WorkingHours {
  dayOfWeek: number; // 0 = Domingo, 1 = Segunda, ..., 6 = Sábado
  isOpen: boolean;
  startHour: string; // "08:00"
  endHour: string;   // "19:00"
  breakStart?: string; // "12:00"
  breakEnd?: string;   // "13:00"
}

export interface Professional {
  id: string;
  tenantId: string;
  name: string;
  role: string;
  phone: string;
  email?: string;
  avatarUrl?: string;
  colorTag: string; // Cor sutil para identificar na agenda
  commissionPercentage: number;
  workingHours: WorkingHours[];
  qualifiedProcedureIds: string[];
}

export type RoomType =
  | "bancada_cabelo"
  | "mesa_unhas"
  | "maca_cabine"
  | "lavatorio"
  | "sala_vip"
  | "outro";

export type RoomStatus = "ativo" | "manutencao";

export interface Room {
  id: string;
  tenantId: string;
  name: string;
  type?: RoomType;
  capacity?: number; // Capacidade de atendimentos simultâneos (padrão 1)
  status?: RoomStatus; // "ativo" | "manutencao"
  defaultProfessionalId?: string; // Profissional fixa/titular da bancada
  description?: string;
}

export interface Equipment {
  id: string;
  tenantId: string;
  name: string;
  brandModel?: string;
  serialNumber?: string;
  purchaseDate?: string; // YYYY-MM-DD
  purchasePrice?: number; // R$ valor pago
}

export type ProcedureCategory =
  | "cabelo"
  | "unhas"
  | "cilios"
  | "sobrancelhas"
  | "facial"
  | "corporal"
  | "laser";

export interface Procedure {
  id: string;
  tenantId: string;
  name: string;
  category: ProcedureCategory;
  price: number;
  durationMinutes: number; // Tempo em cadeira/cabine
  bufferMinutes: number;   // Tempo para assepsia / esterilização
  processingTimeMinutes?: number; // Tempo de pausa química (ex: coloração/mechas)
  requiredRoomId?: string;
  requiredEquipmentId?: string;
  preCareInstructions?: string;
  postCareInstructions?: string;
  description?: string;
}

export type InventoryType = "insumo_bancada" | "revenda_homecare" | "ambos";
export type InventoryCategory =
  | "cabelo"
  | "unhas"
  | "cilios"
  | "sobrancelhas"
  | "facial"
  | "descartaveis";

export interface InventoryItem {
  id: string;
  tenantId: string;
  name: string;
  brand: string;
  category: InventoryCategory;
  usageType: InventoryType;
  currentStock: number;
  unit: string; // "unidades", "tubos", "frascos", "caixas", "ml", "g"
  minStockAlert: number;
  lastPurchaseDate: string; // YYYY-MM-DD
  lastPurchasePrice: number; // Preço pago na última compra
  resalePrice?: number; // Preço de venda ao consumidor (se for revenda)
  supplier?: string; // Nome do fornecedor / distribuidor
  notes?: string;
}

export interface ClientTechnicalProfile {
  hairFormula?: string; // Ex: "Majirel 6.0 (30g) + 6.1 (20g) com OX 20 vol"
  nailShape?: string;   // Ex: "Formato Amendoada, Gel Vòlia Classic Nude"
  lashMapping?: string; // Ex: "Volume Brasileiro, Curvatura D, 10 a 13mm"
  browHenna?: string;   // Ex: "Castanho Médio, tempo de ação 8 min"
  allergies?: string;   // Ex: "Sensibilidade a esmalte tradicional ou cola rápida"
}

export interface Client {
  id: string;
  tenantId: string;
  name: string;
  phone: string;
  email?: string;
  birthDate?: string;
  avatarUrl?: string;
  notes?: string;
  tags: string[];
  lastAppointmentAt?: string;
  totalAppointments: number;
  totalSpent: number;
  technicalProfile?: ClientTechnicalProfile;
}

export interface Appointment {
  id: string;
  tenantId: string;
  clientId: string;
  clientName: string;
  clientPhone: string;
  professionalId: string;
  professionalName: string;
  procedureId: string;
  procedureName: string;
  roomId?: string;
  roomName?: string;
  equipmentId?: string;
  equipmentName?: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string;   // HH:mm
  durationMinutes: number;
  bufferMinutes: number;
  price: number;
  status: AppointmentStatus;
  notes?: string;
  paid: boolean;
  paymentMethod?: PaymentMethod;
  createdAt: string;
}

export interface DailySummary {
  date: string;
  tenantId: string;
  totalAppointments: number;
  totalRevenue: number;
  completedCount: number;
  canceledCount: number;
  missedCount: number;
  pendingPaymentCount: number;
}

export interface EvolutionRecord {
  id: string;
  tenantId: string;
  clientId: string;
  appointmentId?: string;
  date: string;
  procedureName: string;
  professionalName: string;
  observations: string;
  skinReaction?: string;
  parametersUsed?: string; // ex: "Laser Soprano 14J/cm², 10Hz"
  photoBeforeUrl?: string;
  photoAfterUrl?: string;
}
