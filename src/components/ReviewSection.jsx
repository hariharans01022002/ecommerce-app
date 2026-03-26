import { useState, useEffect } from "react"
import {
  Box,
  Typography,
  TextField,
  Button,
  Rating
} from "@mui/material"

const ReviewSection = ({ productId }) => {

  const [reviews, setReviews] = useState([])
  const [name, setName] = useState("")
  const [comment, setComment] = useState("")
  const [rating, setRating] = useState(0)
  const [image, setImage] = useState("")

  useEffect(() => {
    const allReviews = JSON.parse(localStorage.getItem("reviews")) || []
    const productReviews = allReviews.filter(r => r.productId === productId)
    setReviews(productReviews)
  }, [productId])

  const handleImage = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      setImage(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = () => {
    if (!name || !comment || rating === 0) return

    const newReview = {
      id: Date.now(),
      productId,
      name,
      comment,
      rating,
      image,
      date: new Date().toLocaleString()
    }

    const existing = JSON.parse(localStorage.getItem("reviews")) || []

    localStorage.setItem(
      "reviews",
      JSON.stringify([...existing, newReview])
    )

    setReviews(prev => [...prev, newReview])

    setName("")
    setComment("")
    setRating(0)
    setImage("")
  }

  return (
    <Box sx={{ mt: 5 }}>

      <Typography variant="h5" gutterBottom>
        Reviews
      </Typography>

      <Box sx={{ mb: 3 }}>
        <TextField
          label="Your Name"
          fullWidth
          sx={{ mb: 2 }}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <TextField
          label="Comment"
          fullWidth
          multiline
          rows={3}
          sx={{ mb: 2 }}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <Rating
          value={rating}
          onChange={(e, newValue) => setRating(newValue)}
        />

        <Box sx={{ mt: 2 }}>
          <input type="file" onChange={handleImage} />
        </Box>

        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={handleSubmit}
        >
          Submit Review
        </Button>
      </Box>

      {reviews.length === 0 ? (
        <Typography>No reviews yet</Typography>
      ) : (
        reviews.map(review => (
          <Box key={review.id} sx={{ mb: 3, p: 2, border: "1px solid #ddd", borderRadius: 2 }}>

            <Typography fontWeight="bold">
              {review.name}
            </Typography>

            <Rating value={review.rating} readOnly />

            <Typography sx={{ mt: 1 }}>
              {review.comment}
            </Typography>

            {review.image && (
              <Box
                component="img"
                src={review.image}
                sx={{ width: 100, mt: 1, borderRadius: 2 }}
              />
            )}

            <Typography variant="caption" color="text.secondary">
              {review.date}
            </Typography>

          </Box>
        ))
      )}

    </Box>
  )
}

export default ReviewSection