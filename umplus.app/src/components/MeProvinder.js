
import React, { Component, createContext, FC, useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, View, Image, ImageBackground, Platform, NativeModules, Button, Pressable, TouchableOpacity } from 'react-native';
import { useAuth } from "../hooks/useAuth";

export const MeContext = React.createContext({})

export const MeProvinder = ({ children }) => {
    const { dip,isAuthenticated } = useAuth()
    const [me, setMe] = useState()
    const load = () => {
        if (dip) {
            dip.fetch('user/@me','POST').then(data => {
                if (data) {
                    setMe(data)
                }
            })
        }
    }
    useEffect(()=>{
        load()
    },[isAuthenticated])
    useEffect(() => {
        load()
        const i = setInterval(() => {
            load()
        }, 1000)
        return () => clearInterval(i)
    }, [])
    return (
        <MeContext.Provider
            value={me}
        >
            {children}
        </MeContext.Provider>
    )
}