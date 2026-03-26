import {
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  Chip,
  Button
} from "@mui/material"
import { Link } from "react-router-dom"

const OrdersPage = () => {

  const orders = JSON.parse(localStorage.getItem("orders")) || []

  return (
    <Container sx={{ mt: 5 }}>

      <Typography variant="h4" gutterBottom>
        Your Orders
      </Typography>

      {orders.length === 0 ? (
        <Typography>No orders found</Typography>
      ) : (
        [...orders].reverse().map(order => (

          <Card key={order.id} sx={{ mb: 3, borderRadius: 3, boxShadow: 2 }}>
            <CardContent>

              <Box sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}>
                <Typography variant="h6">
                  Order #{order.id}
                </Typography>

                <Chip
                  label={order.status}
                  color={order.status === "Delivered" ? "success" : "warning"}
                />
              </Box>

              <Typography variant="body2" sx={{ mt: 1, color: "text.secondary" }}>
                {order.date}
              </Typography>

              <Typography sx={{ mt: 1, fontWeight: 500 }}>
                Total: ${order.total.toFixed(2)}
              </Typography>

              <Box sx={{ mt: 2 }}>
                {order.items.slice(0, 2).map(item => (
                  <Box
                    key={item.id}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      mb: 1
                    }}
                  >

                    <Box
                      component="img"
                      src={item.image}
                      alt={item.title}
                      sx={{
                        width: 40,
                        height: 40,
                        objectFit: "contain",
                        borderRadius: 1,
                        bgcolor: "#f5f5f5",
                        p: 0.5
                      }}
                    />

                    <Typography variant="body2">
                      {item.title} × {item.quantity}
                    </Typography>

                  </Box>
                ))}
              </Box>

              <Button
                component={Link}
                to={`/orders/${order.id}`}
                sx={{ mt: 2 }}
              >
                View Details
              </Button>

            </CardContent>
          </Card>

        ))
      )}

    </Container>
  )
}

export default OrdersPage