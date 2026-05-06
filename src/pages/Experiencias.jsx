import { Link } from "react-router-dom"

import { travesias } from "../data/travesias"

const tipos = [
  { id: "arena", titulo: "Arena", subtitulo: "Velocidad, médanos y maniobra fina", descripcion: "Médanos abiertos, cambios de ritmo y una conducción que mezcla adrenalina con control total.", destacado: "Ideal para arrancar fuerte", color: "from-amber-300 via-orange-400 to-orange-600" },
  { id: "barro", titulo: "Barro", subtitulo: "Tracción, técnica y barro del bueno", descripcion: "Huella pesada, barro y terreno vivo. Acá no gana el más rápido: gana el que mejor lee el piso.", destacado: "La más intensa del circuito", color: "from-stone-300 via-lime-400 to-lime-600" },
  { id: "nieve", titulo: "Nieve", subtitulo: "Frío, montaña y paisaje bruto", descripcion: "Estamos preparando esta salida para más adelante. Va a llegar cuando tengamos el recorrido y la logística listos para hacerla bien.", destacado: "Próximamente", color: "from-sky-200 via-cyan-300 to-blue-500", portada: "/galeria/nieve/nieve-06.jpg", proximaSalida: "Próximamente" },
  { id: "solidaria", titulo: "Solidaria", subtitulo: "Camino, comunidad y propósito", descripcion: "Salidas con espíritu solidario de grupo, recorrido largo y una energía distinta que mezcla aventura con ayudar.", destacado: "Para vivirla con el equipo", color: "from-lime-200 via-lime-400 to-emerald-500" }
]

const metricas = [
  { valor: "+4", etiqueta: "recorridos activos" },
  { valor: "4", etiqueta: "terrenos distintos" },
  { valor: "100%", etiqueta: "modo off-road" }
]

export default function Experiencias() {
  const tiposConPortada = tipos.map((tipo) => {
    const relacionadas = travesias.filter((travesia) => travesia.tipo === tipo.id)

    return {
      ...tipo,
      cantidad: relacionadas.length,
      portada: relacionadas[0]?.portada ?? tipo.portada ?? "/galeria/rata.png",
      travesiaDestacada: relacionadas[0]
    }
  })

  const destacadas = travesias.slice(0, 3)

  return (
    <div className="page-shell">
      <div className="page-container">
        <section className="hero-panel">
          <div>
            <p className="hero-eyebrow">Travesías</p>
            <h1 className="hero-title">Elegí terreno. El resto lo hacemos nosotros.</h1>
            <p className="hero-copy">No vendemos un paseo. Armamos salidas con carácter, paisaje e identidad distinta según el terreno.</p>
            <div className="action-row">
              <Link to="/galeria" className="primary-action">Ver galerías</Link>
              <Link to="/contacto" className="secondary-action">Consultar próxima salida</Link>
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

        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {tiposConPortada.map((tipo) => (
            <article key={tipo.id} className="group feature-card relative">
              <div className="absolute inset-0 bg-cover bg-center opacity-60 transition duration-700 group-hover:scale-110" style={{ backgroundImage: `url(${tipo.portada})` }} />
              <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/45 to-black/90" />
              <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${tipo.color}`} />
              <div className="relative z-10 flex min-h-[21rem] flex-col justify-between p-5 sm:min-h-[25rem] sm:p-7">
                <div>
                  <div className="inline-flex max-w-full rounded-full border border-white/15 bg-white/8 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-zinc-100 sm:text-xs sm:tracking-[0.25em]">{tipo.destacado}</div>
                  <h2 className="mt-5 text-3xl font-black uppercase leading-none sm:text-4xl">{tipo.titulo}</h2>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-lime-300 sm:text-sm sm:tracking-[0.28em]">{tipo.subtitulo}</p>
                  <p className="mt-5 text-sm leading-relaxed text-zinc-200">{tipo.descripcion}</p>
                </div>
                <div>
                  <div className="mb-4 flex flex-col gap-2 border-t border-white/10 pt-5 text-sm text-zinc-300 sm:flex-row sm:items-center sm:justify-between">
                    <span>{tipo.cantidad > 0 ? `${tipo.cantidad} álbumes disponibles` : "Próxima salida en preparación"}</span>
                    <span className="font-semibold text-white">{tipo.travesiaDestacada?.fecha ?? tipo.proximaSalida ?? "Próximamente"}</span>
                  </div>
                  <Link to="/galeria" className="inline-flex rounded-2xl bg-white px-5 py-3 font-bold text-black transition hover:bg-lime-300">Explorar {tipo.titulo}</Link>
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="mt-16 pb-20 sm:mt-20">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.35em] text-lime-400">Destacadas</p>
              <h2 className="mt-3 text-2xl font-black uppercase sm:text-3xl md:text-4xl">Algunas salidas que representan la experiencia.</h2>
            </div>
            <Link to="/galeria" className="text-sm font-semibold uppercase tracking-[0.25em] text-zinc-300 transition hover:text-lime-300">Ver todo</Link>
          </div>
          <div className="responsive-grid-3">
            {destacadas.map((travesia) => (
              <Link key={travesia.id} to={`/galeria/${travesia.id}`} className="group overflow-hidden rounded-[1.75rem] border border-white/10 bg-black/40">
                <div className="h-64 overflow-hidden">
                  <img src={travesia.portada} alt={travesia.titulo} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                </div>
                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-lime-400">{travesia.fecha}</p>
                  <h3 className="mt-3 text-xl font-black uppercase text-white sm:text-2xl">{travesia.titulo}</h3>
                  <p className="mt-4 text-sm text-zinc-400">Entrá a ver la cobertura completa y abrí cada foto en grande.</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
