import {Typography, Card, CardContent, Button, Box } from '@mui/material'
import { useContext } from 'react'
import { Link } from "react-router-dom"
import { CartContext } from '../Context/CartContext'

const ProductCard = ({product}) => {

  const { addToCart } = useContext(CartContext)

  return (
    <Link
      to={`/product/${product.id}`}
      style={{ textDecoration: "none" }}
    >
        <Card
            sx={{
              
            height: "100%",
            display: "flex",
            flexDirection: "column",
            borderRadius: 3,
            boxShadow: 2,
            transition: "transform 0.2s, box-shadow 0.2s",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: 6,
            },
          }}
        >
      
        <Box
          sx={{
            height: 180,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "#f9f9f9",
            p: 2
          }}
        >
          <Box
            component="img"
            src={product.thumbnail}
            alt={product.title}
            sx={{
              maxHeight: "100%",
              maxWidth: "80%",
              objectFit: "contain"
            }}
          />
        </Box>

      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          gap: 1,
          p: 2,
        }}
      >
        <Typography
          variant="body2"
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            minHeight: "2.8em",
            lineHeight: 1.4,
            fontWeight: 500,
            color: "text.primary",
          }}
        >
          {product.title}
        </Typography>

        <Typography
          variant="h6"
          sx={{
            mt: "auto",
            fontWeight: "bold",
            color: "primary.main",
          }}
        >
          ${product.price}
        </Typography>
      </CardContent>

      
      <Button
        variant="contained"
        fullWidth
        sx={{
          borderRadius: 0,
          borderBottomLeftRadius: 12,
          borderBottomRightRadius: 12,
          py: 1.2,
          fontWeight: 600,
          letterSpacing: 0.8,
          fontSize: "0.75rem",
        }}
        onClick={(e) => {
          e.preventDefault()
          addToCart(product)
        }}
      >
        Add to Cart
      </Button>
    </Card>
    
    </Link>
  )
}

export default ProductCard