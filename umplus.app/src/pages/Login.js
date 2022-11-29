import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, Platform, NativeModules, Button, Pressable, TouchableOpacity } from 'react-native';
import { TextInput } from "react-native";
import Container from "../components/Container";
import Header from "../components/Header"
import * as yup from 'yup'
import useValidator from '../hooks/useValidator';
import { useAuth } from '../hooks/useAuth';

const validator = yup.object().shape({
    username: yup.string().length(5, 'เลขประจำตัวต้องมี 5 ตัวเท่านั้น').matches(/\d+/).required(),
    password: yup.string().length(13, 'รหัสผ่านต้องมี 13 ตัวเท่านั้น').matches(/\d+/).required()
})

export default function Login({ navigation }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [disable, setDisable] = useState(false)
    const [errors, setError] = useState({})
    const { login, isAuthenticated } = useAuth()

    const onPress = async () => {
        const validate = await TestError()
        if (validate) {
            setDisable(true)
            login(username, password).then(()=>{
                setDisable(false)
            })
        }
    }
    const TestError = async () => {
        const { validate, errors } = await useValidator(validator, { username, password })
        setError(errors)
        setDisable(!validate)
        return validate
    }

    useEffect(() => {
        TestError()
    }, [username, password])

    useEffect(() => {
        if (isAuthenticated)
            navigation.navigate('Home')
    }, [isAuthenticated])

    return (
        <Container>
            <View className="px-5 w-full h-full flex flex-col space-y-4 pt-10">
                <View>
                    <Text className="font-LINESeedRg font-normal text-xl text-RaisinBlack">
                        บัญชีผู้ใช้
                    </Text>
                    <TextInput
                        defaultValue={username}
                        onChangeText={(e) => {
                            setUsername(e)
                        }}
                        className="font-LINESeedRg font-normal text-lg bg-white text-SonicSilver px-5 py-3 w-full border-2 border-RaisinBlack rounded-xl"
                        placeholder="เลขประจำตัว"
                    />
                    <Text className='text-rose-500 font-LINESeedRg text-base'>{errors.username}</Text>
                </View>
                <View>
                    <Text className="font-LINESeedRg font-normal text-xl text-RaisinBlack">
                        รหัสผ่าน
                    </Text>
                    <TextInput
                        defaultValue={password}
                        onChangeText={(e) => {
                            setPassword(e)
                        }}
                        secureTextEntry={true}
                        className="font-LINESeedRg font-normal text-lg bg-white text-SonicSilver px-5 py-3 w-full border-2 border-RaisinBlack rounded-xl"
                        placeholder="เลขบัตรประชาชน"
                    />
                    <Text className='text-rose-500 font-LINESeedRg text-base'>{errors.password}</Text>
                </View>
                <View>
                    <TouchableOpacity
                        disabled={disable}
                        onPress={onPress}
                        className={`px-5 py-3 w-full ${disable ? 'bg-[#0084ff70]' : 'bg-[#0084ff]'} border-2 border-RaisinBlack rounded-xl flex justify-center items-center mt-6`}
                    >
                        <Text className={`font-LINESeedRg font-normal text-lg ${disable ? 'text-[#ffffffc6]' : 'text-[#ffffff]'} text-opacity-25`}>เข้าสู่ระบบ</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Container>
    )
}