import { Box, Typography, Divider } from "@mui/material"

const OrderSummary = ({ cart }) => {
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  return (
    <Box
      sx={{
        p: 3,
        border: "1px solid #ddd",
        borderRadius: 3,
        boxShadow: 1,
        backgroundColor: "#fafafa"
      }}
    >
      <Typography variant="h6" gutterBottom>
        Order Summary
      </Typography>

      {cart.length === 0 ? (
        <Typography color="text.secondary">No items</Typography>
      ) : (
        cart.map(item => (
          <Box
            key={item.id}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              mb: 2
            }}
          >
            <Box
              component="img"
              src={item.thumbnail || item.image || ""}
              alt={item.title}
              sx={{
                width: 60,
                height: 60,
                objectFit: "contain",
                bgcolor: "#fff",
                borderRadius: 2,
                p: 1,
                border: "1px solid #e0e0e0"
              }}
            />

            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="body2" fontWeight={600}>
                {item.title}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Qty: {item.quantity} × ${item.price.toFixed(2)}
              </Typography>
            </Box>

            <Typography fontWeight="bold">
              ${(item.price * item.quantity).toFixed(2)}
            </Typography>
          </Box>
        ))
      )}

      <Divider sx={{ my: 2 }} />

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography fontWeight="bold">Total</Typography>
        <Typography fontWeight="bold">${totalPrice.toFixed(2)}</Typography>
      </Box>
    </Box>
  )
}

export default OrderSummary