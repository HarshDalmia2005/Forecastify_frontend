import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { WeatherProvider } from './context/WeatherContext.jsx'
import { AuthProvider, useAuth } from './context/AuthContext.jsx'
import Register from './Auth/Register.jsx'
import Index from './Index.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <WeatherProvider>
       <Index/>
      </WeatherProvider>
    </AuthProvider>
  </React.StrictMode>,
)
