import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../ThemeContext";
import { styles } from "../styles.js";
import { useState } from "react";

export function Switch({ option_one, option_two })
{
    const { theme, toggleTheme } = useTheme();
    const [ switchValue, setSwitchValue ] = useState(false);

    const toggleSwitch = () =>
    {
        console.log(switchValue);
        setSwitchValue(previous_value => !previous_value);
        console.log(switchValue);
    }

    return <View style={[ switchStyles.switchContainer, { backgroundColor: theme.buttonMain} ]}>

        <TouchableOpacity style={[ switchStyles.switchHalf,
            { backgroundColor: (switchValue ? theme.backgroundMain: "transparent") } ]}
            onPress={ () => setSwitchValue(true) }>

            <Text style={[ { color: (switchValue ? theme.textMain: theme.textSecondary) },
                styles.abeeZeeFont, switchStyles.text ]}>{ option_one }</Text>

        </TouchableOpacity>

        <TouchableOpacity style={[ switchStyles.switchHalf,
            { backgroundColor: (!switchValue ? theme.backgroundMain: "transparent") } ]}
            onPress={ () => setSwitchValue(false) }>

            <Text style={[ { color: (!switchValue ? theme.textMain: theme.textSecondary) },
                styles.abeeZeeFont, switchStyles.text ]}>{ option_two }</Text>

        </TouchableOpacity>
    </View>
}

const switchStyles = StyleSheet.create(
{
    text:
    {
        fontSize: 17,
        alignSelf: "stretch",
        textAlign: "center",
    },

    switchContainer:
    {
        borderRadius: 10,
        flexDirection: "row",
        padding: 2,
    },

    switchHalf:
    {
        flex: 0.5,
        padding: 10,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    }
});
