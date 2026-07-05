import { useEffect, useState } from "react"

import rataMobile from "../assets/ratamobile.png"

const BORDES = ["top", "left", "right"]

function numeroAleatorio(minimo, maximo) {
  return Math.round(Math.random() * (maximo - minimo) + minimo)
}

function nuevaAparicion(bordeAnterior) {
  const bordesDisponibles = BORDES.filter((borde) => borde !== bordeAnterior)
  const borde =
    bordesDisponibles[numeroAleatorio(0, bordesDisponibles.length - 1)]

  return {
    borde,
    posicion:
      borde === "top"
        ? numeroAleatorio(20, 80)
        : numeroAleatorio(38, 62),
  }
}

export default function MascotaDesktopApariciones() {
  const [aparicion, setAparicion] = useState({
    borde: "top",
    posicion: 50,
  })
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const esDesktop = window.matchMedia("(min-width: 768px)")
    const reduceMovimiento = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    )

    if (!esDesktop.matches || reduceMovimiento.matches) return undefined

    let timer
    let frame
    let bordeAnterior = ""
    let desmontado = false

    function mostrar() {
      if (desmontado) return

      const siguiente = nuevaAparicion(bordeAnterior)
      bordeAnterior = siguiente.borde
      setAparicion(siguiente)

      frame = window.requestAnimationFrame(() => {
        frame = window.requestAnimationFrame(() => setVisible(true))
      })

      timer = window.setTimeout(() => {
        setVisible(false)
        timer = window.setTimeout(mostrar, numeroAleatorio(5000, 9500))
      }, numeroAleatorio(1800, 2600))
    }

    timer = window.setTimeout(mostrar, numeroAleatorio(1800, 3800))

    return () => {
      desmontado = true
      window.clearTimeout(timer)
      window.cancelAnimationFrame(frame)
    }
  }, [])

  const esSuperior = aparicion.borde === "top"
  const esIzquierdo = aparicion.borde === "left"

  return (
    <div
      key={`${aparicion.borde}-${aparicion.posicion}`}
      aria-hidden="true"
      className="pointer-events-none fixed z-40 hidden md:block"
      style={{
        zIndex: esSuperior ? 70 : 40,
        ...(esSuperior
          ? {
              left: `${aparicion.posicion}%`,
              top: 0,
              width: "clamp(19rem, 22vw, 24rem)",
              transform: visible
                ? "translate(-50%, 0)"
                : "translate(-50%, -110%)",
            }
          : {
              [esIzquierdo ? "left" : "right"]: 0,
              top: `${aparicion.posicion}%`,
              width: "clamp(9.5rem, 11vw, 12rem)",
              height: "clamp(19rem, 22vw, 24rem)",
              transform: visible
                ? "translate(0, -50%)"
                : `translate(${esIzquierdo ? "-110%" : "110%"}, -50%)`,
            }),
        transition: "transform 950ms cubic-bezier(0.22, 1, 0.36, 1)",
        filter: "drop-shadow(0 10px 24px rgba(0, 0, 0, 0.4))",
      }}
    >
      <img
        src={rataMobile}
        alt=""
        className={
          esSuperior
            ? "h-auto w-full rotate-180 select-none"
            : `absolute left-1/2 top-1/2 h-auto w-[200%] max-w-none -translate-x-1/2 -translate-y-1/2 select-none ${
                esIzquierdo ? "rotate-90" : "-rotate-90"
              }`
        }
        draggable="false"
      />
    </div>
  )
}
