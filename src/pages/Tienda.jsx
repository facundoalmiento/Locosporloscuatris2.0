import { useEffect, useState } from "react"

import { siteConfig } from "../config/site"
import { useCart } from "../context/CartContext"
import mascotaTienda from "../assets/mascota-tienda.png"

// Si el producto todavía no tiene fotos propias cargadas (images vacío),
// usamos una imagen de referencia por categoría como respaldo temporal.
const imagenPorCategoria = {
  cascos: "/galeria/pinamar-2025/enduro.jpg",
  guantes: "/galeria/barrofuerte-02.jpg",
  aceites: "/galeria/aceite.png",
  protecciones: "/galeria/pinamar-2025/utv.jpg",
}
const IMAGEN_FALLBACK = "/galeria/pinamar-2025/utv.jpg"

const beneficios = [
  { valor: "🚚", etiqueta: "Envíos a todo el país" },
  { valor: "💳", etiqueta: "Pagos en cuotas" },
  { valor: "🤝", etiqueta: "Retiro y entrega en persona" }
]

function mapearProducto(p) {
  const categoriaLower = p.category?.name?.toLowerCase() ?? "general"
  const fallback = imagenPorCategoria[categoriaLower] || IMAGEN_FALLBACK
  const imagenes = p.images && p.images.length > 0 ? p.images : [fallback]
  return {
    id: p.id,
    nombre: p.name,
    precio: p.price,
    descripcion: p.description ?? "",
    imagen: imagenes[0],
    imagenes,
    categoria: categoriaLower,
    badge: p.stock > 0 ? `Stock: ${p.stock}` : "Sin stock",
    stock: p.stock,
  }
}

// Placa clara lisa: la mayoría de las fotos de producto vienen con fondo
// blanco de estudio, así que el producto "flota" sobre blanco en vez de
// chocar contra un recuadro oscuro. Fundido suave al aparecer, sin spinners.
function FotoProducto({ src, alt, className, wrapperClassName }) {
  const [cargada, setCargada] = useState(false)
  return (
    <div className={`bg-zinc-100 ${wrapperClassName ?? ""}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setCargada(true)}
        className={`${className} transition-opacity duration-500 ${cargada ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  )
}

// Mismo alto aproximado que el catálogo real (destacado + grilla de 5 cards),
// para que la página no "salte" de tamaño cuando llegan los productos.
// Eso es lo que hacía que el degradé de fondo se viera distinto: al cambiar
// la altura total de la página, el gradiente (que se calcula sobre esa altura)
// se recalculaba y se veía "otro color" unos segundos después de entrar.
// Misma forma que una card real (ver <article> del catálogo más abajo),
// para que el esqueleto ocupe exactamente el mismo espacio.
function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-black/35">
      <div className="h-[clamp(15rem,58vw,18rem)] bg-zinc-900" />
      <div className="p-6">
        <div className="h-5 w-20 rounded-full bg-white/10" />
        <div className="mt-3 h-6 w-3/4 rounded bg-white/10" />
        <div className="mt-4 h-4 w-full rounded bg-white/5" />
        <div className="mt-6 border-t border-white/10 pt-5">
          <div className="h-6 w-16 rounded bg-white/10" />
          <div className="mt-4 flex gap-2">
            <div className="h-10 w-24 rounded-2xl bg-white/10" />
            <div className="h-10 w-24 rounded-2xl bg-white/10" />
          </div>
        </div>
      </div>
    </div>
  )
}

