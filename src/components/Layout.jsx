import { Box } from "@mui/material"
import Navbar from "./Navbar"
import { Outlet } from "react-router-dom"

const Layout = () => {
  return (
    <>
      <Navbar />
      <Box
        component="main"
        sx={{
          minHeight: "calc(100vh - 72px)",
          pt: 4,
          pb: 6,
          bgcolor: "#f5f5f5"
        }}
      >
        <Outlet />
      </Box>
    </>
  )
}

export default Layout