import { ScrollView, Text, View, Image, ImageBackground, Platform, NativeModules, Button, Pressable, TouchableOpacity, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Container from '../components/Container';
import { useAuth } from '../hooks/useAuth';
import { Toast } from 'toastify-react-native'
import BottomTab from '../components/BottomTab';

import BackARROW from '../../assets/icons/back_arrow.png'
import { TextInput } from 'react-native-gesture-handler';
import { useState } from 'react';
import { UmplusQrCode } from '../components/UmplusQrCode';

const Header = () => {
    const navigation = useNavigation()

    return (
        <View className="px-5 pt-8">
            <View className="flex items-center w-full h-[60px] flex-row">
                <TouchableOpacity
                    className="basis-1/3"
                    onPress={() => {
                        navigation.pop()
                    }}>
                    <Image className="w-[32px] h-[32px]" source={BackARROW} />
                </TouchableOpacity>
                <View className="basis-1/3 flex items-center mt-2">
                    <Text className="font-LINESeedRg text-xl">เติมเงิน</Text>
                    <Text className="font-LINESeedRg -mt-2">Add money</Text>
                </View>
            </View>
        </View>
    )
}


export default () => {
    const { dip } = useAuth()
    const [num, setNum] = useState(0)
    const navigation = useNavigation()
    return (
        <>
            <Container header={Header}>
                <Text className="font-LINESeedRg text-[#464646] text-lg text-center">
                    ผ่าน ธนาคารโรงเรียน หรือ สหกรณ์โรงเรียน
                </Text>
                <UmplusQrCode path="topup"></UmplusQrCode>
                {/* <Text className="font-LINESeedRg text-[#46464699] text-lg">
                    จำนวน
                </Text>
                <View className="flex flex-row border-b border-b-[#46464699]">
                    <TextInput
                        className="font-LINESeedRg text-[#46464699] text-[32px] text-right pr-16 mr-8 w-full"
                        keyboardType={'number-pad'}
                        placeholder={'0 '}
                        value={num + ''}
                        onChangeText={(text) => {
                            setNum(!isNaN(parseInt(text)) ? parseInt(text) : 0)
                        }}
                    ></TextInput>
                    <Text className="font-LINESeedRg text-[#00000099] text-[32px] absolute right-0">
                        บาท
                    </Text>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        dip.fetch('user/transaction/topup', "POST", {
                            data: {
                                amount: num
                            }
                        }).then(a => {
                            if (a) {
                                Toast.success(a.message)
                                navigation.navigate('Home')
                            }
                        })
                    }}
                    className={`px-5 py-3 w-full bg-[#3076FF] rounded-xl flex justify-center items-center mt-3`}
                >
                    <Text className="text-white font-LINESeedRg text-lg">ตกลง</Text>
                </TouchableOpacity> */}
            </Container>
        </>
    )
}