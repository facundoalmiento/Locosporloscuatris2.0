import { useCallback, useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext"
import { authFetch } from "../api/http"
import {
  TIPOS_MANTENIMIENTO,
  DIAS_AVISO_TRAVESIA,
  DIAS_CHEQUEO_FINAL,
  diasHasta,
  proximaTravesia,
  estaVencido,
} from "../utils/mantenimiento"

const VISTO_KEY = "lplc-mantenimiento-visto"

// Devuelve null si no hay nada para avisar, o { travesia, dias, grupos,
// chequeoFinal, visto, marcarVisto, refrescar } si hay una travesía próxima
// Y (algún vehículo tiene mantenimiento vencido, o falta una semana o menos
// para la travesía). "grupos" viene agrupado por vehículo (id, nombre, y
// sus tipos vencidos como { type, label }) para no repetir el modelo en
// cada ítem — puede venir vacío. "chequeoFinal" es true en la última semana:
// ahí avisamos igual aunque no haya nada vencido, para que revisen que el
// cuatriciclo esté en condiciones antes de salir. "visto" se guarda en el
// navegador, así el puntito rojo desaparece una vez que lo abriste y no
// vuelve a aparecer hasta que cambie el aviso en sí. "refrescar" vuelve a
// pedir los vehículos (por ejemplo después de cargar un mantenimiento nuevo
// desde la propia notificación).
export function useRecordatorioMantenimiento() {
  const { token, estaLogueado } = useAuth()
  const [vehiculos, setVehiculos] = useState(null)

  const refrescar = useCallback(() => {
    if (!estaLogueado) return
    authFetch("/api/vehicles", token)
      .then(setVehiculos)
      .catch(() => {})
  }, [token, estaLogueado])

  useEffect(() => {
    refrescar()
  }, [refrescar])

  if (!estaLogueado) return null

  const travesia = proximaTravesia()
  if (!travesia || diasHasta(travesia.fechaInicio) > DIAS_AVISO_TRAVESIA) return null
  if (!vehiculos || vehiculos.length === 0) return null

  const dias = diasHasta(travesia.fechaInicio)
  const chequeoFinal = dias <= DIAS_CHEQUEO_FINAL

  // Un grupo por vehículo, con sus tipos vencidos: el modelo queda como
  // "subtítulo" en vez de repetirse en cada ítem.
  const grupos = vehiculos
    .map((v) => ({
      id: v.id,
      vehiculo: `${v.brand} ${v.model}`,
      items: TIPOS_MANTENIMIENTO.filter((tipo) => estaVencido(v, tipo.value)).map((tipo) => ({
        type: tipo.value,
        label: tipo.label,
      })),
    }))
    .filter((grupo) => grupo.items.length > 0)

  // Con algo vencido siempre avisamos. Sin nada vencido, solo avisamos en la
  // última semana (chequeo general, aunque las fechas estén al día).
  if (grupos.length === 0 && !chequeoFinal) return null

  // "Firma" del aviso actual: si cambia (otra travesía, otro mantenimiento
  // vencido, o entramos en la semana del chequeo final), un "visto" viejo
  // deja de contar y el puntito vuelve a aparecer.
  const firma = `${travesia.id}|chequeoFinal:${chequeoFinal}|${grupos.map((g) => `${g.id}:${g.items.map((i) => i.type).join(",")}`).join("|")}`
  const visto = typeof window !== "undefined" && window.localStorage.getItem(VISTO_KEY) === firma

  function marcarVisto() {
    window.localStorage.setItem(VISTO_KEY, firma)
  }

  return { travesia, dias, grupos, chequeoFinal, visto, marcarVisto, refrescar }
}
