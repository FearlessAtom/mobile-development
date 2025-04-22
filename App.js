import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { GameScreen } from "./screens/GameScreen";
import { TasksScreen } from "./screens/TasksScreen";
import { StatusBar, View } from "react-native";

const Tab = createMaterialTopTabNavigator();

export default function App()
{
    const [tasks, setTasks] = useState(
    [
        { key: "clicks", label: "Click 10 times", value: 0, max: 10 },
        { key: "doubleClicks", label: "Double click 5 times", value: 0, max: 5 },
        { key: "longPress", label: "Hold for 3 seconds", value: 0, max: 3 },
        { key: "pan", label: "Drag the object", value: 0, max: 1 },
        { key: "flingRight", label: "Swipe right", value: 0, max: 1 },
        { key: "flingLeft", label: "Swipe left", value: 0, max: 1 },
        { key: "pinch", label: "Resize the object", value: 0, max: 1 },
        { key: "score100", label: "Reach 100 points", value: 0, max: 100 },
    ]);

    return <NavigationContainer>
        <View style={{ height: StatusBar.currentHeight }}></View>
        <Tab.Navigator tabBarPosition="bottom" screenOptions={{ swipeEnabled: false }}>
            <Tab.Screen name="Game">
                {() => <GameScreen tasks={tasks} setTasks={setTasks} />}
            </Tab.Screen>
            <Tab.Screen name="Tasks">
                {() => <TasksScreen tasks={tasks} />}
            </Tab.Screen>
        </Tab.Navigator>
    </NavigationContainer>
}
