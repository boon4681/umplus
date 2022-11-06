import { useState } from 'react'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import './style/global.pcss'
import './style/index.scss'
import { Routes, Route, useRoutes } from "react-router-dom";
import { useAuth } from './hooks/useAuth'

function App() {
    const { isAuthenticated } = useAuth()
    return (
        <div className='flex justify-center'>
            <Routes>
                <Route path="/*" element={isAuthenticated == true ? <Dashboard /> : <Login />}></Route>
            </Routes>
        </div>
    )
}

export default App
