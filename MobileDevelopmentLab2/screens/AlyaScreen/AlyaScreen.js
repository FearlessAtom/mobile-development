import { StyleSheet, Text, View } from "react-native";
import { ProfileHeader } from "../../components/ProfileHeader";
import { StackList } from "../../components/StackList";
import { useTheme } from "../../ThemeContext";
import { useNavigation } from "@react-navigation/native";

export function AlyaScreen()
{
    const { theme, toggleTheme } = useTheme();
    const navigation = useNavigation();

    const data =
    [
        {
            id: 1, name: "Settings", action: () => {},
        },

        {
            id: 2, name: "Logout", action: () => navigation.navigate("Store"),
        },

        {
            id: 3, name: "Toggle theme", action: () => toggleTheme(),
        }
    ]

    return <View>
        <View style={ AlyaScreenStyles.headerContainer }>
            <ProfileHeader first_name="Олексій" last_name="Семенчук" group="ІПЗ-23-1" size={ 120 } active={ true }
                image={ require("../../assets/images/rust.png") } />
        </View>

        <View style={ AlyaScreenStyles.stackListContainer }>
            <StackList data={ data } />
        </View>
    </View>
}

const AlyaScreenStyles = StyleSheet.create(
{
    headerContainer: 
    {
        marginTop: 60,
    },

    stackListContainer:
    {
        margin: 20,
        marginTop: 40,
    },
});
