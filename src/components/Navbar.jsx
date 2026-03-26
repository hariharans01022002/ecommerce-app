import { AppBar, Toolbar, Typography, Box, IconButton } from "@mui/material"
import CartButton from "./CartButton"
import { useContext } from "react"
import { CartContext } from "../Context/CartContext"
import { Link } from "react-router-dom"
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong"


const Navbar = () => {

  const {cart} = useContext(CartContext)

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity, 0)

  return (
    <AppBar position="sticky" elevation={0} sx={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>

        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            textDecoration: "none",
            color: "inherit",
            fontWeight: 700
          }}
        >
          My Shop
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>

          <IconButton
            component={Link}
            to="/orders"
            color="inherit"
          >
            <ReceiptLongIcon />
          </IconButton>

          <CartButton cartCount={cartCount} />

        </Box>

      </Toolbar>
    </AppBar>
  )
}

export default Navbar 