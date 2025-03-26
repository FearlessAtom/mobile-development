import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View, ViewComponent } from "react-native";
import { Header } from "../../components/Header";
import { styles } from "../../styles.js";
import { useTheme } from "../../ThemeContext.js";
import { HorizontalList } from "../../components/HorizontalList.js";

import { Entypo, AntDesign, Feather } from "@expo/vector-icons";
import { useState } from "react";

function PostListSeparator()
{
    const { theme, toggleTheme } = useTheme();

    return <View style={{ height: 10, backgroundColor: theme.separatorColor }}></View>
}

export function CommunityScreen()
{
    const communityImages =
    {
        "profile_picture": require("../../assets/images/profile_picture.png"),
        "kingdom_come_deliverance": require("../../assets/images/kingdom_come_deliverance.png"),
        "fortnite": require("../../assets/images/fortnite.png"),
    };

    const { theme, toggleTheme } = useTheme();

    const horizontal_list_data =
    [
        {
            id: 1, title: <Image style={{ width: 18, height: 18 }} source={ require("../../assets/images/search.png") }></Image>
        },

        {
            id: 2, title: "All",
        },

        {
            id: 3, title: "Screenshots",
        },

        {
            id: 4, title: "Artwork",
        },

        {
            id: 5, title: "Workshop",
        },
    ]

    const getPosts = (index=0) =>
    {
        return [
            {
                id: 1 + index, profilePicture: "profile_picture", category: "NEWS", categoryColor: "#b63db6", 
                date: "yesterday • 2:20 pm", username: "Eurogamer", image: "fortnite",
                contentTitle: "Florida tourist attraction sues Fortnite, seeks removal of in-game castle",
                content: "Coral Castle Museum, a tourist attraction near Miami, is suing Fortnite maker Epic Games for trademark infringement and unfair competition.",
                isLiked: true, likeCount: 324, commentCount: 12,
            },

            {
                id: 2 + index, profilePicture: "profile_picture", category: "GAMING", categoryColor: "#3498db", 
                date: "2 days ago • 4:15 pm", username: "IGN", image: "kingdom_come_deliverance",
                contentTitle: "Kingdom Come: Deliverance hits 5 million copies sold",
                content: "The medieval RPG continues to grow in popularity, with developers teasing upcoming projects.",
                isLiked: true, likeCount: 512, commentCount: 34,
            },

            {
                id: 3 + index, profilePicture: "profile_picture", category: "UPDATE", categoryColor: "#f39c12", 
                date: "3 days ago • 10:30 am", username: "PC Gamer", image: "kingdom_come_deliverance",
                contentTitle: "Kingdom Come: Deliverance gets a next-gen upgrade",
                content: "Warhorse Studios has announced a free next-gen upgrade for all players, bringing enhanced visuals and performance.",
                isLiked: false, likeCount: 221, commentCount: 15,
            },

            {
                id: 4 + index, profilePicture: "profile_picture", category: "LEAK", categoryColor: "#e74c3c", 
                date: "4 days ago • 7:00 pm", username: "GameSpot", image: "kingdom_come_deliverance",
                contentTitle: "Rumor: Kingdom Come 2 in development?",
                content: "Leaked job postings and insider hints suggest Warhorse Studios may be working on a sequel to their hit RPG.",
                isLiked: true, likeCount: 674, commentCount: 42,
            }
        ];
    }
    
    const loadMorePosts = () =>
    {
        if (loading) return;

        setLoading(true);

        setTimeout(() =>
        {
            setPosts(previousPosts => [...previousPosts, ...getPosts(previousPosts.length)]);

            setLoading(false);
        }, 1000);
    }

    const [ loading, setLoading ] = useState(false);
    const [ posts, setPosts ] = useState(getPosts());

    return <View>
        <FlatList
            ListHeaderComponent=
            { 
                <View>
                    <Header title="Community" search={ false } />
                    <Text style={[ { color: theme.textSecondary, marginHorizontal: 20, fontSize: 15 }, styles.abeeZeeFont ]}
                        >Community and official content for all games and software</Text>
                    <HorizontalList data={ horizontal_list_data } initial_id={ 2 } />
                    <PostListSeparator />
                </View>
            }
            
            onEndReached={ loadMorePosts }

            onEndReachedThreshold={ 0.25 }

            keyExtractor={ item => item.id }
            ItemSeparatorComponent={ <PostListSeparator /> }
            data={ posts }

            ListFooterComponent={ loading ? <ActivityIndicator size={ 40 } /> : null }

            renderItem = { ({ item }) =>
            {
                return <TouchableOpacity style={[ communityStyles.listItem, { backgroundColor: theme.backgroundMain }]}>
                    <View style={ communityStyles.postHeader }>
                        <Image style={ communityStyles.profilePicture } source={ communityImages[item.profilePicture] }></Image>

                        <View style={{ flexGrow: 0 }}>
                            <View style={ communityStyles.titleContainer }>
                                <Text style={[ { color : theme.textMain }, communityStyles.username, styles.abeeZeeFont ]}
                                    >{ item.username }</Text>
                                
                                <View style={[ communityStyles.categoryContainer, { backgroundColor: item.categoryColor } ]}>
                                    <Text style={[ styles.abeeZeeFont, communityStyles.category ]}>{ item.category }</Text>
                                </View>
                            </View>
                            <View>
                                <Text style={[ { color:  theme.textSecondary }, communityStyles.date ]}>{ item.date }</Text>
                            </View>
                        </View>

                        <Entypo style={ communityStyles.threeDots } name="dots-three-horizontal" color={ theme.buttonMain }
                            size={ 25 } />
                    </View>

                    <Image style={ communityStyles.image } resizeMode="stretch" source={ communityImages[item.image] }></Image>

                    <Text style={[ styles.abeeZeeFont, communityStyles.contentTitle, { color: theme.textMain } ]}
                        >{ item.contentTitle }</Text>

                    <Text style={[ styles.abeeZeeFont, communityStyles.content, { color: theme.textSecondary } ]}
                        >{ item.content }</Text>

                    <View style={[ communityStyles.line, { backgroundColor: theme.textSecondary } ]}></View>

                    <View style={ communityStyles.activityContainer }>
                        <AntDesign name="like2" size={ 24 } color={ (item.isLiked ? "#00d44b" : theme.textSecondary ) } />
                        
                        <Text style={[ communityStyles.likeCount,
                            { color: (item.isLiked ? "#00d44b" : theme.textSecondary )} ]}>
                            { item.likeCount }
                        </Text>

                        <Feather style={{ marginLeft: 40 }} name="message-square" size={ 24 } color={ theme.textSecondary } />

                        <Text style={[ communityStyles.commentCount , { color: theme.textSecondary } ]}>
                            { item.commentCount }
                        </Text>

                        <Feather style={{ marginLeft: "auto" }} name="share" size={ 24 } color={ theme.textSecondary } />
                    </View>
                    
                </TouchableOpacity>
            }}
        />
    </View>
}

