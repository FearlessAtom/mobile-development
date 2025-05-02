import { StyleSheet, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native"
import { StatusBar } from "react-native";
import HomeScreen from "./screens/HomeScreen.js";
import DirectoryScreen from "./screens/DirectoryScreen.js";
import FileScreen from "./screens/FileScreen.js"
import * as FileSystem from "expo-file-system";

export const root_path = FileSystem.documentDirectory + "AppData/";

const Stack = createNativeStackNavigator();

export function get_file_name(path)
{
    const parts = path.split("/").filter(Boolean);
    return parts[parts.length - 1];
}

export const format_bytes = (bytes, decimals = 2) =>
{
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const size = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

    return `${size} ${sizes[i]}`;
}

export default function App()
{
    return <NavigationContainer>
        <View style={ styles.container }>
            <View style={{ height: StatusBar.currentHeight }}></View>

            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen component={ HomeScreen } name="Home" />
                <Stack.Screen component={ DirectoryScreen } name="Directory" />
                <Stack.Screen component={ FileScreen } name="File" />
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
