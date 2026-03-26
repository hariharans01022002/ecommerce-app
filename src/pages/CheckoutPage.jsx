import { useContext, useState, useEffect } from "react"
import { CartContext } from "../Context/CartContext"
import { useNavigate } from "react-router-dom"

import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Select,
  MenuItem
} from "@mui/material"

import OrderSummary from "../components/OrderSummary"

const CheckoutPage = () => {

  const { cart, clearCart } = useContext(CartContext)
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")
  const [payment, setPayment] = useState("upi")
  const [errors, setErrors] = useState({})

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  useEffect(() => {
    if (cart.length === 0) {
      navigate("/")
    }
  }, [])

  const validate = () => {
    let newErrors = {}

    if (!name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format"
    }

    if (!address.trim()) {
      newErrors.address = "Address is required"
    }

    if (!payment) {
      newErrors.payment = "Select payment method"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validate()) return

    const order = {
      id: Date.now(),
      items: cart,
      total: totalPrice,
      user: { name, email, address },
      date: new Date().toLocaleString(),  
      status: "Pending"                   
    }

    const existingOrders =
      JSON.parse(localStorage.getItem("orders")) || []

    localStorage.setItem(
      "orders",
      JSON.stringify([...existingOrders, order])
    )

    clearCart()
    navigate("/success")
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>

      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>

      <Grid container spacing={4}>

        <Grid size={{ xs: 12, md: 6 }}>

          <form onSubmit={handleSubmit}>

            <TextField
              label="Name"
              fullWidth
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={!!errors.name}
              helperText={errors.name}
            />

            <TextField
              label="Email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
            />

            <TextField
              label="Address"
              fullWidth
              margin="normal"
              multiline
              rows={3}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              error={!!errors.address}
              helperText={errors.address}
            />

            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1">
                Payment Method
              </Typography>

              <Select
                fullWidth
                value={payment}
                onChange={(e) => setPayment(e.target.value)}
                error={!!errors.payment}
              >
                <MenuItem value="upi">UPI</MenuItem>
                <MenuItem value="card">Card</MenuItem>
                <MenuItem value="cod">Cash on Delivery</MenuItem>
              </Select>

              {errors.payment && (
                <Typography color="error" variant="body2">
                  {errors.payment}
                </Typography>
              )}
            </Box>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 3 }}
              disabled={cart.length === 0}
            >
              Place Order
            </Button>

          </form>

        </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
          <OrderSummary cart={cart} />
        </Grid>

      </Grid>

    </Container>
  )
}

export default CheckoutPage