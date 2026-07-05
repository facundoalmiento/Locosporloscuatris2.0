import { useEffect, useRef, useState } from "react"
import { Link, useParams } from "react-router-dom"

import { travesias } from "../data/travesias"

export default function Travesia() {
  const { id } = useParams()
  const [fotoActiva, setFotoActiva] = useState(null)
  const inicioDeslizamiento = useRef(null)
  const travesia = travesias.find((item) => item.id === id)
  const visorAbierto = fotoActiva !== null

  useEffect(() => {
    if (!visorAbierto) return undefined

    function handleKeyDown(event) {
      if (event.key === "Escape") setFotoActiva(null)
      if (event.key === "ArrowLeft") setFotoActiva((actual) => actual === null ? actual : (actual - 1 + travesia.fotos.length) % travesia.fotos.length)
      if (event.key === "ArrowRight") setFotoActiva((actual) => actual === null ? actual : (actual + 1) % travesia.fotos.length)
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [visorAbierto, travesia])

  useEffect(() => {
    if (!visorAbierto) return undefined

    const scrollY = window.scrollY
    const estilosAnteriores = {
      overflowHtml: document.documentElement.style.overflow,
      overflowBody: document.body.style.overflow,
      posicionBody: document.body.style.position,
      anchoBody: document.body.style.width,
      topBody: document.body.style.top
    }

    document.documentElement.style.overflow = "hidden"
    document.body.style.overflow = "hidden"
    document.body.style.position = "fixed"
    document.body.style.width = "100%"
    document.body.style.top = `-${scrollY}px`

    return () => {
      document.documentElement.style.overflow = estilosAnteriores.overflowHtml
      document.body.style.overflow = estilosAnteriores.overflowBody
      document.body.style.position = estilosAnteriores.posicionBody
      document.body.style.width = estilosAnteriores.anchoBody
      document.body.style.top = estilosAnteriores.topBody
      window.scrollTo(0, scrollY)
    }
  }, [visorAbierto])

  function iniciarDeslizamiento(event) {
    inicioDeslizamiento.current = { x: event.clientX, y: event.clientY }
  }

  function terminarDeslizamiento(event) {
    if (!inicioDeslizamiento.current) return

    const diferenciaX = event.clientX - inicioDeslizamiento.current.x
    const diferenciaY = event.clientY - inicioDeslizamiento.current.y
    inicioDeslizamiento.current = null

    if (Math.abs(diferenciaX) < 50 || Math.abs(diferenciaX) <= Math.abs(diferenciaY)) return

    setFotoActiva((actual) => {
      if (actual === null) return actual
      return diferenciaX < 0
        ? (actual + 1) % travesia.fotos.length
        : (actual - 1 + travesia.fotos.length) % travesia.fotos.length
    })
  }

  if (!travesia) {
    return <div className="flex min-h-screen items-center justify-center bg-black text-white">Travesía no encontrada</div>
  }

  return (
    <div className="page-shell">
      <div className="page-container">
        <section className="feature-card mb-10 sm:mb-12">
          <div className="grid lg:grid-cols-[1.18fr_0.82fr] xl:grid-cols-[1.28fr_0.72fr]">
            <div className="feature-media">
              <img src={travesia.portada} alt={travesia.titulo} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/35 to-transparent" />
            </div>
            <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
              <Link to="/galeria" className="inline-flex text-sm font-semibold uppercase tracking-[0.22em] text-lime-400 transition hover:text-lime-300">Volver a galería</Link>
              <p className="mt-6 text-sm font-bold uppercase tracking-[0.35em] text-lime-400">Álbum</p>
              <h1 className="mt-4 text-3xl font-black uppercase leading-none sm:text-4xl md:text-5xl">{travesia.titulo}</h1>
              <p className="mt-4 text-sm font-semibold uppercase tracking-[0.25em] text-zinc-400">{travesia.fecha}</p>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-300">Una selección liviana para recorrer la travesía. Los originales en alta calidad siguen disponibles en el archivo de Drive.</p>
              <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
                <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-200 sm:text-sm sm:tracking-[0.18em]">{travesia.tipo}</div>
                <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-200 sm:text-sm sm:tracking-[0.18em]">{travesia.fotos.length} fotos</div>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-20">
          <div className="mb-8">
            <p className="text-sm font-bold uppercase tracking-[0.35em] text-lime-400">Cobertura</p>
            <h2 className="mt-3 text-2xl font-black uppercase sm:text-3xl md:text-4xl">Abrir cada momento en grande</h2>
          </div>
          <div className="responsive-grid-3">
            {travesia.fotos.map((foto, index) => (
              <button key={foto} type="button" onClick={() => setFotoActiva(index)} className="group overflow-hidden rounded-[1.75rem] border border-white/10 bg-black/35 text-left transition hover:border-lime-400/50">
                <div className="relative h-[clamp(14rem,58vw,18rem)] overflow-hidden">
                  <img src={foto} alt={`${travesia.titulo} ${index + 1}`} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/70" />
                  <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/45 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-lime-300 backdrop-blur-sm">Foto {index + 1}</div>
                </div>
              </button>
            ))}
          </div>
        </section>
      </div>

      {fotoActiva !== null ? (
        <div
          className="fixed inset-0 z-[1000] flex touch-none select-none items-center justify-center overscroll-none bg-black/90 p-3 sm:p-4"
          onClick={() => setFotoActiva(null)}
          onPointerDown={iniciarDeslizamiento}
          onPointerUp={terminarDeslizamiento}
          onPointerCancel={() => { inicioDeslizamiento.current = null }}
        >
          <button type="button" className="absolute right-3 top-3 z-10 rounded-full bg-white/10 px-3 py-2 text-xs font-semibold text-white transition hover:bg-white/20 sm:right-6 sm:top-6 sm:px-4 sm:text-sm" onClick={() => setFotoActiva(null)}>Cerrar</button>
          <img src={travesia.fotos[fotoActiva]} alt={`${travesia.titulo} ${fotoActiva + 1}`} className="max-h-[78svh] max-w-full rounded-xl object-contain sm:max-h-[90vh]" onClick={(event) => event.stopPropagation()} />
          <p className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white/65 sm:bottom-6 sm:text-xs">
            Deslizá hacia los costados
          </p>
        </div>
      ) : null}
    </div>
  )
}