function TiendaEsqueleto() {
  return (
    <div className="animate-pulse">
      <div className="landing-section-with-nav pb-10">
        <section className="hero-panel w-full">
          <div>
            <div className="mb-4 h-6 w-40 rounded-full bg-white/10" />
            <div className="h-10 w-3/4 rounded bg-white/10" />
            <div className="mt-5 h-4 w-full rounded bg-white/5" />
            <div className="mt-5 h-6 w-24 rounded bg-white/10" />
            <div className="mt-7 h-12 w-44 rounded-2xl bg-white/10" />
          </div>
          <div className="h-56 rounded-[1.25rem] bg-zinc-900 sm:h-72 sm:rounded-[1.75rem] lg:h-full" />
        </section>
      </div>

      <section className="pb-20">
        <div className="mb-8 h-10 w-64 rounded bg-white/10" />
        <div className="responsive-grid-3">
          {Array.from({ length: 5 }, (_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </section>
    </div>
  )
}

function buildWhatsAppUrl(producto) {
  const mensaje = `Hola! Me interesa ${producto.nombre} ($${producto.precio}). Quiero consultar disponibilidad y compra.`
  return `https://wa.me/${siteConfig.whatsappNumero}?text=${encodeURIComponent(mensaje)}`
}

export default function Tienda() {
  const { addItem } = useCart()
  const [productos, setProductos] = useState([])
  const [categoriasBackend, setCategoriasBackend] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [categoriaActiva, setCategoriaActiva] = useState("todos")
  const [productoActivo, setProductoActivo] = useState(null)
  const [fotoIndex, setFotoIndex] = useState(0)

  useEffect(() => {
    let cancelado = false

    async function cargarDatos() {
      try {
        const [resProductos, resCategorias] = await Promise.all([
          fetch("/api/products"),
          fetch("/api/categories"),
        ])
        if (!resProductos.ok || !resCategorias.ok) throw new Error("Respuesta no OK")
        const dataProductos = await resProductos.json()
        const dataCategorias = await resCategorias.json()
        if (cancelado) return
        setProductos(dataProductos.map(mapearProducto))
        setCategoriasBackend(dataCategorias)
      } catch (err) {
        console.error("Error cargando la tienda:", err)
        if (!cancelado) setError("No se pudo conectar con la tienda. ¿Está corriendo el backend (npm run server:dev)?")
      } finally {
        if (!cancelado) setCargando(false)
      }
    }

    cargarDatos()
    return () => {
      cancelado = true
    }
  }, [])

  const categorias = [
    { id: "todos", label: "Todo el equipo" },
    ...categoriasBackend.map((c) => ({ id: c.name.toLowerCase(), label: c.name })),
  ]

  const productosFiltrados =
    categoriaActiva === "todos" ? productos : productos.filter((producto) => producto.categoria === categoriaActiva)
  const destacado = productos[0]

  useEffect(() => {
    if (!productoActivo) return undefined
    setFotoIndex(0)
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
              <button
                type="button"
                onClick={() => document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth" })}
                className="primary-action"
              >
                Ver catálogo
              </button>
            </div>
          </div>
          <div className="flex items-end justify-center">
            <img
              src={mascotaTienda}
              alt="Mascota de Locos por los Cuatris equipada con antiparras, protector y botas off-road"
              className="h-auto max-h-[15rem] w-full object-contain sm:max-h-[20rem] lg:max-h-[28rem] 2xl:max-h-[34rem]"
            />
          </div>
          </section>
        </div>

        {/* Tira de beneficios, con presencia: entre el hero y los productos. */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 rounded-2xl border border-lime-400/30 bg-lime-400/[0.08] px-6 py-5 sm:justify-around sm:rounded-[1.75rem] sm:px-10">
          {beneficios.map((beneficio) => (
            <span key={beneficio.etiqueta} className="flex items-center gap-3 whitespace-nowrap">
              <span className="text-2xl sm:text-3xl">{beneficio.valor}</span>
              <span className="text-sm font-bold uppercase tracking-[0.08em] text-white sm:text-base">{beneficio.etiqueta}</span>
            </span>
          ))}
        </div>

        {error ? (
          <div className="rounded-2xl border border-red-400/30 bg-red-400/10 p-6 text-red-300">{error}</div>
        ) : cargando ? (
          <TiendaEsqueleto />
        ) : (
          <>
            {destacado ? (
              <div className="landing-section-with-nav pb-10">
                {/* Misma clase que el panel del hero de arriba: mismo tamaño y mismo comportamiento responsive. */}
                <section className="hero-panel w-full">
                  <div>
                    <span className="mb-4 inline-block rounded-full border border-lime-400/40 bg-lime-400/10 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-lime-300">Producto destacado</span>
                    <h2 className="hero-title !mb-0 !text-[clamp(1.8rem,5.5vw,3rem)]">{destacado.nombre}</h2>
                    <p className="hero-copy">{destacado.descripcion}</p>
                    <div className="mt-5 flex items-center gap-3">
                      <span className="text-2xl font-black text-white sm:text-3xl">${destacado.precio}</span>
                      <span className={`text-xs font-semibold uppercase tracking-[0.15em] ${destacado.stock > 0 ? "text-zinc-400" : "text-red-400"}`}>{destacado.badge}</span>
                    </div>
                    <div className="action-row">
                      <button
                        type="button"
                        onClick={() => addItem(destacado)}
                        disabled={destacado.stock <= 0}
                        className="primary-action disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        Agregar al carrito
                      </button>
                    </div>
                  </div>
                  <div className="relative h-56 overflow-hidden rounded-[1.25rem] sm:h-72 sm:rounded-[1.75rem] lg:h-full">
                    <FotoProducto
                      src={destacado.imagen}
                      alt={destacado.nombre}
                      wrapperClassName="h-full w-full"
                      className="h-full w-full object-contain"
                    />
                  </div>
                </section>
              </div>
            ) : null}

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

              {productosFiltrados.length === 0 ? (
                <p className="text-zinc-400">No hay productos en esta categoría todavía.</p>
              ) : (
                <div className="responsive-grid-3">
                  {productosFiltrados.map((producto) => (
                    <article key={producto.id} className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-black/35 transition hover:border-lime-400/50">
                      <div className="relative h-[clamp(15rem,58vw,18rem)] overflow-hidden">
                        <FotoProducto
                          src={producto.imagen}
                          alt={producto.nombre}
                          wrapperClassName="h-full w-full"
                          className="h-full w-full object-contain transition duration-700 group-hover:scale-110"
                        />
                      </div>
                      <div className="flex flex-1 flex-col p-6">
                        <span className="inline-block rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-zinc-400">{producto.categoria}</span>
                        <h3 className="mt-3 text-xl font-black uppercase text-white sm:text-2xl">{producto.nombre}</h3>
                        <p className="mt-4 text-sm leading-relaxed text-zinc-400">{producto.descripcion}</p>
                        <div className="mt-auto flex flex-col gap-4 border-t border-white/10 pt-5">
                          <div className="flex items-center justify-between">
                            <span className="text-2xl font-black text-lime-400">${producto.precio}</span>
                            <span className={`text-xs font-semibold uppercase tracking-[0.15em] ${producto.stock > 0 ? "text-zinc-400" : "text-red-400"}`}>{producto.badge}</span>
                          </div>
                          <div className="flex gap-2">
                            <button type="button" onClick={() => setProductoActivo(producto)} className="rounded-2xl border border-lime-400 px-5 py-2 font-semibold text-lime-300 transition hover:bg-lime-400 hover:text-black">Ver detalle</button>
                            <button
                              type="button"
                              onClick={() => addItem(producto)}
                              disabled={producto.stock <= 0}
                              className="rounded-2xl bg-lime-400 px-5 py-2 font-bold text-black transition hover:bg-lime-300 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                              + Carrito
                            </button>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </div>

      {productoActivo ? (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/85 p-3 sm:p-4" onClick={() => setProductoActivo(null)}>
          <div className="relative grid max-h-[88svh] w-full max-w-3xl overflow-y-auto rounded-[1.35rem] border border-white/10 bg-zinc-950 shadow-[0_30px_120px_rgba(0,0,0,0.45)] sm:rounded-[1.75rem] lg:grid-cols-2" onClick={(event) => event.stopPropagation()}>
            <button type="button" onClick={() => setProductoActivo(null)} className="absolute right-3 top-3 z-10 rounded-full bg-black/40 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-black/65 sm:right-4 sm:top-4">Cerrar</button>
            <div className="flex flex-col">
              <div className="relative h-48 sm:h-64">
                <FotoProducto
                  src={productoActivo.imagenes[fotoIndex]}
                  alt={`${productoActivo.nombre} - foto ${fotoIndex + 1}`}
                  wrapperClassName="h-full w-full"
                  className="h-full w-full object-contain"
                />
              </div>
              {productoActivo.imagenes.length > 1 ? (
                <div className="flex gap-2 bg-black/40 p-2">
                  {productoActivo.imagenes.map((src, index) => (
                    <button
                      key={src + index}
                      type="button"
                      onClick={() => setFotoIndex(index)}
                      aria-label={`Ver foto ${index + 1} de ${productoActivo.nombre}`}
                      className={`h-10 w-10 shrink-0 overflow-hidden rounded-lg border-2 transition ${
                        index === fotoIndex ? "border-lime-400" : "border-white/10 opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img src={src} alt="" className="h-full w-full object-contain" />
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
            <div className="flex flex-col justify-between p-5 sm:p-6">
              <div>
                <span className="inline-block rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-zinc-400">{productoActivo.categoria}</span>
                <h2 className="mt-3 text-2xl font-black uppercase leading-none text-white sm:text-3xl">{productoActivo.nombre}</h2>
                <p className="mt-3 text-sm leading-relaxed text-zinc-300">{productoActivo.descripcion}</p>
                <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-zinc-500">Precio</span>
                    <span className={`text-[0.65rem] font-semibold uppercase tracking-[0.15em] ${productoActivo.stock > 0 ? "text-zinc-400" : "text-red-400"}`}>{productoActivo.badge}</span>
                  </div>
                  <div className="mt-1 text-2xl font-black text-lime-400 sm:text-3xl">${productoActivo.precio}</div>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => addItem(productoActivo)}
                  disabled={productoActivo.stock <= 0}
                  className="rounded-2xl bg-lime-400 px-5 py-2.5 font-bold text-black transition hover:bg-lime-300 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Agregar al carrito
                </button>
                <a href={buildWhatsAppUrl(productoActivo)} target="_blank" rel="noreferrer" className="rounded-2xl border border-white/15 px-5 py-2.5 font-semibold text-white transition hover:border-lime-400 hover:text-lime-300">Consultar por WhatsApp</a>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
