import { StyleSheet, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native"
import { StatusBar } from "react-native";
import HomeScreen from "./screens/HomeScreen.js";
import DirectoryScreen from "./screens/DirectoryScreen.js";

const Stack = createNativeStackNavigator();

export default function App()
{
    return <NavigationContainer>
        <View style={ styles.container }>
            <View style={{ height: StatusBar.currentHeight }}></View>

            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen component={ HomeScreen } name="Home" />
                <Stack.Screen component={ DirectoryScreen } name="Directory" />
            </Stack.Navigator>
        </View>
    </NavigationContainer>
}

const styles = StyleSheet.create(
{
    container:
    {
        flex: 1,
    },
});
