import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { authFetch } from "../api/http"
import AuthControls from "../components/AuthControls"
import PasaporteOffRoad from "../components/PasaporteOffRoad"
import AdminAsistencias from "../components/AdminAsistencias"
import { TIPOS_MANTENIMIENTO, ultimoRegistro, estaVencido, formatearFecha } from "../utils/mantenimiento"

const ESTADOS = {
  PENDING: "Pendiente",
  PAID: "Pagado",
  CANCELLED: "Cancelado",
}

export default function MiCuenta() {
  const { user, token, estaLogueado } = useAuth()
  const [searchParams] = useSearchParams()
  const vehiculoDestacado = searchParams.get("vehiculo")

  if (!estaLogueado) {
    return (
      <div className="page-shell">
        <div className="page-container">
          <div className="hero-stage items-center text-center">
            <h1 className="hero-title">Mi cuenta</h1>
            <p className="hero-copy mx-auto">
              Iniciá sesión con Google para ver tus cuatriciclos y tus pedidos.
            </p>
            <div className="mt-6 flex justify-center">
              <AuthControls />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page-shell">
      <div className="page-container pb-20">
        <p className="hero-eyebrow">Mi cuenta</p>
        <h1 className="hero-title mb-2">Hola, {user.name}</h1>
        <p className="hero-copy mb-10">{user.email}</p>

        <div className="grid gap-8 lg:grid-cols-2">
          <MisVehiculos token={token} vehiculoDestacado={vehiculoDestacado} />
          <MisPedidos token={token} />
        </div>

        <div className="mt-8">
          <PasaporteOffRoad token={token} />
        </div>

        {user.role === "ADMIN" ? (
          <div className="mt-8 space-y-8">
            <AdminAsistencias token={token} />
            <AdminPedidos token={token} />
          </div>
        ) : null}
      </div>
    </div>
  )
}

function MisVehiculos({ token, vehiculoDestacado }) {
  const [vehiculos, setVehiculos] = useState(null)
  const [error, setError] = useState("")
  const [form, setForm] = useState({
    brand: "",
    model: "",
    engineCc: "",
    lastOilChange: "",
    lastGeneralMaintenance: "",
  })
  const [enviando, setEnviando] = useState(false)

  useEffect(() => {
    authFetch("/api/vehicles", token)
      .then(setVehiculos)
      .catch((err) => setError(err.message))
  }, [token])

  // Si llegamos acá desde la notificación de mantenimiento, scrolleamos
  // hasta el vehículo en cuestión para que no haya que buscarlo.
  useEffect(() => {
    if (!vehiculoDestacado || !vehiculos) return
    document.getElementById(`vehiculo-${vehiculoDestacado}`)?.scrollIntoView({ behavior: "smooth", block: "center" })
  }, [vehiculoDestacado, vehiculos])

  async function agregarVehiculo(event) {
    event.preventDefault()
    if (!form.brand || !form.model || !form.engineCc) return

    setEnviando(true)
    setError("")
    try {
      const nuevo = await authFetch("/api/vehicles", token, {
        method: "POST",
        body: JSON.stringify({
          brand: form.brand,
          model: form.model,
          engineCc: Number(form.engineCc),
          lastOilChange: form.lastOilChange || undefined,
          lastGeneralMaintenance: form.lastGeneralMaintenance || undefined,
        }),
      })
      setVehiculos((prev) => [...(prev ?? []), nuevo])
      setForm({ brand: "", model: "", engineCc: "", lastOilChange: "", lastGeneralMaintenance: "" })
    } catch (err) {
      setError(err.message)
    } finally {
      setEnviando(false)
    }
  }

  async function borrarVehiculo(id) {
    setError("")
    try {
      await authFetch(`/api/vehicles/${id}`, token, { method: "DELETE" })
      setVehiculos((prev) => prev.filter((v) => v.id !== id))
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <section className="rounded-[1.75rem] border border-white/10 bg-black/35 p-6 sm:p-8">
      <h2 className="section-heading mb-6 text-2xl">Mis cuatriciclos</h2>

      {vehiculos === null ? (
        <p className="text-sm text-zinc-400">Cargando...</p>
      ) : vehiculos.length === 0 ? (
        <p className="text-sm text-zinc-400">Todavía no cargaste ningún cuatriciclo.</p>
      ) : (
        <ul className="mb-6 space-y-3">
          {vehiculos.map((v) => (
            <li
              key={v.id}
              id={`vehiculo-${v.id}`}
              className={`rounded-xl border bg-white/[0.03] px-4 py-3 transition ${
                v.id === vehiculoDestacado ? "border-yellow-400/60 ring-2 ring-yellow-400/30" : "border-white/10"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-white">
                    {v.brand} {v.model}
                  </p>
                  <p className="text-sm text-zinc-400">{v.engineCc}cc</p>
                </div>
                <button
                  type="button"
                  onClick={() => borrarVehiculo(v.id)}
                  aria-label={`Borrar ${v.brand} ${v.model}`}
                  className="rounded-full p-2 text-zinc-500 transition hover:bg-red-400/10 hover:text-red-400"
                >
                  🗑️
                </button>
              </div>

              <Bitacora
                token={token}
                vehiculo={v}
                abrirInicialmente={v.id === vehiculoDestacado}
                onChange={(logs) =>
                  setVehiculos((prev) => prev.map((item) => (item.id === v.id ? { ...item, maintenanceLogs: logs } : item)))
                }
              />
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={agregarVehiculo} className="grid grid-cols-2 gap-3 border-t border-white/10 pt-6">
        <input
          type="text"
          placeholder="Marca"
          value={form.brand}
          onChange={(e) => setForm((f) => ({ ...f, brand: e.target.value }))}
          className="col-span-1 rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-white placeholder:text-zinc-500"
          required
        />
        <input
          type="text"
          placeholder="Modelo"
          value={form.model}
          onChange={(e) => setForm((f) => ({ ...f, model: e.target.value }))}
          className="col-span-1 rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-white placeholder:text-zinc-500"
          required
        />
        <input
          type="number"
          min="1"
          placeholder="Cilindrada (cc)"
          value={form.engineCc}
          onChange={(e) => setForm((f) => ({ ...f, engineCc: e.target.value }))}
          className="col-span-2 rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-white placeholder:text-zinc-500"
          required
        />

        <div className="col-span-2 sm:col-span-1">
          <label className="mb-1 block text-xs text-zinc-500">
            Último cambio de aceite <span className="text-zinc-600">(opcional)</span>
          </label>
          <input
            type="date"
            value={form.lastOilChange}
            onChange={(e) => setForm((f) => ({ ...f, lastOilChange: e.target.value }))}
            className="w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-white"
          />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label className="mb-1 block text-xs text-zinc-500">
            Último mantenimiento general <span className="text-zinc-600">(opcional)</span>
          </label>
          <input
            type="date"
            value={form.lastGeneralMaintenance}
            onChange={(e) => setForm((f) => ({ ...f, lastGeneralMaintenance: e.target.value }))}
            className="w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-white"
          />
        </div>

        <button
          type="submit"
          disabled={enviando}
          className="col-span-2 rounded-lg bg-lime-400 px-4 py-2 text-sm font-bold text-black transition hover:bg-lime-300 disabled:opacity-50"
        >
          {enviando ? "Agregando..." : "Agregar"}
        </button>
      </form>
      <p className="mt-2 text-xs text-zinc-500">
        Si no sabés las fechas, dejalas en blanco — igual podés cargarlas después.
      </p>

      {error ? <p className="mt-3 text-sm text-red-400">{error}</p> : null}
    </section>
  )
}

// Registro de mantenimiento de UN vehículo: resumen del último de cada tipo,
// historial completo desplegable, y el form chico para cargar uno nuevo.
function Bitacora({ token, vehiculo, onChange, abrirInicialmente = false }) {
  const [abierta, setAbierta] = useState(abrirInicialmente)
  const [error, setError] = useState("")
  const [enviando, setEnviando] = useState(false)
  const [form, setForm] = useState({
    type: "ACEITE",
    date: new Date().toISOString().slice(0, 10),
    note: "",
  })

  const logs = vehiculo.maintenanceLogs ?? []

  async function agregarRegistro(event) {
    event.preventDefault()
    setEnviando(true)
    setError("")
    try {
      await authFetch(`/api/vehicles/${vehiculo.id}/maintenance`, token, {
        method: "POST",
        body: JSON.stringify(form),
      })
      const actualizados = await authFetch(`/api/vehicles/${vehiculo.id}/maintenance`, token)
      onChange(actualizados)
      setForm((f) => ({ ...f, note: "" }))
    } catch (err) {
      setError(err.message)
    } finally {
      setEnviando(false)
    }
  }

  async function borrarRegistro(logId) {
    setError("")
    try {
      await authFetch(`/api/vehicles/${vehiculo.id}/maintenance/${logId}`, token, { method: "DELETE" })
      onChange(logs.filter((l) => l.id !== logId))
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="mt-4 border-t border-white/10 pt-4">
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-zinc-400">
        {TIPOS_MANTENIMIENTO.map((tipo) => {
          const ultimo = ultimoRegistro(vehiculo, tipo.value)
          const vencido = estaVencido(vehiculo, tipo.value)
          return (
            <span key={tipo.value} className={vencido ? "text-yellow-400" : "text-zinc-400"}>
              {vencido ? "⚠️" : "✅"} {tipo.label}
              {tipo.info ? (
                <span className="ml-1 cursor-help text-zinc-500" title={tipo.info}>
                  ℹ️
                </span>
              ) : null}
              : {ultimo ? formatearFecha(ultimo.date) : "nunca registrado"}
            </span>
          )
        })}
      </div>

      <button
        type="button"
        onClick={() => setAbierta((v) => !v)}
        className="mt-3 text-xs font-bold uppercase tracking-wide text-lime-400 hover:text-lime-300"
      >
        {abierta ? "Ocultar registro de mantenimiento ▲" : `Ver registro de mantenimiento (${logs.length}) ▼`}
      </button>

      {abierta ? (
        <div className="mt-3 space-y-3">
          {logs.length > 0 ? (
            <ul className="space-y-2">
              {logs.map((log) => (
                <li
                  key={log.id}
                  className="flex items-center justify-between rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm"
                >
                  <span className="text-zinc-300">
                    {formatearFecha(log.date)} — {TIPOS_MANTENIMIENTO.find((t) => t.value === log.type)?.label}
                    {log.note ? ` (${log.note})` : ""}
                  </span>
                  <button
                    type="button"
                    onClick={() => borrarRegistro(log.id)}
                    aria-label="Borrar registro"
                    className="rounded-full p-1 text-zinc-500 transition hover:bg-red-400/10 hover:text-red-400"
                  >
                    🗑️
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-zinc-500">Todavía no hay nada cargado.</p>
          )}

          <form onSubmit={agregarRegistro} className="flex flex-wrap items-end gap-2">
            <select
              value={form.type}
              onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
              className="rounded-lg border border-white/15 bg-black/40 px-2 py-1.5 text-sm text-white"
            >
              {TIPOS_MANTENIMIENTO.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
              className="rounded-lg border border-white/15 bg-black/40 px-2 py-1.5 text-sm text-white"
              required
            />
            <input
              type="text"
              placeholder="Nota (opcional)"
              value={form.note}
              onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
              className="min-w-[8rem] flex-1 rounded-lg border border-white/15 bg-black/40 px-2 py-1.5 text-sm text-white placeholder:text-zinc-500"
            />
            <button
              type="submit"
              disabled={enviando}
              className="rounded-lg bg-lime-400 px-3 py-1.5 text-sm font-bold text-black transition hover:bg-lime-300 disabled:opacity-50"
            >
              {enviando ? "..." : "Cargar"}
            </button>
          </form>

          {error ? <p className="text-sm text-red-400">{error}</p> : null}
        </div>
      ) : null}
    </div>
  )
}

function MisPedidos({ token }) {
  const [pedidos, setPedidos] = useState(null)
  const [error, setError] = useState("")

  useEffect(() => {
    authFetch("/api/orders", token)
      .then(setPedidos)
      .catch((err) => setError(err.message))
  }, [token])

  return (
    <section className="rounded-[1.75rem] border border-white/10 bg-black/35 p-6 sm:p-8">
      <h2 className="section-heading mb-6 text-2xl">Mis pedidos</h2>

      {error ? <p className="text-sm text-red-400">{error}</p> : null}

      {pedidos === null ? (
        <p className="text-sm text-zinc-400">Cargando...</p>
      ) : pedidos.length === 0 ? (
        <p className="text-sm text-zinc-400">
          Todavía no hiciste ningún pedido desde la tienda.
        </p>
      ) : (
        <ul className="space-y-4">
          {pedidos.map((pedido) => (
            <li key={pedido.id} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-zinc-400">
                  {new Date(pedido.createdAt).toLocaleDateString("es-AR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </p>
                <span className="rounded-full border border-lime-400/40 bg-lime-400/10 px-3 py-1 text-xs font-bold uppercase text-lime-400">
                  {ESTADOS[pedido.status] ?? pedido.status}
                </span>
              </div>
              <p className="mt-2 text-sm text-zinc-300">
                {pedido.items.length} {pedido.items.length === 1 ? "producto" : "productos"}
              </p>
              <p className="mt-1 font-bold text-white">${pedido.totalAmount}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

const BADGE_ESTADO = {
  PENDING: "border-yellow-400/40 bg-yellow-400/10 text-yellow-400",
  PAID: "border-lime-400/40 bg-lime-400/10 text-lime-400",
  CANCELLED: "border-red-400/40 bg-red-400/10 text-red-400",
}

// Solo lo ve un usuario ADMIN. Acá se resuelven los pedidos que quedaron
// "Pendiente" después de una consulta por WhatsApp que no se concretó.
function AdminPedidos({ token }) {
  const [pedidos, setPedidos] = useState(null)
  const [error, setError] = useState("")
  const [actualizando, setActualizando] = useState(null)

  useEffect(() => {
    authFetch("/api/orders/all", token)
      .then(setPedidos)
      .catch((err) => setError(err.message))
  }, [token])

  async function cambiarEstado(id, status) {
    setActualizando(id)
    setError("")
    try {
      const actualizado = await authFetch(`/api/orders/${id}/status`, token, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      })
      setPedidos((prev) => prev.map((p) => (p.id === id ? { ...p, status: actualizado.status } : p)))
    } catch (err) {
      setError(err.message)
    } finally {
      setActualizando(null)
    }
  }

  async function borrarPedido(id) {
    if (!window.confirm("¿Borrar este pedido? No se puede deshacer.")) return

    setActualizando(id)
    setError("")
    try {
      await authFetch(`/api/orders/${id}`, token, { method: "DELETE" })
      setPedidos((prev) => prev.filter((p) => p.id !== id))
    } catch (err) {
      setError(err.message)
    } finally {
      setActualizando(null)
    }
  }

  return (
    <section className="rounded-[1.75rem] border border-lime-400/20 bg-black/35 p-6 sm:p-8">
      <h2 className="section-heading mb-2 text-2xl">Todos los pedidos (admin)</h2>
      <p className="mb-6 text-sm text-zinc-400">
        Si alguien consultó y no compró: cancelalo para devolverle el stock al producto, o
        borralo directamente para que no quede ni el registro.
      </p>

      {error ? <p className="mb-4 text-sm text-red-400">{error}</p> : null}

      {pedidos === null ? (
        <p className="text-sm text-zinc-400">Cargando...</p>
      ) : pedidos.length === 0 ? (
        <p className="text-sm text-zinc-400">Todavía no hay pedidos de ningún usuario.</p>
      ) : (
        <ul className="space-y-4">
          {pedidos.map((pedido) => (
            <li key={pedido.id} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="font-bold text-white">{pedido.user.name}</p>
                  <p className="text-sm text-zinc-400">{pedido.user.email}</p>
                </div>
                <span
                  className={`rounded-full border px-3 py-1 text-xs font-bold uppercase ${BADGE_ESTADO[pedido.status] ?? "border-white/20 bg-white/5 text-white"}`}
                >
                  {ESTADOS[pedido.status] ?? pedido.status}
                </span>
              </div>

              <ul className="mt-3 space-y-1 text-sm text-zinc-300">
                {pedido.items.map((item) => (
                  <li key={item.id}>
                    {item.quantity}x {item.product?.name ?? "Producto borrado"} — ${item.price} c/u
                  </li>
                ))}
              </ul>

              <div className="mt-3 flex items-center justify-between">
                <p className="font-bold text-white">Total: ${pedido.totalAmount}</p>

                <div className="flex flex-wrap gap-2">
                  {pedido.status === "PENDING" ? (
                    <>
                      <button
                        type="button"
                        disabled={actualizando === pedido.id}
                        onClick={() => cambiarEstado(pedido.id, "PAID")}
                        className="rounded-lg border border-lime-400/40 px-3 py-1.5 text-xs font-bold text-lime-400 transition hover:bg-lime-400/10 disabled:opacity-50"
                      >
                        Marcar pagado
                      </button>
                      <button
                        type="button"
                        disabled={actualizando === pedido.id}
                        onClick={() => cambiarEstado(pedido.id, "CANCELLED")}
                        className="rounded-lg border border-red-400/40 px-3 py-1.5 text-xs font-bold text-red-400 transition hover:bg-red-400/10 disabled:opacity-50"
                      >
                        Cancelar (repone stock)
                      </button>
                    </>
                  ) : null}
                  {pedido.status !== "PAID" ? (
                    <button
                      type="button"
                      disabled={actualizando === pedido.id}
                      onClick={() => borrarPedido(pedido.id)}
                      className="rounded-lg border border-white/15 px-3 py-1.5 text-xs font-bold text-zinc-400 transition hover:border-red-400/40 hover:text-red-400 disabled:opacity-50"
                    >
                      Borrar
                    </button>
                  ) : null}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
