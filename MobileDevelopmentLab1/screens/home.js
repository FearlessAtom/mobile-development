import { FlatList, Text, View } from "react-native";
import { homeStyles } from "../styles"
import { HomeItem } from "../components/HomeItem";

export function HomeScreen()
{
    const data = [];

    for (let i = 0; i < 50; i++)
    {
        data.push({ id: i + 1,
            thumbnail: { uri: "https://www.pngkey.com/png/full/233-2332677_image-500580-placeholder-transparent.png" },
            title: "News title", date: "News date", shortText: "Short news text" });
    }

    return <View>
        <FlatList style={ homeStyles.list } data={data}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={ <Text style={ homeStyles.title }>News</Text> }
            renderItem={({item}) => <HomeItem props={item} /> }
        />
    </View>
}

