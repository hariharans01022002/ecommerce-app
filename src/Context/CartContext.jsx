import { useState,createContext, useEffect } from "react";

export const CartContext = createContext()

export const CartProvider = ({children}) => {

    const [ cart,setCart ] = useState([])

    useEffect(() => {
        try {
            const savedCart = JSON.parse(localStorage.getItem("cart")) || []
            setCart(savedCart)
        } catch (error) {
            console.log("LocalStorage error", error)
            setCart([])
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("cart",JSON.stringify(cart))
    }, [cart])

    const clearCart = () => {
        setCart([])
    }

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === product.id)

            if (existingItem) {
                return prevCart.map(item => 
                    item.id === product.id 
                    ? {...item, quantity: item.quantity + 1} 
                    : item )
            }

            return [
                ...prevCart, 
                {
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    quantity: 1,
                    image: product.thumbnail
                }
            ]

        })
    }

    const increaseQty = (id) => {
        setCart(prevCart =>
            prevCart.map(item =>
            item.id === id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ))
    }

    const decreaseQty = (id) => {
    setCart(prevCart =>
        prevCart
        .map(item =>
            item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    )
    }

    const removeItem = (id) => {
        setCart(prevCart => 
            prevCart.filter (item => item.id !== id)
        )
    }

    return (
        <CartContext.Provider value ={{ 
            cart,
            clearCart,
            addToCart,
            increaseQty,
            decreaseQty,
            removeItem
        }} >
            {children}
        </CartContext.Provider>
    )
}
