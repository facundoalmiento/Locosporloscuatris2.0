import { createContext, useCallback, useContext, useEffect, useState } from "react"

const AuthContext = createContext(null)

const STORAGE_KEY = "lplc-auth"

function leerGuardado() {
  try {
    const crudo = localStorage.getItem(STORAGE_KEY)
    return crudo ? JSON.parse(crudo) : null
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => leerGuardado())

  useEffect(() => {
    if (auth) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(auth))
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [auth])

  // Recibe el idToken que devuelve el botón de Google y lo manda a nuestro backend,
  // que lo verifica y nos devuelve nuestro propio usuario + token (mismo formato
  // que el login con email/contraseña).
  const loginConGoogle = useCallback(async (idToken) => {
    const res = await fetch("/api/auth/google", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken }),
    })
    const data = await res.json()
    if (!res.ok) {
      throw new Error(data?.error ?? "No se pudo iniciar sesión con Google")
    }
    setAuth({ user: data.user, token: data.token })
    return data.user
  }, [])

  const logout = useCallback(() => {
    setAuth(null)
  }, [])

  const value = {
    user: auth?.user ?? null,
    token: auth?.token ?? null,
    estaLogueado: Boolean(auth?.token),
    loginConGoogle,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components -- hook vive junto al provider a propósito
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error("useAuth tiene que usarse dentro de <AuthProvider>")
  }
  return ctx
}
