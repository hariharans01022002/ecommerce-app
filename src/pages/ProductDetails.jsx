import { useParams } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import {
  Container,
  Grid,
  Typography,
  Button,
  Box,
  Chip,
  CircularProgress,
  Rating,
  TextField
} from "@mui/material"
import ReviewSection from "../components/ReviewSection"
import { CartContext } from "../Context/CartContext"

const ProductDetails = () => {

  const { addToCart } = useContext(CartContext)
  const { id } = useParams()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        setError("")

        const res = await fetch(`https://dummyjson.com/products/${id}`)

        if (!res.ok) {
          throw new Error("Failed to fetch product")
        }

        const data = await res.json()
        setProduct(data)

      } catch (err) {
        setError("Something went wrong. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  const handleAddToCart = () => {
    if (product) {
      addToCart({ ...product, quantity })
      setQuantity(1)
    }
  }

  const handleQuantityChange = (e) => {
    const value = Math.max(1, Number(e.target.value))
    setQuantity(value)
  }

  if (loading) {
    return (
      <Container sx={{ mt: 8, textAlign: "center" }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Loading product...</Typography>
      </Container>
    )
  }

  if (error) {
    return (
      <Container sx={{ mt: 8, textAlign: "center" }}>
        <Typography color="error" variant="h6">
          {error}
        </Typography>

        <Button 
          variant="contained" 
          sx={{ mt: 2 }} 
          onClick={() => window.location.reload()}
        >
          Retry
        </Button>
      </Container>
    )
  }

  if (!product) {
    return (
      <Container sx={{ mt: 8, textAlign: "center" }}>
        <Typography>Product not found</Typography>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
      <Grid container spacing={10} alignItems="flex-start">

        {/* IMAGE */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            sx={{
              width: "100%",
              height: 420,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#f5f5f5",
              borderRadius: 3,
              p: 4
            }}
          >
            <Box
              component="img"
              src={product.thumbnail}
              alt={product.title}
              sx={{
                maxHeight: "100%",
                maxWidth: "85%",
                objectFit: "contain"
              }}
            />
          </Box>
        </Grid>

        {/* DETAILS */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              maxWidth: 460,
              ml: 2
            }}
          >

            <Typography variant="h4" fontWeight={700}>
              {product.title}
            </Typography>

            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <Rating value={product.rating} readOnly precision={0.1} />
              <Typography variant="body2" color="text.secondary">
                ({product.rating})
              </Typography>
            </Box>

            <Chip 
              label={product.category} 
              sx={{ width: "fit-content" }} 
            />

            <Typography
              variant="h5"
              sx={{
                color: "primary.main",
                fontWeight: "bold"
              }}
            >
              ${product.price}
            </Typography>

            {product.discountPercentage && (
              <Typography 
                variant="body2" 
                sx={{ color: "success.main", fontWeight: 500 }}
              >
                Save {product.discountPercentage}%
              </Typography>
            )}

            <Typography
              sx={{
                lineHeight: 1.8,
                color: "text.secondary"
              }}
            >
              {product.description}
            </Typography>

            <Typography variant="body2" fontWeight={500}>
              Stock: <span style={{ color: product.stock > 0 ? "green" : "red" }}>
                {product.stock > 0 ? `${product.stock} available` : "Out of stock"}
              </span>
            </Typography>

            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <TextField
                label="Quantity"
                type="number"
                size="small"
                value={quantity}
                onChange={handleQuantityChange}
                inputProps={{ min: 1, max: product.stock }}
                sx={{ width: 100 }}
              />

              <Button
                variant="contained"
                size="large"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                Add to Cart
              </Button>
            </Box>

          </Box>
        </Grid>

      </Grid>

      {product && <ReviewSection productId={product.id} />}
    </Container>
  )
}

export default ProductDetails