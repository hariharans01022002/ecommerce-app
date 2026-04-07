import { IconButton, Badge } from "@mui/material"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"

const CartIndicator = ({ cartCount = 0, onClick, ...props }) => {
  return (
    <IconButton
      size="large"
      color="inherit"
      aria-label={`Shopping cart with ${cartCount} item${cartCount === 1 ? "" : "s"}`}
      onClick={onClick}
      {...props}
    >
      <Badge badgeContent={cartCount} color="error" max={99}>
        <ShoppingCartIcon />
      </Badge>
    </IconButton>
  )
}

export default CartIndicator