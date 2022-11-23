import { ScrollView, Text, View, Image, ImageBackground, Platform, NativeModules, Button, Pressable, TouchableOpacity, Animated } from 'react-native';
import { parse } from 'node-html-parser';
import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import Container from '../components/Container';
import { useAuth } from '../hooks/useAuth';
import MENUICON from '../../assets/menu_icon.png'
import LOGOLIGHT from '../../assets/Logo-light.png'
import CARD from '../../assets/card.png'
import BottomTab from '../components/BottomTab'

import BackARROW from '../../assets/icons/back_arrow.png'
import SENTOUT from '../../assets/icons/sent_out.png'
import RECEIVERMONEY from '../../assets/icons/receive_money.png'
import FAILED from '../../assets/icons/failed.png'
import INFODOWN from '../../assets/icons/info_down.png'
import useMe from '../hooks/useMe';
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
                    <Text className="font-LINESeedRg text-xl">ข่าวประชาสัมพันธ์</Text>
                    <Text className="font-LINESeedRg -mt-2">News</Text>
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

const Card = ({ title, image, created, content }) => {
    return (
        <View>
            <Image className="w-[320px] h-[320px]" source={{ uri: image }} />
            <Text>{title}</Text>
            <Text>{content}</Text>
        </View>
    )
}

export default () => {
    const [html, setHtml] = useState('')
    useEffect(() => {
        (async () => {
            try {
                const data = await fetch('http://www.ammart.ac.th/news').then(a => a.text())
                setHtml(await Promise.all(parse(data).querySelectorAll('.table>tbody>tr').map(a => {
                    const b = a.querySelectorAll('td')
                    return new Promise(async (resolve) => {
                        resolve({
                            title: b[1].querySelector('a').innerText,
                            // image: await fetch(b[0].querySelector('img').getAttribute('src')).then(a=>a.blob()).then(a=>"data:image/png;base64," +a),
                            image: b[0].querySelector('img').getAttribute('src'),
                            create: b[1].querySelectorAll('small')[1].innerText,
                            content: b[1].querySelectorAll('span').map(a =>
                                a.innerText.replace(/\&\#\d+\;/g, (a) => String.fromCharCode(parseInt(a.replace(/&|#|;/g, '')), 8).replace('\b', ''))
                            )
                        })
                    })
                })))
            } catch (error) {
            }
        })();
    }, [])
    return (
        <>
            <Container header={Header}>
                {
                    html ?
                        html.map((a) => {
                            return <Card title={a.title} content={a.content}></Card>
                        })
                        : null
                }
            </Container>
            <BottomTab></BottomTab>
            <LogTab i={10} content={html}></LogTab>
        </>
    )
}
