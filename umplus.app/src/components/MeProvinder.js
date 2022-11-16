
import React, { Component, createContext, FC, useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, View, Image, ImageBackground, Platform, NativeModules, Button, Pressable, TouchableOpacity } from 'react-native';
import { useAuth } from "../hooks/useAuth";

export const MeContext = React.createContext({})

export const MeProvinder = ({ children }) => {
    const { dip } = useAuth()
    const [me, setMe] = useState()
    useEffect(() => {
        const load = () => {
            if (dip) {
                dip.on().then(a => a.post('v1/user/@me').then(data => {
                    if (data) {
                        setMe(data)
                    }
                }))
            }
        }
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