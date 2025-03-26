import { styles } from "../styles.js";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../ThemeContext.js";

export function StackList({ data })
{
    const { theme, toggleTheme } = useTheme();

    let list = data.map(item =>
    {
        return <View key={ item.id }>
            <TouchableOpacity onPress={ item.action } style={[ stackListStyles.itemContainer, { backgroundColor: theme.buttonSecondary},
                (item.id === data[0].id ? { borderTopLeftRadius: 20, borderTopRightRadius: 20 } : {  }),
                (item.id === data[data.length - 1].id ? { borderBottomLeftRadius: 20, borderBottomRightRadius: 20 } : {  }) ]}
            >

                <Text style={[ styles.abeeZeeFont, stackListStyles.text, { color: theme.textMain } ]}>{ item.name }</Text>
                <Image resizeMode="contain" source={ require("../assets/images/right_arrow.png") }
                    style={ stackListStyles.rightArrowIcon }></Image>
            </TouchableOpacity>

            { item.id !== data.length && <View style={{ height: 2 }}></View> }

        </View>
    });

    return list;
}

const stackListStyles = StyleSheet.create(
{
    itemContainer:
    {
        alignItems: "center",
        flexDirection: "row",
        padding: 20,
    },

    text:
    {
        fontSize: 20,
        flex: 1,
    },

    rightArrowIcon:
    {
        marginLeft: "auto",
        width: 15,
        height: 15,
    }
});
