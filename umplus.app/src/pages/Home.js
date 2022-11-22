import { StyleSheet, Text, View, Image, ImageBackground, Platform, NativeModules } from 'react-native';
import Avatar from 'react-native-boring-avatars';

import Scan_btn from '../../assets/scan_btn.png'
import Nav_bg from '../../assets/nav.png'
import AddMONEY from '../../assets/icons/add_money.png'
import SendMONEY from '../../assets/icons/send_money.png'
import WithDrawMONEY from '../../assets/icons/withdraw_money.png'
import Container from '../components/Container';
import { useAuth } from '../hooks/useAuth';
import BG_balance from '../../assets/bg_balance.png'
import { useEffect, useState } from 'react';
import LogTab from '../components/LogTab';
import BottomTab from '../components/BottomTab';
import useMe from '../hooks/useMe';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
    const { user } = useAuth()
    const me = useMe()
    const navigation = useNavigation()

    return (
        <>
            <Container>
                <View className="bg-[#0085FF] p-2 rounded-xl">
                    <View className=" bg-white p-1.5 rounded-xl flex flex-row items-center">
                        <View className="w-[44px] h-[44px]">
                            {
                                me ? <Avatar
                                    size={44}
                                    name={`u${me.user_id}`}
                                    variant="beam"
                                    colors={['#FF5252', '#FF7752', '#FF9A52', '#FFB752', '#5E405B']}
                                /> : null
                            }
                        </View>
                        <View className="px-2 flex flex-col">
                            <Text className="font-LINESeedRg text-base">
                                {user.firstname + ' ' + user.lastname}
                            </Text>
                            <Text className="text-sm font-LINESeedRg -mt-1">เลขประจำตัวนักเรียน: {user.user_id}</Text>
                        </View>
                    </View>
                </View>
                <View className="w-full relative aspect-square mt-4">
                    <Image className="w-full h-full absolute" source={BG_balance} />
                    <View className="w-full h-full absolute p-8">
                        <View>
                            <Text className="font-LINESeedRg text-white text-[36px]">ยอดเงิน</Text>
                            <Text className="font-LINESeedRg text-white text-xl -mt-3">Balance</Text>
                        </View>
                        <View className="w-full h-full flex items-center mt-[10%]">
                            <Text className="font-LINESeedRg text-white text-[52px]">{me ? (me.balance || 0).toFixed(2) : ''}</Text>
                        </View>
                    </View>
                </View>
                <View className="flex items-center">
                    <View className="flex flex-row space-x-6 mt-4">
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("AddMoney")
                            }}
                            className="flex items-center"
                        >
                            <View className="w-16 h-16 rounded-[25px] bg-[#0085FF] p-5">
                                <Image className="w-full h-full" source={AddMONEY} />
                            </View>
                            <Text className="font-LINESeedRg text-black">เติมเงิน</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={() => {
                                navigation.navigate("Transfer")
                            }}
                            className="flex items-center">
                            <View className="w-16 h-16 rounded-[25px] bg-[#0085FF] p-0.5">
                                <Image className="w-full h-full" source={SendMONEY} />
                            </View>
                            <Text className="font-LINESeedRg text-black">โอนเงิน</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("WithDraw")
                            }}
                            className="flex items-center"
                        >
                            <View className="w-16 h-16 rounded-[25px] bg-[#0085FF] p-3.5">
                                <Image className="w-full h-full" source={WithDrawMONEY} />
                            </View>
                            <Text className="font-LINESeedRg text-black">ถอนเงิน</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Container>
            <BottomTab></BottomTab>
            <LogTab content={me} i={10}></LogTab>
        </>
    )
}