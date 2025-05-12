import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../screens/ProfileScreen.js";
import DeleteAccount from "../screens/DeleteAccountScreen.js";

const Stack = createNativeStackNavigator();

export default function AppStack()
{
    return <Stack.Navigator>
        <Stack.Screen name="Profile" component={ ProfileScreen } options={{ headerShown: false }} />
        <Stack.Screen name="DeleteAccount" component={ DeleteAccount } options={{ headerShown: false }} />
    </Stack.Navigator>
}
