import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { HashRouter } from "react-router-dom"
import { GoogleOAuthProvider } from "@react-oauth/google"
import "./index.css"
import App from "./App.jsx"
import { CartProvider } from "./context/CartContext.jsx"
import { AuthProvider } from "./context/AuthContext.jsx"

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID ?? ""

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>
      <GoogleOAuthProvider clientId={googleClientId}>
        <AuthProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </AuthProvider>
      </GoogleOAuthProvider>
    </HashRouter>
  </StrictMode>
)
