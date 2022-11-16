import { StyleSheet, Text, View, Image, ImageBackground, Platform, NativeModules, Button, Pressable, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Logo from '../../assets/Logo.png'
import MENUICON from '../../assets/menu_icon.png'
import { useAuth } from '../hooks/useAuth';


const LoggedIn = () => {
    const navigation = useNavigation();
    return (
        <View className="ml-auto h-full flex justify-center">
            <TouchableOpacity 
            className="p-2"
            onPress={() => {
                navigation.navigate('Setting')
            }}>
                <Image className="w-[24px] h-[24px]" source={MENUICON} />
            </TouchableOpacity>
        </View>
    )
}

export default function Header() {
    const { isAuthenticated } = useAuth()

    return (
        <View className="px-5 pt-8">
            <View className="flex items-center w-full h-[60px] flex-row">
                <Image className="w-[80px] h-[60px] -mt-2" source={Logo} />
                {isAuthenticated && <LoggedIn />}
            </View>
        </View>
    )
}