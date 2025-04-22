import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { GameScreen } from "./screens/GameScreen";
import { NavigationContainer } from "@react-navigation/native";
import { TasksScreen } from "./screens/TasksScreen";

const Tab = createMaterialTopTabNavigator();

export default function App()
{
    return <NavigationContainer>
        <Tab.Navigator
            tabBarPosition="bottom"
            screenOptions= {
                options => ({
                    swipeEnabled: false,
                })
            }
        >
            <Tab.Screen name="Game" component={ GameScreen }/>
            <Tab.Screen name="Tasks" component={ TasksScreen }/>
        </Tab.Navigator>
    </NavigationContainer>
}
