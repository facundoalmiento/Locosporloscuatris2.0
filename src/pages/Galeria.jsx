import { useState } from "react"
import { motion as Motion } from "framer-motion"
import { Link } from "react-router-dom"

import { travesias } from "../data/travesias"

const albumesPorCategoria = 2
const archivoGoogleFotosUrl =
  "https://drive.google.com/drive/folders/1BdIEVCYI9NjPNdAjsLId4XoNMHwlNKXW?usp=sharing"

const filtros = [
  { id: "todas", label: "Todas" },
  { id: "arena", label: "Arena" },
  { id: "barro", label: "Barro" },
  { id: "solidaria", label: "Solidaria" }
]

const obtenerUltimosPorCategoria = (albumes) => {
  const conteoPorTipo = {}

  return albumes.filter((travesia) => {
    const cantidad = conteoPorTipo[travesia.tipo] ?? 0
    conteoPorTipo[travesia.tipo] = cantidad + 1
    return cantidad < albumesPorCategoria
  })
}

const albumesActivos = obtenerUltimosPorCategoria(travesias)

const metricas = [
  { valor: `${albumesActivos.length}`, etiqueta: "albumes activos" },
  { valor: "3", etiqueta: "categorias activas" },
  { valor: `${albumesPorCategoria}`, etiqueta: "por categoria" }
]

const metricasArchivo = [
  {
    icono: (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 8.5h3.2l1.4-2h6.8l1.4 2H20v9.8H4z" />
        <circle cx="12" cy="13.5" r="3.2" />
      </svg>
    ),
    valor: "+18.000",
    etiqueta: "fotos"
  },
  {
    icono: (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="4" y="5" width="12" height="14" rx="2" />
        <path d="m16 10 4-2.4v8.8L16 14" />
      </svg>
    ),
    valor: "+400",
    etiqueta: "videos"
  },
  {
    icono: (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="4" y="5.5" width="16" height="14" rx="2" />
        <path d="M8 3.5v4M16 3.5v4M4 10h16" />
      </svg>
    ),
    valor: "Desde 2013",
    etiqueta: "+13 años de historia"
  }
]

const albumesPorTipo = travesias.reduce((albumes, travesia) => {
  if (!albumes[travesia.tipo]) albumes[travesia.tipo] = travesia
  return albumes
}, {})

const fotosArchivo = [
  { src: albumesPorTipo.arena?.portada, alt: "Travesía de arena de Locos por los Cuatris", grande: true },
  { src: albumesPorTipo.barro?.portada, alt: "Travesía de barro de Locos por los Cuatris" },
  { src: albumesPorTipo.solidaria?.portada, alt: "Travesía solidaria de Locos por los Cuatris" },
  { src: albumesPorTipo.arena?.fotos[1], alt: "Cuatriciclos recorriendo los médanos" },
  { src: albumesPorTipo.barro?.fotos[1], alt: "Cuatriciclos en un recorrido de barro" }
].filter((foto) => foto.src)

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0 }
}

function ArchivoHistorico() {
  const botonClasses = "group inline-flex w-full items-center justify-center gap-4 rounded-2xl bg-lime-400 px-7 py-4 text-sm font-black uppercase tracking-[0.08em] text-black shadow-[0_0_34px_rgba(132,204,22,0.28)] transition hover:bg-lime-300 hover:shadow-[0_0_46px_rgba(132,204,22,0.38)] sm:w-auto sm:text-base"

  return (
    <Motion.section
      className="pb-20"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.65, ease: "easeOut" }}
    >
      <div className="relative overflow-hidden rounded-[1.75rem] border border-lime-400/25 bg-[radial-gradient(circle_at_20%_20%,rgba(132,204,22,0.14),transparent_30%),linear-gradient(135deg,rgba(12,12,12,0.96),rgba(3,7,18,0.94)_55%,rgba(10,15,8,0.96))] p-6 shadow-[0_0_55px_rgba(132,204,22,0.08),0_26px_90px_rgba(0,0,0,0.48)] sm:rounded-[2rem] sm:p-8 lg:p-12">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.04),transparent_28%,rgba(132,204,22,0.05))]" />
        <div className="relative grid gap-10 lg:grid-cols-[minmax(0,0.6fr)_minmax(22rem,0.4fr)] lg:items-center xl:gap-14">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.38em] text-lime-400">Archivo historico</p>
            <h2 className="mt-5 text-[clamp(2.1rem,7vw,4rem)] font-black uppercase leading-[0.95] text-white">Revivi la aventura</h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-200 sm:text-lg">
              Explorá más de 13 años de travesías.
              <br className="hidden sm:block" />
              Buscate, descargá tus fotos y reviví cada momento.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {metricasArchivo.map((metrica) => (
                <div key={metrica.etiqueta} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                  <div className="text-lime-400">{metrica.icono}</div>
                  <div className="mt-4 text-2xl font-black uppercase leading-none text-white sm:text-[1.65rem]">{metrica.valor}</div>
                  <div className="mt-2 text-[0.66rem] font-bold uppercase tracking-[0.18em] text-zinc-400">{metrica.etiqueta}</div>
                </div>
              ))}
            </div>

            <div className="mt-9">
              {archivoGoogleFotosUrl ? (
                <a href={archivoGoogleFotosUrl} target="_blank" rel="noreferrer" className={botonClasses}>
                  Abrir archivo en Drive
                  <span className="transition group-hover:translate-x-1">-&gt;</span>
                </a>
              ) : (
                <button type="button" className={`${botonClasses} cursor-not-allowed opacity-75`} title="Falta cargar el link del archivo histórico">
                  Abrir archivo en Drive
                  <span>-&gt;</span>
                </button>
              )}
            </div>
          </div>

          <div className="grid min-h-[24rem] grid-cols-2 gap-3 sm:min-h-[28rem] sm:grid-cols-[1.12fr_0.88fr_0.88fr] sm:grid-rows-2 lg:min-h-[22rem] xl:min-h-[25rem]">
            {fotosArchivo.map((foto, index) => (
              <Motion.div
                key={foto.src}
                className={`${foto.grande ? "col-span-2 min-h-[16rem] sm:col-span-1 sm:row-span-2 sm:min-h-0" : "min-h-[9rem]"} group overflow-hidden rounded-[1.35rem] border border-lime-400/15 bg-zinc-950 shadow-[0_0_24px_rgba(132,204,22,0.08)] sm:rounded-[1.6rem]`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: index * 0.06, ease: "easeOut" }}
              >
                <img src={foto.src} alt={foto.alt} className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-[1.03]" />
              </Motion.div>
            ))}
          </div>
        </div>
      </div>
    </Motion.section>
  )
}

