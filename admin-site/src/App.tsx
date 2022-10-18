import { useState } from 'react'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import './style/global.pcss'
import './style/index.scss'
import { Routes, Route } from "react-router-dom";

function App() {
    const isLogin = false
    return (
        <div className='flex justify-center'>
            <Routes>
                <Route path="/" element={isLogin ? <Dashboard /> : <Login />}></Route>
            </Routes>
        </div>
    )
}

export default App
