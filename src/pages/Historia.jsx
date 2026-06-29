import { Link } from "react-router-dom"

import { historia } from "../data/historia"

export default function Historia() {
  return (
    <main className="page-shell">
      <div className="page-container">
        <div className="hero-stage">
          <section className="hero-panel">
            <div>
              <p className="hero-eyebrow">{historia.etiqueta}</p>
              <h1 className="hero-title">{historia.titulo}</h1>
              <p className="hero-copy">{historia.introduccion}</p>
            </div>
            <div className="metric-grid">
              <div className="metric-card">
                <div className="metric-value">01</div>
                <div className="metric-label">un comienzo</div>
              </div>
              <div className="metric-card">
                <div className="metric-value">∞</div>
                <div className="metric-label">historias en el camino</div>
              </div>
            </div>
          </section>
        </div>

        <section className="grid gap-6 py-8 sm:py-10 lg:grid-cols-[1.15fr_0.85fr] lg:py-14">
          <article className="rounded-[1.75rem] border border-white/10 bg-white/[0.035] p-6 sm:p-8 lg:p-10">
            <p className="text-sm font-bold uppercase tracking-[0.35em] text-lime-400">{historia.origen.etiqueta}</p>
            <h2 className="mt-4 max-w-3xl text-3xl font-black uppercase leading-tight text-white sm:text-4xl">{historia.origen.titulo}</h2>
            <div className="mt-7 space-y-5 text-base leading-relaxed text-zinc-300 sm:text-lg">
              {historia.origen.parrafos.map((parrafo) => (
                <p key={parrafo}>{parrafo}</p>
              ))}
            </div>
          </article>

          <aside className="overflow-hidden rounded-[1.75rem] border border-lime-400/20 bg-[radial-gradient(circle_at_top,rgba(132,204,22,0.14),transparent_42%),rgba(0,0,0,0.35)]">
            <div className="flex min-h-72 items-center justify-center border-b border-white/10 p-8">
              {historia.logoOriginal.src ? (
                <img src={historia.logoOriginal.src} alt={historia.logoOriginal.alt} className="max-h-56 max-w-full object-contain" />
              ) : (
                <div className="text-center">
                  <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border border-dashed border-lime-400/45 bg-lime-400/[0.07] text-4xl font-black text-lime-300">LPLC</div>
                  <p className="mt-5 text-xs font-bold uppercase tracking-[0.28em] text-zinc-500">Espacio para el logo original</p>
                </div>
              )}
            </div>
            <div className="p-6 sm:p-8">
              <h2 className="text-2xl font-black uppercase text-white">{historia.logoOriginal.titulo}</h2>
              <p className="mt-4 text-sm leading-relaxed text-zinc-400">{historia.logoOriginal.descripcion}</p>
            </div>
          </aside>
        </section>

        <section className="pb-12 pt-6 sm:pb-16">
          <div className="mb-8">
            <p className="text-sm font-bold uppercase tracking-[0.35em] text-lime-400">Línea de tiempo</p>
            <h2 className="mt-3 text-3xl font-black uppercase text-white sm:text-4xl">Momentos que hicieron historia</h2>
          </div>

          <div className="responsive-grid-3">
            {historia.hitos.map((hito, index) => (
              <article key={hito.periodo} className="rounded-[1.75rem] border border-white/10 bg-black/35 p-6 sm:p-8">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs font-bold uppercase tracking-[0.25em] text-lime-400">{hito.periodo}</span>
                  <span className="text-3xl font-black text-white/10">0{index + 1}</span>
                </div>
                <h3 className="mt-8 text-2xl font-black uppercase leading-tight text-white">{hito.titulo}</h3>
                <p className="mt-4 text-sm leading-relaxed text-zinc-400">{hito.descripcion}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="pb-20">
          <div className="flex flex-col gap-6 rounded-[1.75rem] border border-lime-400/20 bg-lime-400/[0.07] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-lime-300">El próximo capítulo</p>
              <h2 className="mt-3 text-2xl font-black uppercase text-white sm:text-3xl">La historia se sigue escribiendo en cada salida.</h2>
            </div>
            <Link to="/galeria" className="shrink-0 rounded-2xl bg-lime-400 px-6 py-3 text-center font-bold text-black transition hover:bg-lime-300">Ver las travesías</Link>
          </div>
        </section>
      </div>
    </main>
  )
}
