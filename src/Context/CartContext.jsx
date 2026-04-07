import {
  createContext,
  useState,
  useEffect,
  useMemo,
  useCallback
} from "react"

export const CartContext = createContext(null)

const STORAGE_KEY = "ecommerce-cart"

const loadCartFromStorage = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(loadCartFromStorage)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart))
  }, [cart])

  const clearCart = useCallback(() => {
    setCart([])
  }, [])

  const addToCart = useCallback((product, quantity = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id)

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }

      return [
        ...prevCart,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          quantity,
          thumbnail: product.thumbnail || product.image || "",
          category: product.category || "",
          stock: product.stock ?? 0
        }
      ]
    })
  }, [])

  const increaseQty = useCallback((id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    )
  }, [])

  const decreaseQty = useCallback((id) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(1, item.quantity - 1) }
            : item
        )
        .filter((item) => item.quantity > 0)
    )
  }, [])

  const removeItem = useCallback((id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id))
  }, [])

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  )

  const cartTotal = useMemo(
    () =>
      cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  )

  const value = useMemo(
    () => ({
      cart,
      cartCount,
      cartTotal,
      addToCart,
      increaseQty,
      decreaseQty,
      removeItem,
      clearCart
    }),
    [cart, cartCount, cartTotal, addToCart, increaseQty, decreaseQty, removeItem, clearCart]
  )

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}