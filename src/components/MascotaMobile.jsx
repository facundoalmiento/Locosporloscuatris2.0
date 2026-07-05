import { useEffect, useState } from "react"

import dialogoMobile from "../assets/dialogomobile.png"
import rataMobile from "../assets/ratamobile.png"

const MENSAJE_DIALOGO = "Te estoy viendo... RESERVA."

export default function MascotaMobile() {
  const [visible, setVisible] = useState(false)
  const [showDialogo, setShowDialogo] = useState(false)
  const [textoVisible, setTextoVisible] = useState("")
  const esIOS = /iPad|iPhone|iPod/.test(window.navigator.userAgent)

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setVisible(true))
    const showTimer = window.setTimeout(() => setShowDialogo(true), 2000)

    const ocultar = () => {
      setVisible(false)
      setShowDialogo(false)
      setTextoVisible("")
      window.clearTimeout(showTimer)
      window.clearTimeout(bubbleHideTimer)
      window.clearTimeout(hideTimer)
    }
    const bubbleHideTimer = window.setTimeout(() => {
      setShowDialogo(false)
      setTextoVisible("")
    }, 4500)
    const hideTimer = window.setTimeout(ocultar, 6500)
    window.addEventListener("pointerdown", ocultar, {
      once: true,
      passive: true,
    })

    return () => {
      window.cancelAnimationFrame(frame)
      window.clearTimeout(showTimer)
      window.clearTimeout(bubbleHideTimer)
      window.clearTimeout(hideTimer)
      window.removeEventListener("pointerdown", ocultar)
    }
  }, [])

  useEffect(() => {
    if (!showDialogo) return undefined

    let indice = 0
    const typeTimer = window.setInterval(() => {
      indice += 1
      setTextoVisible(MENSAJE_DIALOGO.slice(0, indice))

      if (indice >= MENSAJE_DIALOGO.length) {
        window.clearInterval(typeTimer)
      }
    }, 55)

    return () => window.clearInterval(typeTimer)
  }, [showDialogo])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed left-1/2 z-40 w-[min(84vw,22rem)] md:hidden"
      style={{
        bottom: esIOS ? "0px" : "1px",
        transform: visible ? "translate(-50%, 0)" : "translate(-50%, 110%)",
        transition: "transform 1100ms cubic-bezier(0.22, 1, 0.36, 1)",
        filter: "drop-shadow(0 -10px 24px rgba(0, 0, 0, 0.38))",
      }}
    >
      <div className="relative w-full">
        <div
          className="absolute"
          style={{
            right: "42%",
            bottom: "52%",
            width: "50%",
            opacity: showDialogo ? 1 : 0,
            transform: showDialogo
              ? "translate(0, 0) scale(1)"
              : "translate(12%, 15%) scale(0.82)",
            transformOrigin: "bottom right",
            transition:
              "opacity 420ms ease, transform 620ms cubic-bezier(0.22, 1, 0.36, 1)",
            filter: "drop-shadow(0 10px 18px rgba(0, 0, 0, 0.28))",
          }}
        >
          <img
            src={dialogoMobile}
            alt=""
            className="h-auto w-full select-none"
            draggable="false"
          />
          <p
            className="absolute m-0 flex items-center justify-center text-center font-black uppercase leading-[1.08] text-[#111]"
            style={{
              left: "15%",
              top: "13%",
              width: "70%",
              height: "60%",
              fontSize: "clamp(0.62rem, 3.5vw, 0.73rem)",
            }}
          >
            {textoVisible}
            {textoVisible.length < MENSAJE_DIALOGO.length && (
              <span className="dialogo-mobile-caret">|</span>
            )}
          </p>
        </div>

        <img
          src={rataMobile}
          alt=""
          className="h-auto w-full select-none"
          draggable="false"
        />
      </div>

      <style>{`
        .dialogo-mobile-caret {
          animation: dialogoMobileCaret 0.7s steps(1) infinite;
        }

        @keyframes dialogoMobileCaret {
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  )
}
