import { Link } from "react-router-dom"

import { siteConfig } from "../config/site"

export default function Footer() {
  const year = new Date().getFullYear()
  const links = [
    { to: "/travesias", label: "Travesías" },
    ...(siteConfig.mostrarTienda ? [{ to: "/tienda", label: "Tienda" }] : []),
    { to: "/galeria", label: "Galería" },
    ...(siteConfig.mostrarHistoria ? [{ to: "/historia", label: "Nuestra Historia" }] : []),
    { to: "/contacto", label: "Contacto" }
  ]

  return (
    <footer className="border-t border-white/10 bg-[linear-gradient(180deg,#080808_0%,#020202_100%)] px-4 py-10 text-white sm:px-6 lg:px-10 xl:px-14 2xl:px-20">
      <div className="mx-auto grid max-w-[96rem] gap-8 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <Link to="/" className="inline-flex text-2xl font-black tracking-tight">
            LPLC<span className="text-lime-400">2.0</span>
          </Link>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-400">
            Travesías off-road, arena, barro y experiencias en grupo.
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-5 gap-y-3 text-xs font-bold uppercase tracking-[0.2em] text-zinc-300 md:justify-end">
          {links.map((link) => (
            <Link key={link.to} to={link.to} className="transition hover:text-lime-300">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="mx-auto mt-8 flex max-w-[96rem] flex-col gap-3 border-t border-white/10 pt-6 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
        <p>© {year} LPLC 2.0. Todos los derechos reservados.</p>
        <p>Diseño y desarrollo web por Facundo.</p>
      </div>
    </footer>
  )
}
