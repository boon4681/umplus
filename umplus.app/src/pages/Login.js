import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, Platform, NativeModules, Button, Pressable, TouchableOpacity } from 'react-native';
import { TextInput } from "react-native";
import Container from "../components/Container";
import Header from "../components/Header"
import * as yup from 'yup'
import useValidator from '../hooks/useValidator';
import { useAuth } from '../hooks/useAuth';

const validator = yup.object().shape({
    username: yup.string().length(5).matches(/\d+/).required(),
    password: yup.string().length(13).matches(/\d+/).required()
})

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [disable,setDisable] = useState(false)
    const [errors,setError] = useState({})
    const {login} = useAuth()

    const onPress = async () =>{
        const validate = await TestError()
        if(validate){
            login(username,password)
        }
    }
    const TestError = async () => {
        const { validate, errors } = await useValidator(validator, { username, password })
        setError(errors)
        setDisable(!validate)
        return validate
    }

    useEffect(()=>{
        TestError()
    },[username,password])

    return (
        <Container>
            <Header></Header>
            <View className="px-5 w-full h-full flex flex-col justify-center space-y-4">
                <View>
                    <Text className="font-LINESeedRg font-normal text-xl text-RaisinBlack">
                        Username
                    </Text>
                    <TextInput
                        defaultValue={username}
                        onChangeText={(e)=>{
                            setUsername(e)
                        }}
                        className="font-LINESeedRg font-normal text-lg bg-white text-SonicSilver px-5 py-3 w-full border-2 border-RaisinBlack rounded-xl"
                        placeholder="เลขประจำตัว"
                    />
                    <Text>{errors.username}</Text>
                </View>
                <View>
                    <Text className="font-LINESeedRg font-normal text-xl text-RaisinBlack">
                        Password
                    </Text>
                    <TextInput
                        defaultValue={password}
                        onChangeText={(e)=>{
                            setPassword(e)
                        }}
                        className="font-LINESeedRg font-normal text-lg bg-white text-SonicSilver px-5 py-3 w-full border-2 border-RaisinBlack rounded-xl"
                        placeholder="เลขบัตรประชาชน"
                    />
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