import { useEffect, useState } from "react"
import { useAuth } from "../../hooks/useAuth"
import Validator from "../../utils/Validator"
import Selection from '../Selection'
import TextInput from "../TextInput"
import { TransactionValidator } from "../../validators/transaction.validator"
import { toast } from "react-toastify"

export default () => {
    const { dip } = useAuth()
    const [users, setUsers] = useState<string[]>([]);
    const [sender, setSender] = useState("")
    const [receiver, setReceiver] = useState("")
    const [info, setInfo] = useState("")
    const [amount, setAmount] = useState(0)
    const [error, setError] = useState<Record<string, string>>({})
    const init = async () => {
        const data = await (await dip!.on()).post('/api/v1/admin/all_user')
        if (data)
            setUsers(data.map((a: any) => a.user_id))
    }
    const onClick = async () => {
        const validate = await TestError()
        if (validate) {
            const code = await (await dip!.on()).post('/api/v1/admin/dummy', {
                body: JSON.stringify({
                    sender,
                    receiver,
                    info,
                    amount
                })
            })
            console.log(code)
            if (code) {
                if (code.code == 200) {
                    toast.success(`🍌 ${code.message}`, {
                        position: "top-right",
                        theme: 'dark',
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                } else {
                    toast.error(`🍌 ${code.message}`, {
                        position: "top-right",
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
    }
    useEffect(() => {
        init()
    }, [])
    const TestError = async () => {
        const { validate, errors } = await Validator(TransactionValidator, { sender, receiver, info, amount })
        setError(errors)
        return validate
    }
    return (
        <div className="flex flex-col space-y-4 items-center">
            <div className="w-full max-w-sm">
                <div className="grid grid-cols-2 gap-4 w-full">
                    <div>
                        <Selection onChange={setSender} value={sender} name={"sender"} showName options={users.filter(a => a != receiver)} ></Selection>
                    </div>
                    <div>
                        <Selection onChange={setReceiver} value={receiver} name={"receiver"} showName options={users.filter(a => a != sender)} ></Selection>
                    </div>
                    <div>
                        <label className='text-lg'></label>
                        <TextInput
                            value={info}
                            name="Info"
                            type="text"
                            onChange={setInfo}
                            placeholder="Info"
                            error={error.info}
                            size={'sm'}
                        />
                    </div>
                    <div>
                        <label className='text-lg'></label>
                        <TextInput
                            value={amount.toString()}
                            name="Amount"
                            type="text"
                            onChange={e => setAmount(parseFloat(e))}
                            placeholder="Info"
                            error={error.amount}
                            size={'sm'}
                        />
                    </div>
                    <div className="col-span-2">
                        <button onClick={onClick} className='w-[100%] my-5 py-2 bg-blue-500 hover:bg-blue-800 text-white shadow-sm shadow-gray-500/80 rounded-lg'>Create</button>
                    </div>
                </div>
            </div>
        </div>
    )
}