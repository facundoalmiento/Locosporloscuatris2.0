import { useEffect, useState } from "react"

import dialogoCorto from "../assets/dialogocorto.png"
import mascotaRiendo from "../assets/mascotariendose.png"

const MENSAJE_DIALOGO = "¿Le pediste permiso a tu jermu?"

export default function MascotaRiendoContacto() {
  const [mostrarMascota, setMostrarMascota] = useState(false)
  const [mostrarDialogo, setMostrarDialogo] = useState(false)

  useEffect(() => {
    const mascotaEntradaTimer = window.setTimeout(
      () => setMostrarMascota(true),
      1000
    )
    const dialogoEntradaTimer = window.setTimeout(
      () => setMostrarDialogo(true),
      2000
    )
    const dialogoSalidaTimer = window.setTimeout(
      () => setMostrarDialogo(false),
      6500
    )
    const mascotaSalidaTimer = window.setTimeout(
      () => setMostrarMascota(false),
      8500
    )

    return () => {
      window.clearTimeout(mascotaEntradaTimer)
      window.clearTimeout(dialogoEntradaTimer)
      window.clearTimeout(dialogoSalidaTimer)
      window.clearTimeout(mascotaSalidaTimer)
    }
  }, [])

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed left-1/2 w-[min(72vw,19rem)] lg:hidden"
        style={{
          bottom: "-81px",
          // AJUSTE MOBILE: efecto pausado para ubicar la mascota manualmente.
          // opacity: mostrarMascota ? 1 : 0,
          // transform: mostrarMascota
          //   ? "translate(-32%, 0)"
          //   : "translate(-32%, 110%)",
          // transition:
          //   "opacity 320ms ease, transform 1100ms cubic-bezier(0.22, 1, 0.36, 1)",
          opacity: 1,
          transform: "translate(-32%, 0)",
          filter: "drop-shadow(0 -10px 24px rgba(0,0,0,0.38))",
          zIndex: 9999,
        }}
      >
        <div
          className="mascota-riendo-mobile-group relative w-full"
          style={{ animation: "mascotaRiendoMobileIdle 5s ease-in-out infinite" }}
        >
          <div
            className="absolute"
            style={{
              right: "65%",
              bottom: "65%",
              width: "60%",
              // AJUSTE MOBILE: efecto pausado para ubicar el bocadillo manualmente.
              // opacity: mostrarDialogo ? 1 : 0,
              // transform: mostrarDialogo
              //   ? "translate(0, 0) scale(1)"
              //   : "translate(12%, 15%) scale(0.82)",
              opacity: 1,
              transform: "translate(0, 0) scale(1)",
              transformOrigin: "bottom right",
              // transition:
              //   "opacity 420ms ease, transform 620ms cubic-bezier(0.22, 1, 0.36, 1)",
              filter: "drop-shadow(0 10px 18px rgba(0,0,0,0.28))",
              zIndex: 1,
            }}
          >
            <img
              src={dialogoCorto}
              alt=""
              className="h-auto w-full select-none"
              draggable="false"
            />
            <p
              className="absolute m-0 flex items-center justify-center text-center font-black leading-[1.08] text-[#111]"
              style={{
                left: "14%",
                top: "14%",
                width: "72%",
                height: "54%",
                fontSize: "clamp(0.58rem, 2.7vw, 0.72rem)",
              }}
            >
              {MENSAJE_DIALOGO}
            </p>
          </div>

          <img
            src={mascotaRiendo}
            alt=""
            className="h-auto w-full select-none"
            draggable="false"
          />
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none fixed hidden lg:block"
        style={{
          bottom: "-74px",
          right: "clamp(8px, 1.5vw, 22px)",
          width: "clamp(255px, 26vw, 445px)",
          opacity: mostrarMascota ? 1 : 0,
          transform: mostrarMascota
            ? "translateY(0) scale(1)"
            : "translateY(32%) scale(0.88)",
          transformOrigin: "bottom right",
          transition:
            "opacity 320ms ease, transform 800ms cubic-bezier(0.22, 1, 0.36, 1)",
          filter: "drop-shadow(-8px 8px 18px rgba(0,0,0,0.34))",
          zIndex: 9999,
        }}
      >
        <div
          className="absolute"
          style={{
            right: "67%",
            bottom: "67%",
            width: "80%",
            opacity: mostrarDialogo ? 1 : 0,
            transform: mostrarDialogo
              ? "translate(0, 0) scale(1)"
              : "translate(12%, 15%) scale(0.82)",
            transformOrigin: "bottom right",
            transition:
              "opacity 420ms ease, transform 620ms cubic-bezier(0.22, 1, 0.36, 1)",
            filter: "drop-shadow(0 12px 22px rgba(0,0,0,0.3))",
            zIndex: 1,
          }}
        >
          <img
            src={dialogoCorto}
            alt=""
            className="h-auto w-full select-none"
            draggable="false"
          />
          <p
            className="absolute m-0 flex items-center justify-center text-center font-black leading-[1.08] text-[#111]"
            style={{
              left: "14%",
              top: "14%",
              width: "72%",
              height: "54%",
              fontSize: "clamp(0.78rem, 3vw, 1rem)",
            }}
          >
            {MENSAJE_DIALOGO}
          </p>
        </div>

        <img
          src={mascotaRiendo}
          alt=""
          className="h-auto w-full select-none"
          draggable="false"
        />
      </div>

      <style>{`
        @keyframes mascotaRiendoMobileIdle {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(1px) rotate(-0.2deg); }
        }

        @media (prefers-reduced-motion: reduce) {
          .mascota-riendo-mobile-group {
            animation: none !important;
          }
        }
      `}</style>
    </>
  )
}
