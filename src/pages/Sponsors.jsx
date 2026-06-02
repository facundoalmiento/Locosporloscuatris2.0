import { Link } from "react-router-dom"

import { sponsors } from "../data/sponsors"

function getSponsorInitials(nombre) {
  return nombre
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((palabra) => palabra[0]?.toUpperCase() ?? "")
    .join("")
}

function SponsorCard({ sponsor }) {
  const tieneLink = sponsor.importante && sponsor.url
  const cardClassName = "group rounded-[1.35rem] border border-white/10 bg-white/[0.04] p-5 transition hover:-translate-y-1 hover:border-lime-400/50 hover:bg-white/[0.06] sm:rounded-[2rem] sm:p-6"

  const content = (
    <>
      <div className="flex flex-col gap-4 min-[430px]:flex-row min-[430px]:items-start min-[430px]:justify-between">
        <div className="flex min-w-0 items-center gap-4">
          {sponsor.logo ? (
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.16),rgba(255,255,255,0.04))] p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
              <img src={sponsor.logo} alt={sponsor.nombre} className="h-full w-full object-contain" />
            </div>
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-black/30 text-xl font-black text-lime-300">
              {getSponsorInitials(sponsor.nombre)}
            </div>
          )}
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-[0.32em] text-lime-300">{sponsor.categoria}</p>
            <h3 className="mt-2 break-words text-lg font-black uppercase text-white sm:text-xl">{sponsor.nombre}</h3>
          </div>
        </div>
        {sponsor.destacado ? (
          <span className="w-fit rounded-full border border-lime-400/40 bg-lime-400/10 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.22em] text-lime-300 sm:tracking-[0.3em]">
            Destacado
          </span>
        ) : null}
      </div>
      <p className="mt-6 text-sm leading-relaxed text-zinc-400">{sponsor.descripcion}</p>
      <div className="mt-6 text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500">
        {tieneLink ? "Ver sponsor" : "Presencia institucional"}
      </div>
    </>
  )

  if (tieneLink) {
    return (
      <a href={sponsor.url} target="_blank" rel="noreferrer" className={cardClassName}>
        {content}
      </a>
    )
  }

  return <div className={cardClassName}>{content}</div>
}

export default function Sponsors() {
  const destacados = sponsors.filter((sponsor) => sponsor.destacado)
  const resto = sponsors.filter((sponsor) => !sponsor.destacado)

  return (
    <div className="page-shell">
      <div className="page-container">
        <div className="hero-stage">
          <section className="hero-panel">
          <div>
            <p className="hero-eyebrow">Sponsors</p>
            <h1 className="hero-title">Marcas que impulsan cada travesía.</h1>
            <p className="hero-copy">Acá podés mostrar a todos tus sponsors sin cargar la home. Los importantes pueden llevar link y el resto quedar como presencia institucional.</p>
            <div className="action-row">
              <Link to="/contacto" className="primary-action">Quiero sumar mi marca</Link>
              <Link to="/" className="secondary-action">Volver al inicio</Link>
            </div>
          </div>
          <div className="metric-grid">
            <div className="metric-card">
              <div className="metric-value">{sponsors.length}</div>
              <div className="metric-label">marcas totales</div>
            </div>
            <div className="metric-card">
              <div className="metric-value">{destacados.length}</div>
              <div className="metric-label">destacados</div>
            </div>
            <div className="metric-card">
              <div className="metric-value">{sponsors.filter((sponsor) => sponsor.importante).length}</div>
              <div className="metric-label">con link</div>
            </div>
          </div>
          </section>
        </div>

        <div className="landing-section-with-nav">
          <section className="w-full">
            <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.35em] text-lime-400">Destacados</p>
              <h2 className="mt-3 text-2xl font-black uppercase sm:text-3xl md:text-4xl">Los sponsors con más peso dentro del proyecto</h2>
            </div>
          </div>
            <div className="responsive-grid-3">
              {destacados.map((sponsor) => (
                <SponsorCard key={sponsor.id} sponsor={sponsor} />
              ))}
            </div>
          </section>
        </div>

        <section className="pb-20 pt-8">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.35em] text-lime-400">Todos</p>
              <h2 className="mt-3 text-2xl font-black uppercase sm:text-3xl md:text-4xl">Resto de sponsors y aliados</h2>
            </div>
          </div>
          <div className="responsive-grid-3">
            {resto.map((sponsor) => (
              <SponsorCard key={sponsor.id} sponsor={sponsor} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
