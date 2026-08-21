import { eventos } from "../data/eventos"

// Tipos fijos de la bitácora de mantenimiento (compartido entre "Mi cuenta"
// y la notificación junto al nombre del usuario). Simplificado a 2
// categorías para que cargar un registro sea rápido: el aceite es el
// mantenimiento más crítico y periódico, y todo lo demás (correa, engrase,
// pastillas, batería, líquidos, bujía, etc.) entra en "general".
export const TIPOS_MANTENIMIENTO = [
  { value: "ACEITE", label: "Aceite y filtro" },
  {
    value: "GENERAL",
    label: "Mantenimiento general",
    info: "Incluye: pastillas de freno, batería, líquidos, correa, bujía, etc.",
  },
]

export const DIAS_AVISO_TRAVESIA = 60 // avisar si la próxima travesía está a 60 días o menos
export const DIAS_CHEQUEO_FINAL = 7 // última semana: chequeo general aunque no haya nada "vencido"

// Umbral de "hace mucho" por tipo: el aceite tiene un intervalo real y
// conocido (cada 6 meses); "general" es una mezcla de cosas sin un intervalo
// único, así que usamos un umbral más simple y corto (3 meses).
const DIAS_VENCIDO_POR_TIPO = {
  ACEITE: 180,
  GENERAL: 90,
}

// Ojo con las fechas "solo día" (sin hora): JS las interpreta como
// medianoche UTC. Comparamos todo en términos de UTC para que no se corra
// un día según el huso horario de quien lo mira (Argentina es UTC-3).
export function diasHasta(fechaISO) {
  const ahoraLocal = new Date()
  const hoyUTC = Date.UTC(ahoraLocal.getFullYear(), ahoraLocal.getMonth(), ahoraLocal.getDate())
  const fecha = new Date(fechaISO)
  const fechaUTC = Date.UTC(fecha.getUTCFullYear(), fecha.getUTCMonth(), fecha.getUTCDate())
  return Math.round((fechaUTC - hoyUTC) / 86_400_000)
}

export function proximaTravesia() {
  return (
    eventos
      .filter((e) => e.fechaInicio && diasHasta(e.fechaInicio) >= 0)
      .sort((a, b) => diasHasta(a.fechaInicio) - diasHasta(b.fechaInicio))[0] ?? null
  )
}

// Último registro de un tipo dado (los logs ya vienen ordenados del más
// nuevo al más viejo desde el backend).
export function ultimoRegistro(vehiculo, tipo) {
  return vehiculo.maintenanceLogs?.find((log) => log.type === tipo) ?? null
}

export function estaVencido(vehiculo, tipo) {
  const ultimo = ultimoRegistro(vehiculo, tipo)
  if (!ultimo) return true
  const umbral = DIAS_VENCIDO_POR_TIPO[tipo] ?? 90
  return diasHasta(ultimo.date) < -umbral
}

export function formatearFecha(fechaISO) {
  // timeZone: "UTC" evita que se corra un día para atrás al mostrarla
  // (la fecha se guardó como medianoche UTC, no como hora local).
  return new Date(fechaISO).toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  })
}
