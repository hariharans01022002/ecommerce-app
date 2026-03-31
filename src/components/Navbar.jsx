import { AppBar, Toolbar, Typography, Box, IconButton, Button } from "@mui/material"
import CartButton from "./CartButton"
import { useContext } from "react"
import { CartContext } from "../Context/CartContext"
import { Link } from "react-router-dom"
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong"
import { useAuth } from "../Context/AuthContext"


const Navbar = () => {

  const {cart} = useContext(CartContext)

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity, 0)

  const { user, logout } = useAuth()

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

          {user && (
            <Typography variant="body2">
              {user.username} ({user.role})
            </Typography>
          )}


          {user && (
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          )}

          <CartButton cartCount={cartCount} />

        </Box>

      </Toolbar>
    </AppBar>
  )
}

export default Navbar 