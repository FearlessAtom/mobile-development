import { Image, Text, TouchableOpacity, View } from "react-native";

export function Header({ title, search=true })
{
    return <View style={{display: "flex", flexDirection: "row", alignItems: "center", margin: 15 }}>
        <Image source={require("../assets/images/steam.png")} style={{ height: 40, width: 40, marginRight: 15 }}></Image>

        <Text style={{ color: "white", fontSize: 30, fontFamily: "ABeeZee_400Regular" }}>{title}</Text>

        {
            search && <TouchableOpacity style={{ marginLeft: "auto" }}>
                <Image style={{ height: 25, width: 25 }} source={ require("../assets/images/search.png") }></Image>
            </TouchableOpacity>
        }
    </View>
}
