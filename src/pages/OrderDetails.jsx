import {
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  Chip,
  Button
} from "@mui/material"
import { useParams, useNavigate } from "react-router-dom"

const OrderDetails = () => {

  const { id } = useParams()
  const navigate = useNavigate()

  const orders = JSON.parse(localStorage.getItem("orders")) || []
  const order = orders.find(o => o.id.toString() === id)

  if (!order) {
    return (
      <Container sx={{ mt: 5 }}>
        <Typography variant="h6">Order not found</Typography>

        <Button sx={{ mt: 2 }} onClick={() => navigate("/orders")}>
          Back to Orders
        </Button>
      </Container>
    )
  }

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>

      <Typography variant="h4" gutterBottom>
        Order Details
      </Typography>

      <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
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

        
          <Box sx={{ mt: 2 }}>
            <Typography><strong>Name:</strong> {order.user.name}</Typography>
            <Typography><strong>Email:</strong> {order.user.email}</Typography>
            <Typography><strong>Address:</strong> {order.user.address}</Typography>
          </Box>

    
          <Box sx={{ mt: 3 }}>
            {order.items.map(item => (
              <Box
                key={item.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  mb: 2,
                  p: 1,
                  borderRadius: 2,
                  bgcolor: "#f9f9f9"
                }}
              >

                
                <Box
                  component="img"
                  src={item.image}
                  alt={item.title}
                  sx={{
                    width: 60,
                    height: 60,
                    objectFit: "contain",
                    borderRadius: 2,
                    bgcolor: "#fff",
                    p: 1
                  }}
                />

                <Box sx={{ flexGrow: 1 }}>
                  <Typography>{item.title}</Typography>
                  <Typography variant="body2">
                    Qty: {item.quantity}
                  </Typography>
                </Box>

              
                <Typography fontWeight="bold">
                  ${(item.price * item.quantity).toFixed(2)}
                </Typography>

              </Box>
            ))}
          </Box>


          <Box sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 3
          }}>
            <Typography fontWeight="bold">Total</Typography>
            <Typography fontWeight="bold">
              ${order.total.toFixed(2)}
            </Typography>
          </Box>

        </CardContent>
      </Card>

    </Container>
  )
}

export default OrderDetails