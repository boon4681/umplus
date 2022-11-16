import { StyleSheet, Text, View, Image, ImageBackground, Platform, NativeModules, Button, Pressable, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Scan_btn from '../../assets/scan_btn.png'
import Nav_bg from '../../assets/nav.png'
import HOME from '../../assets/icons/home.png'
import NEWS from '../../assets/icons/news.png'
import TRANSACTION from '../../assets/icons/transaction.png'
import COUPONS from '../../assets/icons/coupon.png'


export default () => {
    const navigation = useNavigation();
    return (
        <View className="flex items-center absolute left-0 bottom-0 w-screen">
            <Image className="absolute bottom-0 w-full h-[110px]" source={Nav_bg} />
            <Image className="absolute bottom-6 w-[110px] h-[110px]" source={Scan_btn} />
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
                </TouchableOpacity>
                <View className="flex items-center p-1.5 pb-2.5 basis-1/5">
                    <View className="w-8 h-8">
                        <Image className="w-full h-full" source={NEWS} />
                    </View>
                    <Text className="font-LINESeedRg text-white text-[10px]">News</Text>
                </View>
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
                </TouchableOpacity>
                <View className="flex items-center p-1.5 pb-2.5 basis-1/5">
                    <View className="w-8 h-8">
                        <Image className="w-full h-full" source={COUPONS} />
                    </View>
                    <Text className="font-LINESeedRg text-white text-[10px]">Coupons</Text>
                </View>
            </View>
        </View>
    )
}