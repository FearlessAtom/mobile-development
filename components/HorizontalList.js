import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../styles.js"
import { useState } from "react";
import { useTheme } from "../ThemeContext.js";

export function HorizontalList({ data, initiad_id })
{
    const [ selectedIndex, setSelectedIndex ] = useState(data[initiad_id] ? initiad_id : 1);
    const { theme, toggleTheme } = useTheme();

    return <FlatList
        data={ data }
        keyExtractor={ item => item.id }
        ItemSeparatorComponent={ <View style={{ width: 10 }}></View> }
        contentContainerStyle={{ padding: 20 }}
        showsHorizontalScrollIndicator={ false }
        horizontal={ true }

        renderItem={({ item }) =>
        (
            <TouchableOpacity onPress={() => setSelectedIndex(item.id)}
                style={{ backgroundColor: (item.id == selectedIndex ? theme.buttonActive : theme.buttonMain),
                    padding: 15, borderRadius: 10 }}>
                
                <Text style={[{ color: "white", fontSize: 15, flexGrow: 1 }, styles.abeeZeeFont]}>{item.title}</Text>
            </TouchableOpacity>
        )}
    />
}
