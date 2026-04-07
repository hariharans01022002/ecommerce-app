import { useContext, useState, useEffect } from "react"
import { CartContext } from "../Context/CartContext"
import { useNavigate } from "react-router-dom"

import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  CircularProgress,
  Alert,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
  Divider,
  Stack
} from "@mui/material"

import OrderSummary from "../components/OrderSummary"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"

const CheckoutPage = () => {

  const { cart, clearCart } = useContext(CartContext)
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    payment: "upi"
  })

  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [activeStep, setActiveStep] = useState(0)

  const TAX_RATE = 0.1
  const SHIPPING_COST = 0

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  const taxAmount = totalPrice * TAX_RATE
  const finalTotal = totalPrice + taxAmount + SHIPPING_COST

  useEffect(() => {
    if (cart.length === 0) {
      navigate("/cart")
    }
  }, [cart])

  const validate = () => {
    let newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Phone number must be 10 digits"
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required"
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required"
    }

    if (!formData.postalCode.trim()) {
      newErrors.postalCode = "Postal code is required"
    }

    if (!formData.payment) {
      newErrors.payment = "Select payment method"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target

    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validate()) return

    setLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))

      const order = {
        id: Date.now(),
        items: cart,
        subtotal: totalPrice,
        tax: taxAmount,
        shipping: SHIPPING_COST,
        total: finalTotal,
        user: formData,
        date: new Date().toLocaleString(),
        status: "Pending",
        paymentMethod: formData.payment
      }

      const existingOrders = JSON.parse(localStorage.getItem("orders")) || []
      localStorage.setItem("orders", JSON.stringify([...existingOrders, order]))

      setActiveStep(1)
      clearCart()

      setTimeout(() => {
        navigate("/success", { state: { order } })
      }, 1000)

    } catch (error) {
      setErrors({ submit: "Failed to place order. Please try again." })
    } finally {
      setLoading(false)
    }
  }

  if (cart.length === 0) {
    return (
      <Container maxWidth="md" sx={{ mt: 8, textAlign: "center", py: 6 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Your cart is empty
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => navigate("/products")}
        >
          Continue Shopping
        </Button>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 5, mb: 8 }}>

      <Typography variant="h4" sx={{ mb: 1, fontWeight: 700 }}>
        Checkout
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 4 }}>
        Step {activeStep + 1} of 2
      </Typography>

      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        <Step>
          <StepLabel>Shipping Details</StepLabel>
        </Step>
        <Step>
          <StepLabel>Order Confirmation</StepLabel>
        </Step>
      </Stepper>

      <Grid container spacing={4}>

        {/* FORM SECTION */}
        <Grid size={{ xs: 12, md: 6 }}>

          {errors.submit && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {errors.submit}
            </Alert>
          )}

          <Card>
            <CardContent>

              <form onSubmit={handleSubmit}>

                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                  Shipping Address
                </Typography>

                <Stack spacing={2}>

                  <TextField
                    label="Full Name"
                    name="name"
                    fullWidth
                    value={formData.name}
                    onChange={handleInputChange}
                    error={!!errors.name}
                    helperText={errors.name}
                  />

                  <TextField
                    label="Email"
                    name="email"
                    type="email"
                    fullWidth
                    value={formData.email}
                    onChange={handleInputChange}
                    error={!!errors.email}
                    helperText={errors.email}
                  />

                  <TextField
                    label="Phone Number"
                    name="phone"
                    fullWidth
                    value={formData.phone}
                    onChange={handleInputChange}
                    error={!!errors.phone}
                    helperText={errors.phone}
                    placeholder="10 digit number"
                  />

                  <TextField
                    label="Street Address"
                    name="address"
                    fullWidth
                    multiline
                    rows={3}
                    value={formData.address}
                    onChange={handleInputChange}
                    error={!!errors.address}
                    helperText={errors.address}
                  />

                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        label="City"
                        name="city"
                        fullWidth
                        value={formData.city}
                        onChange={handleInputChange}
                        error={!!errors.city}
                        helperText={errors.city}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        label="Postal Code"
                        name="postalCode"
                        fullWidth
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        error={!!errors.postalCode}
                        helperText={errors.postalCode}
                      />
                    </Grid>
                  </Grid>

                </Stack>

                <Divider sx={{ my: 3 }} />

                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Payment Method
                </Typography>

                <FormControl fullWidth error={!!errors.payment}>
                  <InputLabel>Payment Method</InputLabel>
                  <Select
                    name="payment"
                    value={formData.payment}
                    label="Payment Method"
                    onChange={handleInputChange}
                  >
                    <MenuItem value="upi">UPI</MenuItem>
                    <MenuItem value="card">Credit/Debit Card</MenuItem>
                    <MenuItem value="cod">Cash on Delivery</MenuItem>
                  </Select>
                </FormControl>

                {errors.payment && (
                  <Typography color="error" variant="caption" sx={{ display: "block", mt: 1 }}>
                    {errors.payment}
                  </Typography>
                )}

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  size="large"
                  sx={{ mt: 4 }}
                  disabled={loading || cart.length === 0}
                >
                  {loading ? (
                    <>
                      <CircularProgress size={20} sx={{ mr: 1 }} />
                      Processing...
                    </>
                  ) : (
                    "Place Order"
                  )}
                </Button>

              </form>

            </CardContent>
          </Card>

        </Grid>

        {/* ORDER SUMMARY SECTION */}
        <Grid size={{ xs: 12, md: 6 }}>

          <Paper sx={{ p: 3, position: { lg: "sticky" }, top: 20 }}>

            <Typography variant="h6" sx={{ mb: 3, fontWeight: 700 }}>
              Order Summary
            </Typography>

            <OrderSummary cart={cart} />

            <Divider sx={{ my: 2 }} />

            <Stack spacing={1.5}>

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography color="text.secondary">Subtotal:</Typography>
                <Typography>${totalPrice.toFixed(2)}</Typography>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography color="text.secondary">Shipping:</Typography>
                <Typography sx={{ color: "success.main", fontWeight: 600 }}>
                  {SHIPPING_COST === 0 ? "Free" : `$${SHIPPING_COST.toFixed(2)}`}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography color="text.secondary">Tax (10%):</Typography>
                <Typography>${taxAmount.toFixed(2)}</Typography>
              </Box>

            </Stack>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                Total Amount:
              </Typography>
              <Typography variant="h6" sx={{ color: "primary.main", fontWeight: 700 }}>
                ${finalTotal.toFixed(2)}
              </Typography>
            </Box>

            <Alert severity="info">
              {formData.payment === "cod" 
                ? "Pay on delivery" 
                : "Complete payment in the next step"}
            </Alert>

          </Paper>

        </Grid>

      </Grid>

    </Container>
  )
}

export default CheckoutPage