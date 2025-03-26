import { styles } from "../styles.js";

import { Ionicons, MaterialIcons, Feather } from "@expo/vector-icons";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Image, StatusBar, View } from "react-native";
import { useTheme } from "../ThemeContext.js";

import { NavigationContainer } from "@react-navigation/native"

import { StoreScreen } from "./StoreScreen/StoreScreen.js";
import { CommunityScreen } from "./CommunityScreen/CommunityScreen.js";
import { ChatScreen } from "./ChatScreen/ChatScreen.js";
import { SafetyScreen } from "./SafetyScreen/SafetyScreen.js";
import { AlyaScreen } from "./AlyaScreen/AlyaScreen.js";


const Tab = createMaterialTopTabNavigator();

export function Screens()
{
    const { theme, toggleTheme } = useTheme();

    return <NavigationContainer>

        <View style={{ height: StatusBar.currentHeight, backgroundColor: theme.backgroundMain }}></View>

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
                    sceneStyle:
                    {
                        backgroundColor: theme.backgroundMain,
                    },
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
                                return <Image source={require("../assets/images/rust.png")}
                                    style={{width: 25, height: 25, borderRadius: 50}}></Image>
                        }
                    },
                })
            }>

            <Tab.Screen name="Store" component={ StoreScreen } />
            <Tab.Screen name="Community" component={ CommunityScreen } />
            <Tab.Screen name="Chat" component={ ChatScreen } />
            <Tab.Screen name="Safety" component={ SafetyScreen } />
            <Tab.Screen name="Alya" component={ AlyaScreen } />
        </Tab.Navigator>
    </NavigationContainer>
}
