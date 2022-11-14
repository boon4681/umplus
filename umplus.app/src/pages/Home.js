import { StyleSheet, Text, View, Image, ImageBackground, Platform, NativeModules } from 'react-native';

export default function Home() {
    return (
        <View className="flex items-center absolute bottom-0 w-full">
            <Image className="absolute bottom-0 w-full h-24" source={Nav_bg} />
            <Image className="absolute bottom-6 h-24" source={Scan_btn} />
        </View>
    )
}