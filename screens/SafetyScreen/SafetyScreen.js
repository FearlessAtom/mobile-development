import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import { Header } from "../../components/Header";
import { StackList } from "../../components/StackList";
import { Switch } from "../../components/Switch";
import { styles } from "../../styles.js";
import { useTheme } from "../../ThemeContext";
import { LinearGradient } from "expo-linear-gradient"

export function SafetyScreen()
{
    const data =
    [
        {
            id: 1, name: "Remove Authenticator", action: () => {},
        },

        {
            id: 2, name: "My Recovery Code", action: () => {},
        },

        {
            id: 3, name: "Help", action: () => {},
        }
    ]

    const { theme, toggleTheme } = useTheme();

    return <View>
        <Header title="Safety" search={ false } />
        <View style={ safetyStyles.switchContainer }>
            <Switch option_one="Guard" option_two="Confirmations" />
        </View>
        <View style={ safetyStyles.imageContainer }>
            <ImageBackground style={{ width: "100%", height: 230 }} resizeMode="stretch"
                source={ require("../../assets/images/background.png") }>

                <LinearGradient 
                    colors={[theme.backgroundMain, (theme.dark == false ? theme.backgroundMain : "transparent")]}
                    style={[ {height : '100%', width : '100%'}, safetyStyles.gradientContainer ]}>

                    <Text style={[ styles.abeeZeeFont, { color: theme.textSecondary } ]}
                        >Logged in as player</Text>
                    
                    <Text style={[ safetyStyles.code, { color: theme.textMain } ]}>N5KCV</Text>

                    <View style={[ { backgroundColor: theme.backgroundMain }, safetyStyles.progressBar ]}>
                        <View style={[ safetyStyles.progress, { backgroundColor: theme.buttonActive } ]}></View>
                    </View>

                </LinearGradient>
            </ImageBackground>
        </View>

        <View style={ safetyStyles.textContainer }>
            <Text style={[ styles.abeeZeeFont, safetyStyles.text, { color: theme.textMain} ]}>You'll enter your code each time you enter your password to sign in to your Steam account</Text>
        </View>

        <View style={ safetyStyles.activeTextContainer }>
            <Text style={[ styles.abeeZeeFont, safetyStyles.text, { color: theme.buttonActive } ]}>Tip: If you don't share your PC, you can select "Remember my password" when you sign in to the PC client to enter your password and authenticator code less often.</Text>
        </View>

        <View style={ safetyStyles.stackListContainer }>
            <StackList data={ data } />
        </View>
    </View>
}

const safetyStyles = StyleSheet.create(
{
    progressBar:
    {
        marginTop: 10,
        width: "40%",
        height: 10,
        borderRadius: 10,
        overflow: "hidden",
    },

    progress:
    {
        width: "70%",
        height: "100%",
        borderRadius: 10,
    },

    gradientContainer:
    {
        justifyContent: "center",
        alignItems: "center",
    },

    code:
    {
        fontSize: 50,
        fontWeight: "700",
        letterSpacing: 5,
    },

    text:
    {
        fontSize: 15,
    },

    stackListContainer:
    {
        marginHorizontal: 20,
    },

    activeTextContainer:
    {
        paddingHorizontal: 20,
        paddingBottom: 25,
    },

    textContainer:
    {
        paddingHorizontal: 20,
        paddingTop: 30,
        paddingBottom: 20,
    },

    switchContainer:
    {
        paddingHorizontal: 20,
        paddingTop: 10,
    },

    imageContainer:
    {
        paddingTop: 30,
    }
});
