import { StyleSheet, Text, View, Image, ImageBackground, Platform, NativeModules } from 'react-native';
import Avatar from 'react-native-boring-avatars';
import Scan_btn from '../../assets/scan_btn.png'
import Nav_bg from '../../assets/nav.png'
import Header from '../components/Header';
import Container from '../components/Container';
import { useAuth } from '../hooks/useAuth';
import BG_balance from '../../assets/bg_balance.png'
import { useEffect, useState } from 'react';
import LogTab from '../components/LogTab';

export default function Home() {
    const { user, dip } = useAuth()
    const [me, setMe] = useState({})
    useEffect(() => {
        (async () => {
            setMe(await (await dip.on()).post('v1/user/@me'))
        })();
    }, [])
    return (
        <>
            <Container>
                <View className="bg-[#0085FF] p-2 rounded-xl">
                    <View className=" bg-white p-1.5 rounded-xl flex flex-row items-center">
                        <Avatar
                            size={44}
                            name={`u${user.username}`}
                            variant="beam"
                            colors={['#FF5252', '#FF7752', '#FF9A52', '#FFB752', '#5E405B']}
                        />
                        <View className="px-2 flex flex-col">
                            <Text className="font-LINESeedBd text-base">
                                {user.user_id}
                            </Text>
                            <Text className="text-xs font-LINESeedRg -mt-1">เลขประจำตัวนักเรียน</Text>
                        </View>
                    </View>
                </View>
                <View className="w-full relative aspect-square mt-4">
                    <Image className="w-full h-full absolute" source={BG_balance} />
                    <View className="w-full h-full absolute p-8">
                        <View>
                            <Text className="font-LINESeedRg text-white text-4xl">ยอดเงิน</Text>
                            <Text className="font-LINESeedRg text-white text-xl -mt-3">Balance</Text>
                        </View>
                        <View className="w-full h-full flex items-center mt-[10%]">
                            <Text className="font-LINESeedRg text-white text-[52px]">{(me.budget||0).toFixed(2)}</Text>
                        </View>
                    </View>
                </View>
                <View className="flex flex-col ">
                    <View>
                        <View className="w-16 h-16"></View>
                    </View>
                </View>
            </Container>
            <View className="flex items-center absolute left-0 bottom-0 w-screen">
                <Image className="absolute bottom-0 w-full h-24" source={Nav_bg} />
                <Image className="absolute bottom-6 h-24" source={Scan_btn} />
            </View>
            <LogTab content={me}></LogTab>
        </>
    )
}