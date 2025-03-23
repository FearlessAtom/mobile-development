import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Image, LogBox, StatusBar, View } from "react-native";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";

import { styles } from "./styles.js";

import { StoreScreen } from "./screens/StoreScreen/StoreScreen.js";
import { ChatScreen } from "./screens/ChatScreen/ChatScreen.js";
import { SafetyScreen } from "./screens/SafetyScreen/SafetyScreen.js";
import { CommunityScreen } from "./screens/CommunityScreen/CommunityScreen.js";


import { ABeeZee_400Regular } from "@expo-google-fonts/abeezee"
import { useFonts } from "@expo-google-fonts/abeezee";

const Tab = createMaterialTopTabNavigator();

function SomeComponent()
{
    return <></>
}

export default function App()
{
    LogBox.ignoreLogs(
    [
        'VirtualizedLists should never be nested inside plain ScrollViews',
    ]);

    useFonts(
    {
        ABeeZee_400Regular,
    });

    return <NavigationContainer>
        <View style=
        {[
            styles.mainBackgroundColor,
            {
                height: StatusBar.currentHeight,
            }
        ]}></View>

        <Tab.Navigator 
            tabBarPosition="bottom"
            screenOptions=
            {
                options =>
                ({
                    swipeEnabled: false,
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarActiveTintColor: "white",
                    sceneStyle: styles.mainBackgroundColor,
                    animation: "shift",

                    tabBarStyle:
                    [
                        {
                            shadowOpacity: 0,
                            elevation: 0,
                            borderTopWidth: 0,
                        },

                        styles.tabBackgroundColor,
                    ],

                    tabBarIndicatorStyle:
                    {
                        display: "none",
                    },

                    tabBarIcon: ({ focused, color, size }) =>
                    {
                        switch (options.route.name)
                        {
                            case "Store":
                                return <Ionicons name="bag-outline" size={23} color={color} />
                            case "Community":
                                return <MaterialIcons name="perm-identity" size={23} color={color} />
                            case "Chat":
                                return <Feather name="message-circle" size={23} color={color} />
                            case "Safety":
                                return <Feather name="shield" size={23} color={color}/>
                            case "Alya":
                                return <Image source={require("./assets/images/rust.png")}
                                    style={{width: 25, height: 25, borderRadius: 50}}></Image>
                        }
                    },
                })
            }>

            <Tab.Screen name="Store" component={ StoreScreen } />
            <Tab.Screen name="Community" component={ CommunityScreen } />
            <Tab.Screen name="Chat" component={ ChatScreen } />
            <Tab.Screen name="Safety" component={ SafetyScreen } />
            <Tab.Screen name="Alya" component={ SomeComponent } />
        </Tab.Navigator>
    </NavigationContainer>
}
