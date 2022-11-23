import React, { Component, FC, useEffect, useMemo, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios, { AxiosRequestConfig } from 'axios'

export interface User {
   firstname: string
}

class dip {
    private verify = false;
    private wait: Promise<any>
    constructor(private token: string, private logout: () => void) {
        this.wait = fetch('/api/admin/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`,
            },
        }).then(res => res.status < 500 ? res.json() : { code: res.status }).then(res => {
            if (res.code === 200) {
                this.verify = true
            } else {
                this.logout()
            }
        })
    }
    async fetch(at: string, method: AxiosRequestConfig['method'], init?: AxiosRequestConfig) {
        await this.wait
        return this.verify ? (
            await axios({
                ...init,
                url: at,
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`,
                }
            }).then(a => a.data).catch(a=>a.response.data)
        ) : null
    }
}

export interface AuthContextType {
    isAuthenticated: boolean
    user: User | null
    login: (username?: string, password?: string) => void
    logout: () => void
    loading: boolean,
    isLoggedIn: boolean,
    dip?: dip
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
    const [dip_, setDip] = useState<dip>();

    const init = async () => {
        const token = localStorage.getItem('mis.ammart.token')
        if (token) {
            const auth = await fetch('/api/admin/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            }).then(res => res.status < 500 ? res.json() : { code: res.status,message: res.statusText })
            if (auth.code === 200) {
                setDip(await new dip(token, logout))
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
                position: "top-center",
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
            const res = await fetch('/api/admin/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'user': username,
                    'password': password
                })
            }).then(res => res.status < 500 ? res.json() : { code: res.status,message: res.statusText })
            if (res.code === 200) {
                setDip(await new dip(res.data.token, logout))
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
            dip: dip_
        }}>
            <ToastContainer
                position="top-center"
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