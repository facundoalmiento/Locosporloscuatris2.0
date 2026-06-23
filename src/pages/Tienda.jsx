import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import { siteConfig } from "../config/site"
import { productos } from "../data/productos"

const categorias = [
  { id: "todos", label: "Todo el equipo" },
  { id: "cascos", label: "Cascos" },
  { id: "guantes", label: "Guantes" },
  { id: "aceites", label: "Aceites" },
  { id: "protecciones", label: "Protecciones" }
]

const metricas = [
  { valor: "5", etiqueta: "productos curados" },
  { valor: "4", etiqueta: "categorías clave" },
  { valor: "24/7", etiqueta: "modo off-road" }
]

function buildWhatsAppUrl(producto) {
  const mensaje = `Hola! Me interesa ${producto.nombre} (${producto.precio}). Quiero consultar disponibilidad y compra.`
  return `https://wa.me/${siteConfig.whatsappNumero}?text=${encodeURIComponent(mensaje)}`
}

export default function Tienda() {
  const [categoriaActiva, setCategoriaActiva] = useState("todos")
  const [productoActivo, setProductoActivo] = useState(null)
  const productosFiltrados = categoriaActiva === "todos" ? productos : productos.filter((producto) => producto.categoria === categoriaActiva)
  const destacado = productos[0]

  useEffect(() => {
    if (!productoActivo) return undefined
    function handleKeyDown(event) {
      if (event.key === "Escape") setProductoActivo(null)
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [productoActivo])

  return (
    <div className="page-shell">
      <div className="page-container">
        <div className="hero-stage">
          <section className="hero-panel">
          <div>
            <p className="hero-eyebrow">Tienda</p>
            <h1 className="hero-title">Equipamiento con ADN de travesía.</h1>
            <p className="hero-copy">Una selección chica, directa y con actitud. Acá ves equipo pensado para arena, barro, frío y jornadas largas de manejo real.</p>
            <div className="action-row">
              <a href="#catalogo" className="primary-action">Ver catálogo</a>
              <Link to="/contacto#whatsapp" className="secondary-action">Consultar stock</Link>
            </div>
          </div>
          <div className="metric-grid">
            {metricas.map((metrica) => (
              <div key={metrica.etiqueta} className="metric-card">
                <div className="metric-value">{metrica.valor}</div>
                <div className="metric-label">{metrica.etiqueta}</div>
              </div>
            ))}
          </div>
          </section>
        </div>

        <div className="landing-section-with-nav">
          <section className="feature-card w-full">
            <div className="grid lg:grid-cols-[1.18fr_0.82fr] xl:grid-cols-[1.28fr_0.72fr]">
            <div className="feature-media">
              <img src={destacado.imagen} alt={destacado.nombre} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/25 to-transparent" />
            </div>
            <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
              <p className="text-sm font-bold uppercase tracking-[0.35em] text-lime-400">Producto destacado</p>
              <h2 className="mt-4 text-3xl font-black uppercase leading-none sm:text-4xl">{destacado.nombre}</h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-300">{destacado.descripcion} Una pieza pensada para arrancar fuerte y bancarse salidas largas con estilo agresivo y funcional.</p>
              <div className="mt-6 flex flex-wrap items-center gap-3 sm:gap-4">
                <span className="text-2xl font-black text-white sm:text-3xl">{destacado.precio}</span>
                <span className="rounded-full border border-lime-400/40 bg-lime-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-lime-300">{destacado.badge}</span>
              </div>
            </div>
            </div>
          </section>
        </div>

        <section id="catalogo" className="pb-20">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.35em] text-lime-400">Catálogo</p>
              <h2 className="mt-3 text-2xl font-black uppercase sm:text-3xl md:text-4xl">Armá tu setup off-road</h2>
            </div>
            <div className="filter-row">
              {categorias.map((categoria) => (
                <button key={categoria.id} onClick={() => setCategoriaActiva(categoria.id)} className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition sm:px-5 sm:text-sm ${categoriaActiva === categoria.id ? "border-lime-400 bg-lime-400 text-black" : "border-white/15 text-zinc-200 hover:border-lime-400 hover:text-lime-300"}`}>{categoria.label}</button>
              ))}
            </div>
          </div>

          <div className="responsive-grid-3">
            {productosFiltrados.map((producto) => (
              <article key={producto.id} className="group overflow-hidden rounded-[1.75rem] border border-white/10 bg-black/35 transition hover:border-lime-400/50">
                <div className="relative h-[clamp(15rem,58vw,18rem)] overflow-hidden">
                  <img src={producto.imagen} alt={producto.nombre} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/70" />
                  <div className="absolute top-4 left-4 rounded-full border border-white/15 bg-black/45 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-lime-300 backdrop-blur-sm">{producto.badge}</div>
                </div>
                <div className="p-6">
                  <div className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">{producto.categoria}</div>
                  <h3 className="text-xl font-black uppercase text-white sm:text-2xl">{producto.nombre}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-zinc-400">{producto.descripcion}</p>
                  <div className="mt-6 flex flex-col items-start gap-4 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
                    <span className="text-2xl font-black text-lime-400">{producto.precio}</span>
                    <button type="button" onClick={() => setProductoActivo(producto)} className="rounded-2xl border border-lime-400 px-5 py-2 font-semibold text-lime-300 transition hover:bg-lime-400 hover:text-black">Ver detalle</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

      {productoActivo ? (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/85 p-3 sm:p-4" onClick={() => setProductoActivo(null)}>
          <div className="relative grid max-h-[92svh] w-full max-w-5xl overflow-y-auto rounded-[1.35rem] border border-white/10 bg-zinc-950 shadow-[0_30px_120px_rgba(0,0,0,0.45)] sm:rounded-[2rem] lg:grid-cols-[1fr_0.95fr]" onClick={(event) => event.stopPropagation()}>
            <button type="button" onClick={() => setProductoActivo(null)} className="absolute right-4 top-4 z-10 rounded-full bg-black/40 px-4 py-2 text-sm font-semibold text-white transition hover:bg-black/65 sm:right-5 sm:top-5">Cerrar</button>
            <div className="relative min-h-[14rem] sm:min-h-[22rem]">
              <img src={productoActivo.imagen} alt={productoActivo.nombre} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute left-6 bottom-6 rounded-full border border-white/15 bg-black/45 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-lime-300 backdrop-blur-sm">{productoActivo.badge}</div>
            </div>
            <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-10">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.35em] text-lime-400">{productoActivo.categoria}</p>
                <h2 className="mt-4 text-3xl font-black uppercase leading-none text-white sm:text-4xl">{productoActivo.nombre}</h2>
                <p className="mt-6 text-base leading-relaxed text-zinc-300">{productoActivo.descripcion} Si querés, podés consultarlo por WhatsApp y seguir la compra o la reserva del producto desde ahí.</p>
                <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
                  <div className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">Precio</div>
                  <div className="mt-2 text-3xl font-black text-lime-400 sm:text-4xl">{productoActivo.precio}</div>
                </div>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href={buildWhatsAppUrl(productoActivo)} target="_blank" rel="noreferrer" className="rounded-2xl bg-lime-400 px-6 py-3 font-bold text-black transition hover:bg-lime-300">Consultar por WhatsApp</a>
                <button type="button" onClick={() => setProductoActivo(null)} className="rounded-2xl border border-white/15 px-6 py-3 font-semibold text-white transition hover:border-lime-400 hover:text-lime-300">Seguir viendo</button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
