import React from 'react'
import { useAuth } from './context/AuthContext'
import Register from './Auth/Register'
import Login from './Auth/Login'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import App from './App'

const Index = () => {
    const { isAuthenticated } = useAuth()
    return (
        <Router>
            <Routes>
                <Route path='/Main' element={isAuthenticated ? <App/> : <Register />} ></Route>
                <Route path='/' element={!isAuthenticated ? <Register /> : <Navigate to='/Main' />} ></Route>
                <Route path='/Login' element={!isAuthenticated ? <Login /> : <Navigate to='/Main' />} ></Route>
            </Routes>
        </Router>
    )
}

export default Index