import { useState } from "react"
import { Link } from "react-router-dom"

import { siteConfig } from "../config/site"

export default function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false)

  const links = [
    { to: "/travesias", label: "Travesías" },
    ...(siteConfig.mostrarTienda ? [{ to: "/tienda", label: "Tienda" }] : []),
    { to: "/sponsors", label: "Sponsors" },
    { to: "/galeria", label: "Galería" },
    ...(siteConfig.mostrarHistoria ? [{ to: "/historia", label: "Nuestra Historia" }] : []),
    { to: "/contacto", label: "Contacto" }
  ]

  return (
    <nav className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-black/65 text-white backdrop-blur-md">
      <div className="mx-auto flex max-w-[96rem] items-center justify-between px-4 py-3 sm:px-6 sm:py-4 lg:px-10 xl:px-14 2xl:px-20">
        <Link
          to="/"
          className="shrink-0 text-xl font-bold sm:text-2xl"
          onClick={() => setMenuAbierto(false)}
        >
          LPLC<span className="text-lime-400">2.0</span>
        </Link>

        <div className="hidden items-center gap-6 text-sm font-semibold uppercase tracking-wide md:flex lg:gap-10">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="transition hover:text-lime-400"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/contacto#whatsapp"
            className="hidden rounded-lg bg-lime-500 px-4 py-2 text-sm font-bold text-black transition hover:bg-lime-400 sm:inline-flex"
            onClick={() => setMenuAbierto(false)}
          >
            Reservar
          </Link>

          <button
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-md border border-white/10 bg-white/[0.03] md:hidden"
            onClick={() => setMenuAbierto(!menuAbierto)}
            aria-label="Abrir menú"
          >
            <span
              className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
                menuAbierto ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
                menuAbierto ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
                menuAbierto ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 md:hidden ${
          menuAbierto ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="flex max-h-[calc(100svh-4rem)] flex-col gap-4 overflow-y-auto border-t border-white/10 px-4 pb-6 pt-4 text-sm font-semibold uppercase tracking-wide">
          <Link
            to="/contacto#whatsapp"
            className="rounded-lg bg-lime-500 px-4 py-3 text-center font-bold text-black transition hover:bg-lime-400"
            onClick={() => setMenuAbierto(false)}
          >
            Reservar
          </Link>

          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="transition hover:text-lime-400"
              onClick={() => setMenuAbierto(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
