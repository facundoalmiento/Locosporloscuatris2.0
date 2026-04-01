import { lazy, Suspense, useEffect, useState } from "react"
import { Link } from "react-router-dom"

import { eventos } from "../data/eventos"
import { sponsors } from "../data/sponsors"

const MascotaPeeker = lazy(() => import("../components/MascotaPeeker"))

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
  const className = "group flex items-center gap-4 rounded-[1.75rem] border border-white/10 bg-white/[0.03] px-5 py-4 transition hover:border-lime-400/50 hover:bg-white/[0.05]"

  const content = (
    <>
      {sponsor.logo ? (
        <img src={sponsor.logo} alt={sponsor.nombre} className="h-14 w-14 rounded-2xl object-contain" />
      ) : (
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(132,204,22,0.35),rgba(255,255,255,0.08))] text-lg font-black text-white">
          {getSponsorInitials(sponsor.nombre)}
        </div>
      )}
      <div className="min-w-0">
        <p className="text-[0.65rem] font-bold uppercase tracking-[0.35em] text-lime-300">{sponsor.categoria}</p>
        <h3 className="mt-2 truncate text-lg font-black uppercase text-white">{sponsor.nombre}</h3>
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

      <div className="relative flex min-h-[100svh] w-full items-center bg-[radial-gradient(circle_at_top,rgba(132,204,22,0.16),transparent_26%),linear-gradient(180deg,#050505_0%,#0b0b0b_46%,#111827_100%)] pt-10 text-white">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-7 px-4 py-8 sm:px-8 sm:py-10 lg:grid-cols-[minmax(0,1fr)_minmax(27rem,0.9fr)] lg:gap-10 xl:grid-cols-[minmax(0,1fr)_minmax(29rem,0.94fr)] xl:gap-14">
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-widest text-lime-400 sm:text-base">
              Off Road Experience
            </p>
            <h1 className="mb-6 text-[clamp(3.2rem,10vw,6.9rem)] font-black uppercase leading-[0.88] tracking-tight">
              <span className="block text-white">Locos por</span>
              <span className="block text-lime-400 drop-shadow-[0_0_30px_rgba(132,123,22,0.4)]">
                los Cuatris
              </span>
            </h1>
            <p className="mb-8 max-w-lg text-base text-gray-400 sm:text-lg">
              Arena. Barro. Montaña. Travesías extremas diseñadas para quienes
              no quieren límites.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
              <Link to="/travesias" className="rounded-2xl bg-lime-400 px-6 py-4 text-center font-bold text-black transition hover:bg-lime-300 sm:px-10 sm:py-5">Reservar Ahora</Link>
              <Link to="/galeria" className="rounded-2xl border border-white/20 px-6 py-4 text-center font-semibold text-white transition hover:border-lime-400 hover:text-lime-300 sm:px-10 sm:py-5">Ver Travesías</Link>
            </div>
          </div>

          <div className="relative flex items-center justify-center lg:justify-end lg:pt-4 xl:pt-6">
            <div className="absolute h-[18rem] w-[18rem] rounded-full bg-[radial-gradient(circle,rgba(163,230,53,0.14)_0%,rgba(163,230,53,0.05)_42%,transparent_74%)] blur-2xl sm:h-[24rem] sm:w-[24rem]" />
            <div className="relative w-full max-w-[31.5rem] overflow-hidden rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.015))] p-4 shadow-[0_30px_120px_rgba(0,0,0,0.35)] sm:rounded-[2.5rem] sm:p-7">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_65%_20%,rgba(163,230,53,0.12),transparent_38%)]" />

              <div className="relative z-10">
                <div className="flex flex-col gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.35em] text-lime-400">Cronograma</p>
                    <h2 className="mt-3 text-[1.85rem] font-black uppercase leading-none text-white sm:text-3xl">Próximas travesías</h2>
                  </div>
                  <span className="w-fit rounded-full border border-lime-400/30 bg-lime-400/10 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.28em] text-lime-300">
                    Temporada 2026
                  </span>
                </div>

                <div className="mt-6 space-y-4">
                  {proximasSalidas.map((salida, index) => (
                    <div key={salida.id} className="rounded-[1.4rem] border border-white/10 bg-black/25 p-4 transition hover:border-lime-400/35 sm:rounded-[1.6rem] sm:p-5">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex min-w-0 items-start gap-3 sm:gap-4">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/6 text-sm font-black text-lime-300">
                            0{index + 1}
                          </div>
                          <div className="min-w-0">
                            <p className="text-[0.62rem] font-bold uppercase tracking-[0.28em] text-zinc-500 sm:text-[0.68rem] sm:tracking-[0.32em]">{salida.fecha}</p>
                            <h3 className="mt-2 text-lg font-black uppercase leading-tight text-white sm:text-xl">{salida.titulo}</h3>
                            <p className="mt-2 text-sm text-zinc-400">{salida.ubicacion}</p>
                          </div>
                        </div>
                        <span className={`w-fit rounded-full px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.24em] ${
                          salida.cupos === "Disponibles"
                            ? "border border-lime-400/30 bg-lime-400/10 text-lime-300"
                            : salida.cupos === "Últimos lugares" || salida.cupos === "Ãšltimos lugares" || salida.cupos === "ÃƒÅ¡ltimos lugares"
                              ? "border border-amber-300/30 bg-amber-300/10 text-amber-200"
                              : "border border-white/15 bg-white/5 text-zinc-300"
                        }`}>
                          {salida.cupos}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-col gap-4 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:pr-20">
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

      <div className="relative h-20 overflow-hidden bg-[linear-gradient(180deg,#111827_0%,#09090b_100%)] sm:h-32">
        <div className="absolute inset-0 origin-top-left skew-y-3 transform bg-lime-500" />
      </div>

      <section className="border-y border-white/10 bg-[linear-gradient(180deg,#09090b_0%,#111827_100%)] px-5 py-8 text-white sm:px-8 sm:py-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.35em] text-lime-400">Sponsors</p>
              <h2 className="mt-2 text-2xl font-black uppercase sm:text-3xl">Marcas destacadas del proyecto</h2>
            </div>
            <Link to="/sponsors" className="inline-flex rounded-2xl border border-white/20 px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:border-lime-400 hover:text-lime-300">
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

      <section className="bg-[linear-gradient(180deg,#09090b_0%,#111827_100%)] px-5 py-20 text-white sm:px-8 sm:py-32">
        <div className="mx-auto grid max-w-6xl items-center gap-10 sm:gap-16 md:grid-cols-2">
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
          <div className="h-72 overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950 shadow-[0_24px_80px_rgba(0,0,0,0.35)] sm:h-96">
            <img src="/galeria/pinamar-2025/enduro.jpg" className="h-full w-full object-cover" alt="Travesía Off Road" />
          </div>
        </div>
      </section>

      <section className="bg-[linear-gradient(180deg,#050505_0%,#0b0b0b_45%,#111827_100%)] px-5 py-20 text-white sm:px-8 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-3xl font-black uppercase sm:mb-20 sm:text-5xl">Nuestras Travesías</h2>
          <div className="space-y-16 sm:space-y-32">
            <div className="grid items-center gap-8 sm:gap-16 md:grid-cols-2">
              <div className="h-72 overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950 shadow-[0_24px_80px_rgba(0,0,0,0.35)] sm:h-96">
                <img src="/galeria/pinamar-2025/picante.jpg" className="h-full w-full object-cover" alt="Travesía en arena" />
              </div>
              <div>
                <h3 className="mb-6 text-3xl font-black uppercase text-lime-400 sm:text-4xl">Arena</h3>
                <p className="mb-6 text-base text-gray-400 sm:text-lg">Médanos gigantes, velocidad y control absoluto. Ideal para quienes quieren sentir el poder real del cuatri.</p>
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                  <Link to="/galeria" className="rounded-2xl border border-white/20 px-6 py-3 text-center font-semibold text-white transition hover:border-lime-400 hover:text-lime-300 sm:px-8">Ver Travesías</Link>
                  <Link to="/travesias" className="rounded-2xl bg-lime-400 px-6 py-3 text-center font-semibold text-black transition hover:bg-lime-300 sm:px-8">Reservar</Link>
                </div>
              </div>
            </div>

            <div className="grid items-center gap-8 sm:gap-16 md:grid-cols-2">
              <div className="order-2 md:order-1">
                <h3 className="mb-6 text-3xl font-black uppercase text-lime-400 sm:text-4xl">Barro</h3>
                <p className="mb-6 text-base text-gray-400 sm:text-lg">Obstáculos naturales, terrenos impredecibles y pura técnica. La experiencia más intensa del off-road.</p>
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                  <Link to="/galeria" className="rounded-2xl border border-white/20 px-6 py-3 text-center font-semibold text-white transition hover:border-lime-400 hover:text-lime-300 sm:px-8">Ver Travesías</Link>
                  <Link to="/travesias" className="rounded-2xl bg-lime-400 px-6 py-3 text-center font-semibold text-black transition hover:bg-lime-300 sm:px-8">Reservar</Link>
                </div>
              </div>
              <div className="order-1 h-72 overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950 shadow-[0_24px_80px_rgba(0,0,0,0.35)] md:order-2 sm:h-96">
                <img src="/galeria/barrofuerte.jpg" className="h-full w-full object-cover" alt="Travesía barro" />
              </div>
            </div>

            <div className="grid items-center gap-8 sm:gap-16 md:grid-cols-2">
              <div className="h-72 overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950 shadow-[0_24px_80px_rgba(0,0,0,0.35)] sm:h-96">
                <img src="/galeria/nieve/nieve-06.jpg" className="h-full w-full object-cover" alt="Travesía nieve" />
              </div>
              <div>
                <h3 className="mb-6 text-3xl font-black uppercase text-lime-400 sm:text-4xl">Nieve</h3>
                <p className="mb-2 text-sm font-bold uppercase tracking-[0.3em] text-white/70">Próximamente</p>
                <p className="mb-6 text-base text-gray-400 sm:text-lg">La travesía de nieve va más adelante. Todavía no hicimos una salida de este tipo, así que por ahora queda anunciada como próxima experiencia.</p>
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                  <Link to="/contacto" className="rounded-2xl bg-lime-400 px-6 py-3 text-center font-semibold text-black transition hover:bg-lime-300 sm:px-8">Quiero enterarme</Link>
                  <Link to="/travesias" className="rounded-2xl border border-white/20 px-6 py-3 text-center font-semibold text-white transition hover:border-lime-400 hover:text-lime-300 sm:px-8">Ver experiencias</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[linear-gradient(180deg,#050505_0%,#0b0b0b_45%,#111827_100%)] px-5 py-20 text-center text-white sm:px-6 sm:py-32">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-3xl font-black uppercase sm:text-4xl md:text-5xl">¿Estás listo para sumarte?</h2>
          <p className="mb-12 text-base text-gray-400 sm:text-lg">Cupos limitados por travesía. Reservá tu lugar y viví la experiencia vos mismo.</p>
          <Link to="/travesias" className="inline-block rounded-2xl bg-lime-400 px-6 py-4 text-base font-bold text-black shadow-[0_24px_80px_rgba(132,204,22,0.12)] transition hover:bg-lime-300 sm:px-10 sm:py-5 sm:text-lg">Reservar mi Travesía</Link>
        </div>
      </section>
    </>
  )
}
