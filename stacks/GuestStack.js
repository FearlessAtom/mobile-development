import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegisterScreen from "../screens/RegisterScreen.js";
import LoginScreen from "../screens/LoginScreen.js";
import ResetPasswordScreen from "../screens/ResetPasswordScreen.js";

const Stack = createNativeStackNavigator();

export default function GuestStack()
{
    return <Stack.Navigator>
        <Stack.Screen name="Login" component={ LoginScreen } options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={ RegisterScreen } options={{ headerShown: false }} />
        <Stack.Screen name="ResetPassword" component={ ResetPasswordScreen } options={{ headerShown: false }} />
    </Stack.Navigator>
}
