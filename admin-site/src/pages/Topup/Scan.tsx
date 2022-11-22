import { useEffect, useRef, useState } from "react";
import { QrReader } from "react-qr-reader";
import { useAuth } from "../../hooks/useAuth";
import * as yup from 'yup'
import { Account } from "../../components/AccountProvider";
import Avatar from "boring-avatars";
import FieldHelper from "../../components/FieldHelper";
import { TopupMoneyValidator } from "../../validators/transaction.validator";
import { toast } from "react-toastify";

export const User_id = yup.object().shape({
    user_id: yup.string().min(5).matches(/\d+/).required()
})

export default () => {
    const { dip } = useAuth()
    // const [data, setData] = useState<string | undefined>('umplus://boon4681.com/32396/topup')
    const [data, setData] = useState<string | undefined>()
    const [stop, setStop] = useState(false)
    const [user, setUser] = useState<Account | undefined>()
    const [path, setPath] = useState<string | undefined>()
    const [value, setValue] = useState<any>()
    const getUser = async () => {
        if (data && data.startsWith('umplus://boon4681.com')) {
            setStop(true)
            const [user_id, path] = data.replace(/umplus\:\/\/boon4681\.com\//, '').replace(/"/g, '').split(/\//)
            const res = await dip?.fetch(`/api/admin/account/users/${user_id}`, 'POST')
            setPath(path)
            setUser(res)
        }
        setStop(false)
    }
    const topup = async () => {
        const res = await await dip?.fetch('/api/admin/topup', 'POST', {
            data: { ...value, receiver_id: user?.user_id }
        })
        if (res) {
            if (res.code == 200) {
                toast.success(`🍌 ${res.message}`, {
                    position: "top-center",
                    theme: 'dark',
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                toast.error(`🍌 ${res.message}`, {
                    position: "top-center",
                    theme: 'dark',
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }
    }
    const withdraw = async () => {
        const res = await await dip?.fetch('/api/admin/withdraw', 'POST', {
            data: { ...value, sender_id: user?.user_id }
        })
        if (res) {
            if (res.code == 200) {
                toast.success(`🍌 ${res.message}`, {
                    position: "top-center",
                    theme: 'dark',
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                toast.error(`🍌 ${res.message}`, {
                    position: "top-center",
                    theme: 'dark',
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }
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
                            if (!!result && !stop) {
                                setData(result.toString());
                            }
                        }}
                        videoStyle={{ height: 'auto' }}
                        constraints={{ facingMode: 'user' }}
                    />
                </div>
                <div className="w-full">
                    <div className="flex justify-between">
                        <div className="text-xl space-y-3">
                            <div className="text-3xl">
                                {
                                    'ธุรกรรม: '+{
                                        'withdraw': 'ถอนเงิน',
                                        'topup': 'เติมเงิน'
                                    }[path as string]
                                }
                            </div>
                            {user ?
                                <div className="text-xl mt-2">
                                    <div>รหัสนักเรียน: {user.user_id}</div>
                                    <div>ชื่อ-สกุล: {user.firstname + ' ' + user.lastname}</div>
                                </div>
                                :
                                null
                            }
                            <div className="mt-5">
                                <FieldHelper type='fill' defaultValue={value} onChange={setValue} validator={TopupMoneyValidator}></FieldHelper>
                            </div>
                            <div>
                                <button
                                    onClick={() => {
                                       const m = {
                                            'withdraw': withdraw,
                                            'topup': topup
                                        }[path as string];
                                        m && m()
                                    }}
                                    className='w-[100%] px-4 py-2 bg-blue-500 hover:bg-blue-800 text-white shadow-sm shadow-gray-500/80 rounded-lg'>
                                    ตกลง
                                </button>
                            </div>
                            <div>
                                <button
                                    onClick={() => {
                                        setData(undefined)
                                        setPath(undefined)
                                        setUser(undefined)
                                        setValue(undefined)
                                        setStop(false)
                                    }}
                                    className='w-[100%] min-w-[120px] px-4 py-2 bg-rose-500 hover:bg-rose-800 text-white shadow-sm shadow-gray-500/80 rounded-lg'>
                                    ยกเลิก
                                </button>
                            </div>
                        </div>
                        {user ?
                            <Avatar
                                size={100}
                                name={`u${user.user_id}`}
                                variant="beam"
                                colors={['#FF5252', '#FF7752', '#FF9A52', '#FFB752', '#5E405B']}
                            />
                            :
                            null
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}