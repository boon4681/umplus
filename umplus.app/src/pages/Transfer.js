import { ScrollView, Text, View, Image, ImageBackground, Platform, NativeModules, Button, Pressable, TouchableOpacity, Animated } from 'react-native';
import { useNavigation } from "@react-navigation/native"
import BottomTab from "../components/BottomTab"
import Container from "../components/Container"
import BackARROW from '../../assets/icons/back_arrow.png'
import MENUICON from '../../assets/menu_icon.png'
import LOGOLIGHT from '../../assets/Logo-light.png'
import CARD from '../../assets/card.png'
import Avatar from 'react-native-boring-avatars';
import { useAuth } from '../hooks/useAuth';
import useMe from '../hooks/useMe';
import { useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';

const Header = () => {
    const navigation = useNavigation()

    return (
        <View className="px-5 pt-8">
            <View className="flex items-center w-full h-[60px] flex-row">
                <TouchableOpacity
                    className="basis-1/6"
                    onPress={() => {
                        navigation.pop()
                    }}>
                    <Image className="w-[32px] h-[32px]" source={BackARROW} />
                </TouchableOpacity>
                <View className="basis-4/6 flex items-center mt-2">
                    <Text className="font-LINESeedRg text-xl">โอนเงิน</Text>
                    <Text className="font-LINESeedRg -mt-2">Transfer</Text>
                </View>
                <View className="basis-1/6 flex items-end">
                    <TouchableOpacity
                        className="p-2"
                        onPress={() => {
                            navigation.navigate('Setting')
                        }}>
                        <Image className="w-[24px] h-[24px]" source={MENUICON} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}


export default () => {
    const { user } = useAuth()
    const me = useMe()
    const [num, setNum] = useState(0)
    const [account, setAccount] = useState(0)
    const [info,setInfo] = useState('')
    return (
        <>
            <Container header={Header}>
                <View className="w-full relative mt-4" style={{ aspectRatio: 338 / 186 }}>
                    <Image className="w-full h-full absolute -scale-100" source={CARD} />
                    <View className="w-full h-full absolute px-4 py-3 flex flex-row">
                        <View className="basis-1/4">
                            <Image className='w-[52px] h-[42px]' source={LOGOLIGHT} />
                            <View className="w-[60px] h-[60px] rounded-[30px] border-2 border-[#1f232548]">
                                <Avatar
                                    size={56}
                                    name={`u${user.user_id}`}
                                    variant="beam"
                                    colors={['#FF5252', '#FF7752', '#FF9A52', '#FFB752', '#5E405B']}
                                />
                            </View>
                            <Text className="font-LINESeedRg text-white text-xl mt-3">{user.user_id}</Text>
                            <Text className="font-LINESeedRg text-white text-md -mt-3">เลขประจำตัว</Text>
                        </View>
                        <View className="flex items-end basis-3/4">
                            <Text className="font-LINESeedRg text-white text-lg mt-3">ยอดเงินคงเหลือ (บาท)</Text>
                            <Text className="font-LINESeedRg text-white text-2xl -mt-1.5">{me ? '฿' + me.balance.toFixed(2) : ""}</Text>
                            <Text className="font-LINESeedRg text-white text-md mt-auto">{user.firstname + ' ' + user.lastname}</Text>
                        </View>
                    </View>
                </View>
                <Text className="font-LINESeedBd text-[#00000099] text-lg mt-6">
                    ไปยัง:
                </Text>
                <Text className="font-LINESeedRg text-[#46464699] text-lg mt-3">
                    เลขบัญชี
                </Text>
                <View className="flex flex-row border-b border-b-[#46464699]">
                    {`${account}` == '0' ? (
                        <Text className="font-LINESeedRg text-[#00000099] text-[20px] absolute right-0 pointer-events-none">
                            ระบุเลขบัญชี
                        </Text>
                    ) : null}
                    <TextInput
                        className="font-LINESeedRg text-[#46464699] text-[20px] text-right pr-0 w-full"
                        style={{ color: `${account}` == '0' ? 'transparent' : undefined }}
                        keyboardType={'number-pad'}
                        value={account + ''}
                        onChangeText={(text) => {
                            setAccount(!isNaN(parseInt(text)) ? parseInt(text) : 0)
                        }}
                    ></TextInput>
                </View>
                <Text className="font-LINESeedRg text-[#46464699] text-lg">
                    จำนวน
                </Text>
                <View className="flex flex-row border-b border-b-[#46464699]">
                    <TextInput
                        className="font-LINESeedRg text-[#46464699] text-[20px] text-right pr-10 mr-8 w-full"
                        keyboardType={'number-pad'}
                        placeholder={'0 '}
                        value={num + ''}
                        onChangeText={(text) => {
                            setNum(!isNaN(parseInt(text)) ? parseInt(text) : 0)
                        }}
                    ></TextInput>
                    <Text className="font-LINESeedRg text-[#00000099] text-[20px] absolute right-0">
                        บาท
                    </Text>
                </View>
                <Text className="font-LINESeedRg text-[#46464699] text-lg">
                    บันทึกช่วยจำ
                </Text>
                <View className="flex flex-row border-b border-b-[#46464699]">
                    <TextInput
                        className="font-LINESeedRg text-[#46464699] text-[20px] text-right mr-8 w-full"
                        placeholder={'-'}
                        value={info + ''}
                        onChangeText={(text) => {
                            setInfo(text)
                        }}
                    ></TextInput>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        dip.fetch('user/transaction/create', "POST", {
                            data: {
                                amount: num,
                                account: account
                            }
                        }).then(a => {
                            if (a) {
                                Toast.success(a.message)
                                navigation.navigate('Home')
                            }
                        })
                    }}
                    className={`px-5 py-3 w-full bg-[#3076FF] rounded-xl flex justify-center items-center mt-10`}
                >
                    <Text className="text-white font-LINESeedRg text-lg">ตกลง</Text>
                </TouchableOpacity>
            </Container>
        </>
    )
}