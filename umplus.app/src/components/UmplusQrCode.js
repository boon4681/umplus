import { memo, useEffect, useState } from 'react';
import Svg, { Circle, Rect } from 'react-native-svg';
import useMe from '../hooks/useMe';
import LogTab from './LogTab';
import { Canvas, Box, BoxShadow, Fill, rrect, rect, Group } from "@shopify/react-native-skia";
import { Text, View } from 'react-native';
import QRCode from 'qrcode'


// function QRcode(text) {
//     return new Promise((resolve, reject) => {
//         QRCode.toString(text, { errorCorrectionLevel: 'Q' }, function (err, string) {
//             if (err) reject(err)
//             const data = string.split('\n').slice(2, -2).map(a => a.slice(4, -4).split(''))
//             resolve({
//                 size: data.length,
//                 data
//             })
//         })
//     })
// }
// export const UmplusQrCode = () => {
//     const [qr, setQr] = useState()
//     const [error, setError] = useState()
//     const me = useMe()
//     useEffect(() => {
//         // QRcode(`umplus://boon4681.com/${me.user_id}`).then((data) => {
//         //     setQr(data)
//         // }).catch(setError)
//         setQr(QRCode.create(`umplus://boon4681.com/${me.user_id}`, { errorCorrectionLevel: 'Q' }).modules)
//     }, [])
//     const scale = 2
//     if (!qr) {
//         return <></>
//     }
//     const data = [...new Array(qr.size).keys()].map((a, x) => {
//         return <>
//             {
//                 [...new Array(qr.size).keys()].map((a, y) => {
//                     if (qr.get(x, y) == 1) {
//                         return <Rect
//                             key={x + '' + y}
//                             x={(x + 1) * scale}
//                             y={(y + 1) * scale}
//                             width={scale}
//                             height={scale}
//                             fill="#3455FF"
//                         />
//                     }
//                     return null
//                 })
//             }
//         </>
//     })

//     return (
//         <>
//             <Svg height="200px" width="200px" viewBox={`0 0 ${(qr.size + 1) * scale} ${(qr.size + 1) * scale}`}>
//                 {data}
//             </Svg>
//         </>
//     )
// }

const CANVAS = ({path}) => {
    const [qr, setQr] = useState()
    const me = useMe()
    useEffect(() => {
        setQr(QRCode.create(`umplus://boon4681.com/${me.user_id}/${path || ''}`, { errorCorrectionLevel: 'Q' }).modules)
    }, [])
    if (!qr) {
        return <></>
    }
    const scale = Math.round(256 / qr.size)
    const data = []
    for (let y = 0; y < qr.size; y++) {
        for (let x = 0; x < qr.size; x++) {
            if (qr.get(x, y) == 1) {
                data.push(<Box key={'qrcode-' + x + ',' + y} box={rect((y) * scale, (x) * scale, scale, scale)} color="#444444"></Box>)
            }
        }
    }
    return <View className="rounded-md overflow-hidden p-3 bg-white">
        <View className="rounded-md overflow-hidden" style={{ width: scale * qr.size, height: scale * qr.size }}>
            <Canvas style={{ width: scale * qr.size, height: scale * qr.size }} >
                <Fill color="#FFFFFF"></Fill>
                {data}
            </Canvas>
        </View>
    </View>
}

const MemoCANVAS = memo(CANVAS)

export const UmplusQrCode = ({ path }) => {
    return <View className="p-5 bg-[#3076FF] flex justify-center items-center rounded-2xl shadow-lg" style={{
        shadowColor: "#3076FF",
        shadowOffset: {
            width: 2,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8,
    }}>
        <MemoCANVAS path={path}></MemoCANVAS>
        <Text className="font-LINESeedRg text-3xl mt-8 text-white">Umplus</Text>
    </View>
}