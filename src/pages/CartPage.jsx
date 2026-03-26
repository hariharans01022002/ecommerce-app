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
  Alert
} from "@mui/material"

const CartPage = () => {

  const { cart, increaseQty, decreaseQty, removeItem } = useContext(CartContext)

  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState("")

  const handleAction = (msg) => {
    setMessage(msg)
    setOpen(true)
  }

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  const navigate = useNavigate()


  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>

      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>

      {cart.length === 0 ? (
        <Typography>No items in cart</Typography>
      ) : (
        <>
          {cart.map(item => (
            <Card
              key={item.id}
              sx={{
                mb: 3,
                display: "flex",
                alignItems: "center",
                p: 2,
                gap: 2
              }}
            >


              <CardMedia
                component="img"
                image={item.image}
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

              <CardContent sx={{ flex: 1 }}>

                <Typography variant="h6" sx={{ mb: 1 }}>
                  {item.title}
                </Typography>

                <Typography>
                  Price: ${item.price}
                </Typography>

                <Typography>
                  Quantity: {item.quantity}
                </Typography>

                <Stack direction="row" spacing={2} sx={{ mt: 2 }}>

                  <Button
                    variant="contained"
                    onClick={() => {
                      increaseQty(item.id)
                      handleAction("Quantity increased")
                    }}
                  >
                    +
                  </Button>

                  <Button
                    variant="outlined"
                    // disabled={item.quantity === 1}
                    onClick={() => {
                      decreaseQty(item.id)
                      handleAction("Quantity decreased")
                    }}
                  >
                    -
                  </Button>

                  <Button
                    color="error"
                    onClick={() => {
                      removeItem(item.id)
                      handleAction("Item removed")
                    }}
                  >
                    Remove
                  </Button>

                </Stack>

              </CardContent>
            </Card>
          ))}

            <Box sx={{ mt: 4 }}>
              <Typography variant="h5">
                Total: ${totalPrice.toFixed(2)}
              </Typography>

              <Button
                variant="contained"
                sx={{ mt: 2 }}
                disabled={cart.length === 0}
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
              </Button>
            </Box>
        </>
      )}

      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={() => setOpen(false)}
      >
        <Alert severity="success" variant="filled">
          {message}
        </Alert>
      </Snackbar>

    </Container>
  )
}

export default CartPage