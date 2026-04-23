import { useState } from "react"
import { Link } from "react-router-dom"

import LazyImage from "../components/LazyImage"
import { travesias } from "../data/travesias"

const filtros = [
  { id: "todas", label: "Todas" },
  { id: "arena", label: "Arena" },
  { id: "barro", label: "Barro" },
  { id: "nieve", label: "Nieve" },
  { id: "solidaria", label: "Solidaria" }
]

const metricas = [
  { valor: `${travesias.length}`, etiqueta: "álbumes activos" },
  { valor: "4", etiqueta: "tipos de terreno" },
  { valor: "+100", etiqueta: "momentos para abrir" }
]

export default function Galeria() {
  const [filtro, setFiltro] = useState("todas")
  const filtradas = filtro === "todas" ? travesias : travesias.filter((travesia) => travesia.tipo === filtro)
  const destacada = filtradas[0] ?? travesias[0]

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(132,204,22,0.16),transparent_26%),linear-gradient(180deg,#050505_0%,#0b0b0b_46%,#111827_100%)] px-4 pt-28 text-white sm:px-6 sm:pt-32">
      <div className="mx-auto max-w-7xl">
        <section className="mb-12 grid gap-8 rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_30px_120px_rgba(0,0,0,0.35)] backdrop-blur-sm sm:mb-16 sm:p-8 lg:grid-cols-[1.2fr_0.8fr] lg:p-12">
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.45em] text-lime-400">Galería</p>
            <h1 className="max-w-4xl text-4xl font-black uppercase leading-none tracking-tight sm:text-5xl md:text-7xl">Cada salida merece verse con el mismo peso que se vive.</h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-300 md:text-lg">Acceso directo a cada álbum.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
              <Link to={destacada ? `/galeria/${destacada.id}` : "/galeria"} className="rounded-2xl bg-lime-400 px-6 py-3 text-center font-bold text-black transition hover:bg-lime-300 sm:px-7">Abrir destacada</Link>
              <Link to="/travesias" className="rounded-2xl border border-white/20 px-6 py-3 text-center font-semibold text-white transition hover:border-lime-400 hover:text-lime-300 sm:px-7">Ver travesías</Link>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {metricas.map((metrica) => (
              <div key={metrica.etiqueta} className="rounded-3xl border border-white/10 bg-black/30 p-6">
                <div className="text-4xl font-black text-lime-400">{metrica.valor}</div>
                <div className="mt-2 text-sm uppercase tracking-[0.25em] text-zinc-400">{metrica.etiqueta}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10 overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            <div className="relative min-h-[16rem] sm:min-h-[20rem]">
              <LazyImage
                src={destacada.portada}
                alt={destacada.titulo}
                className="h-full w-full object-cover"
                wrapperClassName="h-full w-full"
                spinnerLabel="Cargando portada"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/30 to-transparent" />
            </div>
            <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
              <p className="text-sm font-bold uppercase tracking-[0.35em] text-lime-400">Álbum destacado</p>
              <h2 className="mt-4 text-3xl font-black uppercase leading-none sm:text-4xl">{destacada.titulo}</h2>
              <p className="mt-3 text-sm font-semibold uppercase tracking-[0.25em] text-zinc-400">{destacada.fecha}</p>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-300">Un acceso rápido al álbum que mejor nos representa.</p>
              <div className="mt-8"><Link to={`/galeria/${destacada.id}`} className="inline-flex rounded-2xl bg-white px-6 py-3 font-bold text-black transition hover:bg-lime-300">Ver álbum completo</Link></div>
            </div>
          </div>
        </section>

        <section className="pb-20">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.35em] text-lime-400">Filtros</p>
              <h2 className="mt-3 text-2xl font-black uppercase sm:text-3xl md:text-4xl">Elegí el terreno y entrá al álbum</h2>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {filtros.map((tipo) => (
                <button key={tipo.id} type="button" onClick={() => setFiltro(tipo.id)} className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition sm:px-5 sm:text-sm ${filtro === tipo.id ? "border-lime-400 bg-lime-400 text-black" : "border-white/15 text-zinc-200 hover:border-lime-400 hover:text-lime-300"}`}>{tipo.label}</button>
              ))}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filtradas.length > 0 ? (
              filtradas.map((travesia) => (
                <Link key={travesia.id} to={`/galeria/${travesia.id}`} className="group overflow-hidden rounded-[1.75rem] border border-white/10 bg-black/40 transition hover:border-lime-400/50">
                  <div className="relative h-72 overflow-hidden">
                    <LazyImage
                      src={travesia.portada}
                      alt={travesia.titulo}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                      wrapperClassName="h-full w-full"
                      spinnerLabel=""
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/80" />
                    <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/45 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-lime-300 backdrop-blur-sm">{travesia.tipo}</div>
                  </div>
                  <div className="p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-lime-400">{travesia.fecha}</p>
                    <h3 className="mt-3 text-xl font-black uppercase text-white sm:text-2xl">{travesia.titulo}</h3>
                    <div className="mt-6 flex flex-col items-start gap-2 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                      <span className="text-sm text-zinc-400">{travesia.fotos.length} fotos</span>
                      <span className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-200">Ver álbum</span>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full rounded-[2rem] border border-white/10 bg-black/30 p-10 text-center text-zinc-400">No hay travesías para este filtro.</div>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
