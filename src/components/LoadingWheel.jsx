export default function LoadingWheel({
  label = "Cargando aventura...",
  size = "base",
  overlay = false,
  className = ""
}) {
  const sizeClasses = size === "sm"
    ? "h-20 w-20 sm:h-24 sm:w-24"
    : "h-44 w-44 sm:h-56 sm:w-56"

  return (
    <div
      className={`${overlay ? "absolute inset-0" : "min-h-[12rem] w-full"} flex items-center justify-center ${className}`}
    >
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="relative flex items-center justify-center">
          <div className="absolute h-[155%] w-[155%] rounded-full bg-lime-400/25 blur-3xl" />
          <img
            src="/loader-wheel.png"
            alt="Rueda cargando"
            className={`${sizeClasses} relative select-none object-contain drop-shadow-[0_0_44px_rgba(132,204,22,0.38)] animate-spin`}
            style={{ animationDuration: "1.05s" }}
            draggable="false"
          />
        </div>
        {label ? (
          <p className="text-sm font-bold uppercase tracking-[0.45em] text-zinc-200 sm:text-base">
            {label}
          </p>
        ) : null}
      </div>
    </div>
  )
}
