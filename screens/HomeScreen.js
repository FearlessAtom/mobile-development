import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import *  as FileSystem from "expo-file-system";
import { format_bytes } from "../App";

const format_percentage = (value, decimals = 2) =>
{
    if (typeof value !== 'number') return 'NaN%';

    const percent = (value * 100).toFixed(decimals);
    return `${percent}%`;
}

export default function HomeScreen()
{
    const navigation = useNavigation();
    const [totalStorage, setTotalStorage] = useState(0);
    const [freeStorage, setFreeStorage] = useState(0);
     
    useEffect(() =>
    {
        (async() =>
        {
            setTotalStorage(await FileSystem.getTotalDiskCapacityAsync());
            setFreeStorage(await FileSystem.getFreeDiskStorageAsync());
        })();
    }, []);

    return <View style={ homeScreenStyles.container }>
        <TouchableOpacity style={ homeScreenStyles.fileSystemButton }
            onPress={ () => navigation.push("Directory", { path: FileSystem.documentDirectory + "AppData/" })}>

            <Text style={ homeScreenStyles.fileSystemButtonText }>FileSystem</Text>
        </TouchableOpacity>

        <View style={ homeScreenStyles.storageInformationContainer }>
            <Text style={ homeScreenStyles.storageInformationText }
                >Total storage space: { format_bytes(totalStorage) } </Text>

            <Text style={ homeScreenStyles.storageInformationText }
                >Free storage space: { format_bytes(freeStorage) } </Text>

            <Text style={ homeScreenStyles.storageInformationText }
                >Used storage space: { format_bytes(totalStorage - freeStorage) } </Text>

            <Text style={ homeScreenStyles.storageInformationText }
                >Usage: { format_percentage((totalStorage - freeStorage) / totalStorage) } </Text>
        </View>
    </View>
}

const homeScreenStyles = StyleSheet.create(
{
    container:
    {
        padding: 10,
        flex: 1,
        justifyContent: "space-between",
    },

    fileSystemButton:
    {
        backgroundColor: "blue",
        alignItems: "center",
        paddingVertical: 10,
        borderRadius: 10,
    },

    fileSystemButtonText:
    {
        fontSize: 20,
        fontWeight: 600,
        color: "white",
    },

    storageInformationContainer:
    {
        marginTop: "auto",
    },

    storageInformationText:
    {
        fontSize: 20,
    }
});
