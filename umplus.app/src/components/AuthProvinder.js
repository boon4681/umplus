import React, { Component, FC, useEffect, useMemo, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const host = 'http://159.223.71.170:5173'

class dip {
    verify = false;
    wait = null
    token = ''
    logout = () => { }
    constructor(token, logout) {
        this.token = token
        this.logout = logout
        this.wait = fetch(`${host}/api/v1/user/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            }
        }).then(res => res.status < 500 ? res.json() : { code: res.status }).then(res => {
            if (res.code === 200) {
                this.verify = true
            } else {
                this.logout()
            }
        }).catch(()=>{
            this.verify = false
        })
    }
    async on() {
        await this.wait
        return {
            get: async (at, init) => {
                return this.verify ? await fetch(at, {
                    ...init, method: 'GET', headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${this.token}`
                    }
                }).then(res => {
                    return res.json()
                }).catch(()=>null) : null
            },
            post: async (at, init) => {
                return this.verify ? await fetch(at, {
                    ...init, method: 'POST', headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.token}`
                    }
                }).then(res => {
                    return res.json()
                }).catch(()=>null) : null
            }
        }
    }
}

export const AuthContext = React.createContext()

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [error, setError] = useState(null)
    const [DIP, setDIP] = useState()

    const logout = () => {
        setUser(null)
        setIsAuthenticated(false)
        AsyncStorage.removeItem('mis.ammart.token')
    }

    const init = async () => {
        const token = AsyncStorage.getItem('mis.ammart.token')
        if (token) {
            const auth = await fetch('http://159.223.71.170:5173/api/v1/user/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }).then(res => res.status < 500 ? { code: res.status, ...res.json() } : { code: res.status }).catch(()=>{return {code: 500}})
            if (auth.code === 200) {
                setDIP(await new dip(token, logout))
                setUser(auth.data.user)
                setIsAuthenticated(true)
            } else {
                logout()
            }
        }
        setLoading(true)
    }
    const login = async (username, password) => {
        setIsLoggedIn(true)
        if (username && password) {
            const res = await fetch('http://159.223.71.170:5173/api/v1/user/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'user': username,
                    'password': password
                })
            }).catch(()=>{return {code: 500}})
            if (res.code === 200) {
                setIsLoggedIn(false)
                setUser(res.data.user)
                setIsAuthenticated(true)
                AsyncStorage.setItem('mis.ammart.token', res.data.token)
                return
            }
            setError(res.message)
            logout()
        }
        setIsLoggedIn(false)
    }
    useEffect(() => {
        init()
    }, [])
    useEffect(() => {
        // ERROR
    }, [error])

    return (
        <AuthContext.Provider value={{
            user,
            login,
            logout,
            isAuthenticated,
            loading,
            isLoggedIn,
            dip: DIP
        }}>
            {loading && children}
        </AuthContext.Provider>
    )
}