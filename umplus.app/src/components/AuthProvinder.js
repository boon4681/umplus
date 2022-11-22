import React, { Component, FC, useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, View, Image, ImageBackground, Platform, NativeModules, Button, Pressable, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Toast } from 'toastify-react-native'
import axios from 'axios'
import LogTab from "./LogTab";

// const host = 'http://159.223.71.170:5173'
// const host = 'http://192.168.0.100:5173'
const host = 'http://192.168.87.29:5173'

class dip {
    verify = false;
    wait = null
    token = ''
    logout = () => { }
    constructor(token, logout) {
        this.token = token
        this.logout = logout
        this.wait = fetch(`${host}/api/user/auth/login`, {
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
    async fetch(at, method, init) {
        await this.wait
        return this.verify ? (
            await axios({
                ...init,
                url: `${host}/api/${at}`,
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`,
                }
            }).then(a => a.data)
        ) : null
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
        await AsyncStorage.removeItem('umplus.boon4681.token')
        setIsAuthenticated(false)
        setUser()
    }

    const init = async () => {
        const token = await AsyncStorage.getItem('umplus.boon4681.token')
        if (token) {
            const auth = await fetch(`${host}/api/user/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            if (auth.status === 200) {
                const { data } = await auth.json()
                setUser(data)
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
        try {
            if (username && password) {
                setUser(`${host}/api/user/auth/login`)
                const res = await fetch(`${host}/api/user/auth/login`, {
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
                    setDIP(await new dip(data.token, logout))
                    setIsAuthenticated(true)
                    AsyncStorage.setItem('umplus.boon4681.token', data.token)
                    return
                }
                setError(data.message)
                logout()
            }
        } catch (error) {
        }
        setIsLoggedIn(false)
    }
    useEffect(() => {
        init()
    }, [])
    useEffect(() => {
        if (error) {
            Toast.error(`🍌 ${error}`)
            setError(null)
        }
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