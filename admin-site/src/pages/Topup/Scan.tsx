import { useEffect, useRef, useState } from "react";
import { QrReader } from "react-qr-reader";
import { useAuth } from "../../hooks/useAuth";

export default () => {
    const { dip } = useAuth()
    const [data, setData] = useState('')
    const [stop, setStop] = useState(false)
    const getUser = async () => {
        setStop(true)
        if (data.startsWith('umplus://boon4681.com')) {
            try {
                JSON.stringify(data.replace(/umplus\.boon4681\./, ''))
            } catch (error) {
                setStop(false)
                return
            }
            const json = JSON.stringify(data.replace(/umplus\.boon4681\./, ''))
            const res = await dip?.fetch('/api/admin/account/users/' + json, 'POST')
            console.log(res)
        }
        setStop(false)
    }
    useEffect(() => {
        getUser()
    }, [data])
    return (
        <div>
            <div className="flex space-x-3">
                <div className="max-w-[400px] w-full">
                    <QrReader
                        scanDelay={500}
                        onResult={(result, error) => {
                            if (!!result && stop) {
                                setData(result.toString());
                            }
                        }}
                        videoStyle={{ height: 'auto' }}
                        constraints={{ facingMode: 'user' }}
                    />
                </div>
                <div>
                    {data}
                </div>
            </div>
        </div>
    )
}