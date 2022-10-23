import React, { Component, FC, useEffect, useMemo, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export interface User {
    name: string
}

export interface AuthContextType {
    isAuthenticated: boolean
    user: User | null
    login: (username?: string, password?: string) => void
    logout: () => void
    loading: boolean,
    isLoggedIn: boolean,
}

export const AuthContext = React.createContext<AuthContextType>(
    {} as AuthContextType
)

const AuthProvider: FC<JSX.IntrinsicElements['div']> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [error, setError] = useState<any>();

    const init = async () => {
        const token = localStorage.getItem('mis.ammart.token')
        if (token) {
            const auth = await fetch('/api/v1/admin/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },

            }).then(res => res.json())
            if (auth.code === 200) {
                setUser(auth.data.user)
                setIsAuthenticated(true)
            } else {
                logout()
            }
        }
        setLoading(true)
    }

    useEffect(() => {
        init()
    }, [])

    useEffect(() => {
        if (error != undefined) {
            toast.error(`🍌 ${error}`, {
                position: "top-right",
                theme: 'dark',
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setError(null)
        }
    }, [error])
    
    const login = async (username?: string, password?: string) => {
        setIsLoggedIn(true)
        if (username && password) {
            const res = await fetch('/api/v1/admin/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'user': username,
                    'password': password
                })
            }).then(res => res.json())
            if (res.code === 200) {
                setIsLoggedIn(false)
                setUser(res.data.user)
                setIsAuthenticated(true)
                localStorage.setItem('mis.ammart.token', res.data.token)
                return
            }
            setError(res.message)
            logout()
        }
        setIsLoggedIn(false)
    }

    const logout = () => {
        setUser(null)
        setIsAuthenticated(false)
        localStorage.removeItem('mis.ammart.token')
    }

    return (
        <AuthContext.Provider value={{
            user,
            login,
            logout,
            isAuthenticated,
            loading,
            isLoggedIn: isLoggedIn,
        }}>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                limit={6}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            {loading && children}
        </AuthContext.Provider>
    )
}

export default AuthProvider