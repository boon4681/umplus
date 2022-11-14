import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ImageBackground, Platform, NativeModules } from 'react-native';
import { useEffect, useCallback } from 'react';
import Logo from './assets/Logo.png'
import MENUICON from './assets/menu_icon.png'
import BG from './assets/BG.png'
import Scan_btn from './assets/scan_btn.png'
import Nav_bg from './assets/nav.png'
import Header from './src/components/Header';
import Login from './src/pages/Login';
import { AuthProvider } from './src/components/AuthProvinder';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

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
    return (
        <AuthProvider>
            <View className="flex" onLayout={onLayoutRootView}>
                <Image className={`w-full h-full`} source={BG} />
                <Login></Login>
                <StatusBar style="auto" />
            </View>
        </AuthProvider>
    );
}
