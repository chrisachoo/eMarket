import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext'
import { CartProvider } from 'react-use-cart'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <CartProvider>
      <Router>
        <App />
      </Router>
    </CartProvider>
  </AuthContextProvider>
)
