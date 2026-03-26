import { Container, Typography, Button } from "@mui/material"
import { useNavigate } from "react-router-dom"

const SuccessPage = () => {

  const navigate = useNavigate()

  return (
    <Container sx={{ mt: 5, textAlign: "center" }}>
      
      <Typography variant="h4" gutterBottom>
        🎉 Order Placed Successfully!!
      </Typography>
      
      <Button
        variant="contained"
        sx={{ mt: 3 }}
        onClick={() => navigate("/")}
      >
        Back to Home
      </Button>

    </Container>
  )
}

export default SuccessPage