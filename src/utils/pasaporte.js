import { travesias } from "../data/travesias"

// Niveles de insignia por terreno, de mayor a menor exigencia (el primero
// que cumple es el nivel actual). Simple: no depende de más datos que la
// cantidad de travesías de ese tipo a las que fue.
export const NIVELES_INSIGNIA = [
  { tier: "oro", min: 5, emoji: "🥇", label: "Oro" },
  { tier: "plata", min: 3, emoji: "🥈", label: "Plata" },
  { tier: "bronce", min: 1, emoji: "🥉", label: "Bronce" },
]

const ETIQUETAS_TERRENO = {
  arena: "Arena",
  barro: "Barro",
  solidaria: "Solidarias",
  nieve: "Nieve",
}

export function etiquetaTerreno(tipo) {
  return ETIQUETAS_TERRENO[tipo] ?? tipo
}

// Los tipos de terreno que existen de verdad en el historial (así no
// mostramos una insignia de "Nieve" que todavía nadie puede haber ganado).
export function tiposDeTerreno() {
  return [...new Set(travesias.map((t) => t.tipo))]
}

export function travesiaPorId(id) {
  return travesias.find((t) => t.id === id) ?? null
}

// Nivel actual para una cantidad de travesías de un tipo. null = todavía sin
// insignia (ni siquiera bronce).
export function calcularInsignia(cantidad) {
  return NIVELES_INSIGNIA.find((n) => cantidad >= n.min) ?? null
}

// Cuántas travesías faltan para el próximo nivel (útil para mostrar
// "te faltan 2 para Plata"). null si ya está en el nivel máximo.
export function proximoNivel(cantidad) {
  const siguiente = [...NIVELES_INSIGNIA].reverse().find((n) => cantidad < n.min)
  return siguiente ? { ...siguiente, faltan: siguiente.min - cantidad } : null
}
