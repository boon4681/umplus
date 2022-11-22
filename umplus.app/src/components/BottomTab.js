import { StyleSheet, Text, View, Image, ImageBackground, Platform, NativeModules, Button, Pressable, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import Scan_btn from '../../assets/scan_btn.png'
import Nav_bg from '../../assets/nav.png'
import HOME from '../../assets/icons/home.png'
import NEWS from '../../assets/icons/news.png'
import TRANSACTION from '../../assets/icons/transaction.png'
import TABACTIVE from '../../assets/icons/tab_active.png'
import COUPONS from '../../assets/icons/coupon.png'

const ACTIVE = ({name}) => {
    const route = useRoute()
    return <>
        {
            route.name == name ? <Image className="w-[32px] h-[5px] absolute bottom-0" source={TABACTIVE} /> : null
        }
    </>
}

export default () => {
    const navigation = useNavigation();
    return (
        <View className="flex items-center absolute left-0 bottom-0 w-screen">
            <Image className="absolute bottom-0 w-full h-[110px]" source={Nav_bg} />
            <TouchableOpacity className="absolute bottom-6 w-[110px] h-[110px]">
                <Image className="w-[110px] h-[110px]" source={Scan_btn} />
            </TouchableOpacity>
            <View className="flex flex-row space-x-0.5 px-2">
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('Home')
                    }}
                    className="flex items-center p-1.5 pb-2.5 basis-1/5"
                >
                    <View className="w-8 h-8">
                        <Image className="w-full h-full" source={HOME} />
                    </View>
                    <Text className="font-LINESeedRg text-white text-[10px]">Home</Text>
                    <ACTIVE name="Home"/>
                </TouchableOpacity>
                <TouchableOpacity className="flex items-center p-1.5 pb-2.5 basis-1/5">
                    <View className="w-8 h-8">
                        <Image className="w-full h-full" source={NEWS} />
                    </View>
                    <Text className="font-LINESeedRg text-white text-[10px]">News</Text>
                    <ACTIVE name="News"/>
                </TouchableOpacity>
                <View className="w-[20px] basis-1/5"></View>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('Transaction')
                    }}
                    className="flex items-center p-1.5 pb-2.5 basis-1/5"
                >
                    <View className="w-8 h-8">
                        <Image className="w-full h-full" source={TRANSACTION} />
                    </View>
                    <Text className="font-LINESeedRg text-white text-[10px]">Transaction</Text>
                    <ACTIVE name="Transaction"/>
                </TouchableOpacity>
                <TouchableOpacity className="flex items-center p-1.5 pb-2.5 basis-1/5">
                    <View className="w-8 h-8">
                        <Image className="w-full h-full" source={COUPONS} />
                    </View>
                    <Text className="font-LINESeedRg text-white text-[10px]">Coupons</Text>
                    <ACTIVE name="Coupons"/>
                </TouchableOpacity>
            </View>
        </View>
    )
}