import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegisterScreen from "../screens/RegisterScreen.js";
import LoginScreen from "../screens/LoginScreen.js";

const Stack = createNativeStackNavigator();

export default function GuestStack()
{
    return <Stack.Navigator>
        <Stack.Screen name="Register" component={ RegisterScreen } options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={ LoginScreen } options={{ headerShown: false }} />
    </Stack.Navigator>
}
