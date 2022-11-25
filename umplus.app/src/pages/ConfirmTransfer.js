import { ScrollView, Text, View, Image, ImageBackground, Platform, NativeModules, Button, Pressable, TouchableOpacity, Animated } from 'react-native';
import { useNavigation, useRoute } from "@react-navigation/native"
import BottomTab from "../components/BottomTab"
import Container from "../components/Container"
import BackARROW from '../../assets/icons/back_arrow.png'
import MENUICON from '../../assets/menu_icon.png'
import DOWNARROW from '../../assets/icons/down_arrow.png'
import CARD from '../../assets/card.png'
import Avatar from 'react-native-boring-avatars';
import { useAuth } from '../hooks/useAuth';
import useMe from '../hooks/useMe';
import { useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import { Toast } from 'toastify-react-native'

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

    const { user, dip } = useAuth()
    const [disable, setDisable] = useState(false)
    const route = useRoute()
    const navigation = useNavigation()

    return (
        <>
            <Container header={Header}>
                <View className="w-full relative mt-4 bg-[#0085FF] rounded-xl">
                    <View className="relative">
                        <Text className="font-LINESeedRg text-white text-xl px-3 mt-3">จาก:</Text>
                    </View>
                    <View className="w-full px-4 pb-3 flex flex-row">
                        <View className="basis-1/4">
                            <View className="w-[60px] h-[60px] rounded-[30px] border-2 border-[#1f232548]">
                                <Avatar
                                    size={56}
                                    name={`u${user.user_id + user.firstname}w`}
                                    variant="beam"
                                    colors={['#FF5252', '#FF7752', '#FF9A52', '#FFB752', '#5E405B']}
                                />
                            </View>
                        </View>
                        <View>
                            <Text className="font-LINESeedRg text-white text-xl mt-3">{user.firstname + ' ' + user.lastname}</Text>
                            <Text className="font-LINESeedRg text-white text-md -mt-2.5">เลขประจำตัว: {user.user_id}</Text>
                        </View>
                    </View>
                    <View className="relative pb-2">
                        <Text className="font-LINESeedRg text-white text-xl px-3">ไปยัง:</Text>
                    </View>
                    <View className="relative mx-auto">
                        <Image className="w-5 h-5 absolute -translate-x-2.5 -translate-y-8" source={DOWNARROW}></Image>
                    </View>
                    <View className="w-full px-4 pb-4 flex flex-row">
                        <View className="basis-1/4">
                            <View className="w-[60px] h-[60px] rounded-[30px] border-2 border-[#1f232548]">
                                <Avatar
                                    size={56}
                                    name={`u${route.params.receiver.user_id + route.params.receiver.firstname}w`}
                                    variant="beam"
                                    colors={['#FF5252', '#FF7752', '#FF9A52', '#FFB752', '#5E405B']}
                                />
                            </View>
                        </View>
                        <View>
                            <Text className="font-LINESeedRg text-white text-xl mt-3">{route.params.receiver.firstname + ' ' + route.params.receiver.lastname}</Text>
                            <Text className="font-LINESeedRg text-white text-md -mt-2.5">เลขประจำตัว: {route.params.receiver.user_id}</Text>
                        </View>
                    </View>
                </View>
                <Text className="font-LINESeedRg text-[#46464699] text-lg mt-5">
                    จำนวน
                </Text>
                <View className="flex flex-row border-b border-b-[#46464699]">
                    <Text
                        className="font-LINESeedRg text-[#46464699] text-[20px] text-right pr-10 mr-8 w-full"
                    >{route.params.amount}</Text>
                    <Text className="font-LINESeedRg text-[#00000099] text-[20px] absolute right-0">
                        บาท
                    </Text>
                </View>
                <Text className="font-LINESeedRg text-[#46464699] text-lg">
                    ค่าธรรมเนียม
                </Text>
                <View className="flex flex-row border-b border-b-[#46464699]">
                    <Text
                        className="font-LINESeedRg text-[#46464699] text-[20px] text-right pr-10 mr-8 w-full"
                    >0</Text>
                    <Text className="font-LINESeedRg text-[#00000099] text-[20px] absolute right-0">
                        บาท
                    </Text>
                </View>
                <View className="w-full">
                    <TouchableOpacity
                        disabled={disable}
                        onPress={() => {
                            setDisable(true)
                            dip.fetch('user/transaction/create', "POST", {
                                data: {
                                    amount: route.params.amount,
                                    account: route.params.receiver.user_id,
                                    info: route.params.info
                                }
                            }).then(a => {
                                if (a) {
                                    Toast.success(a.message)
                                    navigation.navigate('Home')
                                }
                                setDisable(false)
                            })
                        }}
                        className={`px-5 py-3 w-full ${disable ? 'bg-[#0084ff70]' : 'bg-[#0084ff]'} rounded-xl flex justify-center items-center mt-10`}
                    >
                        <Text className="text-white font-LINESeedRg text-lg">ตกลง</Text>
                    </TouchableOpacity>
                </View>
            </Container>
        </>
    )
}