import React, { Component, FC, useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, View, Image, ImageBackground, Platform, NativeModules, Button, Pressable, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LogTab from "./LogTab";

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
        }).catch(() => {
            this.verify = false
        })
    }
    async on() {
        await this.wait
        return {
            get: async (at, init) => {
                return this.verify ? await fetch(`${host}/api/${at}`, {
                    ...init, method: 'GET', headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${this.token}`
                    }
                }).then(res => {
                    return res.json()
                }).catch(() => null) : null
            },
            post: async (at, init) => {
                return this.verify ? await fetch(`${host}/api/${at}`, {
                    ...init, method: 'POST', headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.token}`
                    }
                }).then(res => {
                    return res.json()
                }).catch(() => null) : null
            }
        }
    }
}

export const AuthContext = React.createContext({})

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [error, setError] = useState()
    const [DIP, setDIP] = useState(new dip())

    const logout = async () => {
        await AsyncStorage.removeItem('mis.ammart.token')
        setIsAuthenticated(false)
        setUser()
    }

    const init = async () => {
        const token = await AsyncStorage.getItem('mis.ammart.token')
        if (token) {
            const auth = await fetch(`${host}/api/v1/user/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            const { data } = await auth.json()
            setUser(data)
            if (auth.status === 200) {
                setDIP(await new dip(token, logout))
                setUser(data.user)
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
            try {
                const res = await fetch(`${host}/api/v1/user/auth/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        'user_id': username,
                        'password': password
                    })
                })
                const data = await res.json()
                if (res.status === 200) {
                    setIsLoggedIn(false)
                    setUser(data.user)
                    setIsAuthenticated(true)
                    AsyncStorage.setItem('mis.ammart.token', data.token)
                    return
                }
                setError(res.message)
                logout()
            } catch (error) {}
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
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                isAuthenticated,
                loading,
                isLoggedIn,
                dip: DIP
            }}
        // style={{ flex: 1 }}
        >
            {loading && children}
            <LogTab content={user}></LogTab>
        </AuthContext.Provider>
    )
}