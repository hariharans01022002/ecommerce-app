import Badge from "@mui/material/Badge"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"

const CartIndicator = ({ cartCount }) => {
  return (
    <Badge badgeContent={cartCount} color="error">
      <ShoppingCartIcon />
    </Badge>
  )
}

export default CartIndicator