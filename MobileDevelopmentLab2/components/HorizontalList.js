import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../styles.js"
import { useState } from "react";

export function HorizontalList({ data })
{
    const [selectedIndex, setSelectedIndex] = useState(1);

    return <FlatList
        data={ data }

        keyExtractor={ item => item.id }
        ItemSeparatorComponent={<View style={{ width: 10 }}></View>}

        contentContainerStyle={
        {
            padding: 20,
        }}

        showsHorizontalScrollIndicator={ false }

        horizontal={ true }

        renderItem={({item}) =>
        (
            <TouchableOpacity onPress={() => setSelectedIndex(item.id)}
                style={[(item.id == selectedIndex ? styles.buttonActiveColor : styles.buttonSecondaryColor),
                { padding: 15, borderRadius: 10 }]}>
                
                <Text style={[{ color: "white", fontSize: 15 }, styles.abeeZeeFont]}>{item.title}</Text>
            </TouchableOpacity>
        )}
    >

    </FlatList>
}
