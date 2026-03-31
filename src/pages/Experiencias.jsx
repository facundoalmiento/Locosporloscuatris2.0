import { Link } from "react-router-dom"

import { travesias } from "../data/travesias"

const tipos = [
  { id: "arena", titulo: "Arena", subtitulo: "Velocidad, dunas y maniobra fina", descripcion: "Medanos abiertos, cambios de ritmo y una conduccion que mezcla adrenalina con control total.", destacado: "Ideal para arrancar fuerte", color: "from-amber-300 via-orange-400 to-orange-600" },
  { id: "barro", titulo: "Barro", subtitulo: "Traccion, tecnica y caos del bueno", descripcion: "Huella pesada, salpicaduras y terreno vivo. Aca no gana el mas rapido: gana el que mejor lee el piso.", destacado: "La mas intensa del circuito", color: "from-stone-300 via-lime-400 to-lime-600" },
  { id: "nieve", titulo: "Nieve", subtitulo: "Frio, montana y paisaje bruto", descripcion: "Travesias mas exigentes, con clima extremo y una sensacion de aventura total en cada tramo.", destacado: "La experiencia mas salvaje", color: "from-sky-200 via-cyan-300 to-blue-500" },
  { id: "solidaria", titulo: "Solidaria", subtitulo: "Camino, comunidad y proposito", descripcion: "Salidas con espiritu de grupo, recorrido largo y una energia distinta que mezcla aventura con encuentro.", destacado: "Para vivirla con el equipo", color: "from-lime-200 via-lime-400 to-emerald-500" }
]

const metricas = [
  { valor: "+5", etiqueta: "recorridos activos" },
  { valor: "4", etiqueta: "terrenos distintos" },
  { valor: "100%", etiqueta: "modo off-road" }
]

export default function Experiencias() {
  const tiposConPortada = tipos.map((tipo) => {
    const relacionadas = travesias.filter((travesia) => travesia.tipo === tipo.id)
    return { ...tipo, cantidad: relacionadas.length, portada: relacionadas[0]?.portada ?? "/galeria/rata.png", travesiaDestacada: relacionadas[0] }
  })

  const destacadas = travesias.slice(0, 3)

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(132,204,22,0.16),transparent_26%),linear-gradient(180deg,#050505_0%,#0b0b0b_46%,#111827_100%)] px-4 pt-28 text-white sm:px-6 sm:pt-32">
      <div className="mx-auto max-w-7xl">
        <section className="mb-12 grid gap-8 rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_30px_120px_rgba(0,0,0,0.35)] backdrop-blur-sm sm:mb-16 sm:p-8 lg:grid-cols-[1.3fr_0.7fr] lg:p-12">
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.45em] text-lime-400">Travesias</p>
            <h1 className="max-w-4xl text-4xl font-black uppercase leading-none tracking-tight sm:text-5xl md:text-7xl">Elegi terreno. El resto lo hace la aventura.</h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-300 md:text-lg">No vendemos un paseo. Armamos salidas con caracter, paisaje y una identidad distinta segun el terreno.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
              <Link to="/galeria" className="rounded-2xl bg-lime-400 px-6 py-3 text-center font-bold text-black transition hover:bg-lime-300 sm:px-7">Ver galerias</Link>
              <Link to="/contacto" className="rounded-2xl border border-white/20 px-6 py-3 text-center font-semibold text-white transition hover:border-lime-400 hover:text-lime-300 sm:px-7">Consultar proxima salida</Link>
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

        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {tiposConPortada.map((tipo) => (
            <article key={tipo.id} className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950">
              <div className="absolute inset-0 bg-cover bg-center opacity-60 transition duration-700 group-hover:scale-110" style={{ backgroundImage: `url(${tipo.portada})` }} />
              <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/45 to-black/90" />
              <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${tipo.color}`} />
              <div className="relative z-10 flex min-h-[24rem] flex-col justify-between p-6 sm:min-h-[26rem] sm:p-7">
                <div>
                  <div className="inline-flex rounded-full border border-white/15 bg-white/8 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-zinc-100">{tipo.destacado}</div>
                  <h2 className="mt-5 text-3xl font-black uppercase leading-none sm:text-4xl">{tipo.titulo}</h2>
                  <p className="mt-3 text-sm font-semibold uppercase tracking-[0.28em] text-lime-300">{tipo.subtitulo}</p>
                  <p className="mt-5 text-sm leading-relaxed text-zinc-200">{tipo.descripcion}</p>
                </div>
                <div>
                  <div className="mb-4 flex flex-col gap-2 border-t border-white/10 pt-5 text-sm text-zinc-300 sm:flex-row sm:items-center sm:justify-between">
                    <span>{tipo.cantidad} albumes disponibles</span>
                    <span className="font-semibold text-white">{tipo.travesiaDestacada?.fecha ?? "Proximamente"}</span>
                  </div>
                  <Link to="/galeria" className="inline-flex rounded-2xl bg-white px-5 py-3 font-bold text-black transition hover:bg-lime-300">Explorar {tipo.titulo}</Link>
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="mt-16 pb-20 sm:mt-20">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.35em] text-lime-400">Destacadas</p>
              <h2 className="mt-3 text-2xl font-black uppercase sm:text-3xl md:text-4xl">Algunas salidas que marcan el tono</h2>
            </div>
            <Link to="/galeria" className="text-sm font-semibold uppercase tracking-[0.25em] text-zinc-300 transition hover:text-lime-300">Ver todo</Link>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {destacadas.map((travesia) => (
              <Link key={travesia.id} to={`/galeria/${travesia.id}`} className="group overflow-hidden rounded-[1.75rem] border border-white/10 bg-black/40">
                <div className="h-64 overflow-hidden">
                  <img src={travesia.portada} alt={travesia.titulo} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                </div>
                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-lime-400">{travesia.fecha}</p>
                  <h3 className="mt-3 text-xl font-black uppercase text-white sm:text-2xl">{travesia.titulo}</h3>
                  <p className="mt-4 text-sm text-zinc-400">Entra a ver la cobertura completa y abre cada foto en grande.</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
