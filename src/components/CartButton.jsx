import CartIndicator from "./CartIndicator"
import { Link as RouterLink } from "react-router-dom"

const CartButton = ({ cartCount }) => {
  return (
    <CartIndicator
      cartCount={cartCount}
      component={RouterLink}
      to="/cart"
    />
  )
}

export default CartButton