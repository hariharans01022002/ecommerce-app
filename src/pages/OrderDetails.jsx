import {
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  Chip,
  Button,
  Grid,
  Divider,
  Stack
} from "@mui/material"
import { useParams, useNavigate } from "react-router-dom"

const OrderDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const orders = JSON.parse(localStorage.getItem("orders")) || []
  const order = orders.find((o) => o.id.toString() === id)

  if (!order) {
    return (
      <Container sx={{ mt: 5, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          Order not found
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          We could not find an order with that ID.
        </Typography>
        <Button variant="contained" onClick={() => navigate("/orders")}>
          Back to Orders
        </Button>
      </Container>
    )
  }

  const subtotal =
    order.subtotal ??
    order.items.reduce((total, item) => total + item.price * item.quantity, 0)

  const tax = order.tax ?? Number((subtotal * 0.1).toFixed(2))
  const shipping = order.shipping ?? 0
  const total = order.total ?? subtotal + tax + shipping

  const getStatusColor = (status) => {
    if (status === "Delivered") return "success"
    if (status === "Cancelled" || status === "Canceled") return "error"
    return "warning"
  }

  const formattedDate = order.date
    ? new Date(order.date).toLocaleString()
    : "N/A"

  return (
    <Container maxWidth="md" sx={{ mt: 5, mb: 6 }}>
      <Stack spacing={3}>
        <Box>
          <Typography variant="h4" fontWeight={700}>
            Order #{order.id}
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 1 }}>
            Placed on {formattedDate}
          </Typography>
        </Box>

        <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 2,
                mb: 3
              }}
            >
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Status
                </Typography>
                <Chip
                  label={order.status}
                  color={getStatusColor(order.status)}
                  sx={{ mt: 1, textTransform: "capitalize" }}
                />
              </Box>

              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Payment
                </Typography>
                <Typography sx={{ mt: 1, fontWeight: 600 }}>
                  {order.paymentMethod || "N/A"}
                </Typography>
              </Box>

              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Order total
                </Typography>
                <Typography sx={{ mt: 1, fontWeight: 600 }}>
                  ${total.toFixed(2)}
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" fontWeight={700} gutterBottom>
                  Shipping Details
                </Typography>
                <Typography>{order.user?.name || "N/A"}</Typography>
                <Typography color="text.secondary">{order.user?.email}</Typography>
                <Typography sx={{ mt: 1 }}>{order.user?.address}</Typography>
                {order.user?.city && (
                  <Typography>{order.user.city}</Typography>
                )}
                {order.user?.postalCode && (
                  <Typography>{order.user.postalCode}</Typography>
                )}
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" fontWeight={700} gutterBottom>
                  Order Summary
                </Typography>
                <Stack spacing={1}>
                  <Typography>
                    Items: {order.items.length}
                  </Typography>
                  <Typography>
                    Subtotal: ${subtotal.toFixed(2)}
                  </Typography>
                  <Typography>
                    Tax: ${tax.toFixed(2)}
                  </Typography>
                  <Typography>
                    Shipping: {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                  </Typography>
                </Stack>
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            <Box>
              <Typography variant="subtitle1" fontWeight={700} gutterBottom>
                Items
              </Typography>
              <Stack spacing={2}>
                {order.items.map((item) => (
                  <Box
                    key={item.id}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      p: 2,
                      borderRadius: 2,
                      bgcolor: "#fafafa"
                    }}
                  >
                    <Box
                      component="img"
                      src={item.thumbnail || item.image || ""}
                      alt={item.title}
                      sx={{
                        width: 80,
                        height: 80,
                        objectFit: "contain",
                        borderRadius: 2,
                        bgcolor: "#fff",
                        p: 1,
                        border: "1px solid #e0e0e0"
                      }}
                    />
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography fontWeight={600}>{item.title}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Qty: {item.quantity} × ${item.price.toFixed(2)}
                      </Typography>
                    </Box>
                    <Typography fontWeight={700}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <Typography variant="h6" fontWeight={700}>
                Total Paid
              </Typography>
              <Typography variant="h6" fontWeight={700}>
                ${total.toFixed(2)}
              </Typography>
            </Box>
          </CardContent>
        </Card>

        <Box display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="outlined" onClick={() => navigate("/orders")}>
            Back to Orders
          </Button>
          <Button variant="contained" onClick={() => navigate("/products")}>
            Continue Shopping
          </Button>
        </Box>
      </Stack>
    </Container>
  )
}

export default OrderDetails