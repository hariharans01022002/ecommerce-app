import { useState, useEffect, useMemo } from "react"
import {
  Box,
  Typography,
  TextField,
  Button,
  Rating,
  Stack,
  Paper,
  Alert,
  IconButton
} from "@mui/material"
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera"
import DeleteIcon from "@mui/icons-material/Delete"

const ReviewSection = ({ productId }) => {
  const [reviews, setReviews] = useState([])
  const [name, setName] = useState("")
  const [comment, setComment] = useState("")
  const [rating, setRating] = useState(0)
  const [image, setImage] = useState("")
  const [feedback, setFeedback] = useState({ type: "", message: "" })

  useEffect(() => {
    const allReviews = JSON.parse(localStorage.getItem("reviews")) || []
    const productReviews = allReviews
      .filter((r) => r.productId === productId)
      .sort((a, b) => new Date(b.date) - new Date(a.date))

    setReviews(productReviews)
  }, [productId])

  const averageRating = useMemo(() => {
    if (reviews.length === 0) return 0
    return reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
  }, [reviews])

  const handleImage = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      setImage(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const resetForm = () => {
    setName("")
    setComment("")
    setRating(0)
    setImage("")
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim() || !comment.trim() || rating === 0) {
      setFeedback({
        type: "error",
        message: "Please add your name, comment, and rating."
      })
      return
    }

    const newReview = {
      id: Date.now(),
      productId,
      name: name.trim(),
      comment: comment.trim(),
      rating,
      image,
      date: new Date().toISOString()
    }

    const existing = JSON.parse(localStorage.getItem("reviews")) || []
    const updatedReviews = [newReview, ...existing]
    localStorage.setItem("reviews", JSON.stringify(updatedReviews))

    setReviews((prev) => [newReview, ...prev])
    resetForm()
    setFeedback({ type: "success", message: "Review submitted successfully." })
  }

  return (
    <Box sx={{ mt: 5 }}>
      <Typography variant="h5" gutterBottom>
        Reviews
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          mb: 4,
          p: 3,
          borderRadius: 3,
          border: "1px solid #e0e0e0",
          bgcolor: "#fafafa"
        }}
      >
        <Stack spacing={2}>
          <Box>
            <Typography variant="subtitle1" fontWeight={700}>
              Write a review
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Share your experience with this product.
            </Typography>
          </Box>

          {feedback.message && (
            <Alert severity={feedback.type}>{feedback.message}</Alert>
          )}

          <TextField
            label="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />

          <TextField
            label="Comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            fullWidth
            multiline
            rows={3}
          />

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Rating
              value={rating}
              onChange={(e, newValue) => setRating(newValue || 0)}
            />
            <Typography color="text.secondary">
              {rating ? `${rating} / 5` : "Add a rating"}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
            <Button
              variant="outlined"
              component="label"
              startIcon={<PhotoCameraIcon />}
            >
              Upload Image
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={handleImage}
              />
            </Button>

            {image && (
              <Box
                sx={{
                  position: "relative",
                  width: 80,
                  height: 80,
                  borderRadius: 2,
                  overflow: "hidden",
                  border: "1px solid #ddd"
                }}
              >
                <Box
                  component="img"
                  src={image}
                  alt="Review preview"
                  sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <IconButton
                  size="small"
                  onClick={() => setImage("")}
                  sx={{
                    position: "absolute",
                    top: 4,
                    right: 4,
                    bgcolor: "rgba(255,255,255,0.9)"
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            )}
          </Box>

          <Button type="submit" variant="contained">
            Submit Review
          </Button>
        </Stack>
      </Box>

      <Box sx={{ mb: 3, display: "flex", alignItems: "center", gap: 2 }}>
        <Typography variant="subtitle1" fontWeight={700}>
          {reviews.length} review{reviews.length !== 1 ? "s" : ""}
        </Typography>

        {reviews.length > 0 && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Rating value={averageRating} precision={0.1} readOnly size="small" />
            <Typography color="text.secondary">
              {averageRating.toFixed(1)} average
            </Typography>
          </Box>
        )}
      </Box>

      {reviews.length === 0 ? (
        <Typography color="text.secondary">No reviews yet</Typography>
      ) : (
        <Stack spacing={2}>
          {reviews.map((review) => (
            <Paper key={review.id} sx={{ p: 3, borderRadius: 3 }}>
              <Stack spacing={1}>
                <Box sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 1 }}>
                  <Typography fontWeight={700}>{review.name}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(review.date).toLocaleString()}
                  </Typography>
                </Box>

                <Rating value={review.rating} readOnly size="small" />

                <Typography>{review.comment}</Typography>

                {review.image && (
                  <Box
                    component="img"
                    src={review.image}
                    alt={`${review.name} review`}
                    sx={{
                      width: "100%",
                      maxWidth: 320,
                      borderRadius: 2,
                      mt: 1,
                      border: "1px solid #e0e0e0"
                    }}
                  />
                )}
              </Stack>
            </Paper>
          ))}
        </Stack>
      )}
    </Box>
  )
}

export default ReviewSection