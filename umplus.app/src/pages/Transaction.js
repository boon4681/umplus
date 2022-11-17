import { ScrollView, Text, View, Image, ImageBackground, Platform, NativeModules, Button, Pressable, TouchableOpacity, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Avatar from 'react-native-boring-avatars';

import Container from '../components/Container';
import { useAuth } from '../hooks/useAuth';
import MENUICON from '../../assets/menu_icon.png'
import LOGOLIGHT from '../../assets/Logo-light.png'
import CARD from '../../assets/card.png'
import BottomTab from '../components/BottomTab'

import BackARROW from '../../assets/icons/back_arrow.png'
import SENTOUT from '../../assets/icons/sent_out.png'
import RECEIVERMONEY from '../../assets/icons/receive_money.png'
import INFODOWN from '../../assets/icons/info_down.png'
import useMe from '../hooks/useMe';
import { memo, useEffect, useMemo, useRef, useState } from 'react';
import useHistory from '../hooks/useHistory';
import LogTab from '../components/LogTab';

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
                    <Text className="font-LINESeedRg text-xl">รายการโอน - จ่าย</Text>
                    <Text className="font-LINESeedRg -mt-2">Transaction</Text>
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

function joinDate(t, a, s = ' ', lang = 'en') {
    function format(m) {
        let f = new Intl.DateTimeFormat(lang, m);
        return f.format(t);
    }
    return a.map(format).join(s);
}

function MiniTime(timestamp) {
    const date = new Date(timestamp)
    return useMemo(() =>
        joinDate(date, [{ 'day': '2-digit' }, { 'month': 'short' }, { 'year': 'numeric' }], ' ', 'th-TH')
        + ' - ' +
        `${joinDate(date, [{ 'hour': '2-digit' }, { 'minute': '2-digit' }], ':').replace(/ PM| AM/, '')}`
    )
}

function IconMiniCard({ a }) {
    return <Image className="w-[65px] h-[65px]" source={a ? SENTOUT : RECEIVERMONEY} />
}

function MiniCard({ data }) {
    const { user } = useAuth()
    const time = MiniTime(data.timestamp)
    const [show, setShow] = useState(false)
    const info = data.send ? data.send : data.receive
    const pan = useRef(new Animated.Value(65)).current;
    const rot = useRef(new Animated.Value(0)).current
    useEffect(() => {
        if (show) {
            Animated.timing(pan, {
                toValue: 140,
                duration: 200,
                useNativeDriver: false
            }).start();
            Animated.timing(rot, {
                toValue: 180,
                duration: 200,
                useNativeDriver: false
            }).start();
        } else {
            Animated.timing(pan, {
                toValue: 65,
                duration: 200,
                useNativeDriver: false
            }).start();
            Animated.timing(rot, {
                toValue: 0,
                duration: 200,
                useNativeDriver: false
            }).start();
        }
    }, [show])
    const spin = rot.interpolate({
        inputRange: [0, 180],
        outputRange: ['0deg', '180deg']
    })
    return (
        <TouchableOpacity
            onPress={() => setShow(!show)}
            className="flex flex-col border-b border-b-[#ECECEC] overflow-hidden"
        >
            <Animated.View style={{ height: pan }}>
                <View className="flex flex-row items-center w-full h-[65px]">
                    <Image className="w-[65px] h-[65px]" source={data.send ? SENTOUT : RECEIVERMONEY} />
                    <View>
                        <Text className="font-LINESeedRg text-[#3B3B3B] text-[16px]">{data.send ? 'โอนออก' : 'รับโอนเงิน'}</Text>
                        <Text className="font-LINESeedRg text-[#6F6C6C] text-[14px] -mt-1.5">
                            {time}
                        </Text>
                    </View>
                    <View className="h-full ml-auto pr-3 pt-3.5 flex flex-col items-end">
                        {
                            (data.send) ? (
                                <Text className="font-LINESeedRg text-[#FF4242] text-[16px]">-{data.send.amount} บาท</Text>
                            ) : (
                                <Text className="font-LINESeedRg text-[#00C07B] text-[16px]">{data.receive.amount} บาท</Text>
                            )
                        }
                        <Animated.Image style={{ transform: [{ rotate: spin }] }} className="w-[18px] h-[18px] opacity-80" source={INFODOWN} />
                    </View>
                </View>
                <View className="px-2 mt-1 pb-3">
                    <View className="flex flex-row">
                        <Text className="font-LINESeedRg text-[#6E6C6C] text-[14px]">รหัสอ้างอิง:</Text>
                        <Text className="font-LINESeedRg text-[#6E6C6C] text-[14px] ml-auto">#{data.transaction_id}</Text>
                    </View>
                    <View className="flex flex-row">
                        <Text className="font-LINESeedRg text-[#6E6C6C] text-[14px]">เลขที่บัญชีปลายทาง:</Text>
                        <Text className="font-LINESeedRg text-[#6E6C6C] text-[14px] ml-auto">{info.receiver_id}</Text>
                    </View>
                    <View className="flex flex-row">
                        <Text className="font-LINESeedRg text-[#6E6C6C] text-[14px]">บันทึกช่วยจำ:</Text>
                        <Text className="font-LINESeedRg text-[#6E6C6C] text-[14px] ml-auto">{info.info}</Text>
                    </View>
                </View>
            </Animated.View>
        </TouchableOpacity>
    )
}

const MemoMiniCard = memo(MiniCard)

export default () => {
    const navigation = useNavigation()

    const { logout, user, dip } = useAuth()
    const me = useMe()
    const history = useHistory(dip)

    return (
        <>
            <Container header={Header}>
                <View className="w-full relative mt-4" style={{ aspectRatio: 338 / 186 }}>
                    <Image className="w-full h-full absolute" source={CARD} />
                    <View className="w-full h-full absolute px-4 py-3 flex flex-row">
                        <View className="basis-1/4">
                            <Image className='w-[52px] h-[42px]' source={LOGOLIGHT} />
                            <View className="w-[60px] h-[60px] rounded-[30px] border-2 border-[#1f232548]">
                                <Avatar
                                    size={56}
                                    name={`u${user.username}`}
                                    variant="beam"
                                    colors={['#FF5252', '#FF7752', '#FF9A52', '#FFB752', '#5E405B']}
                                />
                            </View>
                            <Text className="font-LINESeedRg text-white text-xl mt-3">{user.user_id}</Text>
                            <Text className="font-LINESeedRg text-white text-md -mt-3">เลขประจำตัว</Text>
                        </View>
                        <View className="flex items-end basis-3/4">
                            <Text className="font-LINESeedRg text-white text-lg mt-3">ยอดเงินคงเหลือ (บาท)</Text>
                            <Text className="font-LINESeedRg text-white text-2xl -mt-1.5">{me ? '฿' + me.budget.toFixed(2) : ""}</Text>
                            <Text className="font-LINESeedRg text-white text-md mt-auto">{user.username}</Text>
                        </View>
                    </View>
                </View>
                <View className="flex-1 pb-20">
                    <Text className="font-LINESeedRg text-black text-xl mt-2">Transaction</Text>
                    <ScrollView keyboardShouldPersistTaps="always" className="w-full bg-white rounded-2xl mt-2 px-2 pt-2 flex flex-col space-y-1" >
                        {
                            history.map(history => <MemoMiniCard key={history.transaction_id} data={history} />)
                        }
                        <View className="pb-40"></View>
                    </ScrollView>
                </View>
            </Container>
            <BottomTab></BottomTab>
            <LogTab i={10} content={history}></LogTab>
        </>
    )
}