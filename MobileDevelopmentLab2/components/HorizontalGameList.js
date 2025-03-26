import { FlatList, Image, ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../styles.js";
import { useTheme } from "../ThemeContext.js";

export function HorizontalGameList({ data, images })
{
    const { theme, toggleTheme } = useTheme();

    return <FlatList
        data={ data }
        contentContainerStyle={{ paddingVertical: 15, paddingHorizontal: 20 }}

        showsHorizontalScrollIndicator={ false }
        ItemSeparatorComponent={ () => <View style={{ width: 20 }} /> }
        horizontal={ true }

        renderItem=
        {
            ({ item }) =>
            {
                let platforms = item.platforms.map((platform, index) =>
                {
                    return <Image resizeMode="contain" key={index} source={images[platform]}
                        style={{width: 20, height: 20, marginRight: 10 }} ></Image>
                });

                return <TouchableOpacity>
                    <ImageBackground source={images[item.image]} style={{ height: 250, width: 350, overflow: "hidden",
                        borderRadius: 20, padding: 20, display: "flex", justifyContent: "flex-end" }}>
                        
                        <Text style={[ {color: "white", fontSize: 25 }, styles.abeeZeeFont ] } >{ item.name }</Text>
                        <Text style={[ styles.abeeZeeFont, styles.grayColor ]}>{ item.message }</Text>
                        
                        <View style={{ flexDirection: "row" }}>
                            {item.discount > 0 && item.cost > 0 ?
                                <View style={{ opacity: 0.7, flexDirection: "row", marginTop: 5 }}>
                                    <View style={{ backgroundColor: "green", paddingVertical: 2,
                                            paddingHorizontal: 5, borderTopLeftRadius: 5, borderBottomLeftRadius: 5}}>

                                        <Text style={{ color: "white" }}>
                                            -{item.discount}%
                                        </Text>
                                    </View>

                                    <View style={{ backgroundColor: "black", paddingHorizontal: 5,
                                        flexDirection: "row", paddingVertical: 2}}>

                                        <Text style={[{ color: "", textDecorationLine: "line-through" }, styles.grayColor]}>
                                            ${item.cost}
                                        </Text>

                                        <Text style={{ color: "white", marginLeft: 5 }}
                                            >${(item.cost * (1 - ((item.discount) / 100))).toFixed(2)}</Text>
                                    </View>
                                </View>

                            :
                                <View style={{ backgroundColor: "black", opacity: 0.7, paddingVertical: 2, marginTop: 5,
                                        paddingHorizontal: 5, borderRadius: 5}}>

                                    <Text style={{ color: "white" }}>
                                        {item.cost == 0 ? "Free" : "$" + item.cost}
                                    </Text>
                                </View>
                            }

                            <View style={{ flexDirection: "row", marginLeft: "auto", marginTop: "auto" }}>{ platforms }</View>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
            }
        }
    />
}
