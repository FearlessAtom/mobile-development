import { FlatList, TouchableOpacity } from "react-native";
import { galleryStyles } from "../styles";
import { useNavigation } from "@react-navigation/native";

export function GalleryScreen()
{
    const navigation = useNavigation();

    const data = [];

    for (let i = 0; i < 50; i++) data.push({ id: i + 1});

    return <FlatList data={data} numColumns={2}
        keyExtractor={ (item) => item.id }
        renderItem={() => <TouchableOpacity onPress={() => navigation.navigate("Profile")}
        style={ galleryStyles.image } /> } />
}
