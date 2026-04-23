import { useState } from "react"

import LoadingWheel from "./LoadingWheel"

export default function LazyImage({
  src,
  alt,
  className = "",
  wrapperClassName = "",
  spinnerLabel = "",
  spinnerSize = "sm",
  ...props
}) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  return (
    <div className={`relative overflow-hidden ${wrapperClassName}`}>
      {!loaded && !error ? (
        <LoadingWheel
          overlay
          label={spinnerLabel}
          size={spinnerSize}
          className="bg-zinc-950/90"
        />
      ) : null}

      <img
        src={src}
        alt={alt}
        className={`${className} transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => {
          setError(true)
          setLoaded(true)
        }}
        {...props}
      />
    </div>
  )
}
