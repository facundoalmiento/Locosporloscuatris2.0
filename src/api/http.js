// Helper chico para llamar a nuestra propia API con el token del usuario logueado.
export async function authFetch(path, token, options = {}) {
  const res = await fetch(path, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  })

  if (res.status === 204) return null

  const data = await res.json().catch(() => null)

  if (!res.ok) {
    throw new Error(data?.error ?? "Ocurrió un error inesperado")
  }

  return data
}
