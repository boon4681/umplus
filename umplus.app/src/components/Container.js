import { StyleSheet, Text, View, Image, ImageBackground, Platform, NativeModules, Button, Pressable, TouchableOpacity, KeyboardAvoidingView, Keyboard } from 'react-native';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BG from '../../assets/BG.png'
import Header from './Header';

export default function Container({ children, header }) {
    const insect = useSafeAreaInsets()
    return (
        <View className="w-full h-screen" style={{ flex: 1 }}>
            <Image className="absolute w-full" source={BG} />
            <View style={{paddingTop:insect.top}}>
            {header ? header() : <Header />}
            </View>
            <KeyboardAvoidingView behavior='position' className="flex-1 relative overflow-hidden">
                <View className="px-5 pt-3 flex flex-col w-full h-screen box-border absolute" style={{ flex: 1 }}>
                    {children}
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}