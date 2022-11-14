import { StyleSheet, Text, View, Image, ImageBackground, Platform, NativeModules } from 'react-native';

export default function Container({ children }) {
    return (
        <View className="absolute top-0 left-0 px-5 pt-6 w-full">
            {children}
        </View>
    )
}