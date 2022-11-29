import { StyleSheet, Text, View, Image, ImageBackground, Platform, NativeModules, Button, Pressable, TouchableOpacity, KeyboardAvoidingView, Keyboard } from 'react-native';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BG from '../../assets/BG.png'
import { useKeyboard } from '../hooks/useKeyboard';
import Header from './Header';

export default function Container({ children, header, scroll }) {
    const insect = useSafeAreaInsets()
    const keyboard = useKeyboard()

    return (
        <View className="w-full h-screen" style={{ flex: 1, paddingBottom: insect.bottom }}>
            <Image className="absolute w-full" source={BG} />
            <View style={{ paddingTop: insect.top }}>
                {header ? header() : <Header />}
            </View>
            {scroll ?
                <ScrollView className="px-5 pt-3 flex flex-col w-full box-border relative" style={{ flex: 1, marginTop: Platform.OS === 'ios' ? -keyboard / 2 : -keyboard }}>
                    {children}
                </ScrollView>
                :
                <View className="px-5 pt-3 flex flex-col w-full box-border relative" style={{ flex: 1 }}>
                    {children}
                </View>
            }
        </View>
    )
}