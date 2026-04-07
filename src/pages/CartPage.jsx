import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { CartContext } from "../Context/CartContext"

import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
  Stack,
  Snackbar,
  Alert,
  TextField,
  Divider,
  Paper
} from "@mui/material"

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"

const CartPage = () => {

  const { cart, increaseQty, decreaseQty, removeItem } = useContext(CartContext)

  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState("")

  const handleAction = (msg) => {
    setMessage(msg)
    setOpen(true)
  }

  const handleQuantityChange = (itemId, newQuantity) => {
    const currentItem = cart.find(item => item.id === itemId)
    if (!currentItem) return

    const difference = newQuantity - currentItem.quantity

    if (difference > 0) {
      for (let i = 0; i < difference; i++) {
        increaseQty(itemId)
      }
    } else if (difference < 0) {
      for (let i = 0; i < Math.abs(difference); i++) {
        decreaseQty(itemId)
      }
    }

    handleAction("Quantity updated")
  }

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  const navigate = useNavigate()

  if (cart.length === 0) {
    return (
      <Container maxWidth="md" sx={{ mt: 8, textAlign: "center", py: 6 }}>
        <ShoppingCartIcon sx={{ fontSize: 80, color: "text.secondary", mb: 2 }} />
        
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
          Your cart is empty
        </Typography>

        <Typography color="text.secondary" sx={{ mb: 4 }}>
          Add some products to get started!
        </Typography>

        <Button
          variant="contained"
          size="large"
          onClick={() => navigate("/products")}
        >
          Continue Shopping
        </Button>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 5, mb: 8 }}>

      <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>
        Shopping Cart ({cart.length} items)
      </Typography>

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "1fr 350px" }, gap: 4 }}>

        {/* CART ITEMS */}
        <Box>
          {cart.map(item => (
            <Paper
              key={item.id}
              sx={{
                mb: 2,
                display: "flex",
                alignItems: "center",
                p: 2,
                gap: 2,
                transition: "box-shadow 0.3s",
                "&:hover": { boxShadow: 3 }
              }}
            >

              {/* PRODUCT IMAGE */}
              <CardMedia
                component="img"
                image={item.thumbnail || item.image}
                alt={item.title}
                sx={{
                  width: 100,
                  height: 100,
                  objectFit: "contain",
                  bgcolor: "#f5f5f5",
                  borderRadius: 2,
                  p: 1
                }}
              />

              {/* PRODUCT INFO */}
              <CardContent sx={{ flex: 1, py: 0 }}>

                <Typography variant="h6" sx={{ mb: 0.5, fontWeight: 600 }}>
                  {item.title}
                </Typography>

                <Typography color="text.secondary" sx={{ mb: 1 }}>
                  {item.category}
                </Typography>

                <Typography variant="body1" sx={{ color: "primary.main", fontWeight: 600 }}>
                  ${item.price.toFixed(2)}
                </Typography>

              </CardContent>

              {/* QUANTITY & ACTIONS */}
              <Stack direction="column" spacing={1.5} sx={{ alignItems: "center" }}>

                <Stack direction="row" spacing={0.5} sx={{ alignItems: "center" }}>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => {
                      decreaseQty(item.id)
                      handleAction("Quantity decreased")
                    }}
                    aria-label="Decrease quantity"
                    sx={{ minWidth: 36, p: 0 }}
                  >
                    −
                  </Button>

                  <TextField
                    type="number"
                    size="small"
                    value={item.quantity}
                    onChange={(e) => {
                      const newQty = Math.max(1, Number(e.target.value))
                      handleQuantityChange(item.id, newQty)
                    }}
                    inputProps={{ min: 1, style: { textAlign: "center" } }}
                    sx={{ width: 60 }}
                  />

                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => {
                      increaseQty(item.id)
                      handleAction("Quantity increased")
                    }}
                    aria-label="Increase quantity"
                    sx={{ minWidth: 36, p: 0 }}
                  >
                    +
                  </Button>
                </Stack>

                <Typography variant="body2" sx={{ fontWeight: 600, color: "success.main" }}>
                  ${(item.price * item.quantity).toFixed(2)}
                </Typography>

                <Button
                  size="small"
                  color="error"
                  onClick={() => {
                    removeItem(item.id)
                    handleAction("Item removed from cart")
                  }}
                >
                  Remove
                </Button>

              </Stack>

            </Paper>
          ))}
        </Box>

        {/* SUMMARY CARD */}
        <Paper sx={{ p: 3, height: "fit-content", position: { lg: "sticky" }, top: 20 }}>
          
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
            Order Summary
          </Typography>

          <Stack spacing={2}>

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography color="text.secondary">Subtotal:</Typography>
              <Typography>${totalPrice.toFixed(2)}</Typography>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography color="text.secondary">Shipping:</Typography>
              <Typography>Free</Typography>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography color="text.secondary">Tax:</Typography>
              <Typography>${(totalPrice * 0.1).toFixed(2)}</Typography>
            </Box>

            <Divider sx={{ my: 1 }} />

            <Box sx={{ display: "flex", justifyContent: "space-between", fontWeight: 700 }}>
              <Typography variant="body1">Total:</Typography>
              <Typography variant="body1" sx={{ color: "primary.main", fontSize: "1.2rem" }}>
                ${(totalPrice * 1.1).toFixed(2)}
              </Typography>
            </Box>

          </Stack>

          <Button
            variant="contained"
            size="large"
            fullWidth
            sx={{ mt: 3 }}
            onClick={() => navigate("/checkout")}
          >
            Proceed to Checkout
          </Button>

          <Button
            variant="outlined"
            fullWidth
            sx={{ mt: 1 }}
            onClick={() => navigate("/products")}
          >
            Continue Shopping
          </Button>

        </Paper>

      </Box>

      {/* SNACKBAR */}
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity="success" variant="filled" onClose={() => setOpen(false)}>
          {message}
        </Alert>
      </Snackbar>

    </Container>
  )
}

export default CartPage