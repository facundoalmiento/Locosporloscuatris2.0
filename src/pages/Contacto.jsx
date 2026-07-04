import { useEffect } from "react"
import { useLocation } from "react-router-dom"

import MascotaRiendoContacto from "../components/MascotaRiendoContacto"
import { siteConfig } from "../config/site"

const metricas = [
  { valor: "24/7", etiqueta: "modo aventura" },
  { valor: "3", etiqueta: "canales directos" },
  { valor: "1", etiqueta: "paso para sumarte" }
]

const canales = [
  { titulo: "WhatsApp", descripcion: "Coordiná la salida, consultá cupos o pedí info rápida.", dato: "+54 9 221 681 7816" },
  { titulo: "Instagram", descripcion: "Seguinos para ver travesías, fotos y novedades del grupo.", dato: "@locosporloscuatris" },
  { titulo: "Ubicación", descripcion: "Base operativa y punto de encuentro según cada salida.", dato: "Buenos Aires, Argentina" }
]

const whatsappMensaje =
  "Hola! Quiero consultar por las travesías de Locos por los Cuatris.";

const whatsappUrl =
  `https://wa.me/${siteConfig.whatsappNumero}?text=${encodeURIComponent(whatsappMensaje)}`;

export default function Contacto() {
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) return

    const target = document.getElementById(location.hash.replace("#", ""))
    if (!target) return

    window.requestAnimationFrame(() => {
      target.scrollIntoView({ block: "start" })
    })
  }, [location.hash])

  function scrollToSection(id) {
    document.getElementById(id)?.scrollIntoView({ block: "start", behavior: "smooth" })
  }

  return (
    <div className="page-shell">
      <MascotaRiendoContacto />

      <div className="page-container">
        <div className="hero-stage">
          <section className="hero-panel">
            <div>
              <p className="hero-eyebrow">Contacto</p>
              <h1 className="hero-title">Si querés sumarte, no dudes en escribirnos.</h1>
              <p className="hero-copy">Consultas por travesías, equipo, próximas salidas o reservas.</p>
              <div className="action-row">
                <a href={whatsappUrl} target="_blank" rel="noreferrer" className="primary-action">Abrir WhatsApp</a>
                <button type="button" onClick={() => scrollToSection("canales")} className="secondary-action">Ver canales</button>
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

        <div className="py-8 sm:py-10 lg:py-12">
          <section className="feature-card mx-auto w-full max-w-6xl">
            <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
              <div className="relative h-[15rem] overflow-hidden bg-zinc-950 sm:h-[18rem] lg:h-[20rem]">
                <img src="/galeria/preparate.jpg" alt="Contacto Locos por los Cuatris" className="h-full w-full object-cover object-[center_40%]" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-transparent to-black/20" />
              </div>
              <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                <p className="text-sm font-bold uppercase tracking-[0.35em] text-lime-400">Primer contacto</p>
                <h2 className="mt-4 text-3xl font-black uppercase leading-none sm:text-4xl">Reservá, consultá o preparate para tu próxima salida.</h2>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-300">
                  Desde acá podés escribirnos por WhatsApp, seguirnos en Instagram o revisar el punto de encuentro de cada salida.
                </p>
              </div>
            </div>
          </section>
        </div>

        <section id="canales" className="scroll-mt-32 grid items-stretch gap-6 py-10 sm:py-14 lg:grid-cols-[0.9fr_1.1fr] xl:gap-10 xl:grid-cols-[0.82fr_1.18fr]">
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

          <article id="whatsapp" className="scroll-mt-[0rem] flex flex-col justify-between rounded-[1.35rem] border border-lime-400/20 bg-lime-400/[0.07] p-5 sm:rounded-[2rem] sm:p-8">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.35em] text-lime-400">Respuesta directa</p>
              <h2 className="mt-3 text-2xl font-black uppercase sm:text-3xl">La forma más rápida es escribirnos por WhatsApp.</h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-300">
                Contanos qué travesía te interesa, cuántas personas son y si ya tienen experiencia. Con eso te orientamos mejor y seguimos la charla por el canal directo.
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a href={whatsappUrl} target="_blank" rel="noreferrer" className="rounded-2xl bg-lime-400 px-6 py-3 text-center font-bold text-black transition hover:bg-lime-300">Escribir por WhatsApp</a>
              <a href="https://www.instagram.com/locosporloscuatris" target="_blank" rel="noreferrer" className="rounded-2xl border border-white/20 px-6 py-3 text-center font-semibold text-white transition hover:border-lime-400 hover:text-lime-300">Ver Instagram</a>
            </div>
          </article>
        </section>
      </div>
    </div>
  )
}
