import { useState } from "react"
import { Link, useLocation } from "react-router-dom"

import { siteConfig } from "../config/site"
import { useCart } from "../context/CartContext"
import { useAuth } from "../context/AuthContext"
import { useRecordatorioMantenimiento } from "../hooks/useRecordatorioMantenimiento"
import AuthControls from "./AuthControls"

export default function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false)
  const { totalItems, setAbierto } = useCart()
  const { estaLogueado } = useAuth()
  const aviso = useRecordatorioMantenimiento()
  const location = useLocation()
  const enTienda = location.pathname === "/tienda"
  // En mobile el avatar (con su puntito) vive escondido dentro del menú
  // hamburguesa, así que el aviso se marca sobre el propio botón de menú.
  const notificacionSinVerMobile = Boolean(estaLogueado && aviso && !aviso.visto)

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
          {siteConfig.mostrarTienda ? (
            <button
              type="button"
              onClick={() => setAbierto(true)}
              aria-label="Ver carrito"
              className="relative flex h-10 items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 text-sm font-semibold"
            >
              <span className="text-lg">🛒</span>
              <span className="hidden sm:inline">Ver carrito</span>
              {totalItems > 0 ? (
                <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-lime-400 px-1 text-xs font-bold text-black">
                  {totalItems}
                </span>
              ) : null}
            </button>
          ) : null}

          <AuthControls className="hidden sm:block" />

          {!enTienda ? (
            <Link
              to="/contacto#whatsapp"
              className="hidden rounded-lg bg-lime-500 px-4 py-2 text-sm font-bold text-black transition hover:bg-lime-400 sm:inline-flex"
              onClick={() => setMenuAbierto(false)}
            >
              Reservar
            </Link>
          ) : null}

          <button
            className="relative flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-md border border-white/10 bg-white/[0.03] md:hidden"
            onClick={() => setMenuAbierto(!menuAbierto)}
            aria-label="Abrir menú"
          >
            {notificacionSinVerMobile ? (
              <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-black bg-red-500" />
            ) : null}
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
          menuAbierto ? "max-h-[calc(100svh-4rem)]" : "max-h-0"
        }`}
      >
        <div className="flex max-h-[calc(100svh-4rem)] flex-col gap-4 overflow-y-auto border-t border-white/10 px-4 pb-6 pt-4 text-sm font-semibold uppercase tracking-wide">
          <AuthControls variant="inline" />

          {!enTienda ? (
            <Link
              to="/contacto#whatsapp"
              className="rounded-lg bg-lime-500 px-4 py-3 text-center font-bold text-black transition hover:bg-lime-400"
              onClick={() => setMenuAbierto(false)}
            >
              Reservar
            </Link>
          ) : null}

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
