import { FlatList, StyleSheet, Text, View } from "react-native";

export function TasksScreen({ tasks }) {
    return (
        <FlatList
            data={tasks}
            keyExtractor={(item) => item.key}
            contentContainerStyle={styles.container}
            renderItem={({ item }) => (
                <View style={styles.task}>
                    <Text style={styles.label}>{item.label}</Text>

                    <View style={styles.progressBarBackground}>
                        <View
                            style={[
                                styles.progressBarFill,
                                {
                                    width: `${(item.value / item.max) * 100}%`,
                                },
                            ]}
                        />
                    </View>

                    <Text style={styles.progressText}>
                        {item.value} / {item.max}
                    </Text>
                </View>
            )}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    task: {
        marginBottom: 20,
        backgroundColor: "#f0f0f0",
        borderRadius: 10,
        padding: 15,
        elevation: 2,
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10,
    },
    progressBarBackground: {
        width: "100%",
        height: 10,
        backgroundColor: "#ddd",
        borderRadius: 5,
        overflow: "hidden",
    },
    progressBarFill: {
        height: "100%",
        backgroundColor: "blue",
    },
    progressText: {
        marginTop: 5,
        fontSize: 12,
        color: "#444",
    },
});

