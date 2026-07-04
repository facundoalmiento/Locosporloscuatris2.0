import { useState } from "react"

import ruedaFinal from "../assets/ruedafinal.png"

const LOADING_LABELS = [
  "Cargando nafta...",
  "Cargando locura…",
  "Calentando motores...",
]

let nextLabelIndex = 0

const getNextLoadingLabel = () => {
  const nextLabel = LOADING_LABELS[nextLabelIndex]
  nextLabelIndex = (nextLabelIndex + 1) % LOADING_LABELS.length
  return nextLabel
}

export default function LoadingWheel({
  label,
  size = "base",
  overlay = false,
  className = ""
}) {
  const [rotatingLabel] = useState(getNextLoadingLabel)
  const visibleLabel = label === undefined ? rotatingLabel : label

  const sizeClasses = size === "sm"
    ? "h-20 w-20 min-[420px]:h-24 min-[420px]:w-24 sm:h-28 sm:w-28"
  : "h-[min(70vw,18rem)] w-[min(70vw,18rem)] sm:h-[22rem] sm:w-[22rem] lg:h-[26rem] lg:w-[26rem]"

  return (
    <div
      className={`${overlay ? "absolute inset-0" : "min-h-[12rem] w-full"} flex items-center justify-center ${className}`}
    >
      <div className="flex max-w-full flex-col items-center gap-0 px-4 text-center sm:px-6">
        <div className="loader-wheel-shell relative flex items-center justify-center">
          <div className="loader-wheel-glow absolute h-[160%] w-[160%] rounded-full bg-lime-400/30 blur-3xl" />
          <img
            src={ruedaFinal}
            alt="Rueda cargando"
            className={`loader-wheel-image ${sizeClasses} relative select-none object-contain drop-shadow-[0_0_44px_rgba(132,204,22,0.38)]`}
            draggable="false"
          />
        </div>
        {visibleLabel ? (
          <p className="loader-wheel-label -mt-[3.6rem] max-w-[13rem] text-center text-xs font-bold uppercase leading-tight tracking-[0.16em] text-zinc-200 sm:-mt-[4.7rem] sm:max-w-[18rem] sm:text-base lg:-mt-[5.5rem]">
            {visibleLabel}
          </p>
        ) : null}
      </div>
    </div>
  )
}
