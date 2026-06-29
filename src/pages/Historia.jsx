import { Link } from "react-router-dom"

import { historia } from "../data/historia"

export default function Historia() {
  return (
    <main className="page-shell">
      <div className="page-container">
        <div className="hero-stage">
          <section className="relative isolate min-h-[36rem] overflow-hidden rounded-[1.75rem] border border-white/10 bg-zinc-950 shadow-[0_28px_90px_rgba(0,0,0,0.42)] sm:rounded-[2.25rem] lg:min-h-[40rem]">
            <img
              src="/galeria/solidariaportada.jpg"
              alt=""
              className="absolute inset-0 h-full w-full object-cover object-center opacity-45"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.96)_0%,rgba(0,0,0,0.76)_48%,rgba(0,0,0,0.25)_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_25%,rgba(132,204,22,0.2),transparent_34%)]" />

            <div className="relative z-10 grid min-h-[36rem] gap-10 p-6 sm:p-10 lg:min-h-[40rem] lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:p-14">
              <div className="flex max-w-4xl flex-col justify-end">
                <p className="text-xs font-black uppercase tracking-[0.32em] text-lime-400 sm:text-sm sm:tracking-[0.42em]">{historia.etiqueta}</p>
                <h1 className="mt-5 text-[clamp(2.7rem,8vw,6.7rem)] font-black uppercase leading-[0.86] tracking-[-0.04em] text-white">{historia.titulo}</h1>
                <p className="mt-7 max-w-2xl text-base leading-relaxed text-zinc-200 sm:text-xl">{historia.introduccion}</p>
              </div>

              <div className="flex items-end gap-4 lg:flex-col lg:items-end">
                <span className="text-[clamp(4rem,12vw,8rem)] font-black leading-none tracking-[-0.08em] text-lime-400">2013</span>
                <span className="mb-2 border-l border-white/25 pl-4 text-xs font-bold uppercase tracking-[0.3em] text-zinc-300 lg:border-b lg:border-l-0 lg:pb-3 lg:pl-0">Kilómetro cero</span>
              </div>
            </div>
          </section>
        </div>

        <section className="py-14 sm:py-20">
          <div className="mx-auto max-w-6xl text-center">
            <p className="text-xs font-black uppercase tracking-[0.42em] text-lime-400">Lo que nos mueve</p>
            <h2 className="mt-6 text-[clamp(2.2rem,6vw,5rem)] font-black uppercase leading-[0.95] tracking-tight text-white">
              “{historia.manifiesto}”
            </h2>
          </div>
        </section>

        <section className="grid gap-6 pb-16 lg:grid-cols-[0.72fr_1.28fr] lg:items-stretch lg:pb-24">
          <aside className="relative overflow-hidden rounded-[1.75rem] border border-lime-400/20 bg-[radial-gradient(circle_at_top,rgba(132,204,22,0.18),transparent_38%),rgba(0,0,0,0.38)] p-6 sm:p-8">
            <div className="flex h-full min-h-[23rem] flex-col justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.35em] text-lime-400">{historia.origen.etiqueta}</p>
                <div className="mt-8 text-[clamp(3.5rem,10vw,6.5rem)] font-black leading-none tracking-[-0.07em] text-white">{historia.fechaOrigen}</div>
              </div>
              <div className="mt-12 border-t border-white/10 pt-6">
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-zinc-500">Lugar de origen</p>
                <p className="mt-2 text-3xl font-black uppercase text-white">{historia.lugarOrigen}</p>
              </div>
            </div>
          </aside>

          <article className="rounded-[1.75rem] border border-white/10 bg-white/[0.035] p-6 sm:p-8 lg:p-12">
            <p className="text-sm font-bold uppercase tracking-[0.35em] text-lime-400">Donde empezó todo</p>
            <h2 className="mt-5 max-w-4xl text-3xl font-black uppercase leading-[1.02] text-white sm:text-5xl">{historia.origen.titulo}</h2>
            <div className="mt-8 space-y-6 text-base leading-relaxed text-zinc-300 sm:text-lg">
              {historia.origen.parrafos.map((parrafo, index) => (
                <p key={parrafo} className={index === 0 ? "text-xl font-semibold leading-relaxed text-white sm:text-2xl" : ""}>{parrafo}</p>
              ))}
            </div>
          </article>
        </section>

        <section className="pb-16 sm:pb-24">
          <div className="grid overflow-hidden rounded-[1.75rem] border border-white/10 bg-black/35 lg:grid-cols-[1fr_1.1fr]">
            <div className="relative flex min-h-[25rem] items-center justify-center border-b border-white/10 p-8 lg:border-b-0 lg:border-r">
              <div className="absolute left-6 top-6 rounded-full border border-lime-400/30 bg-lime-400/10 px-4 py-2 text-[0.65rem] font-black uppercase tracking-[0.26em] text-lime-300">{historia.logoOriginal.archivo}</div>
              {historia.logoOriginal.src ? (
                <img src={historia.logoOriginal.src} alt={historia.logoOriginal.alt} className="max-h-72 max-w-full object-contain drop-shadow-[0_20px_50px_rgba(132,204,22,0.2)]" />
              ) : (
                <div className="relative text-center">
                  <div className="absolute inset-0 rounded-full bg-lime-400/10 blur-3xl" />
                  <div className="relative mx-auto flex h-44 w-44 -rotate-3 items-center justify-center rounded-[2.5rem] border-2 border-dashed border-lime-400/45 bg-black/50 text-5xl font-black text-lime-300 shadow-[0_22px_70px_rgba(0,0,0,0.45)]">LPLC</div>
                  <p className="relative mt-6 text-[0.65rem] font-bold uppercase tracking-[0.32em] text-zinc-500">Pendiente: logo fundador</p>
                </div>
              )}
            </div>
            <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
              <p className="text-xs font-black uppercase tracking-[0.38em] text-lime-400">Identidad original</p>
              <h2 className="mt-5 text-4xl font-black uppercase leading-none text-white sm:text-5xl">{historia.logoOriginal.titulo}</h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-zinc-300 sm:text-lg">{historia.logoOriginal.descripcion}</p>
              {!historia.logoOriginal.src ? (
                <p className="mt-8 border-l-2 border-lime-400 pl-4 text-sm leading-relaxed text-zinc-500">
                  Para cargarlo, guardá la imagen en <span className="text-zinc-300">public/galeria</span> y completá <span className="text-zinc-300">logoOriginal.src</span> en el archivo de historia.
                </p>
              ) : null}
            </div>
          </div>
        </section>

        <section className="pb-16 sm:pb-24">
          <div className="mb-10 max-w-4xl">
            <p className="text-sm font-bold uppercase tracking-[0.35em] text-lime-400">Tres capítulos</p>
            <h2 className="mt-4 text-[clamp(2.4rem,6vw,4.8rem)] font-black uppercase leading-[0.92] text-white">Del primer impulso a todo lo que vino después.</h2>
          </div>

          <div className="relative space-y-5 before:absolute before:bottom-8 before:left-[1.42rem] before:top-8 before:w-px before:bg-gradient-to-b before:from-lime-400 before:via-lime-400/35 before:to-transparent sm:before:left-[2.42rem]">
            {historia.hitos.map((hito, index) => (
              <article key={hito.periodo} className="relative grid gap-5 pl-14 sm:pl-20 lg:grid-cols-[0.65fr_1.35fr]">
                <span className="absolute left-3 top-8 z-10 flex h-5 w-5 items-center justify-center rounded-full border-4 border-zinc-950 bg-lime-400 shadow-[0_0_24px_rgba(132,204,22,0.7)] sm:left-8" />
                <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-zinc-950">
                  <img src={hito.imagen} alt={hito.alt} className="h-56 w-full object-cover sm:h-64 lg:h-full lg:min-h-[20rem]" />
                </div>
                <div className="flex flex-col justify-center rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-6 sm:p-8 lg:p-10">
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="text-4xl font-black uppercase leading-none text-lime-400 sm:text-5xl">{hito.periodo}</span>
                    <span className="rounded-full border border-white/10 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.24em] text-zinc-400">{hito.etiqueta}</span>
                  </div>
                  <h3 className="mt-6 text-3xl font-black uppercase leading-tight text-white sm:text-4xl">{hito.titulo}</h3>
                  <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-400">{hito.descripcion}</p>
                  <span className="mt-8 text-xs font-black uppercase tracking-[0.28em] text-white/10">Capítulo 0{index + 1}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="pb-20">
          <div className="relative overflow-hidden rounded-[1.75rem] border border-lime-400/25 bg-black/50 p-7 sm:p-10 lg:p-14">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,rgba(132,204,22,0.18),transparent_40%)]" />
            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-4xl">
                <p className="text-xs font-black uppercase tracking-[0.36em] text-lime-400">La historia continúa</p>
                <h2 className="mt-5 text-[clamp(2.2rem,6vw,4.8rem)] font-black uppercase leading-[0.94] text-white">El próximo capítulo se escribe afuera.</h2>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-400">En la arena, en el barro y en cada lugar donde el grupo vuelva a encontrarse para avanzar junto.</p>
              </div>
              <Link to="/galeria" className="shrink-0 rounded-2xl bg-lime-400 px-7 py-4 text-center font-black uppercase tracking-[0.12em] text-black transition hover:bg-lime-300">Ver las travesías</Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
