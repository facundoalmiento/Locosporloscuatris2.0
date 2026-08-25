import { GoogleLogin } from "@react-oauth/google"
import { useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useRecordatorioMantenimiento } from "../hooks/useRecordatorioMantenimiento"
import { authFetch } from "../api/http"

// Tarjeta del aviso de mantenimiento: mismo contenido en el desplegable de
// escritorio y en el menú mobile, solo cambia el contenedor que la rodea.
function AvisoMantenimiento({ aviso, marcando, onMarcarHecho, onNavegar }) {
  return (
    <div className="rounded-xl border border-yellow-400/30 bg-yellow-400/10 p-3">
      <p className="text-xs font-bold normal-case tracking-normal text-yellow-300">
        🔧 {aviso.travesia.titulo} en {aviso.dias}d
      </p>
      {aviso.chequeoFinal ? (
        <p className="mt-1 text-xs normal-case tracking-normal text-yellow-100/80">
          🏁 Última semana: dale una revisada general al cuatriciclo (frenos, cubiertas, luces) antes de salir,
          aunque las fechas estén al día.
        </p>
      ) : null}
      <div className="mt-2 space-y-2.5">
        {aviso.grupos.map((grupo) => (
          <div key={grupo.id}>
            <Link
              to={`/mi-cuenta?vehiculo=${grupo.id}`}
              onClick={onNavegar}
              className="text-xs font-semibold normal-case tracking-normal text-yellow-200 hover:underline"
            >
              {grupo.vehiculo}
            </Link>
            <div className="mt-1 flex flex-wrap gap-1.5">
              {grupo.items.map((item) => {
                const clave = `${grupo.id}-${item.type}`
                return (
                  <button
                    key={item.type}
                    type="button"
                    disabled={marcando === clave}
                    onClick={() => onMarcarHecho(grupo.id, item.type)}
                    title={`Marcar "${item.label}" como hecho hoy`}
                    className="flex items-center gap-1 rounded-full border border-yellow-400/30 bg-black/20 px-2.5 py-1 text-[0.7rem] normal-case tracking-normal text-yellow-100/80 transition hover:border-lime-400/60 hover:text-lime-300 active:scale-95 disabled:opacity-50"
                  >
                    {item.label}
                    <span className="text-lime-400">{marcando === clave ? "…" : "✓"}</span>
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Botón "Iniciar con Google" / estado logueado: píldora con avatar (o el
// botón de Google si no hay sesión) + desplegable flotante. Es 100%
// opcional: si nadie lo toca, el sitio funciona exactamente igual que
// antes. Siempre visible en el navbar (desktop y mobile) para no obligar a
// abrir el menú hamburguesa solo para ver si hay que loguearse.
export default function AuthControls({ className = "" }) {
  const { user, token, estaLogueado, loginConGoogle, logout } = useAuth()
  const [error, setError] = useState("")
  const [menuAbierto, setMenuAbierto] = useState(false)
  const [marcando, setMarcando] = useState(null)
  const aviso = useRecordatorioMantenimiento()

  async function marcarHecho(vehiculoId, type) {
    const clave = `${vehiculoId}-${type}`
    setMarcando(clave)
    try {
      await authFetch(`/api/vehicles/${vehiculoId}/maintenance`, token, {
        method: "POST",
        body: JSON.stringify({ type, date: new Date().toISOString().slice(0, 10) }),
      })
      aviso?.refrescar()
    } catch {
      // Si falla, no pasa nada grave: el usuario puede cargarlo a mano desde "Mi cuenta".
    } finally {
      setMarcando(null)
    }
  }

  if (estaLogueado && user) {
    const notificacionSinVer = Boolean(aviso && !aviso.visto)

    return (
      <div className={`relative ${className}`}>
        <button
          type="button"
          onClick={() => {
            setMenuAbierto((v) => !v)
            aviso?.marcarVisto()
          }}
          className="relative flex h-10 items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 text-sm font-semibold"
        >
          <span className="relative flex h-6 w-6 items-center justify-center rounded-full bg-lime-400 text-xs font-bold text-black">
            {user.name?.[0]?.toUpperCase() ?? "?"}
            {notificacionSinVer ? (
              <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-black bg-red-500" />
            ) : null}
          </span>
          <span className="hidden max-w-[8rem] truncate sm:inline">{user.name}</span>
        </button>

        {menuAbierto ? (
          <>
            {/* Fondo desenfocado: separa visualmente el menú del resto de la página */}
            <div
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
              onClick={() => setMenuAbierto(false)}
              aria-hidden="true"
            />
            <div className="absolute right-0 top-12 z-50 w-80 max-w-[calc(100vw-2rem)] overflow-hidden rounded-lg border border-white/10 bg-zinc-950 shadow-xl">
              {aviso ? (
                <div className="border-b border-yellow-400/30 p-3">
                  <AvisoMantenimiento
                    aviso={aviso}
                    marcando={marcando}
                    onMarcarHecho={marcarHecho}
                    onNavegar={() => setMenuAbierto(false)}
                  />
                </div>
              ) : null}
              <Link
                to="/mi-cuenta"
                onClick={() => setMenuAbierto(false)}
                className="block px-4 py-3 text-left text-sm font-semibold text-white transition hover:bg-white/5"
              >
                Mi cuenta
              </Link>
              <button
                type="button"
                onClick={() => {
                  setMenuAbierto(false)
                  logout()
                }}
                className="w-full border-t border-white/10 px-4 py-3 text-left text-sm font-semibold text-white transition hover:bg-white/5"
              >
                Cerrar sesión
              </button>
            </div>
          </>
        ) : null}
      </div>
    )
  }

  return (
    <div className={className}>
      <GoogleLogin
        theme="filled_black"
        size="medium"
        shape="pill"
        text="signin"
        locale="es"
        onSuccess={async (credentialResponse) => {
          setError("")
          try {
            await loginConGoogle(credentialResponse.credential)
          } catch (err) {
            setError(err.message)
          }
        }}
        onError={() => setError("No se pudo iniciar sesión con Google")}
      />
      {error ? <p className="mt-1 text-xs text-red-400">{error}</p> : null}
    </div>
  )
}
