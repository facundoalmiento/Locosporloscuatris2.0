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
  const cardClassName = "group rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 transition hover:-translate-y-1 hover:border-lime-400/50 hover:bg-white/[0.06]"

  const content = (
    <>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          {sponsor.logo ? (
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.16),rgba(255,255,255,0.04))] p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
              <img src={sponsor.logo} alt={sponsor.nombre} className="h-full w-full object-contain" />
            </div>
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-black/30 text-xl font-black text-lime-300">
              {getSponsorInitials(sponsor.nombre)}
            </div>
          )}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.32em] text-lime-300">{sponsor.categoria}</p>
            <h3 className="mt-2 text-xl font-black uppercase text-white">{sponsor.nombre}</h3>
          </div>
        </div>
        {sponsor.destacado ? (
          <span className="rounded-full border border-lime-400/40 bg-lime-400/10 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.3em] text-lime-300">
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
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(132,204,22,0.16),transparent_26%),linear-gradient(180deg,#050505_0%,#0b0b0b_46%,#111827_100%)] px-4 pt-28 text-white sm:px-6 sm:pt-32">
      <div className="mx-auto max-w-7xl">
        <section className="mb-12 grid gap-8 rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_30px_120px_rgba(0,0,0,0.35)] backdrop-blur-sm sm:mb-16 sm:p-8 lg:grid-cols-[1.2fr_0.8fr] lg:p-12">
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.45em] text-lime-400">Sponsors</p>
            <h1 className="max-w-4xl text-4xl font-black uppercase leading-none tracking-tight sm:text-5xl md:text-7xl">Marcas que impulsan cada travesía.</h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-300 md:text-lg">Acá podés mostrar a todos tus sponsors sin cargar la home. Los importantes pueden llevar link y el resto quedar como presencia institucional.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
              <Link to="/contacto" className="rounded-2xl bg-lime-400 px-6 py-3 text-center font-bold text-black transition hover:bg-lime-300 sm:px-7">Quiero sumar mi marca</Link>
              <Link to="/" className="rounded-2xl border border-white/20 px-6 py-3 text-center font-semibold text-white transition hover:border-lime-400 hover:text-lime-300 sm:px-7">Volver al inicio</Link>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
              <div className="text-4xl font-black text-lime-400">{sponsors.length}</div>
              <div className="mt-2 text-sm uppercase tracking-[0.25em] text-zinc-400">marcas totales</div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
              <div className="text-4xl font-black text-lime-400">{destacados.length}</div>
              <div className="mt-2 text-sm uppercase tracking-[0.25em] text-zinc-400">destacados</div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
              <div className="text-4xl font-black text-lime-400">{sponsors.filter((sponsor) => sponsor.importante).length}</div>
              <div className="mt-2 text-sm uppercase tracking-[0.25em] text-zinc-400">con link</div>
            </div>
          </div>
        </section>

        <section className="pb-10">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.35em] text-lime-400">Destacados</p>
              <h2 className="mt-3 text-2xl font-black uppercase sm:text-3xl md:text-4xl">Los sponsors con más peso dentro del proyecto</h2>
            </div>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {destacados.map((sponsor) => (
              <SponsorCard key={sponsor.id} sponsor={sponsor} />
            ))}
          </div>
        </section>

        <section className="pb-20 pt-8">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.35em] text-lime-400">Todos</p>
              <h2 className="mt-3 text-2xl font-black uppercase sm:text-3xl md:text-4xl">Resto de sponsors y aliados</h2>
            </div>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {resto.map((sponsor) => (
              <SponsorCard key={sponsor.id} sponsor={sponsor} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
