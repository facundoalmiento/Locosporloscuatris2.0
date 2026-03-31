import { lazy, Suspense, useEffect, useState } from "react"
import { Link } from "react-router-dom"

const MascotaPeeker = lazy(() => import("../components/MascotaPeeker"))

export default function Home() {
  const [showMascota, setShowMascota] = useState(false)
  const [showMascotaMobileSafe, setShowMascotaMobileSafe] = useState(false)

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

      <div className="relative flex min-h-screen w-full items-center bg-[radial-gradient(circle_at_top,rgba(132,204,22,0.16),transparent_26%),linear-gradient(180deg,#050505_0%,#0b0b0b_46%,#111827_100%)] pt-24 text-white">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-5 py-10 sm:px-8 md:grid-cols-2 md:gap-12">
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-widest text-lime-400 sm:text-base">
              Off Road Experience
            </p>
            <h1 className="mb-6 text-4xl font-black uppercase leading-[0.88] tracking-tight sm:text-5xl md:text-8xl">
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
          <div className="hidden items-center justify-center md:flex">
            <img src="/galeria/rata.png" alt="Mascota Locos por los Cuatris" className="w-80 object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.4)] transition duration-500 hover:scale-105" />
          </div>
        </div>
      </div>

      <div className="relative h-20 overflow-hidden bg-[linear-gradient(180deg,#111827_0%,#09090b_100%)] sm:h-32">
        <div className="absolute inset-0 origin-top-left skew-y-3 transform bg-lime-500" />
      </div>

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
                <p className="mb-6 text-base text-gray-400 sm:text-lg">Montaña, frío y desafío constante. Una travesía diferente, única y brutal.</p>
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                  <Link to="/galeria" className="rounded-2xl border border-white/20 px-6 py-3 text-center font-semibold text-white transition hover:border-lime-400 hover:text-lime-300 sm:px-8">Ver Travesías</Link>
                  <Link to="/travesias" className="rounded-2xl bg-lime-400 px-6 py-3 text-center font-semibold text-black transition hover:bg-lime-300 sm:px-8">Reservar</Link>
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
