import { StyleSheet, Text, View, Image, ImageBackground, Platform, NativeModules } from 'react-native';
import BG from '../../assets/BG.png'
import Header from './Header';

export default function Container({ children }) {
    return (
        <>
            <Image className="absolute" source={BG} />
            <Header />
            <View className="px-5 pt-3 flex flex-col w-full min-h-screen box-border">
                {children}
            </View>
        </>
    )
}