export default function Galeria() {
  const [filtro, setFiltro] = useState("todas")
  const filtradas = filtro === "todas" ? albumesActivos : albumesActivos.filter((travesia) => travesia.tipo === filtro)
  const destacada = filtradas[0] ?? albumesActivos[0] ?? travesias[0]

  return (
    <div className="page-shell">
      <div className="page-container">
        <div className="hero-stage">
          <section className="hero-panel">
            <div>
              <p className="hero-eyebrow">Galeria</p>
              <h1 className="hero-title">Cada salida merece verse con el mismo peso que se vive.</h1>
              <p className="hero-copy">Los dos albumes mas recientes de cada categoria quedan a mano. El resto vive en el archivo historico.</p>
              <div className="action-row">
                <Link to={destacada ? `/galeria/${destacada.id}` : "/galeria"} className="primary-action">Abrir destacada</Link>
                <Link to="/travesias" className="secondary-action">Ver travesias</Link>
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

        {destacada ? (
          <div className="py-8 sm:py-10 lg:py-12">
            <section className="feature-card w-full">
              <div className="grid lg:grid-cols-[1.18fr_0.82fr] xl:grid-cols-[1.28fr_0.72fr]">
                <div className="relative h-[18rem] overflow-hidden sm:h-[22rem] lg:h-[24rem]">
                  <img src={destacada.portada} alt={destacada.titulo} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/30 to-transparent" />
                </div>
                <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                  <p className="text-sm font-bold uppercase tracking-[0.35em] text-lime-400">Album destacado</p>
                  <h2 className="mt-4 text-3xl font-black uppercase leading-none sm:text-4xl">{destacada.titulo}</h2>
                  <p className="mt-3 text-sm font-semibold uppercase tracking-[0.25em] text-zinc-400">{destacada.fecha}</p>
                  <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-300">Un acceso rapido al album mas nuevo dentro del filtro seleccionado.</p>
                  <div className="mt-8">
                    <Link to={`/galeria/${destacada.id}`} className="inline-flex rounded-2xl bg-white px-6 py-3 font-bold text-black transition hover:bg-lime-300">Ver album completo</Link>
                  </div>
                </div>
              </div>
            </section>
          </div>
        ) : null}

        <section className="pb-12">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.35em] text-lime-400">Filtros</p>
              <h2 className="mt-3 text-2xl font-black uppercase sm:text-3xl md:text-4xl">Ultimos albumes por categoria</h2>
            </div>
            <div className="filter-row">
              {filtros.map((tipo) => (
                <button key={tipo.id} type="button" onClick={() => setFiltro(tipo.id)} className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition sm:px-5 sm:text-sm ${filtro === tipo.id ? "border-lime-400 bg-lime-400 text-black" : "border-white/15 text-zinc-200 hover:border-lime-400 hover:text-lime-300"}`}>{tipo.label}</button>
              ))}
            </div>
          </div>

          <div className="responsive-grid-3">
            {filtradas.length > 0 ? (
              filtradas.map((travesia) => (
                <Link key={travesia.id} to={`/galeria/${travesia.id}`} className="group overflow-hidden rounded-[1.75rem] border border-white/10 bg-black/40 transition hover:border-lime-400/50">
                  <div className="relative h-[clamp(15rem,58vw,18rem)] overflow-hidden">
                    <img src={travesia.portada} alt={travesia.titulo} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/80" />
                    <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/45 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-lime-300 backdrop-blur-sm">{travesia.tipo}</div>
                  </div>
                  <div className="p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-lime-400">{travesia.fecha}</p>
                    <h3 className="mt-3 text-xl font-black uppercase text-white sm:text-2xl">{travesia.titulo}</h3>
                    <div className="mt-6 flex flex-col items-start gap-2 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                      <span className="text-sm text-zinc-400">{travesia.fotos.length} fotos</span>
                      <span className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-200">Ver album</span>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full rounded-[2rem] border border-white/10 bg-black/30 p-10 text-center text-zinc-400">No hay travesias para este filtro.</div>
            )}
          </div>
        </section>

        <ArchivoHistorico />
      </div>
    </div>
  )
}
