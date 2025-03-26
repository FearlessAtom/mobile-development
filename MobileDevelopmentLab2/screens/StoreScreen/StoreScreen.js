import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../../styles";
import { Header } from "../../components/Header";
import { HorizontalGameList } from "../../components/HorizontalGameList";
import { HorizontalList } from "../../components/HorizontalList";
import { useState } from "react";
import { useTheme } from "../../ThemeContext";

const format_number = (number) =>
{
    return Number.isInteger(number) ? number.toString() : number.toFixed(2);
};

export function StoreScreen()
{
    const { theme, toggleTheme } = useTheme();

    const storeImages =
    {
        "windows": require("../../assets/images/windows.png"),
        "apple": require("../../assets/images/apple.png"),

        "dead_by_daylight": require("../../assets/images/dead_by_daylight.png"),
        "unturned": require("../../assets/images/unturned.png"),
        "the_forest": require("../../assets/images/the_forest.png"),
        "counter_strike_2": require("../../assets/images/counter_strike_2.png"),

        "gta5": require("../../assets/images/gta5.png"),
        "battlefield4": require("../../assets/images/battlefield4.png"),
        "factorio": require("../../assets/images/factorio.png"),
        "horizon_zeno_dawn": require("../../assets/images/horizon_zeno_dawn.png"),
        "cyberpunk2077": require("../../assets/images/cyberpunk2077.png"),
        "among_us": require("../../assets/images/among_us.png"),
        "red_dead_redemption_2": require("../../assets/images/red_dead_redemption_2.png"),
        "the_witcher_3_wild_hunt": require("../../assets/images/the_witcher_3_wild_hunt.png"),
        "overwatch_2": require("../../assets/images/overwatch_2.png"),
        "elden_ring": require("../../assets/images/elden_ring.png"),
    }

    const horizontal_game_list_data =
    [
        { id: 1, name: "Dead by Daylight", message: "Recommended by your friend, Player",
            image: "dead_by_daylight", platforms: ["windows"], cost: 18, discount: 70,
        },

        { id: 2, name: "Unturned", message: "Recommended by your friend, Alya",
            image: "unturned", platforms: ["windows", "apple"], cost: 0, discount: 0,
        },

        { id: 3, name: "The Forest", message: "Recommended by your friend, NexLiR",
            image: "the_forest", platforms: ["windows"], cost: 7, discount: 0,
        },

        { id: 4, name: "Counter-Strike 2", message: "Recommended by your friend, DDXwild",
            image: "counter_strike_2", platforms: ["windows"], cost: 0, discount: 0,
        },
    ]
        
    const horizontal_list_data =
    [
        {
            id: 1, title: "Top Sellers",
        },

        {
            id: 2, title: "Free to play",
        },

        {
            id: 3, title: "Early Access",
        },

        {
            id: 4, title: "Most Popular",
        },
    ]

    const get_data = (index=0) =>
    {
        return [
            {
                id: index + 1, name: "Grand Theft Auto V", image: "gta5", cost: 20, discount: 50,
                    platformLogos: ["windows"], platformNames: ["Windows"],
            },

            {
                id: index + 2, name: "Battlefield 4", image: "battlefield4", cost: 35, discount: 0,
                    platformLogos: ["windows"], platformNames: ["Windows"],
            },

            {
                id: index + 3, name: "Factorio", image: "factorio", cost: 7, discount: 0,
                    platformLogos: ["windows", "apple"], platformNames: ["Windows", "Mac"],
            },

            {
                id: index + 4, name: "Horizontal Zeno Dawn", image: "horizon_zeno_dawn", cost: 38, discount: 0,
                    platformLogos: ["windows"], platformNames: ["Windows"],
            },

            {
                id: index + 5, name: "Cyberpunk 2077", image: "cyberpunk2077", cost: 60, discount: 25,
                    platformLogos: ["windows", "apple"],platformNames: ["Windows", "Mac"],
            },

            {
                id: index + 6, name: "Among Us", image: "among_us", cost: 2, discount: 0,
                    platformLogos: ["windows"],platformNames: ["Windows"],
            },

            {
                id: index + 7, name: "Red Dead Redemption 2", image: "red_dead_redemption_2", cost: 62, discount: 0,
                    platformLogos: ["windows"],platformNames: ["Windows"],
            },

            {
                id: index + 8, name: "The Witcher 3", image: "the_witcher_3_wild_hunt", cost: 18, discount: 80,
                    platformLogos: ["windows"],platformNames: ["Windows"],
            },

            {
                id: index + 9, name: "Overwatch 2", image: "overwatch_2", cost: 0, discount: 0,
                    platformLogos: ["windows"],platformNames: ["Windows"],
            },

            {
                id: index + 10, name: "Elden Ring", image: "elden_ring", cost: 44, discount: 0,
                    platformLogos: ["windows"],platformNames: ["Windows"],
            },
        ]
    }

    const [verticalListData, setVerticalListData] = useState(get_data());

    const [loadingGames, setLoadingGames] = useState(false);

    const loadMoreGames = () => 
    {
        if (loadingGames) return;

        setLoadingGames(true);

        setTimeout(() =>
        {
            setVerticalListData(previousData => [...previousData, ...get_data(previousData.length)]);

            setLoadingGames(false);
        }, 1000);
    }

    return <View style={{ flex: 1 }}>
        <FlatList
            ListHeaderComponent=
            {
                <View>
                    <Header title="Store" />

                    <HorizontalGameList data={ horizontal_game_list_data } images={ storeImages } />

                    <HorizontalList data={ horizontal_list_data } />
                </View>
            }

            data={ verticalListData }
            ItemSeparatorComponent={ <View style={{ height: 20 }}></View> }
            keyExtractor={item => item.id}
            contentContainerStyle={{ paddingBottom: 10 }}
            onEndReachedThreshold={0.5}

            ListFooterComponent={ loadingGames ? <ActivityIndicator size={ 40 } /> : null }

            onEndReached={ loadMoreGames }

            renderItem={({ item }) =>
            {
                let platformLogos = item.platformLogos.map((item, index) =>
                {
                    return <Image key={index} style={{ height: 20, width: 20, marginRight: 10, tintColor: theme.iconColor}}
                        resizeMode="contain" source={ storeImages[item] } />
                });

                let platformNames = item.platformNames.map((name, index) =>
                {
                    return <Text key={index} style={[styles.grayColor, { marginRight: 10} ]}
                        >{name}
                        
                        { index !== item.platformNames.length - 1 ? "," : "" }
                    </Text>
                });

                return <TouchableOpacity style={{ flexDirection: "row", marginHorizontal: 20 }}>
                    <Image resizeMode="cover" style={{ width: 100, height: 70, borderRadius: 10 }}
                        source={ storeImages[item.image] }></Image>
                    <View style={{ justifyContent: "space-evenly", marginLeft: 15 }}>
                        <Text style={[{ fontSize: 17, color: theme.textMain  }, styles.abeeZeeFont ]} >{ item.name }</Text>
                        
                        <View style={{ flexDirection: "row" }}>
                            { platformLogos }
                            { platformNames }
                        </View>
                    </View>

                    <View style={{ justifyContent: "center", marginLeft: "auto"}}>
                            {item.discount > 0 && item.cost > 0 ?

                                <View>
                                    <View style={{ flexDirection: "row"}}>
                                        <Text style={[{ textDecorationLine: "line-through", alignSelf: "flex-end" }, 
                                            styles.grayColor]}>

                                            ${ item.cost }
                                        </Text>
                                        <Text style={{ color: theme.textMain, fontSize: 16, marginLeft: 2 }}>
                                            ${ format_number(item.cost * ( 1 - (item.discount / 100))) }
                                        </Text>
                                    </View>

                                    <View style={{ backgroundColor: "green", borderRadius: 5, alignSelf: "flex-end" }}>
                                        <Text style={{ color: "white", paddingVertical: 2, paddingHorizontal: 5 }}>
                                            -{ item.discount }%
                                        </Text>
                                    </View>
                                </View>
                            :

                                <Text style={[styles.abeeZeeFont, { fontSize: 15, color: theme.textMain }]}>
                                    { item.cost == 0 ? "Free" : "$" + item.cost }
                                </Text>
                            }
                    </View>
                </TouchableOpacity>
            }}
        />
    </View>
}
