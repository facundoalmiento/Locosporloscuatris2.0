import { useEffect, useState } from "react"

import rataMobile from "../assets/ratamobile.png"

export default function MascotaMobile() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setVisible(true))
    return () => window.cancelAnimationFrame(frame)
  }, [])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed left-1/2 z-40 w-[min(84vw,22rem)] md:hidden"
      style={{
        bottom: "0px",
        transform: visible ? "translate(-50%, 0)" : "translate(-50%, 58%)",
        transition: "transform 1100ms cubic-bezier(0.22, 1, 0.36, 1)",
        filter: "drop-shadow(0 -10px 24px rgba(0, 0, 0, 0.38))",
      }}
    >
      <img
        src={rataMobile}
        alt=""
        className="mascota-mobile-image h-auto w-full select-none"
        draggable="false"
        style={{ animation: "mascotaMobileIdle 4.5s ease-in-out infinite" }}
      />

      <style>{`
        @keyframes mascotaMobileIdle {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(1px) rotate(-0.2deg); }
        }

        @media (prefers-reduced-motion: reduce) {
          .mascota-mobile-image {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  )
}
