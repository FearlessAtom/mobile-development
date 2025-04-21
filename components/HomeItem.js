import { Image, Text } from "react-native"
import { homeStyles } from "../styles"
import { TouchableOpacity } from "react-native"
import { View } from "react-native"
import { useNavigation } from "@react-navigation/native";

export function HomeItem({ props })
{
    const navigation = useNavigation();

    return <TouchableOpacity onPress={() => navigation.navigate("Profile")} style={ homeStyles.item}>
        <Image resizeMode="stretch" source={props.thumbnail} style={ homeStyles.itemImage } />
        <View style={ homeStyles.itemContent }>
            <Text style={ homeStyles.itemTitle }>{ props.title }</Text>
            <Text style={ homeStyles.itemDate }>{ props.date }</Text>
            <Text style={ homeStyles.itemShortText}>{ props.shortText }</Text>
        </View>
    </TouchableOpacity>
}
