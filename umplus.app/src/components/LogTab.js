import React, { Component, FC, useEffect, useMemo, useState, useRef } from "react";
import { StyleSheet, Text, View, Image, ImageBackground, Platform, NativeModules, Button, Pressable, TouchableOpacity, Animated, Easing } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default ({ content }) => {
    const [open, setOpen] = useState(true)
    return (
        <View className="absolute top-6 w-full">
            <Animated.Text className={`absolute text-white bg-black/50 w-full px-6`} style={{ opacity: open ? 1 : 0 }}>
                {JSON.stringify(content, null, 4) + '\n'}
            </Animated.Text>
            <TouchableOpacity
                onPress={() => {
                    setOpen(!open)
                }}
                className={'w-4 h-12 shadow-lg absolute z-10 bg-white rounded-r-xl flex justify-center items-center'}
            >
                <Text className="font-LINESeedRg text-lg">{open ? '<' : '>'}</Text>
            </TouchableOpacity>
        </View>
    )
}