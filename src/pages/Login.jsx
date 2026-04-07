import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Box, TextField, Button, Typography, Paper } from "@mui/material"
import { useAuth } from "../Context/AuthContext"

const Login = () => {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (!username.trim() || !password.trim()) {
      setError("Please enter username and password")
      return
    }

    setLoading(true)
    const success = await login(username.trim(), password)
    setLoading(false)

    if (!success) {
      setError("Invalid username or password")
      return
    }

    navigate("/")
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#f5f5f5",
        p: 2
      }}
    >
      <Paper
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: "100%",
          maxWidth: 360,
          p: 4,
          borderRadius: 3,
          boxShadow: 3
        }}
      >
        <Typography variant="h5" sx={{ mb: 3, textAlign: "center", fontWeight: 700 }}>
          Login
        </Typography>

        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          margin="normal"
          autoComplete="username"
        />

        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          autoComplete="current-password"
        />

        {error && (
          <Typography color="error" sx={{ mt: 1, mb: 1 }}>
            {error}
          </Typography>
        )}

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2, py: 1.2 }}
          disabled={loading}
        >
          {loading ? "Signing in..." : "Login"}
        </Button>
      </Paper>
    </Box>
  )
}

export default Login