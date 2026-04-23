import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

import LazyImage from "../components/LazyImage"
import { travesias } from "../data/travesias"

export default function Travesia() {
  const { id } = useParams()
  const [fotoActiva, setFotoActiva] = useState(null)
  const travesia = travesias.find((item) => item.id === id)

  useEffect(() => {
    if (fotoActiva === null) return undefined

    function handleKeyDown(event) {
      if (event.key === "Escape") setFotoActiva(null)
      if (event.key === "ArrowLeft") setFotoActiva((actual) => actual === null ? actual : (actual - 1 + travesia.fotos.length) % travesia.fotos.length)
      if (event.key === "ArrowRight") setFotoActiva((actual) => actual === null ? actual : (actual + 1) % travesia.fotos.length)
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [fotoActiva, travesia])

  if (!travesia) {
    return <div className="flex min-h-screen items-center justify-center bg-black text-white">Travesía no encontrada</div>
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(132,204,22,0.16),transparent_26%),linear-gradient(180deg,#050505_0%,#0b0b0b_46%,#111827_100%)] px-4 pt-28 text-white sm:px-6 sm:pt-32">
      <div className="mx-auto max-w-7xl">
        <section className="mb-12 overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            <div className="relative min-h-[16rem] sm:min-h-[22rem]">
              <LazyImage
                src={travesia.portada}
                alt={travesia.titulo}
                className="h-full w-full object-cover"
                wrapperClassName="h-full w-full"
                spinnerLabel="Cargando portada"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/35 to-transparent" />
            </div>
            <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
              <Link to="/galeria" className="inline-flex text-sm font-semibold uppercase tracking-[0.22em] text-lime-400 transition hover:text-lime-300">Volver a galería</Link>
              <p className="mt-6 text-sm font-bold uppercase tracking-[0.35em] text-lime-400">Álbum</p>
              <h1 className="mt-4 text-3xl font-black uppercase leading-none sm:text-4xl md:text-5xl">{travesia.titulo}</h1>
              <p className="mt-4 text-sm font-semibold uppercase tracking-[0.25em] text-zinc-400">{travesia.fecha}</p>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-300">Un recorrido para abrir foto por foto, con una entrada visual más fuerte y el mismo tono editorial que ya tienen las otras secciones del sitio.</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-zinc-200">{travesia.tipo}</div>
                <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-zinc-200">{travesia.fotos.length} fotos</div>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-20">
          <div className="mb-8">
            <p className="text-sm font-bold uppercase tracking-[0.35em] text-lime-400">Cobertura</p>
            <h2 className="mt-3 text-2xl font-black uppercase sm:text-3xl md:text-4xl">Abrir cada momento en grande</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {travesia.fotos.map((foto, index) => (
              <button key={foto} type="button" onClick={() => setFotoActiva(index)} className="group overflow-hidden rounded-[1.75rem] border border-white/10 bg-black/35 text-left transition hover:border-lime-400/50">
                <div className="relative h-64 overflow-hidden sm:h-72">
                  <LazyImage
                    src={foto}
                    alt={`${travesia.titulo} ${index + 1}`}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                    wrapperClassName="h-full w-full"
                    spinnerLabel=""
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/70" />
                  <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/45 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-lime-300 backdrop-blur-sm">Foto {index + 1}</div>
                </div>
              </button>
            ))}
          </div>
        </section>
      </div>

      {fotoActiva !== null ? (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/90 p-3 sm:p-4" onClick={() => setFotoActiva(null)}>
          <button type="button" className="absolute right-3 top-3 rounded-full bg-white/10 px-3 py-2 text-xs font-semibold text-white transition hover:bg-white/20 sm:right-6 sm:top-6 sm:px-4 sm:text-sm" onClick={() => setFotoActiva(null)}>Cerrar</button>
          <button type="button" className="absolute left-2 rounded-full bg-white/10 px-3 py-2 text-xl text-white transition hover:bg-white/20 sm:left-4 sm:px-4 sm:py-3 sm:text-2xl md:left-8" onClick={(event) => { event.stopPropagation(); setFotoActiva((fotoActiva - 1 + travesia.fotos.length) % travesia.fotos.length) }}>‹</button>
          <LazyImage
            src={travesia.fotos[fotoActiva]}
            alt={`${travesia.titulo} ${fotoActiva + 1}`}
            className="max-h-[82vh] max-w-full rounded-xl object-contain sm:max-h-[90vh]"
            spinnerLabel="Cargando foto"
            spinnerSize="base"
            onClick={(event) => event.stopPropagation()}
          />
          <button type="button" className="absolute right-2 rounded-full bg-white/10 px-3 py-2 text-xl text-white transition hover:bg-white/20 sm:right-4 sm:px-4 sm:py-3 sm:text-2xl md:right-8" onClick={(event) => { event.stopPropagation(); setFotoActiva((fotoActiva + 1) % travesia.fotos.length) }}>›</button>
        </div>
      ) : null}
    </div>
  )
}
