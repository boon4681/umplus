import { StyleSheet, Text, View, Image, ImageBackground, Platform, NativeModules, Button, Pressable, TouchableOpacity } from 'react-native';
import { useMemo } from 'react';
import { joinDate } from '../utils/utilities';

import Logo from '../../assets/Logo.png'
import SlipELE from '../../assets/Slip.png'
import GREENMARK from '../../assets/icons/green_mark.png'
import { useAuth } from '../hooks/useAuth';
import DOWNARROWDARK from '../../assets/icons/down_arrow_dark.png'
import AvatarBeam from './Avatar';

function MiniTime(timestamp) {
    const date = new Date(timestamp)
    return useMemo(() =>
        `${joinDate(date, [{ 'day': '2-digit' }, { 'month': 'short' }], ' ', 'th-TH')} ${(Number(joinDate(date, [{ 'year': 'numeric' }])) + 543).toString().slice(-2)} - ${joinDate(date, [{ 'hour': '2-digit' }, { 'minute': '2-digit' }], '.').replace(/ PM| AM/, '')}`
    )
}

export default (props) => {
    const { user } = useAuth()
    return (
        <View className="w-full flex relative border-2 border-[#54697C59] rounded-2xl max-w-[332px] mx-auto" style={{ aspectRatio: 332 / 561 }}>
            <Image className="w-full h-full absolute top-0 left-0" source={SlipELE} />
            <View className="w-full h-full pt-8">
                <Image className="w-[80px] h-[60px] -mt-2 mx-auto" source={Logo} />
                <View className="mx-auto w-full max-w-[272px]" style={{ aspectRatio: 272 / 75 }}>
                    <View className="flex flex-row">
                        <Image className="max-w-[40px] max-h-[40px] w-full h-full" style={{ aspectRatio: 1 }} source={GREENMARK}></Image>
                        <View className="mx-4">
                            <Text className="font-LINESeedRg text-[24px] text-[#25A922]">ทำรายการสำเร็จ</Text>
                            <Text className="font-LINESeedRg text-[15px] text-[#00000080] -mt-3">รหัสอ้างอิง : {props.transaction_id}</Text>
                            <Text className="font-LINESeedRg text-[12px] text-[#00000080]">วันที่ทำรายการ :  {props.timestamp ? MiniTime(props.timestamp) : null}</Text>
                        </View>
                    </View>
                </View>
                <View className="mx-auto w-full max-w-[272px]">
                    <Text className="font-LINESeedRg text-[20px] text-[#323435]">จาก:</Text>
                    <View className="w-full px-4 flex flex-row">
                        <View className="basis-1/4">
                            {Avatar(`u${user.user_id}`)}
                        </View>
                        <View className="ml-5">
                            <Text className="font-LINESeedRg text-[#323435] text-lg mt-2 w-[160px]">{user.firstname + ' ' + user.lastname}</Text>
                            <Text className="font-LINESeedRg text-[#323435] text-md -mt-1">เลขบัญชี: {user.user_id}</Text>
                        </View>
                    </View>
                    <View className="relative ml-[39px] my-5 pb-5">
                        <Image className="w-5 h-5 absolute -translate-x-1" source={DOWNARROWDARK}></Image>
                    </View>
                    <View className="w-full px-4 pb-2 flex flex-row">
                        <View className="basis-1/4">
                            {Avatar(`u${props.user_id}`)}
                        </View>
                        <View className="ml-5">
                            <Text className="font-LINESeedRg text-[#323435] text-lg mt-2 w-[160px]" numberOfLines={1} ellipsizeMode="tail">
                                {props.firstname + ' ' + props.lastname}
                            </Text>
                            <Text className="font-LINESeedRg text-[#323435] text-md -mt-1">เลขบัญชี: {props.user_id}</Text>
                        </View>
                    </View>
                    <View className="w-full">
                        <Text className="font-LINESeedRg text-[#323435] text-lg">จำนวนเงิน</Text>
                        <Text className="font-LINESeedRg text-[#323435] text-md ml-auto">{props.amount} บาท</Text>
                    </View>
                    <View className="w-full">
                        <Text className="font-LINESeedRg text-[#323435] text-lg">ค่าธรรมเนียม</Text>
                        <Text className="font-LINESeedRg text-[#323435] text-md ml-auto">0 บาท</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

function Avatar(name) {
    return <View className="w-[60px] h-[60px] rounded-[30px] border-2 border-[#1f232548]">
        <AvatarBeam
            size={56}
            name={name}
            variant="beam"
            colors={['#FF5252', '#FF7752', '#FF9A52', '#FFB752', '#5E405B']} />
    </View>;
}