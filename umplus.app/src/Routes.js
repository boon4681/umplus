import { StyleSheet, Text, View, Image, ImageBackground, Platform, NativeModules, Button, Pressable, TouchableOpacity } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from "./hooks/useAuth"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Transaction from './pages/Transaction';
import Setting from './pages/Setting';
import Header from './components/Header';
import { MeProvinder } from './components/MeProvinder';

const Theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: 'transparent',
    },
}

const Stack = createStackNavigator();

export default () => {
    const { isAuthenticated,dip } = useAuth()
    if (!isAuthenticated)
        return (
            <Login></Login>
        )
    return (
        <View className="w-full h-full absolute top-0 left-0" style={{ flex: 1 }}>
            <MeProvinder>
                <NavigationContainer theme={Theme}>
                    <Stack.Navigator
                        initialRouteName={"Home"}
                        screenOptions={
                            {
                                headerShown: false,
                                animation: 'slide_from_right'
                            }
                        }

                    >
                        <Stack.Screen name="Home" component={Home} />
                        <Stack.Screen name="Transaction" component={Transaction} />
                        <Stack.Screen name="Setting" component={Setting} />
                    </Stack.Navigator>
                </NavigationContainer>
            </MeProvinder>
        </View>
    )
}