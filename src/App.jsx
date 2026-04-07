import React from "react"
import { Route, Routes, Navigate } from "react-router-dom"
import ProductList from "./pages/ProductList"
import ProductDetails from "./pages/ProductDetails"
import CartPage from "./pages/CartPage"
import SuccessPage from "./pages/SuccessPage"
import CheckoutPage from "./pages/CheckoutPage"
import OrdersPage from "./pages/OrdersPage"
import OrderDetails from "./pages/OrderDetails"
import Login from "./pages/Login"
import Layout from "./components/Layout"
import { useAuth } from "./Context/AuthContext"

const App = () => {
  const { user } = useAuth()

  return (
    <Routes>
      <Route
        path="/login"
        element={!user ? <Login /> : <Navigate to="/" replace />}
      />

      <Route
        path="/"
        element={user ? <Layout /> : <Navigate to="/login" replace />}
      >
        <Route index element={<ProductList />} />
        <Route path="product/:id" element={<ProductDetails />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="success" element={<SuccessPage />} />
        <Route path="orders">
          <Route index element={<OrdersPage />} />
          <Route path=":id" element={<OrderDetails />} />
        </Route>
      </Route>

      <Route
        path="*"
        element={<Navigate to={user ? "/" : "/login"} replace />}
      />
    </Routes>
  )
}

export default App