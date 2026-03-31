import React from 'react'
import { useState } from "react"
import{ useAuth } from "../Context/AuthContext"
import { Box, TextField, Button, Typography, Paper } from "@mui/material"

const Login = () => {
    const { login } = useAuth()

    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleLogin = () => {
    const success = login(userName, password)
    if (!success) {
        setError("Invalid username or password")
    } else {
        setError("")
    }
    }

  return (
    <Box 
        sx={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "#f5f5f5"
        }}
    >
        <Paper sx={{ p:4, width: 300}}>

            <Typography variant="h5" sx={{ mb: 2, textAlign: "center" }}>
            Login
            </Typography>

            <TextField
            label="Username"
            fullWidth
            margin="normal"
            onChange={(e) => setUserName(e.target.value)}
            />

            <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            onChange={(e) => setPassword(e.target.value)}
            />

            <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleLogin}
            >
            Login
            </Button>


            {error && (
            <Typography color="error" sx={{ mt: 1 }}>
                {error}
            </Typography>
            )}

        </Paper>
    </Box>
  )
}

export default Login
