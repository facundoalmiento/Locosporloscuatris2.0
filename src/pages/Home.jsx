import { lazy, Suspense, useEffect, useState } from "react"
import { Link } from "react-router-dom"

import { eventos } from "../data/eventos"
import { sponsors } from "../data/sponsors"

const MascotaPeeker = lazy(() => import("../components/MascotaPeeker"))

function buildWhatsAppEventUrl(salida) {
  const mensaje = `Hola! Quiero averiguar por la travesia ${salida.titulo} del ${salida.fecha} en ${salida.ubicacion}. Me pasan info y disponibilidad?`
  return `https://wa.me/?text=${encodeURIComponent(mensaje)}`
}

function getSponsorInitials(nombre) {
  return nombre
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((palabra) => palabra[0]?.toUpperCase() ?? "")
    .join("")
}

function SponsorHighlight({ sponsor }) {
  const tieneLink = sponsor.importante && sponsor.url
  const className = "group flex min-w-0 items-center gap-3 rounded-[1.35rem] border border-white/10 bg-white/[0.03] px-4 py-4 transition hover:border-lime-400/50 hover:bg-white/[0.05] sm:gap-4 sm:rounded-[1.75rem] sm:px-5"

  const content = (
    <>
      {sponsor.logo ? (
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.16),rgba(255,255,255,0.04))] p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] sm:h-14 sm:w-14">
          <img src={sponsor.logo} alt={sponsor.nombre} className="h-full w-full object-contain" />
        </div>
      ) : (
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(132,204,22,0.35),rgba(255,255,255,0.08))] text-lg font-black text-white sm:h-14 sm:w-14">
          {getSponsorInitials(sponsor.nombre)}
        </div>
      )}
      <div className="min-w-0">
        <p className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-lime-300 sm:tracking-[0.35em]">{sponsor.categoria}</p>
        <h3 className="mt-2 truncate text-base font-black uppercase text-white sm:text-lg">{sponsor.nombre}</h3>
      </div>
    </>
  )

  if (tieneLink) {
    return (
      <a href={sponsor.url} target="_blank" rel="noreferrer" className={className}>
        {content}
      </a>
    )
  }

  return <div className={className}>{content}</div>
}

const tiposTravesias = [
  {
    nombre: "Arena",
    etiqueta: "Médanos y costa",
    descripcion: "Travesías sobre dunas, playa y caminos abiertos. Ideales para vivir velocidad, técnica y manejo en terreno suelto.",
    imagen: "/galeria/pinamar-2025/picante.jpg",
    accion: "Ver arena",
    to: "/galeria"
  },
  {
    nombre: "Barro",
    etiqueta: "Técnica y obstáculos",
    descripcion: "Recorridos pesados, huellas profundas y terrenos cambiantes para quienes buscan una experiencia más exigente.",
    imagen: "/galeria/barrofuerte.jpg",
    accion: "Ver barro",
    to: "/galeria"
  },
  {
    nombre: "Solidarias",
    etiqueta: "Grupo y comunidad",
    descripcion: "Salidas con propósito, colaboración y espíritu de equipo, conectando aventura con ayuda real en el camino.",
    imagen: "/galeria/Camino Costero Berisso/portada.jpg",
    accion: "Ver solidarias",
    to: "/galeria"
  },
  {
    nombre: "Nieve",
    etiqueta: "Próximamente",
    descripcion: "Una experiencia en preparación para sumar montaña, frío y paisajes distintos.",
    imagen: "/galeria/nieve/nieve-06.jpg",
    accion: "Quiero enterarme",
    to: "/contacto"
  }
]

