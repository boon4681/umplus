import { useState } from "react"
import { toast } from "react-toastify"
import { useAuth } from "../../hooks/useAuth"
import Validator from "../../utils/Validator"
import { UserRegisterValidator } from "../../validators/auth.validator"
import TextInput from "../TextInput"


export default () => {
    const { dip } = useAuth()
    const [error, setError] = useState<Record<string, string>>({})

    const [user_id, setUser_id] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [budget, setBudget] = useState(0)

    const onClick = async () => {
        const validate = await TestError()
        if (validate) {
            
            const code = await await dip?.fetch('/api/v1/admin/dummy','POST', {
                data: {
                    user_id,
                    username,
                    email,
                    password,
                    budget
                }
            })
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
                    setUsername('')
                    setUser_id('')
                    setBudget(0)
                    setEmail('')
                    setPassword('')
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
    const TestError = async () => {
        const { validate, errors } = await Validator(UserRegisterValidator, { user_id, username, email, password, budget })
        setError(errors)
        return validate
    }

    return (
        <div className="flex flex-col space-y-4 items-center">
            <div className="w-full max-w-sm">
                <div className="grid grid-cols-1 gap-4 w-full">
                    <div>
                        <label className='text-lg'>User id</label>
                        <TextInput
                            value={user_id}
                            name="User id"
                            type="text"
                            onChange={setUser_id}
                            placeholder="User id"
                            error={error.user_id}
                            size={'sm'}
                        />
                    </div>
                    <div>
                        <label className='text-lg'>Username</label>
                        <TextInput
                            value={username}
                            name="Username"
                            type="text"
                            onChange={setUsername}
                            placeholder="Username"
                            error={error.username}
                            size={'sm'}
                        />
                    </div>
                    <div>
                        <label className='text-lg'>Email</label>
                        <TextInput
                            value={email}
                            name="Email"
                            type="email"
                            onChange={setEmail}
                            placeholder="Email"
                            error={error.email}
                            size={'sm'}
                        />
                    </div>
                    <div>
                        <label className='text-lg'>Password</label>
                        <TextInput
                            value={password}
                            name="Password"
                            type="password"
                            onChange={setPassword}
                            placeholder="Password"
                            error={error.password}
                            size={'sm'}
                        />
                    </div>
                    <div>
                        <label className='text-lg'>Budget</label>
                        <TextInput
                            value={budget.toString()}
                            name="Budget"
                            type="number"
                            onChange={(e) => { setBudget(parseFloat(e)) }}
                            placeholder="Budget"
                            error={error.budget}
                            size={'sm'}
                        />
                    </div>
                </div>
                <button onClick={onClick} className='w-[100%] my-10 py-2 bg-blue-500 hover:bg-blue-800 text-white shadow-sm shadow-gray-500/80 rounded-lg'>Create</button>
            </div>
        </div>
    )
}