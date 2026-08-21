import { useState } from "react"
import { useCart } from "../context/CartContext"
import { useAuth } from "../context/AuthContext"
import { authFetch } from "../api/http"
import { siteConfig } from "../config/site"

function buildCartWhatsAppUrl(items, total) {
  const lineas = items.map((item) => `- ${item.nombre} x${item.cantidad}`).join("\n")
  const mensaje = `Hola! Quiero consultar disponibilidad y compra de:\n${lineas}\n\nTotal estimado: $${total}`
  return `https://wa.me/${siteConfig.whatsappNumero}?text=${encodeURIComponent(mensaje)}`
}

export default function CartDrawer() {
  const { items, removeItem, updateQuantity, totalPrecio, clearCart, abierto, setAbierto } = useCart()
  const { estaLogueado, token } = useAuth()
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState("")

  if (!abierto) return null

  async function finalizarCompra() {
    setError("")

    // Si no inició sesión, seguimos exactamente como antes: directo a WhatsApp,
    // sin tocar la base de datos (el login con Google es opcional).
    if (!estaLogueado) {
      window.open(buildCartWhatsAppUrl(items, totalPrecio), "_blank", "noopener,noreferrer")
      return
    }

    setEnviando(true)
    try {
      // Si está logueado, además guardamos el pedido en su cuenta y descontamos
      // stock real. Si no hay stock suficiente, frenamos acá antes de mandarlo
      // a WhatsApp a pedir algo que en realidad no tenemos.
      await authFetch("/api/orders", token, {
        method: "POST",
        body: JSON.stringify({
          items: items.map((item) => ({ productId: item.id, quantity: item.cantidad })),
        }),
      })
      window.open(buildCartWhatsAppUrl(items, totalPrecio), "_blank", "noopener,noreferrer")
      clearCart()
    } catch (err) {
      setError(err.message)
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-[1100] flex justify-end bg-black/70"
      onClick={() => setAbierto(false)}
    >
      <div
        className="flex h-full w-full max-w-md flex-col border-l border-white/10 bg-zinc-950 p-6"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <h2 className="text-xl font-black uppercase text-white">Tu carrito</h2>
          <button
            type="button"
            onClick={() => setAbierto(false)}
            className="rounded-full bg-white/5 px-3 py-1 text-sm font-semibold text-white hover:bg-white/10"
          >
            Cerrar
          </button>
        </div>

        {items.length === 0 ? (
          <p className="mt-8 text-sm text-zinc-400">Todavía no agregaste nada.</p>
        ) : (
          <div className="mt-6 flex-1 space-y-4 overflow-y-auto">
            {items.map((item) => (
              <div key={item.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-bold text-white">{item.nombre}</p>
                    <p className="text-sm text-zinc-400">${item.precio} c/u</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    aria-label={`Quitar ${item.nombre} del carrito`}
                    className="rounded-full p-1.5 text-zinc-500 transition hover:bg-red-400/10 hover:text-red-400"
                  >
                    🗑️
                  </button>
                </div>
                <div className="mt-3 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.cantidad - 1)}
                    className="h-8 w-8 rounded-full border border-white/15 text-white hover:border-lime-400"
                  >
                    −
                  </button>
                  <span className="w-6 text-center font-semibold text-white">{item.cantidad}</span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.cantidad + 1)}
                    className="h-8 w-8 rounded-full border border-white/15 text-white hover:border-lime-400"
                  >
                    +
                  </button>
                  <span className="ml-auto font-bold text-lime-400">${item.precio * item.cantidad}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {items.length > 0 ? (
          <div className="mt-6 border-t border-white/10 pt-5">
            <div className="flex items-center justify-between text-lg font-black text-white">
              <span>Total</span>
              <span className="text-lime-400">${totalPrecio}</span>
            </div>
            <button
              type="button"
              onClick={finalizarCompra}
              disabled={enviando}
              className="mt-4 block w-full rounded-2xl bg-lime-400 px-6 py-3 text-center font-bold text-black transition hover:bg-lime-300 disabled:opacity-50"
            >
              {enviando ? "Confirmando..." : "Finalizar por WhatsApp"}
            </button>
            {error ? <p className="mt-2 text-sm text-red-400">{error}</p> : null}
            {estaLogueado ? (
              <p className="mt-2 text-xs text-zinc-500">
                Este pedido va a quedar guardado en "Mi cuenta".
              </p>
            ) : null}
            <button
              type="button"
              onClick={() => setAbierto(false)}
              className="mt-3 w-full rounded-2xl border border-white/15 px-6 py-3 text-center font-semibold text-zinc-300 transition hover:border-lime-400 hover:text-lime-300"
            >
              Seguir comprando
            </button>
          </div>
        ) : null}
      </div>
    </div>
  )
}
