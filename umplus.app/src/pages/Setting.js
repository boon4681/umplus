import { StyleSheet, Text, View, Image, ImageBackground, Platform, NativeModules, Button, Pressable, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Container from '../components/Container';
import { useAuth } from '../hooks/useAuth';



import BackARROW from '../../assets/icons/back_arrow.png'

const Header = () => {
    const navigation = useNavigation()

    return (
        <View className="px-5 pt-2">
            <View className="flex items-center w-full h-[60px] flex-row">
                <TouchableOpacity
                    className="basis-1/3"
                    onPress={() => {
                        navigation.pop()
                    }}>
                    <Image className="w-[32px] h-[32px]" source={BackARROW} />
                </TouchableOpacity>
                <View className="basis-1/3 flex items-center mt-2">
                    <Text className="font-LINESeedRg text-xl">การตั้งค่า</Text>
                    <Text className="font-LINESeedRg -mt-2">Setting</Text>
                </View>
            </View>
        </View>
    )
}

export default () => {

    const { logout } = useAuth()
    const navigation = useNavigation()

    return (
        <>
            <Container header={Header}>
                <View className="w-full">
                    <TouchableOpacity onPress={() => {
                        logout()
                    }} className={`px-5 py-3 w-full bg-[#FF4242] rounded-xl flex justify-center items-center mt-3`}>
                        <Text className="text-white font-LINESeedRg text-lg">logout</Text>
                    </TouchableOpacity>
                </View>
            </Container>
        </>
    )
}