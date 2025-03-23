import { View } from "react-native";
import { Header } from "../../components/Header";
import { styles } from "../../styles.js"

export function CommunityScreen()
{
    return <View style={{ backgroundColor: styles.mainBackgroundColor }}>
        <Header title="Community" search={false} />
    </View>
}
