import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Header } from "../../components/Header.js";
import { useTheme } from "../../ThemeContext.js";
import { Switch } from "../../components/Switch.js";
import { styles } from "../../styles.js";
import { ProfileHeader } from "../../components/ProfileHeader.js";
import { useEffect, useState } from "react";

export function ChatScreen()
{
    const { theme, toggleTheme } = useTheme();

    const chatImages =
    {
        "smiley_face": require("../../assets/images/smiley_face.png"),
        "expresso": require("../../assets/images/expresso.png"),
        "question_mark": require("../../assets/images/question_mark.png"),
        "rust": require("../../assets/images/rust.png"),
    }

    const getData = (index=0) =>
    {
        return [
            {
                id: 1 + index, username: "Mark Dyson", lastMessage : "I'm already starting to play • 14 Jun", mine: false,
                profilePicture: "smiley_face", unreadMessages: 1, activityColor: "green",
            },

            {
                id: 2 + index, username: "Mark Dyson", lastMessage : "Ok • 14 Jun", mine: true,
                profilePicture: "smiley_face", unreadMessages: 0, activityColor: "green",
            },

            {
                id: 3 + index, username: "Player123", lastMessage : "Ok • 14 Jun", mine: true,
                profilePicture: "rust", unreadMessages: 0, activityColor: theme.buttonActive,
            },

            {
                id: 4 + index, username: "Player123", lastMessage : "Ok • 14 Jun", mine: true,
                profilePicture: "rust", unreadMessages: 0, activityColor: theme.buttonActive,
            },

            {
                id: 5 + index, username: "Player", lastMessage : "Hello! • 12 Jun", mine: true,
                profilePicture: "question_mark", unreadMessages: 0, activityColor: theme.buttonActive,
            },

            {
                id: 6 + index, username: "Player", lastMessage : "Hello! • 12 Jun", mine: true,
                profilePicture: "question_mark", unreadMessages: 0, activityColor: theme.buttonActive,
            },

            {
                id: 7 + index, username: "💎ϟ∑χρŗêssσϟ#=_-#", lastMessage : "Ok", mine: false,
                profilePicture: "expresso", unreadMessages: 0, activityColor: theme.buttonActive,
            },

            {
                id: 8 + index, username: "💎ϟ∑χρŗêssσϟ#=_-#", lastMessage : "Ok", mine: false,
                profilePicture: "expresso", unreadMessages: 0, activityColor: theme.buttonActive,
            },
        ]
    }

    const [data, setData] = useState(getData());
    const [loading, setLoading] = useState(false);
    
    useEffect(()=>
    {
        setData(previous_data => [...previous_data, ...getData(previous_data.length)]);
    }, []);

    const loadMore = () =>
    {
        setLoading(true);

        setTimeout(() => 
        {
            setData(previous_data => [...previous_data, ...getData(previous_data.length)]);
        
            setLoading(false);
        }, 1000);
    }

    return <View style={{ flex: 1 }}>
        <FlatList
            ListHeaderComponent=
            {
                <View>
                    <Header title="Chat" />

                    <View style={ chatStyles.switchContainer }>
                        <Switch option_one="Open chats" option_two="My friends"></Switch>
                    </View>
                </View>
            }

            ListFooterComponent= { loading ? <ActivityIndicator size={ 40 } /> : null }
            keyExtractor={item => item.id}
            data={ data }
            onEndReached={ loadMore }
            onEndReachedThreshold={ 0.75 }

            renderItem={({item}) =>
                <TouchableOpacity style={ chatStyles.itemContainer }>
                    <ProfileHeader activityColor={ item.activityColor } image={ chatImages[item.profilePicture] }
                        size={ 65 } />

                    <View style={ chatStyles.textContainer }>
                        <Text style={[ chatStyles.username, styles.abeeZeeFont, { color: theme.textMain } ]}
                            >{ item.username }</Text>

                        <View style={{ flexDirection: "row" }}>
                            {item.mine ? 
                                <Text style={[ { color: theme.textMain, marginRight: 5 }, styles.abeeZeeFont, chatStyles.text ]}>
                                    You: 
                                </Text>

                                : null
                            }

                            <Text style={[ item.lastMessage, styles.abeeZeeFont, chatStyles.text, { color: theme.textSecondary } ]}
                                >{ item.lastMessage }</Text>
                        </View>

                    </View>

                    { item.unreadMessages != 0 ?
                        <View style={[ { backgroundColor: theme.buttonActive }, chatStyles.unreadeMessages ]}>
                            <Text>
                                { item.unreadMessages }
                            </Text>
                        </View>
                    : null}
                </TouchableOpacity>
            }
        />
            
    </View>
}

const chatStyles = StyleSheet.create(
{
    textContainer:
    {
        justifyContent: "space-evenly",
        marginLeft: 10,
        alignSelf: "stretch",
    },

    username:
    {
        fontSize: 18,     
    },

    text:
    {
        fontSize: 15,
    },

    unreadeMessages:
    {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100,
        width: 25,
        height: 25,
        marginLeft: "auto",
    },

    itemContainer:
    {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 15,
        marginHorizontal: 20,
    },

    switchContainer:
    {
        paddingHorizontal: 20,
        paddingTop: 10,
    },
});
