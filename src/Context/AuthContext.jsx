import { createContext, useContext, useEffect, useMemo, useState } from "react"

const AuthContext = createContext({
  user: null,
  login: async () => false,
  logout: () => {}
})

const STORAGE_KEY = "ecommerce-user"

const users = [
  { username: "admin", password: "123", role: "admin" },
  { username: "hari", password: "123", role: "user" },
  { username: "ram", password: "123", role: "user" },
  { username: "raj", password: "123", role: "user" }
]

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem(STORAGE_KEY)
      return savedUser ? JSON.parse(savedUser) : null
    } catch {
      return null
    }
  })

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [user])

  const login = async (username, password) => {
    const found = users.find(
      (u) => u.username === username && u.password === password
    )

    if (!found) {
      return false
    }

    const safeUser = { username: found.username, role: found.role }
    setUser(safeUser)
    return true
  }

  const logout = () => {
    setUser(null)
  }

  const value = useMemo(
    () => ({ user, login, logout, isAuthenticated: Boolean(user) }),
    [user]
  )

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)