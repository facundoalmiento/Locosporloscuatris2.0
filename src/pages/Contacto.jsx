const metricas = [
  { valor: "24/7", etiqueta: "modo aventura" },
  { valor: "3", etiqueta: "canales directos" },
  { valor: "1", etiqueta: "paso para sumarte" }
]

const canales = [
  { titulo: "WhatsApp", descripcion: "Coordiná la salida, consultá cupos o pedí info rápida.", dato: "+54 9 221 599 3585" },
  { titulo: "Instagram", descripcion: "Seguinos para ver travesías, fotos y novedades del grupo.", dato: "@locosporloscuatris" },
  { titulo: "Ubicación", descripcion: "Base operativa y punto de encuentro según cada salida.", dato: "Buenos Aires, Argentina" }
]

const whatsappMensaje =
  "Hola! Quiero consultar por las travesías de Locos por los Cuatris.";

const whatsappUrl =
  `https://wa.me/5492215993585?text=${encodeURIComponent(whatsappMensaje)}`;

export default function Contacto() {
  return (
    <div className="page-shell">
      <div className="page-container">
        <div className="hero-stage">
          <section className="hero-panel">
          <div>
            <p className="hero-eyebrow">Contacto</p>
            <h1 className="hero-title">Si querés sumarte, no dudes en escribirnos.</h1>
            <p className="hero-copy">Consultas por travesías, equipo, próximas salidas o reservas.</p>
            <div className="action-row">
              <a href="#formulario" className="primary-action">Escribir mensaje</a>
              <a href={whatsappUrl} target="_blank" rel="noreferrer" className="secondary-action">Abrir WhatsApp</a>
            </div>
          </div>
          <div className="metric-grid">
            {metricas.map((metrica) => (
              <div key={metrica.etiqueta} className="metric-card">
                <div className="metric-value">{metrica.valor}</div>
                <div className="metric-label">{metrica.etiqueta}</div>
              </div>
            ))}
          </div>
          </section>
        </div>

        <div className="landing-section-with-nav">
          <section className="feature-card w-full">
            <div className="grid lg:grid-cols-[1.15fr_0.85fr] xl:grid-cols-[1.25fr_0.75fr]">
            <div className="feature-media">
              <img src="/galeria/pinamar-2025/utv.jpg" alt="Contacto Locos por los Cuatris" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/25 to-transparent" />
            </div>
            <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
              <p className="text-sm font-bold uppercase tracking-[0.35em] text-lime-400">Primer contacto</p>
              <h2 className="mt-4 text-3xl font-black uppercase leading-none sm:text-4xl">Reservá, consultá o preparate para tu próxima salida.</h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-300">Desde acá podés dejarnos un mensaje y seguir por el canal que más te sirva.</p>
            </div>
            </div>
          </section>
        </div>

        <section className="grid min-h-[calc(100svh-7rem)] items-center gap-6 py-10 sm:py-14 lg:grid-cols-[0.9fr_1.1fr] xl:gap-10 xl:grid-cols-[0.82fr_1.18fr]">
          <article className="rounded-[1.35rem] border border-white/10 bg-white/[0.04] p-5 sm:rounded-[2rem] sm:p-8">
            <div className="mb-6">
              <p className="text-sm font-bold uppercase tracking-[0.35em] text-lime-400">Canales</p>
              <h2 className="mt-3 text-2xl font-black uppercase sm:text-3xl">Elegí cómo querés hablar</h2>
            </div>
            <div className="space-y-4">
              {canales.map((canal) => (
                <div key={canal.titulo} className="rounded-[1.25rem] border border-white/10 bg-black/35 p-5 sm:rounded-[1.5rem]">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-lime-400">{canal.titulo}</p>
                  <h3 className="mt-3 break-words text-lg font-black uppercase text-white sm:text-xl">{canal.dato}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-400">{canal.descripcion}</p>
                </div>
              ))}
            </div>
          </article>
          <article id="formulario" className="rounded-[1.35rem] border border-white/10 bg-black/40 p-5 sm:rounded-[2rem] sm:p-8">
            <div className="mb-6">
              <p className="text-sm font-bold uppercase tracking-[0.35em] text-lime-400">Formulario</p>
              <h2 className="mt-3 text-2xl font-black uppercase sm:text-3xl">Contanos qué necesitás</h2>
            </div>
            <form className="space-y-5">
              <div>
                <label className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-400">Nombre</label>
                <input type="text" placeholder="Tu nombre" className="mt-2 w-full rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-white transition focus:border-lime-400 focus:outline-none" />
              </div>
              <div>
                <label className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-400">Email</label>
                <input type="email" placeholder="tu@email.com" className="mt-2 w-full rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-white transition focus:border-lime-400 focus:outline-none" />
              </div>
              <div>
                <label className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-400">Mensaje</label>
                <textarea rows="5" placeholder="Contanos qué travesía te interesa, si querés reservar o si necesitás info de equipo." className="mt-2 w-full rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-white transition focus:border-lime-400 focus:outline-none" />
              </div>
              <button type="submit" className="w-full rounded-2xl bg-lime-400 py-3 font-bold text-black transition hover:bg-lime-300">Enviar mensaje</button>
            </form>
          </article>
        </section>
      </div>
    </div>
  )
}
