import { useState, useEffect, useMemo } from "react"
import {
  Container,
  Grid,
  TextField,
  Select,
  MenuItem,
  Box,
  Typography,
  CircularProgress,
  Pagination,
  FormControl,
  InputLabel,
} from "@mui/material"

import ProductCard from "../components/ProductCard"
import { useAuth } from "../Context/AuthContext"

const ProductList = () => {

  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem("products")
    return saved ? JSON.parse(saved) : []
  })

  const [totalProducts, setTotalProducts] = useState(0)

  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("all")
  const [sort, setSort] = useState("")

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const [page, setPage] = useState(1)
  const [productsPerPage, setProductsPerPage] = useState(8)

  const { user } = useAuth()

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products))
  }, [products])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)

        const skip = (page - 1) * productsPerPage

        const res = await fetch(
          `https://dummyjson.com/products?limit=${productsPerPage}&skip=${skip}`
        )

        if (!res.ok) throw new Error("Failed to fetch")

        const data = await res.json()

        setProducts(prev => {
          const existing = prev.reduce((acc, p) => {
            acc[p.id] = p
            return acc
          }, {})

          return data.products.map(p => ({
            ...p,
            hidden: existing[p.id]?.hidden ?? false,
            featured: existing[p.id]?.featured ?? false,
            inStock: existing[p.id]?.inStock ?? true
          }))
        })

        setTotalProducts(data.total)

      } catch (err) {
        setError("Failed to load products")
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [page, productsPerPage])

  useEffect(() => {
    setPage(1)
  }, [search, category, sort, productsPerPage])

  const handlePageChange = (event, value) => {
    setPage(value)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handlePerPageChange = (e) => {
    setProductsPerPage(e.target.value)
  }

  const categories = useMemo(() => {
    return ["all", ...new Set(products.map(p => p.category))]
  }, [products])


  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      if (user?.role !== "admin" && product.hidden) return false

      const matchesSearch =
        product.title.toLowerCase().includes(search.toLowerCase())

      const matchesCategory =
        category === "all" || product.category === category

      return matchesSearch && matchesCategory
    })
  }, [products, search, category, user])

  const sortedProducts = useMemo(() => {
    let sorted = [...filteredProducts]

    if (sort === "low") sorted.sort((a, b) => a.price - b.price)
    if (sort === "high") sorted.sort((a, b) => b.price - a.price)

    return sorted
  }, [filteredProducts, sort])

  const totalPages = Math.ceil(totalProducts / productsPerPage)

  const toggleHide = (id) => {
    setProducts(prev =>
      prev.map(p =>
        p.id === id ? { ...p, hidden: !p.hidden} : p
      )
    )
  }

  const toggleFeatured = (id) => {
    setProducts(prev => 
      prev.map(p => 
        p.id === id ? {...p, featured: !p.featured} :p
      )
    )
  }

  const toggleStock = (id) => {
    setProducts(prev =>
      prev.map(p =>
        p.id === id ? { ...p, inStock: !p.inStock} : p
      )
    )
  }

  if (loading) {
    return (
      <Container sx={{ mt: 5, textAlign: "center" }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Loading products...</Typography>
      </Container>
    )
  }

  if (error) {
    return (
      <Container sx={{ mt: 5, textAlign: "center" }}>
        <Typography color="error">{error}</Typography>
      </Container>
    )
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 6 }}>

      {/* 🔍 Filters */}
      <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
        
        <TextField
          label="Search products"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          size="small"
        >
          {categories.map(cat => (
            <MenuItem key={cat} value={cat}>{cat}</MenuItem>
          ))}
        </Select>

        <Select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          size="small"
        >
          <MenuItem value="">None</MenuItem>
          <MenuItem value="low">Price: Low → High</MenuItem>
          <MenuItem value="high">Price: High → Low</MenuItem>
        </Select>

      </Box>

      {sortedProducts.length === 0 ? (
        <Typography>No products found</Typography>
      ) : (
        <Grid container spacing={3}>
          {sortedProducts.map(product => (
            <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>

              <ProductCard 
                product={product}
                toggleHide={toggleHide}
                toggleFeatured={toggleFeatured}
                toggleStock={toggleStock} 
              />

            </Grid>
          ))}
        </Grid>
      )}

      <Box sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        mt: 5,
      }}>

        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Products per page</InputLabel>
          <Select
            value={productsPerPage}
            label="Products per page"
            onChange={handlePerPageChange}
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={8}>8</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
          </Select>
        </FormControl>

        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
          size="large"
        />

        <Box sx={{ minWidth: 150 }} />

      </Box>

    </Container>
  )
}

export default ProductList