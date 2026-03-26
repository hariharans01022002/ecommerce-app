import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import ProductList from './pages/ProductList'
import ProductDetails from './pages/ProductDetails'
import CartPage from './pages/CartPage'
import SuccessPage from './pages/SuccessPage'
import CheckoutPage from './pages/CheckoutPage'
import OrdersPage from "./pages/OrdersPage"
import OrderDetails from "./pages/OrderDetails"

const App = () => {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={ <ProductList />} />
        <Route path="/product/:id" element={ <ProductDetails />} />
        <Route path="/cart" element={ <CartPage /> } />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/orders/:id" element={<OrderDetails />} />
      </Routes>
     
    </>
  )
}

export default App
