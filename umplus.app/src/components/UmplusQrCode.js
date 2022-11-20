import { useEffect, useState } from 'react';
import Svg, { Circle, Rect } from 'react-native-svg';
import useMe from '../hooks/useMe';
import LogTab from './LogTab';
import QRCodeStyling from 'qr-code-styling'


// const QRCode = require('qrcode')


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

export const UmplusQrCode = () => {
    const qrCode = new QRCodeStyling({
        width: 300,
        height: 300,
        type: "svg",
        data: "https://www.facebook.com/",
        image: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
        dotsOptions: {
            color: "#4267b2",
            type: "rounded"
        },
        backgroundOptions: {
            color: "#e9ebee",
        },
        imageOptions: {
            crossOrigin: "anonymous",
            margin: 20
        }
    });
    return(
        <></>
    )
}