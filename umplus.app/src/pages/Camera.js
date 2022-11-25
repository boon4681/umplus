import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation, useRoute } from "@react-navigation/native"
import { Camera, CameraType } from 'expo-camera';
import { useState, useEffect } from 'react';
import { Button, Dimensions, Image, PermissionsAndroid, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import BackARROW from '../../assets/icons/back_arrow_light.png'
import CLOSE from '../../assets/icons/close.png'
import { Toast } from 'toastify-react-native'
import useMe from '../hooks/useMe';

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
                    <Text className="font-LINESeedRg text-xl text-white">สแกน</Text>
                    <Text className="font-LINESeedRg -mt-2 text-white">Scan QRCode</Text>
                </View>
            </View>
        </View>
    )
}

export default () => {
    const [granted, setGranted] = useState(false)
    const [camera, setCamera] = useState(null);
    const [ready, setReady] = useState(false)
    const [aspectRatio, setAspectRatio] = useState(1)
    const [ratio, setRatio] = useState('4:3')
    const insect = useSafeAreaInsets()
    const navigation = useNavigation()
    const me = useMe()
    const requestCamera = async () => {
        setGranted(await Camera.requestCameraPermissionsAsync())
        // try {
        //     const check = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA)
        //     if (check === PermissionsAndroid.RESULTS.GRANTED) {
        //         return setGranted(true)
        //     }
        //     const status = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA,
        //         {
        //             title: "Camera Permission",
        //             message: "จำเป็นต้องขออนุญาติเข้าถึงกล้องถ่ายรูปเพื่อเปิดใช้งาน qrcode scanner",
        //             buttonNegative: "Cancel",
        //             buttonPositive: "OK"
        //         }
        //     )
        //     if (status === PermissionsAndroid.RESULTS.GRANTED) {
        //         setGranted(true)
        //     } else {
        //     }
        // } catch (error) {

        // }
    }
    useEffect(() => {
        requestCamera()
    }, [])
    useEffect(() => {
        if (ready) {
            (async () => {
                const { height, width } = Dimensions.get('window');
                const screenRatio = height / width;
                const ratios = await camera.getSupportedRatiosAsync()
                const aspect = ratios.map(a => {
                    const m = a.split(":")
                    return { ratio: a, aspect: parseInt(m[0]) / parseInt(m[1]) }
                }).reduce((prev, curr) => {
                    return (Math.abs(curr.aspect - screenRatio) < Math.abs(prev.aspect - screenRatio) ? curr : prev);
                })
                setRatio(aspect.ratio)
                setAspectRatio(
                    Number(
                        aspect.aspect.toFixed(4)
                    )
                )
            })()
        }
    }, [ready])
    if (!granted)
        return (
            <View>

            </View>
        )
    return (
        <>
            <StatusBar style='light'></StatusBar>
            <View className="bg-black w-full h-screen absolute"></View>
            <View className="h-full rounded-t-2xl overflow-hidden" style={{ marginTop: insect.top + 10 }}>
                <Camera
                    ref={setCamera}
                    onCameraReady={() => setReady(true)}
                    type={CameraType.back}
                    ratio={ratio}
                    className="h-screen w-full top-0 left-0 absolute"
                    style={{ aspectRatio: aspectRatio }}
                    barCodeScannerSettings={{
                        barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
                        interval: 500
                    }}
                    onBarCodeScanned={({ data }) => {
                        if (data && data.startsWith('umplus://boon4681.com')) {
                            const [user_id, path] = data.replace(/umplus\:\/\/boon4681\.com\//, '').replace(/"/g, '').split(/\//)
                            if (path == 'topup') {
                                if (user_id == me.user_id) {
                                    return Toast.error('คุณไม่สามารถโอนเงินให้ตนเองได้')
                                }
                                navigation.popToTop()
                                setTimeout(() => {
                                    navigation.navigate('Transfer', {
                                        user_id
                                    })
                                }, 200)
                            } else {
                                Toast.error('รูปแบบ qrcode ไม่ถูกต้อง')
                            }
                        }
                    }}
                >
                    <Header></Header>
                    <View className="absolute bottom-0 pb-20 w-full">
                        <TouchableOpacity
                            onPress={() => {
                                navigation.popToTop()
                            }}
                            className="p-2 w-16 h-16 rounded-full bg-[#1F2325]/90 mx-auto">
                            <Image className="w-full h-full" source={CLOSE}></Image>
                        </TouchableOpacity>
                    </View>
                </Camera>
            </View>
        </>
    )
}