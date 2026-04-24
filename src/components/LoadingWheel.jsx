export default function LoadingWheel({
  label = "Cargando aventura...",
  size = "base",
  overlay = false,
  className = ""
}) {
  const sizeClasses = size === "sm"
    ? "h-24 w-24 sm:h-28 sm:w-28"
  : "h-72 w-72 sm:h-[26rem] sm:w-[26rem]"

  return (
    <div
      className={`${overlay ? "absolute inset-0" : "min-h-[12rem] w-full"} flex items-center justify-center ${className}`}
    >
      <div className="flex flex-col items-center gap-0 px-6 text-center">
        <div className="loader-wheel-shell relative flex items-center justify-center">
          <div className="loader-wheel-glow absolute h-[160%] w-[160%] rounded-full bg-lime-400/30 blur-3xl" />
          <img
            src="/loader-wheel.png"
            alt="Rueda cargando"
            className={`loader-wheel-image ${sizeClasses} relative select-none object-contain drop-shadow-[0_0_44px_rgba(132,204,22,0.38)]`}
            draggable="false"
          />
        </div>
        {label ? (
          <p className="loader-wheel-label -mt-[4.75rem] max-w-[16rem] text-center text-sm font-bold uppercase leading-tight tracking-[0.18em] text-zinc-200 sm:-mt-[5.5rem] sm:max-w-[18rem] sm:text-base">
            {label}
          </p>
        ) : null}
      </div>
    </div>
  )
}
