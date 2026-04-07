import { useNavigate, useLocation } from "react-router-dom"
import {
  Container,
  Typography,
  Button,
  Box,
  Paper,
  Stack
} from "@mui/material"
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline"

const SuccessPage = () => {
  const navigate = useNavigate()
  const { state } = useLocation()
  const orderId = state?.order?.id

  return (
    <Container maxWidth="sm" sx={{ mt: 8, mb: 8 }}>
      <Paper
        elevation={3}
        sx={{
          p: { xs: 4, md: 6 },
          borderRadius: 4,
          textAlign: "center"
        }}
      >
        <Box
          sx={{
            width: 96,
            height: 96,
            mx: "auto",
            mb: 3,
            display: "grid",
            placeItems: "center",
            borderRadius: "50%",
            bgcolor: "success.light",
            color: "success.main"
          }}
        >
          <CheckCircleOutlineIcon sx={{ fontSize: 52 }} />
        </Box>

        <Typography variant="h4" component="h1" fontWeight={700} gutterBottom>
          Order Placed Successfully!
        </Typography>

        <Typography color="text.secondary" sx={{ mb: 3 }}>
          {orderId
            ? `Your order #${orderId} is confirmed. We'll email you the order details shortly.`
            : "Your order is confirmed. We'll email you the order details shortly."}
        </Typography>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          justifyContent="center"
        >
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/orders")}
          >
            View Orders
          </Button>

          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate("/products")}
          >
            Continue Shopping
          </Button>
        </Stack>
      </Paper>
    </Container>
  )
}

export default SuccessPage