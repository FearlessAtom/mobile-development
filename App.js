import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from "@react-navigation/native"
import { HomeScreen } from './screens/home';
import { ProfileScreen } from './screens/profile';
import { StatusBar, View } from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';
import { GalleryScreen } from './screens/gallery';
import { Credit } from './components/Credit';
import { Footer } from './components/Footer';

const Tab = createMaterialTopTabNavigator();

export default function App()
{
    return <>
        <View style={{paddingTop: StatusBar.currentHeight, backgroundColor: "black"}}></View>
 
        <Footer />

        <NavigationContainer>
            <Tab.Navigator screenOptions={({route }) => ({
                tabBarActiveTintColor: "blue",
                tabBarInactiveTintColor: "gray",
                tabBarIndicatorStyle: { backgroundColor: "blue" },
                tabBarLabelStyle: { margin: 0, padding: 0 },
                tabBarStyle: { backgroundColor: "#ededed", shadowColor: "transparent" },
                sceneStyle: { backgroundColor: "white" },

                tabBarIcon: ({ color }) =>
                {
                    let icon_name;

                    switch (route.name)
                    {
                        case "Home":
                            icon_name = "home";
                            break;
                        case "Gallery":
                            icon_name = "image";
                            break;
                        case "Profile":
                            icon_name = "person-fill";
                            break;

                        default:
                            icon_name = "question";
                            break;
                    }

                    return <Icon name={icon_name} size={20} color={color}></Icon>
                }
            })}>

                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Gallery" component={GalleryScreen} />
                <Tab.Screen name="Profile" component={ProfileScreen} />
            </Tab.Navigator>
        </NavigationContainer>

        <Credit />
    </>
}
