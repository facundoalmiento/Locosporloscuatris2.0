export default function LoadingWheel({
  label = "Cargando aventura...",
  size = "base",
  overlay = false,
  className = ""
}) {
  const sizeClasses = size === "sm"
    ? "h-16 w-16 sm:h-20 sm:w-20"
    : "h-24 w-24 sm:h-28 sm:w-28"

  return (
    <div
      className={`${overlay ? "absolute inset-0" : "min-h-[12rem] w-full"} flex items-center justify-center ${className}`}
    >
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="relative flex items-center justify-center">
          <div className="absolute h-[135%] w-[135%] rounded-full bg-lime-400/20 blur-2xl" />
          <img
            src="/loader-wheel.png"
            alt="Rueda cargando"
            className={`${sizeClasses} relative select-none object-contain drop-shadow-[0_0_28px_rgba(132,204,22,0.32)] animate-spin`}
            style={{ animationDuration: "1.35s" }}
            draggable="false"
          />
        </div>
        {label ? (
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-zinc-300 sm:text-sm">
            {label}
          </p>
        ) : null}
      </div>
    </div>
  )
}
