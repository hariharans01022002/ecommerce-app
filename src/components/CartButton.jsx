import IconButton from "@mui/material/IconButton"
import CartIndicator from "./CartIndicator"
import { Link as RouterLink } from "react-router-dom"

const CartButton = ({ cartCount }) => {
  return (
    <IconButton
      component={RouterLink}
      to="/cart"
      color="inherit"
    >
      <CartIndicator cartCount={cartCount} />
    </IconButton>
  )
}

export default CartButton