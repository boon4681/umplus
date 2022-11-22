import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ImageBackground, Platform, NativeModules, KeyboardAvoidingView } from 'react-native';
import { useEffect, useCallback } from 'react';
import { AuthProvider } from './src/components/AuthProvinder';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import ToastManager from 'toastify-react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import 'intl';
import 'intl/locale-data/jsonp/en';
import 'intl/locale-data/jsonp/th';
import 'intl/locale-data/jsonp/th-TH';

import Logo from './assets/Logo.png'
import MENUICON from './assets/menu_icon.png'
import BG from './assets/BG.png'
import Scan_btn from './assets/scan_btn.png'
import Nav_bg from './assets/nav.png'
import Header from './src/components/Header';
import Login from './src/pages/Login';
import Routes from './src/Routes';

function loadFont() {
    const [fontsLoaded] = useFonts({
        'LINESeedRg': require('./assets/fonts/LINESeedSansTH_W_Rg.otf'),
        'LINESeedTh': require('./assets/fonts/LINESeedSansTH_W_Th.otf'),
        'LINESeedHe': require('./assets/fonts/LINESeedSansTH_W_He.otf'),
        'LINESeedBd': require('./assets/fonts/LINESeedSansTH_W_Bd.otf'),
        'LINESeedXBd': require('./assets/fonts/LINESeedSansTH_W_XBd.otf'),
    });

    useEffect(() => {
        async function prepare() {
            await SplashScreen.preventAutoHideAsync();
        }
        prepare();
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return { fontsLoaded: null, onLayoutRootView };
    }
    return { fontsLoaded, onLayoutRootView }
}

export default function App() {
    const { fontsLoaded, onLayoutRootView } = loadFont()
    if (!fontsLoaded) {
        return <SafeAreaProvider>
            <View className="flex w-full h-full" onLayout={onLayoutRootView}></View>
            <StatusBar style="auto" />
        </SafeAreaProvider>
    }
    return (
        <SafeAreaProvider>
            <ToastManager className="font-LINESeedRg select-none pointer-events-none" width={300} height={75} />
            <View behavior='padding' className="flex-1 min-h-screen" onLayout={onLayoutRootView}>
                <AuthProvider>
                    <Routes></Routes>
                </AuthProvider>
            </View>
            <StatusBar style="auto" />
        </SafeAreaProvider>
    );
}
