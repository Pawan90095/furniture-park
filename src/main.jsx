import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <GoogleOAuthProvider clientId="950922748030-tpnqpnmo9pk7rt930g7br7mp4glkaa52.apps.googleusercontent.com">
            <BrowserRouter>
                <CartProvider>
                    <App />
                </CartProvider>
            </BrowserRouter>
        </GoogleOAuthProvider>
    </React.StrictMode>,
)
