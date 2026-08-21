import { useEffect, useState } from "react"
import { authFetch } from "../api/http"
import { travesias } from "../data/travesias"
import { etiquetaTerreno } from "../utils/pasaporte"

// Solo lo ve un ADMIN. Acá se carga "fulano fue a tal travesía" — no lo hace
// el usuario solo, porque las inscripciones son por WhatsApp, fuera del sitio.
export default function AdminAsistencias({ token }) {
  const [usuarios, setUsuarios] = useState(null)
  const [asistencias, setAsistencias] = useState(null)
  const [form, setForm] = useState({ userId: "", travesiaId: "" })
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    authFetch("/api/users", token).then(setUsuarios).catch((err) => setError(err.message))
    authFetch("/api/asistencias/all", token).then(setAsistencias).catch((err) => setError(err.message))
  }, [token])

  async function agregar(event) {
    event.preventDefault()
    if (!form.userId || !form.travesiaId) return

    setEnviando(true)
    setError("")
    try {
      const nueva = await authFetch("/api/asistencias", token, {
        method: "POST",
        body: JSON.stringify(form),
      })
      setAsistencias((prev) => [nueva, ...(prev ?? [])])
      setForm((f) => ({ ...f, travesiaId: "" }))
    } catch (err) {
      setError(err.message)
    } finally {
      setEnviando(false)
    }
  }

  async function borrar(id) {
    setError("")
    try {
      await authFetch(`/api/asistencias/${id}`, token, { method: "DELETE" })
      setAsistencias((prev) => prev.filter((a) => a.id !== id))
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <section className="rounded-[1.75rem] border border-lime-400/20 bg-black/35 p-6 sm:p-8">
      <h2 className="section-heading mb-2 text-2xl">Pasaporte Off-Road (admin)</h2>
      <p className="mb-6 text-sm text-zinc-400">
        Cargá qué usuario asistió a qué travesía — así se arma su historial e insignias.
      </p>

      {error ? <p className="mb-4 text-sm text-red-400">{error}</p> : null}

      <form onSubmit={agregar} className="mb-6 flex flex-wrap items-end gap-2">
        <div className="min-w-[10rem] flex-1">
          <label className="mb-1 block text-xs text-zinc-500">Usuario</label>
          <select
            value={form.userId}
            onChange={(e) => setForm((f) => ({ ...f, userId: e.target.value }))}
            className="w-full rounded-lg border border-white/15 bg-black/40 px-2 py-2 text-sm text-white"
            required
          >
            <option value="">Elegir...</option>
            {(usuarios ?? []).map((u) => (
              <option key={u.id} value={u.id}>
                {u.name} ({u.email})
              </option>
            ))}
          </select>
        </div>
        <div className="min-w-[10rem] flex-1">
          <label className="mb-1 block text-xs text-zinc-500">Travesía</label>
          <select
            value={form.travesiaId}
            onChange={(e) => setForm((f) => ({ ...f, travesiaId: e.target.value }))}
            className="w-full rounded-lg border border-white/15 bg-black/40 px-2 py-2 text-sm text-white"
            required
          >
            <option value="">Elegir...</option>
            {travesias.map((t) => (
              <option key={t.id} value={t.id}>
                {t.titulo} ({t.fecha})
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          disabled={enviando}
          className="rounded-lg bg-lime-400 px-4 py-2 text-sm font-bold text-black transition hover:bg-lime-300 disabled:opacity-50"
        >
          {enviando ? "Agregando..." : "Agregar"}
        </button>
      </form>

      {asistencias === null ? (
        <p className="text-sm text-zinc-400">Cargando...</p>
      ) : asistencias.length === 0 ? (
        <p className="text-sm text-zinc-400">Todavía no cargaste ninguna asistencia.</p>
      ) : (
        <ul className="space-y-2 border-t border-white/10 pt-4">
          {asistencias.map((a) => {
            const travesia = travesias.find((t) => t.id === a.travesiaId)
            return (
              <li
                key={a.id}
                className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm"
              >
                <span className="text-zinc-300">
                  <strong className="text-white">{a.user.name}</strong> — {travesia?.titulo ?? a.travesiaId}
                  {travesia ? ` (${etiquetaTerreno(travesia.tipo)})` : ""}
                </span>
                <button
                  type="button"
                  onClick={() => borrar(a.id)}
                  aria-label="Borrar asistencia"
                  className="rounded-full p-1 text-zinc-500 transition hover:bg-red-400/10 hover:text-red-400"
                >
                  🗑️
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}
