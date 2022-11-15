import { StyleSheet, Text, View, Image, ImageBackground, Platform, NativeModules, Button, Pressable, TouchableOpacity } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from "./hooks/useAuth"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Header from './components/Header';

const Theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: 'transparent',
    },
}

const Stack = createNativeStackNavigator();

export default () => {
    const { isAuthenticated } = useAuth()
    return (
        <View className="w-full h-full absolute top-0 left-0" style={{ flex: 1 }}>
            <NavigationContainer theme={Theme}>
                <Stack.Navigator
                    initialRouteName={!isAuthenticated ? "Login" : "Home"}
                    screenOptions={{
                        headerShown: false
                    }}
                // initialRouteName={"Login"}
                >
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="Home" component={Home} />
                </Stack.Navigator>
            </NavigationContainer>
        </View>
    )
}