const communityStyles = StyleSheet.create(
{
    commentCount:
    {
        fontSize: 15,
        marginLeft: 5,
    },

    likeCount:
    {
        fontSize: 15,
        marginLeft: 5,
    },

    activityContainer:
    {
        flexDirection: "row",
        alignItems: "flex-end",
        paddingHorizontal: 2,
    },

    line:
    {
        height: 0.5,
        marginVertical: 15,
    },

    content:
    {
        fontSize: 15,
    },

    contentTitle:
    {
        fontSize: 15,
        marginBottom: 15,
    },

    image:
    {
        marginVertical: 15,
        width: "100%",
        height: 220,
        borderRadius: 10,
    },

    postHeader:
    {
        flexDirection: "row",
        flex: 1,
    },

    threeDots:
    {
        marginLeft: "auto",
        marginRight: 5,
    },

    date:
    {
        fontSize: 12,
    },

    titleContainer:
    {
        flex: 1,
        flexDirection: "row",
    },

    category:
    {
        color: "white",
        fontSize: 10,
    },

    categoryContainer:
    {
        justifyContent: "center",
        paddingHorizontal: 5,
        paddingVertical: 2,
        marginLeft: 10,
        borderRadius: 5,
    },

    profilePicture:
    {
        marginRight: 10,
    },

    listItem:
    {
        paddingHorizontal: 20,
        paddingVertical: 20,
    },

    username:
    {
        fontSize: 17,
    }
});
