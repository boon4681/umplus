import Logo from '../components/Logo'
import { MdAlternateEmail } from 'react-icons/md'
import { BiHide } from 'react-icons/bi'
import { AiOutlineUser } from 'react-icons/ai'
import Nav from "../components/Nav"
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useAuth } from "../hooks/useAuth"
import * as yup from 'yup'
import Validator from '../utils/Validator'
import { AdminLoginValidator } from '../validators/auth.validator'
import TextInput from '../components/TextInput'

export default () => {
    const [user, setUser] = useState("")
    const [password, setPassword] = useState("")
    const { login, isAuthenticated } = useAuth()
    const navigate = useNavigate()
    useEffect(() => {
        if (isAuthenticated) {
            navigate("/")
        }
    }, [isAuthenticated])
    const [error, setError] = useState<Record<string, string>>({})
    const onClick = async () => {
        const validate = await TestError()
        if (validate) {
            login(user, password)
        }
    }
    const TestError = async () => {
        const { validate, errors } = await Validator(AdminLoginValidator, { user: user, password })
        setError(errors)
        return validate
    }
    return (
        <div className='min-h-screen flex flex-col justify-center '>
            <div className='mx-auto w-[320px] bg-white p-8 px-8 rounded-[20px] justify-center shadow-lg shadow-gray-500/50'>
                <div className=''>
                    <Logo className='text-black text-xs'></Logo>
                </div>
                <div className='flex flex-col text-black py-2'>
                    <label className='text-xl'>Username</label>
                    <TextInput
                       firstname="Username"
                        onChange={setUser}
                        placeholder="Username"
                        icon={<AiOutlineUser className="w-5 h-5 text-gray-400" />}
                        error={error.user}
                    />
                </div>
                <div className='flex flex-col text-black py-2 ' >
                    <label className='text-xl'>Password</label>
                    <TextInput
                       firstname="Password"
                        type="password"
                        onChange={setPassword}
                        placeholder="Password"
                        icon={<BiHide className="w-5 h-5 text-gray-400" />}
                        error={error.password}
                    />
                </div>
                <button onClick={onClick} className='w-[100%] my-10 py-2 bg-blue-500 hover:bg-blue-800 text-white shadow-sm shadow-gray-500/80 rounded-lg'>Login</button>
            </div>
        </div>
    )
}