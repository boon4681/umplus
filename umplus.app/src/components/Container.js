import { StyleSheet, Text, View, Image, ImageBackground, Platform, NativeModules, Button, Pressable, TouchableOpacity, KeyboardAvoidingView, Keyboard } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import BG from '../../assets/BG.png'
import Header from './Header';

export default function Container({ children, header }) {
    return (
        <>
            <Image className="absolute w-full" source={BG} />
            {header ? header() : <Header />}
            <View className="px-5 pt-3 flex flex-col w-full min-h-screen box-border" style={{flex:1}}>
                {children}
            </View>
        </>
    )
}