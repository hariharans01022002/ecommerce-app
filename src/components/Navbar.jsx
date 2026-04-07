import { useMemo, useContext } from "react"
import { AppBar, Toolbar, Typography, Box, IconButton, Button } from "@mui/material"
import CartButton from "./CartButton"
import { CartContext } from "../Context/CartContext"
import { Link } from "react-router-dom"
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong"
import { useAuth } from "../Context/AuthContext"

const Navbar = () => {
  const { cart } = useContext(CartContext)
  const { user, logout } = useAuth()

  const cartCount = useMemo(
    () => cart.reduce((total, item) => total + item.quantity, 0),
    [cart]
  )

  return (
    <AppBar
      position="sticky"
      color="default"
      elevation={1}
      sx={{ borderBottom: "1px solid rgba(0,0,0,0.08)" }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 1
        }}
      >
        <Box
          component={Link}
          to="/"
          sx={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            color: "inherit"
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            My Shop
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            flexWrap: "wrap"
          }}
        >
          <Button
            component={Link}
            to="/products"
            color="inherit"
            sx={{ textTransform: "none" }}
          >
            Products
          </Button>

          <IconButton
            component={Link}
            to="/orders"
            color="inherit"
            aria-label="Orders"
          >
            <ReceiptLongIcon />
          </IconButton>

          {user ? (
            <>
              <Typography variant="body2" sx={{ px: 1 }}>
                {user.username} ({user.role})
              </Typography>
              <Button
                color="inherit"
                onClick={logout}
                sx={{ textTransform: "none" }}
              >
                Logout
              </Button>
            </>
          ) : (
            <Button
              component={Link}
              to="/login"
              color="inherit"
              sx={{ textTransform: "none" }}
            >
              Login
            </Button>
          )}

          <CartButton cartCount={cartCount} />
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar