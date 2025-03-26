import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles, theme } from "../styles";
import { useTheme } from "../ThemeContext.js";

export function Header({ title, search=true })
{
    const { theme, toggleTheme } = useTheme();

    return <View style={{display: "flex", flexDirection: "row", alignItems: "center", margin: 15 }}>
        <Image source={require("../assets/images/steam.png")}
            style={{ height: 40, width: 40, marginRight: 15, tintColor: theme.iconColor }}></Image>

        <Text style={[ styles.abeeZeeFont, { fontSize: 30, flex: 1, color: theme.textMain } ]}>{title}</Text>
        {
            search && <TouchableOpacity style={{ marginLeft: "auto" }}>
                <Image style={{ height: 25, width: 25 }} source={ require("../assets/images/search.png") }></Image>
            </TouchableOpacity>
        }
    </View>
}
