import { Image, StyleSheet, Text, View } from "react-native";
import { styles } from "../styles.js";
import { useTheme } from "../ThemeContext.js";

export function ProfileHeader({ first_name, last_name, group, size=0, image, active=true, activityColor="green" })
{
    const { theme, toggleTheme } = useTheme();

    const position_ratio = 0.75;
    const size_ratio = 0.25;

    return <View style={{ alignItems: "center" }}>
        <View style={ profileHeaderStyles.profilePictureContainer }>
            <Image source={ image } style={[ { width: size, height: size }, profileHeaderStyles.profilePicture ]}></Image>

        { active &&
            <View style={[ profileHeaderStyles.activeIcon,
                { top: size * position_ratio, left: size * position_ratio, borderColor: theme.backgroundMain,
                    height: size * size_ratio, width: size * size_ratio, backgroundColor: activityColor }]}>
            </View>
        }
        </View>

        { first_name && last_name && group ?
            <View>
            <Text style={[ styles.abeeZeeFont, profileHeaderStyles.text, { color: theme.textMain } ]}
                >{ first_name } { last_name }</Text>

            <Text style={[ styles.abeeZeeFont, profileHeaderStyles.text, { color: theme.textMain } ]}>{ group }</Text>
        </View> : null}
    </View>
}

const profileHeaderStyles = StyleSheet.create(
{
    profilePictureContainer:
    {
        position: "relative",
        marginBottom: 5,
    },

    profilePicture:
    {
        borderRadius: 100,
    },

    activeIcon:
    {
        position: "absolute",
        height: 20,
        width: 20,
        borderRadius: 100,
        borderWidth: 3,
    },

    text:
    {
        alignSelf: "stretch",
        fontSize: 20,
        textAlign: "center",
    }
});
