import { StyleSheet, Text, View, Image, ImageBackground, Platform, NativeModules, Button, Pressable, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from "./hooks/useAuth"

import Home from "./pages/Home"
import Login from "./pages/Login"
import Transaction from './pages/Transaction';
import AddMoney from './pages/AddMoney';
import Setting from './pages/Setting';
import WithDraw from './pages/WithDraw';

import { MeProvinder } from './components/MeProvinder';
import Transfer from './pages/Transfer';
import News from './pages/News';
import ConfirmTransfer from './pages/ConfirmTransfer';
import Camera from './pages/Camera';

const Theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: 'transparent',
    },
}

const Stack = createStackNavigator();

export default () => {
    const { isAuthenticated, dip } = useAuth()
    if (!isAuthenticated)
        return (
            <Login></Login>
        )
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                        <Stack.Screen name="Setting" component={Setting} />
                        <Stack.Screen name="AddMoney" component={AddMoney} />
                        <Stack.Screen name="WithDraw" component={WithDraw} />
                        <Stack.Screen name="Transaction" component={Transaction} />
                        <Stack.Screen name="Transfer" component={Transfer} />
                        <Stack.Screen name="ConfirmTransfer" component={ConfirmTransfer} />
                        <Stack.Screen name="News" component={News} />
                        <Stack.Screen name="Camera" component={Camera} />
                    </Stack.Navigator>
                </NavigationContainer>
            </MeProvinder>
        </TouchableWithoutFeedback>
    )
}