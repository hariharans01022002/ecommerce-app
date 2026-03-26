import { useParams } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import {
  Container,
  Grid,
  Typography,
  Button,
  Box,
  Chip,
  CircularProgress
} from "@mui/material"
import ReviewSection from "../components/ReviewSection"
import { CartContext } from "../Context/CartContext"

const ProductDetails = () => {

  const { addToCart } = useContext(CartContext)
  const { id } = useParams()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

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

  useEffect(() => {
    fetchProduct()
  }, [id])

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

        <Button variant="contained" sx={{ mt: 2 }} onClick={fetchProduct}>
          Retry
        </Button>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 8 }}>
      <Grid container spacing={10} alignItems="center">

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

            <Chip label={product.category} sx={{ width: "fit-content" }} />

            <Typography
              variant="h5"
              sx={{
                color: "primary.main",
                fontWeight: "bold"
              }}
            >
              ${product.price}
            </Typography>

            <Typography
              sx={{
                lineHeight: 1.8,
                color: "text.secondary"
              }}
            >
              {product.description}
            </Typography>

            <Button
              variant="contained"
              size="large"
              sx={{ width: "fit-content" }}
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </Button>

          </Box>
        </Grid>

      </Grid>
      <ReviewSection productId={product.id} />
    </Container>
  )
}

export default ProductDetails