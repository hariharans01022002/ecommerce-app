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
        <Typography>No items</Typography>
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

            {/* IMAGE */}
            <Box
              component="img"
              src={item.image}
              alt={item.title}
              sx={{
                width: 60,
                height: 60,
                objectFit: "contain",
                bgcolor: "#fff",
                borderRadius: 2,
                p: 1
              }}
            />

            {/* DETAILS */}
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="body2">
                {item.title}
              </Typography>

              <Typography variant="caption" color="text.secondary">
                Qty: {item.quantity}
              </Typography>
            </Box>

            {/* PRICE */}
            <Typography fontWeight="bold">
              ${(item.price * item.quantity).toFixed(2)}
            </Typography>

          </Box>
        ))
      )}

      <Divider sx={{ my: 2 }} />

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography fontWeight="bold">
          Total
        </Typography>

        <Typography fontWeight="bold">
          ${totalPrice.toFixed(2)}
        </Typography>
      </Box>

    </Box>
  )
}

export default OrderSummary