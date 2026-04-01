import { useState } from "react"
import { Link } from "react-router-dom"

import { siteConfig } from "../config/site"

export default function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false)

  const links = [
    { to: "/travesias", label: "Travesías" },
    ...(siteConfig.mostrarTienda ? [{ to: "/tienda", label: "Tienda" }] : []),
    { to: "/galeria", label: "Galería" },
    { to: "/contacto", label: "Contacto" }
  ]

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-black/50 text-white backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <Link
          to="/"
          className="text-xl font-bold sm:text-2xl"
          onClick={() => setMenuAbierto(false)}
        >
          LPLC<span className="text-lime-400">2.0</span>
        </Link>

        <div className="hidden gap-10 text-sm font-semibold uppercase tracking-wide md:flex">
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
            to="/contacto"
            className="hidden rounded-lg bg-lime-500 px-4 py-2 text-sm font-bold text-black transition hover:bg-lime-400 sm:inline-flex"
            onClick={() => setMenuAbierto(false)}
          >
            Reservar
          </Link>

          <button
            className="flex flex-col gap-1.5 rounded-md p-1 md:hidden"
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
          menuAbierto ? "max-h-80" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-4 border-t border-white/10 px-4 pt-4 pb-6 text-sm font-semibold uppercase tracking-wide">
          <Link
            to="/contacto"
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
