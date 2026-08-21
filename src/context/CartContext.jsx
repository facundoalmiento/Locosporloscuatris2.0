import { createContext, useContext, useEffect, useMemo, useState } from "react"

const CartContext = createContext(null)
const STORAGE_KEY = "lplc-carrito"

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const guardado = window.localStorage.getItem(STORAGE_KEY)
      return guardado ? JSON.parse(guardado) : []
    } catch {
      return []
    }
  })
  const [abierto, setAbierto] = useState(false)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  function addItem(producto) {
    setItems((prev) => {
      const existente = prev.find((item) => item.id === producto.id)
      if (existente) {
        return prev.map((item) =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        )
      }
      return [...prev, { id: producto.id, nombre: producto.nombre, precio: producto.precio, cantidad: 1 }]
    })
    setAbierto(true)
  }

  function removeItem(id) {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  function updateQuantity(id, cantidad) {
    if (cantidad <= 0) {
      removeItem(id)
      return
    }
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, cantidad } : item)))
  }

  function clearCart() {
    setItems([])
  }

  const totalItems = useMemo(() => items.reduce((sum, item) => sum + item.cantidad, 0), [items])
  const totalPrecio = useMemo(
    () => items.reduce((sum, item) => sum + item.precio * item.cantidad, 0),
    [items]
  )

  const value = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrecio,
    abierto,
    setAbierto,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components -- hook vive junto al provider a propósito
export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error("useCart tiene que usarse dentro de <CartProvider>")
  return context
}
