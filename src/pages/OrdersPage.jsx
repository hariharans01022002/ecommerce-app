import { useMemo } from "react"
import { Link } from "react-router-dom"
import {
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  Chip,
  Button,
  Stack,
  Divider
} from "@mui/material"

const getStatusColor = (status) => {
  if (!status) return "default"
  if (status.toLowerCase().includes("delivered")) return "success"
  if (status.toLowerCase().includes("cancel")) return "error"
  return "warning"
}

const OrdersPage = () => {
  const orders = JSON.parse(localStorage.getItem("orders")) || []

  const reversedOrders = useMemo(() => [...orders].reverse(), [orders])

  return (
    <Container sx={{ mt: 5, mb: 6 }}>
      <Typography variant="h4" gutterBottom>
        Your Orders
      </Typography>

      {orders.length === 0 ? (
        <Box
          sx={{
            mt: 6,
            textAlign: "center",
            p: 4,
            borderRadius: 3,
            bgcolor: "#fafafa"
          }}
        >
          <Typography variant="h6" sx={{ mb: 1 }}>
            No orders found
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            You haven’t placed any orders yet.
          </Typography>
          <Button component={Link} to="/products" variant="contained">
            Continue Shopping
          </Button>
        </Box>
      ) : (
        <Stack spacing={3}>
          {reversedOrders.map((order) => {
            const orderDate = order.date
              ? new Date(order.date).toLocaleString()
              : "Unknown date"

            const total =
              order.total ??
              order.items.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0
              )

            const displayedItems = order.items.slice(0, 2)
            const extraItemCount = order.items.length - displayedItems.length

            return (
              <Card
                key={order.id}
                sx={{ borderRadius: 3, boxShadow: 2, overflow: "hidden" }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: 2,
                      mb: 2
                    }}
                  >
                    <Box>
                      <Typography variant="h6">Order #{order.id}</Typography>
                      <Typography color="text.secondary" sx={{ mt: 0.5 }}>
                        {orderDate}
                      </Typography>
                    </Box>

                    <Chip
                      label={order.status || "Processing"}
                      color={getStatusColor(order.status)}
                      sx={{ textTransform: "capitalize" }}
                    />
                  </Box>

                  <Divider sx={{ mb: 2 }} />

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: 2,
                      mb: 2
                    }}
                  >
                    <Typography color="text.secondary">
                      {order.items.length} item
                      {order.items.length > 1 ? "s" : ""}
                    </Typography>

                    <Typography fontWeight={600}>
                      Total: ${total.toFixed(2)}
                    </Typography>
                  </Box>

                  <Stack spacing={1} sx={{ mb: 2 }}>
                    {displayedItems.map((item) => (
                      <Box
                        key={item.id}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 2
                        }}
                      >
                        <Box
                          component="img"
                          src={item.thumbnail || item.image || ""}
                          alt={item.title}
                          sx={{
                            width: 48,
                            height: 48,
                            objectFit: "contain",
                            borderRadius: 1,
                            bgcolor: "#f5f5f5",
                            p: 0.5,
                            border: "1px solid #e0e0e0"
                          }}
                        />
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="body2" fontWeight={600}>
                            {item.title}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Qty: {item.quantity}
                          </Typography>
                        </Box>
                        <Typography variant="body2" fontWeight={700}>
                          ${(item.price * item.quantity).toFixed(2)}
                        </Typography>
                      </Box>
                    ))}

                    {extraItemCount > 0 && (
                      <Typography variant="body2" color="text.secondary">
                        +{extraItemCount} more item
                        {extraItemCount > 1 ? "s" : ""}
                      </Typography>
                    )}
                  </Stack>

                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button
                      component={Link}
                      to={`/orders/${order.id}`}
                      variant="outlined"
                      size="small"
                    >
                      View Details
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            )
          })}
        </Stack>
      )}
    </Container>
  )
}

export default OrdersPage