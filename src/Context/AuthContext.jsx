import { createContext, useContext, useState } from "react"

const AuthContext = createContext()

const users = [
  { username: "admin", password: "123", role: "admin" },
  { username: "hari", password: "123", role: "user" },
  { username: "ram", password: "123", role: "user" },
  { username: "raj", password: "123", role: "user" }
]

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user")
    return savedUser ? JSON.parse(savedUser) : null
  })

  const login = (username, password) => {

    const found = users.find(
      u => u.username === username && u.password === password
    )

  if (found) {
      setUser(found)
      localStorage.setItem("user", JSON.stringify(found))
      return true
    } else {
      return false
    }
  }


  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)