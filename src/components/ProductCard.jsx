import { useContext } from "react"
import { Link } from "react-router-dom"
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Chip,
  Stack
} from "@mui/material"
import { CartContext } from "../Context/CartContext"
import { useAuth } from "../Context/AuthContext"

const ProductCard = ({
  product,
  toggleHide,
  toggleFeatured,
  toggleStock,
}) => {
  const { user } = useAuth()
  const { addToCart } = useContext(CartContext)

  const statusChips = [
    product.hidden && { label: "Hidden", color: "error" },
    product.featured && { label: "Featured", color: "warning" },
    !product.inStock && { label: "Out of Stock", color: "default" }
  ].filter(Boolean)

  return (
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
      <CardActionArea
        component={Link}
        to={`/product/${product.id}`}
        sx={{ flexGrow: 1, textAlign: "left" }}
      >
        <CardMedia
          component="img"
          image={product.thumbnail || product.image || ""}
          alt={product.title}
          sx={{
            height: 180,
            objectFit: "contain",
            bgcolor: "#f9f9f9",
            p: 2
          }}
        />

        <CardContent sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography
            variant="subtitle1"
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              lineHeight: 1.4,
              fontWeight: 600,
            }}
          >
            {product.title}
          </Typography>

          {product.category && (
            <Typography variant="caption" color="text.secondary">
              {product.category}
            </Typography>
          )}

          {statusChips.length > 0 && (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
              {statusChips.map((chip) => (
                <Chip
                  key={chip.label}
                  label={chip.label}
                  color={chip.color}
                  size="small"
                />
              ))}
            </Box>
          )}

          <Typography
            variant="h6"
            sx={{ mt: "auto", fontWeight: 700, color: "primary.main" }}
          >
            ${product.price.toFixed(2)}
          </Typography>
        </CardContent>
      </CardActionArea>

      <CardActions sx={{ flexDirection: "column", gap: 1, p: 2 }}>
        <Button
          variant="contained"
          fullWidth
          disabled={!product.inStock}
          onClick={() => addToCart(product)}
          sx={{
            borderRadius: 2,
            py: 1.25,
            fontWeight: 700,
            textTransform: "none",
          }}
        >
          {product.inStock ? "Add to Cart" : "Out of Stock"}
        </Button>

        {user?.role === "admin" && (
          <Stack direction="row" spacing={1} flexWrap="wrap">
            <Button
              size="small"
              variant="outlined"
              fullWidth
              onClick={() => toggleHide(product.id)}
            >
              {product.hidden ? "Unhide" : "Hide"}
            </Button>

            <Button
              size="small"
              variant="outlined"
              fullWidth
              onClick={() => toggleFeatured(product.id)}
            >
              {product.featured ? "Unfeature" : "Feature"}
            </Button>

            <Button
              size="small"
              variant="outlined"
              fullWidth
              onClick={() => toggleStock(product.id)}
            >
              {product.inStock ? "Mark Out" : "Restock"}
            </Button>
          </Stack>
        )}
      </CardActions>
    </Card>
  )
}

export default ProductCard