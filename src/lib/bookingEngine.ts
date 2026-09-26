import { Appointment, Professional, Procedure } from "@/types";

export interface ConflictCheckResult {
  hasConflict: boolean;
  reason?: string;
  conflictingAppointment?: Appointment;
}

/**
 * Converte "HH:mm" para minutos totais do dia para comparação aritmética precisa
 */
export function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

/**
 * Converte minutos totais do dia de volta para string "HH:mm"
 */
export function minutesToTime(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

/**
 * Verifica se dois intervalos de tempo com buffer se sobrepõem
 */
export function intervalsOverlap(
  startA: number,
  endA: number,
  startB: number,
  endB: number
): boolean {
  return startA < endB && startB < endA;
}

/**
 * Motor Central de Prevenção de Conflitos:
 * Garante que NENHUM atendimento colida em:
 * 1. Profissional
 * 2. Sala Física
 * 3. Equipamento / Máquina
 * Levando em consideração o tempo do procedimento + buffer de assepsia/esterilização.
 */
export function checkResourceConflict(params: {
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  durationMinutes: number;
  bufferMinutes: number;
  professionalId: string;
  roomId?: string;
  roomCapacity?: number;
  isRoomUnderMaintenance?: boolean;
  equipmentId?: string;
  existingAppointments: Appointment[];
  excludeAppointmentId?: string;
}): ConflictCheckResult {
  if (params.roomId && params.isRoomUnderMaintenance) {
    return {
      hasConflict: true,
      reason: "O espaço físico selecionado está temporariamente em manutenção.",
    };
  }

  const newStartMin = timeToMinutes(params.startTime);
  const totalNewDuration = params.durationMinutes + (params.bufferMinutes || 0);
  const newEndMin = newStartMin + totalNewDuration;

  const sameDayAppointments = params.existingAppointments.filter(
    (app) =>
      app.date === params.date &&
      app.status !== "cancelado" &&
      app.id !== params.excludeAppointmentId
  );

  // 1. Conflito de Sala Física (considerando capacidade simultânea configurada)
  if (params.roomId) {
    const overlappingInRoom = sameDayAppointments.filter((app) => {
      if (app.roomId !== params.roomId) return false;
      const appStartMin = timeToMinutes(app.startTime);
      const appEndMin = appStartMin + app.durationMinutes + (app.bufferMinutes || 0);
      return intervalsOverlap(newStartMin, newEndMin, appStartMin, appEndMin);
    });

    const maxCapacity = params.roomCapacity && params.roomCapacity > 0 ? params.roomCapacity : 1;
    if (overlappingInRoom.length >= maxCapacity) {
      const conflicting = overlappingInRoom[0];
      return {
        hasConflict: true,
        reason: `A ${conflicting.roomName || "sala selecionada"} já atingiu a capacidade máxima (${maxCapacity} ${maxCapacity === 1 ? "atendimento" : "atendimentos simultâneos"}) das ${conflicting.startTime} às ${conflicting.endTime}.`,
        conflictingAppointment: conflicting,
      };
    }
  }

  for (const existing of sameDayAppointments) {
    const existingStartMin = timeToMinutes(existing.startTime);
    const existingTotalDuration = existing.durationMinutes + (existing.bufferMinutes || 0);
    const existingEndMin = existingStartMin + existingTotalDuration;

    // Se houver sobreposição temporal
    if (intervalsOverlap(newStartMin, newEndMin, existingStartMin, existingEndMin)) {
      // 2. Conflito de Profissional
      if (existing.professionalId === params.professionalId) {
        return {
          hasConflict: true,
          reason: `A profissional ${existing.professionalName} já possui um agendamento das ${existing.startTime} às ${existing.endTime}.`,
          conflictingAppointment: existing,
        };
      }

      // 3. Conflito de Equipamento / Aparelho
      if (params.equipmentId && existing.equipmentId && existing.equipmentId === params.equipmentId) {
        return {
          hasConflict: true,
          reason: `O equipamento ${existing.equipmentName || "selecionado"} estará em uso por outro procedimento das ${existing.startTime} às ${existing.endTime}.`,
          conflictingAppointment: existing,
        };
      }
    }
  }

  return { hasConflict: false };
}

/**
 * Gera horários disponíveis para agendamento online ou na recepção
 */
export function getAvailableTimeSlots(params: {
  date: string; // YYYY-MM-DD
  procedure: Procedure;
  professional: Professional;
  roomId?: string;
  roomCapacity?: number;
  isRoomUnderMaintenance?: boolean;
  equipmentId?: string;
  existingAppointments: Appointment[];
  slotIntervalMinutes?: number; // padrão: 30 min
}): string[] {
  const slotInterval = params.slotIntervalMinutes || 30;
  
  // Obter dia da semana (0 = domingo, ..., 6 = sábado)
  const [year, month, day] = params.date.split("-").map(Number);
  const dateObj = new Date(year, month - 1, day);
  const dayOfWeek = dateObj.getDay();

  const daySchedule = params.professional.workingHours.find(
    (wh) => wh.dayOfWeek === dayOfWeek
  );

  if (!daySchedule || !daySchedule.isOpen) {
    return []; // Profissional não atende neste dia
  }

  const workStartMin = timeToMinutes(daySchedule.startHour);
  const workEndMin = timeToMinutes(daySchedule.endHour);
  const breakStartMin = daySchedule.breakStart ? timeToMinutes(daySchedule.breakStart) : null;
  const breakEndMin = daySchedule.breakEnd ? timeToMinutes(daySchedule.breakEnd) : null;

  const totalProcedureMinutes = params.procedure.durationMinutes + params.procedure.bufferMinutes;
  const availableSlots: string[] = [];

  for (let currentMin = workStartMin; currentMin + totalProcedureMinutes <= workEndMin; currentMin += slotInterval) {
    const slotEndMin = currentMin + totalProcedureMinutes;

    // Checar se cai no horário de almoço / intervalo
    if (breakStartMin !== null && breakEndMin !== null) {
      if (intervalsOverlap(currentMin, slotEndMin, breakStartMin, breakEndMin)) {
        continue;
      }
    }

    const timeString = minutesToTime(currentMin);

    const conflict = checkResourceConflict({
      date: params.date,
      startTime: timeString,
      durationMinutes: params.procedure.durationMinutes,
      bufferMinutes: params.procedure.bufferMinutes,
      professionalId: params.professional.id,
      roomId: params.roomId || params.procedure.requiredRoomId,
      roomCapacity: params.roomCapacity,
      isRoomUnderMaintenance: params.isRoomUnderMaintenance,
      equipmentId: params.equipmentId || params.procedure.requiredEquipmentId,
      existingAppointments: params.existingAppointments,
    });

    if (!conflict.hasConflict) {
      availableSlots.push(timeString);
    }
  }

  return availableSlots;
}
