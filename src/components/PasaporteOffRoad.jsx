import { useEffect, useState } from "react"
import { authFetch } from "../api/http"
import { NIVELES_INSIGNIA, etiquetaTerreno, tiposDeTerreno, travesiaPorId, calcularInsignia, proximoNivel } from "../utils/pasaporte"

// El "Pasaporte Off-Road" del usuario logueado: línea de tiempo de las
// travesías a las que asistió + insignias por terreno según cuántas hizo de
// cada tipo. Los datos de "a qué asistió" los carga un admin (no el
// usuario), pero el resto (título, foto, tipo) sale de travesias.js.
export default function PasaporteOffRoad({ token }) {
  const [asistencias, setAsistencias] = useState(null)
  const [error, setError] = useState("")

  useEffect(() => {
    authFetch("/api/asistencias", token)
      .then(setAsistencias)
      .catch((err) => setError(err.message))
  }, [token])

  const detalles = (asistencias ?? [])
    .map((a) => ({ ...a, travesia: travesiaPorId(a.travesiaId) }))
    .filter((a) => a.travesia)
    .sort((a, b) => new Date(b.travesia.fechaOrden) - new Date(a.travesia.fechaOrden))

  const conteoPorTerreno = {}
  for (const d of detalles) {
    conteoPorTerreno[d.travesia.tipo] = (conteoPorTerreno[d.travesia.tipo] ?? 0) + 1
  }

  return (
    <section className="rounded-[1.75rem] border border-white/10 bg-black/35 p-6 sm:p-8">
      <h2 className="section-heading mb-2 text-2xl">Pasaporte Off-Road</h2>
      <p className="mb-6 text-sm text-zinc-400">Tu historial de travesías e insignias por terreno.</p>

      {error ? <p className="mb-4 text-sm text-red-400">{error}</p> : null}

      {/* Insignias */}
      <div className="mb-8 grid gap-3 sm:grid-cols-3">
        {tiposDeTerreno().map((tipo) => {
          const cantidad = conteoPorTerreno[tipo] ?? 0
          const insignia = calcularInsignia(cantidad)
          const siguiente = proximoNivel(cantidad)

          return (
            <div
              key={tipo}
              className={`rounded-xl border p-4 text-center ${
                insignia ? "border-lime-400/30 bg-lime-400/[0.06]" : "border-white/10 bg-white/[0.02]"
              }`}
            >
              <p className="text-3xl">{insignia ? insignia.emoji : "🔒"}</p>
              <p className="mt-2 text-sm font-bold text-white">{etiquetaTerreno(tipo)}</p>
              <p className="mt-1 text-xs text-zinc-400">
                {insignia ? `${insignia.label} · ${cantidad}` : `${cantidad}/${NIVELES_INSIGNIA.at(-1).min}`}
              </p>
              {siguiente ? (
                <p className="mt-1 text-[0.68rem] text-zinc-500">
                  Faltan {siguiente.faltan} para {siguiente.label}
                </p>
              ) : null}
            </div>
          )
        })}
      </div>

      {/* Línea de tiempo */}
      {asistencias === null ? (
        <p className="text-sm text-zinc-400">Cargando...</p>
      ) : detalles.length === 0 ? (
        <p className="text-sm text-zinc-400">
          Todavía no tenés travesías cargadas en tu pasaporte. Se cargan después de cada salida.
        </p>
      ) : (
        <ul className="space-y-3 border-t border-white/10 pt-6">
          {detalles.map((d) => (
            <li
              key={d.id}
              className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-3"
            >
              <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-zinc-900">
                <img src={d.travesia.portada} alt={d.travesia.titulo} className="h-full w-full object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-bold text-white">{d.travesia.titulo}</p>
                <p className="text-xs text-zinc-400">
                  {d.travesia.fecha} · {etiquetaTerreno(d.travesia.tipo)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
