import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import * as FileSystem from "expo-file-system";

export default function FileItem({ path, file_name })
{
    const [isDirectory, setIsDirectory] = useState(false);

    const navigation = useNavigation();

    useEffect(() =>
    {
        (async() =>
        {
            const information = await FileSystem.getInfoAsync(path + file_name);

            setIsDirectory(information.isDirectory);
        })();
    }, []);

    const fileType =
    {
        directory: "directory",
        file: "file",
    }

    const get_icon = (isDirectory) =>
    {
        return isDirectory ? "directory" : "file";
    }

    const icons =
    {
        file: require("../images/file.png"),
        directory: require("../images/directory.png"),
    }

    const on_click = () =>
    {
        if (isDirectory)
        {
            navigation.push("Directory", { path: path + file_name + "/" });
        }

        else
        {
            navigation.push("File", { path: path + file_name });
        }
    }

    return <TouchableOpacity onPress={ on_click } style={ fileItemStyles.item }>
        <Image source={ icons[get_icon(isDirectory)] } style={{ width: 50, height: 50 }} />
        <Text style={ fileItemStyles.fileNameText }>{ file_name }</Text>
    </TouchableOpacity>
}

const fileItemStyles = StyleSheet.create(
{
    item:
    {
        flexDirection :"row",
        display: "flex",
        alignItems: "center"
    },

    fileNameText:
    {
        fontSize: 20,
    }
});
