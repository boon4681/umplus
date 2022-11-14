import { StyleSheet, Text, View, Image, ImageBackground, Platform, NativeModules } from 'react-native';
import Logo from '../../assets/Logo.png'
import MENUICON from '../../assets/menu_icon.png'
import { useAuth } from '../hooks/useAuth';

export default function Header() {
    const { isAuthenticated } = useAuth()
    return (
        <View className="flex items-center w-full flex-row">
            <Image className="w-[100px] h-[80px]" source={Logo} />
            {isAuthenticated && <View className="ml-auto h-full flex justify-center">
                <Image className="w-[24px] h-[24px]" source={MENUICON} />
            </View>}
        </View>
    )
}