import { BrowserRouter} from "react-router-dom"
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { CartProvider } from "./Context/CartContext.jsx"
import { AuthProvider } from "./Context/AuthContext.jsx"

createRoot(document.getElementById('root')).render(
    
    <BrowserRouter>
        <AuthProvider>
            <CartProvider>
                <App />
            </CartProvider>  
        </AuthProvider>
    </BrowserRouter>
    
)
