const metricas = [
  { valor: "24/7", etiqueta: "modo aventura" },
  { valor: "3", etiqueta: "canales directos" },
  { valor: "1", etiqueta: "paso para sumarte" }
]

const canales = [
  { titulo: "WhatsApp", descripcion: "Coordina la salida, consulta cupos o pedi info rapida.", dato: "+54 9 221 XXX XXXX" },
  { titulo: "Instagram", descripcion: "Seguinos para ver travesias, fotos y novedades del grupo.", dato: "@locosporloscuatris" },
  { titulo: "Ubicacion", descripcion: "Base operativa y punto de encuentro segun cada salida.", dato: "Buenos Aires, Argentina" }
]

export default function Contacto() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(132,204,22,0.16),transparent_26%),linear-gradient(180deg,#050505_0%,#0b0b0b_46%,#111827_100%)] px-4 pt-28 text-white sm:px-6 sm:pt-32">
      <div className="mx-auto max-w-7xl">
        <section className="mb-12 grid gap-8 rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_30px_120px_rgba(0,0,0,0.35)] backdrop-blur-sm sm:mb-16 sm:p-8 lg:grid-cols-[1.2fr_0.8fr] lg:p-12">
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.45em] text-lime-400">Contacto</p>
            <h1 className="max-w-4xl text-4xl font-black uppercase leading-none tracking-tight sm:text-5xl md:text-7xl">Si queres sumarte, no dudes en escribirnos.</h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-300 md:text-lg">Consultas por travesias, equipo, proximas salidas o reservas. La idea fue llevar esta pagina al mismo tono del resto: mas clara, mas fuerte y mas util.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
              <a href="#formulario" className="rounded-2xl bg-lime-400 px-6 py-3 text-center font-bold text-black transition hover:bg-lime-300 sm:px-7">Escribir mensaje</a>
              <a href="https://wa.me/" target="_blank" rel="noreferrer" className="rounded-2xl border border-white/20 px-6 py-3 text-center font-semibold text-white transition hover:border-lime-400 hover:text-lime-300 sm:px-7">Abrir WhatsApp</a>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {metricas.map((metrica) => (
              <div key={metrica.etiqueta} className="rounded-3xl border border-white/10 bg-black/30 p-6">
                <div className="text-4xl font-black text-lime-400">{metrica.valor}</div>
                <div className="mt-2 text-sm uppercase tracking-[0.25em] text-zinc-400">{metrica.etiqueta}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10 overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            <div className="relative min-h-[16rem] sm:min-h-[22rem]">
              <img src="/galeria/pinamar-2025/utv.jpg" alt="Contacto Locos por los Cuatris" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/25 to-transparent" />
            </div>
            <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
              <p className="text-sm font-bold uppercase tracking-[0.35em] text-lime-400">Primer contacto</p>
              <h2 className="mt-4 text-3xl font-black uppercase leading-none sm:text-4xl">Reserva, consulta o arma tu proxima salida.</h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-300">Desde aca podes dejar un mensaje y seguir por el canal que mas te sirva. La experiencia empieza antes del primer kilometro.</p>
            </div>
          </div>
        </section>

        <section className="grid gap-6 pb-20 lg:grid-cols-[0.95fr_1.05fr]">
          <article className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
            <div className="mb-6">
              <p className="text-sm font-bold uppercase tracking-[0.35em] text-lime-400">Canales</p>
              <h2 className="mt-3 text-2xl font-black uppercase sm:text-3xl">Elegi como queres hablar</h2>
            </div>
            <div className="space-y-4">
              {canales.map((canal) => (
                <div key={canal.titulo} className="rounded-[1.5rem] border border-white/10 bg-black/35 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-lime-400">{canal.titulo}</p>
                  <h3 className="mt-3 break-words text-lg font-black uppercase text-white sm:text-xl">{canal.dato}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-400">{canal.descripcion}</p>
                </div>
              ))}
            </div>
          </article>
          <article id="formulario" className="rounded-[2rem] border border-white/10 bg-black/40 p-6 sm:p-8">
            <div className="mb-6">
              <p className="text-sm font-bold uppercase tracking-[0.35em] text-lime-400">Formulario</p>
              <h2 className="mt-3 text-2xl font-black uppercase sm:text-3xl">Contanos que necesitas</h2>
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
                <textarea rows="5" placeholder="Contanos que travesia te interesa, si queres reservar o si necesitas info de equipo." className="mt-2 w-full rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-white transition focus:border-lime-400 focus:outline-none" />
              </div>
              <button type="submit" className="w-full rounded-2xl bg-lime-400 py-3 font-bold text-black transition hover:bg-lime-300">Enviar mensaje</button>
            </form>
          </article>
        </section>
      </div>
    </div>
  )
}
