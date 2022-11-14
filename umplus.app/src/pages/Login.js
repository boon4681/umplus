import { StyleSheet, Text, View, Image, ImageBackground, Platform, NativeModules,Button } from 'react-native';
import { TextInput } from "react-native";
import Container from "../components/Container";
import Header from "../components/Header"

export default function Login() {
    return (
        <Container>
            <Header></Header>
            <View className="px-5 w-full h-full flex flex-col justify-center space-y-4">
                <View>
                    <Text className="font-LINESeedRg font-normal text-xl text-RaisinBlack">
                        Username
                    </Text>
                    <TextInput
                        className="font-LINESeedRg font-normal text-lg bg-white text-SonicSilver px-5 py-3 w-full border-2 border-RaisinBlack rounded-xl"
                        placeholder="เลขประจำตัว"
                    />
                </View>
                <View>
                    <Text className="font-LINESeedRg font-normal text-xl text-RaisinBlack">
                        Password
                    </Text>
                    <TextInput
                        className="font-LINESeedRg font-normal text-lg bg-white text-SonicSilver px-5 py-3 w-full border-2 border-RaisinBlack rounded-xl"
                        placeholder="เลขบัตรประชาชน"
                    />
                </View>
                <View>
                    <Button></Button>
                </View>
            </View>
        </Container>
    )
}