export default function Home() {
  const [showMascota, setShowMascota] = useState(false)
  const [showMascotaMobileSafe, setShowMascotaMobileSafe] = useState(false)
  const sponsorsDestacados = sponsors.filter((sponsor) => sponsor.destacado).slice(0, 6)
  const proximasSalidas = eventos.slice(0, 2)

  useEffect(() => {
    const timer = window.setTimeout(() => setShowMascota(true), 450)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)")

    function updateVisibility() {
      setShowMascotaMobileSafe(mediaQuery.matches)
    }

    updateVisibility()
    mediaQuery.addEventListener("change", updateVisibility)

    return () => mediaQuery.removeEventListener("change", updateVisibility)
  }, [])

  return (
    <>
      {showMascota && showMascotaMobileSafe ? (
        <Suspense fallback={null}>
          <MascotaPeeker />
        </Suspense>
      ) : null}

      <div className="relative flex min-h-[100svh] w-full items-center bg-[radial-gradient(circle_at_top,rgba(132,204,22,0.16),transparent_26%),linear-gradient(180deg,#050505_0%,#0b0b0b_46%,#111827_100%)] pt-20 text-white sm:pt-24 lg:pt-10">
        <div className="mx-auto grid w-full max-w-[96rem] items-center gap-8 px-4 py-8 sm:px-8 sm:py-10 lg:grid-cols-[minmax(0,1fr)_minmax(30rem,1fr)] lg:gap-7 lg:px-10 xl:grid-cols-[minmax(0,1.04fr)_minmax(36rem,0.96fr)] xl:px-14 2xl:px-20">
          <div className="min-w-0">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-lime-400 sm:text-base sm:tracking-widest">
              Off Road Experience
            </p>
            <h1 className="mb-6 text-[clamp(2.65rem,10vw,5.65rem)] font-black uppercase leading-[0.9] tracking-tight sm:leading-[0.88]">
              <span className="block text-white">Locos por</span>
              <span className="block text-lime-400 drop-shadow-[0_0_30px_rgba(132,123,22,0.4)]">
                los Cuatris
              </span>
            </h1>
            <p className="mb-8 max-w-2xl text-base leading-relaxed text-gray-400 sm:text-lg">
              Arena. Barro. Montaña. Travesías extremas diseñadas para quienes
              no quieren límites.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
              <Link to="/travesias" className="rounded-2xl bg-lime-400 px-6 py-4 text-center font-bold text-black transition hover:bg-lime-300 sm:px-10 sm:py-5">Consultar salida</Link>
              <Link to="/galeria" className="rounded-2xl border border-white/20 px-6 py-4 text-center font-semibold text-white transition hover:border-lime-400 hover:text-lime-300 sm:px-10 sm:py-5">Ver Travesías</Link>
            </div>
          </div>

          <div className="relative flex min-w-0 items-center justify-center lg:justify-start lg:-ml-6 xl:-ml-12">
            <div className="absolute h-[16rem] w-[16rem] rounded-full bg-[radial-gradient(circle,rgba(163,230,53,0.14)_0%,rgba(163,230,53,0.05)_42%,transparent_74%)] blur-2xl sm:h-[24rem] sm:w-[24rem]" />
            <div className="relative w-full max-w-[35rem] overflow-hidden rounded-[1.35rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.012))] p-4 shadow-[0_24px_90px_rgba(0,0,0,0.32)] ring-1 ring-white/[0.06] sm:max-w-[37rem] sm:rounded-[2rem] sm:p-7 xl:max-w-[39rem] xl:p-8">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_65%_20%,rgba(163,230,53,0.12),transparent_38%)]" />

              <div className="relative z-10">
                <div className="flex flex-col gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.35em] text-lime-400">Cronograma</p>
                    <h2 className="mt-3 text-[1.85rem] font-black uppercase leading-none text-white sm:text-3xl">Próximas travesías</h2>
                  </div>
                  <span className="w-fit rounded-full border border-lime-400/30 bg-lime-400/10 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-lime-300 sm:tracking-[0.28em]">
                    Temporada 2026
                  </span>
                </div>

                <div className="mt-5 space-y-3 sm:mt-6 sm:space-y-4">
                  {proximasSalidas.map((salida, index) => (
                    <a key={salida.id} href={buildWhatsAppEventUrl(salida)} target="_blank" rel="noreferrer" className="block rounded-[1.15rem] bg-black/22 p-4 ring-1 ring-white/[0.055] transition hover:bg-lime-400/[0.04] hover:ring-lime-400/30 sm:rounded-[1.45rem] sm:p-5">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex min-w-0 items-start gap-3 sm:gap-4">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/6 text-sm font-black text-lime-300 sm:h-11 sm:w-11">
                            0{index + 1}
                          </div>
                          <div className="min-w-0">
                            <p className="break-words text-[0.62rem] font-bold uppercase tracking-[0.18em] text-zinc-500 sm:text-[0.68rem] sm:tracking-[0.32em]">{salida.fecha}</p>
                            <h3 className="mt-2 text-lg font-black uppercase leading-tight text-white sm:text-xl">{salida.titulo}</h3>
                            <p className="mt-2 text-sm text-zinc-400">{salida.ubicacion}</p>
                            <p className="mt-3 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-lime-300 sm:text-xs sm:tracking-[0.2em]">Averiguar por WhatsApp</p>
                          </div>
                        </div>
                        <span className={`w-fit rounded-full px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.16em] sm:tracking-[0.24em] ${
                          salida.cupos === "Disponibles"
                            ? "border border-lime-400/30 bg-lime-400/10 text-lime-300"
                            : salida.cupos === "Últimos lugares" || salida.cupos === "Ãšltimos lugares" || salida.cupos === "ÃƒÅ¡ltimos lugares"
                              ? "border border-amber-300/30 bg-amber-300/10 text-amber-200"
                              : "border border-white/15 bg-white/5 text-zinc-300"
                        }`}>
                          {salida.cupos}
                        </span>
                      </div>
                    </a>
                  ))}
                </div>

                <div className="mt-5 flex flex-col gap-4 border-t border-white/[0.07] pt-5 sm:mt-6 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:pr-10 xl:pr-16">
                  <Link to="/contacto" className="shrink-0 rounded-2xl bg-lime-400 px-5 py-3 text-center text-sm font-bold uppercase tracking-[0.18em] text-black transition hover:bg-lime-300 sm:w-auto">
                    Consultar lugar
                  </Link>
                  <p className="max-w-[15rem] text-sm text-zinc-400 sm:text-right">Fechas sujetas a clima, terreno y logística de cada salida.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative h-10 overflow-hidden bg-[linear-gradient(180deg,#111827_0%,#09090b_100%)] sm:h-20">
        <div className="absolute inset-0 origin-top-left skew-y-2 transform bg-lime-500/85" />
      </div>

      <section className="border-y border-white/10 bg-[linear-gradient(180deg,#09090b_0%,#111827_100%)] px-5 py-8 text-white sm:px-8 sm:py-10">
        <div className="mx-auto max-w-[96rem]">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.35em] text-lime-400">Sponsors</p>
              <h2 className="mt-2 text-2xl font-black uppercase sm:text-3xl">Marcas destacadas del proyecto</h2>
            </div>
              <Link to="/sponsors" className="inline-flex rounded-2xl border border-white/20 px-5 py-3 text-center text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:border-lime-400 hover:text-lime-300 sm:text-sm sm:tracking-[0.2em]">
              Ver todos los sponsors
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {sponsorsDestacados.map((sponsor) => (
              <SponsorHighlight key={sponsor.id} sponsor={sponsor} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[linear-gradient(180deg,#09090b_0%,#111827_100%)] px-5 py-16 text-white sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-[88rem] items-center gap-10 sm:gap-16 md:grid-cols-2">
          <div>
            <h2 className="mb-6 text-3xl font-black uppercase sm:text-4xl md:text-6xl">
              No es turismo. <br />
              Es <span className="text-lime-400">adrenalina real.</span>
            </h2>
            <p className="text-base leading-relaxed text-gray-400 sm:text-lg">
              Organizamos travesías off-road diseñadas para romper límites.
              Arena, barro y montaña sin filtro. Esto no es para mirar. Es para
              vivirlo.
            </p>
          </div>
          <div className="media-frame">
            <img src="/galeria/pinamar-2025/enduro.jpg" className="h-full w-full object-cover" alt="Travesía Off Road" />
          </div>
        </div>
      </section>

      <section className="bg-[linear-gradient(180deg,#050505_0%,#09090b_42%,#111827_100%)] px-5 py-16 text-white sm:px-8 sm:py-20">
        <div className="mx-auto max-w-[96rem]">
          <div className="mb-8 grid gap-5 border-b border-white/10 pb-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(22rem,0.55fr)] lg:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.35em] text-lime-400">Experiencias</p>
              <h2 className="mt-3 max-w-3xl text-[clamp(2rem,6vw,4.5rem)] font-black uppercase leading-[0.92] tracking-tight">
                Nuestras travesías
              </h2>
            </div>
            <p className="max-w-xl text-base leading-relaxed text-zinc-400 lg:justify-self-end lg:text-right">
              Elegí el tipo de salida según el terreno, la intensidad y el plan del grupo. Los álbumes quedan en la galería; acá te mostramos qué hacemos.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {tiposTravesias.map((tipo) => (
              <Link key={tipo.nombre} to={tipo.to} className="group flex min-h-[27rem] flex-col overflow-hidden rounded-[1.35rem] border border-white/10 bg-white/[0.035] transition hover:border-lime-400/45 sm:rounded-[1.75rem]">
                <div className="relative h-52 overflow-hidden bg-zinc-950">
                  <img src={tipo.imagen} alt={`Travesía de ${tipo.nombre}`} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02)_0%,rgba(0,0,0,0.72)_100%)]" />
                  <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/55 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-lime-300 backdrop-blur-sm">
                    {tipo.etiqueta}
                  </span>
                </div>
                <div className="flex flex-1 flex-col justify-between p-5">
                  <div>
                    <h3 className="text-3xl font-black uppercase leading-none text-white">{tipo.nombre}</h3>
                    <p className="mt-4 text-sm leading-relaxed text-zinc-400">{tipo.descripcion}</p>
                  </div>
                  <span className="mt-6 text-xs font-bold uppercase tracking-[0.22em] text-white/80 transition group-hover:text-lime-300">
                    {tipo.accion}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-6 rounded-[1.35rem] border border-lime-400/20 bg-lime-400/[0.07] p-5 sm:rounded-[1.75rem] sm:p-6">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.26em] text-lime-300">Próxima salida</p>
                <h3 className="mt-2 text-2xl font-black uppercase leading-tight text-white">Te orientamos según tu experiencia</h3>
                <p className="mt-2 max-w-3xl text-sm leading-relaxed text-zinc-300">
                  Contanos si buscás arena, barro, una salida solidaria o querés enterarte cuando abramos nieve.
                </p>
              </div>
              <Link to="/contacto" className="shrink-0 rounded-2xl bg-lime-400 px-5 py-3 text-center text-sm font-bold uppercase tracking-[0.16em] text-black transition hover:bg-lime-300">
                Pedir info
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[linear-gradient(180deg,#050505_0%,#0b0b0b_45%,#111827_100%)] px-5 py-16 text-center text-white sm:px-6 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-3xl font-black uppercase sm:text-4xl md:text-5xl">¿Estás listo para sumarte?</h2>
          <p className="mb-12 text-base text-gray-400 sm:text-lg">Cupos limitados por travesía. Reservá tu lugar y viví la experiencia vos mismo.</p>
          <Link to="/travesias" className="inline-block rounded-2xl bg-lime-400 px-6 py-4 text-base font-bold text-black shadow-[0_24px_80px_rgba(132,204,22,0.12)] transition hover:bg-lime-300 sm:px-10 sm:py-5 sm:text-lg">Quiero sumarme</Link>
        </div>
      </section>
    </>
  )
}
