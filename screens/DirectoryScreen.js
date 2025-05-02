import { useCallback, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { StyleSheet, Text } from "react-native";
import { View } from "react-native";
import { TouchableOpacity } from "react-native";
import ConfirmationButton from "../components/ConfirmationButton.js";
import PromptButton from "../components/PromptButton.js";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";
import { FlatList } from "react-native";
import * as FileSystem from "expo-file-system";
import FileItem from "../components/FileItem";
import { get_file_name, root_path } from "../App.js";

export default function DirectoryScreen({ route })
{
    const { path } = route.params || {};

    const [files, setFiles] = useState([]);
    const navigation = useNavigation();

    const reload_files = async() =>
    {
        setFiles(await FileSystem.readDirectoryAsync(path));
    }

    useFocusEffect(
        useCallback(() =>
        {
            reload_files()
        }, [])
    );

    const directory_name = get_file_name(path);

    return <View style={{ flex: 1 }}>
        <View style={ directoryStyles.directoryPanel }>
            <Text style={ directoryStyles.directoryNameText }>{ directory_name }</Text>

            <View style={ directoryStyles.directoryPanelButtons }>
                <TouchableOpacity onPress={ reload_files }>
                    <MaterialCommunityIcons size={35} name="reload"/>
                </TouchableOpacity>

                { 
                    path == root_path
                    ?
                        null
                    :
                        <ConfirmationButton
                            message={`Are you sure you want to delete the directory "${directory_name}"`}
                            button={
                                <Feather size={35} name="folder-minus" />
                            }
                            onYes=
                            {
                                () =>
                                {
                                    (async() =>
                                        {
                                            await FileSystem.deleteAsync(path);
                                            navigation.goBack();
                                        }
                                    )();
                                }
                            }
                            
                        />
                }

                <PromptButton initialValue="New Directory"
                    message="Enter the new directory's name"
                    onDone={
                        directory_name =>
                        {
                            (async() =>
                            {
                                const new_directory_path = path + directory_name;
                                await FileSystem.makeDirectoryAsync(new_directory_path);
                                await reload_files();
                            })();
                        }
                    }
                    button=
                    { 
                        <Feather size={ 35 } name="folder-plus" />
                    }
                />

                <PromptButton initialValue="New File"
                    message="Enter the new file's name"
                    onDone=
                    {
                        file_name =>
                        {
                            (async() =>
                            {
                                const new_file_path = path + file_name;
                                await FileSystem.writeAsStringAsync(new_file_path, "");
                                await reload_files();
                            })();
                        }
                    }
                    button=
                    { 
                        <Feather size={ 30 } name="file-plus" />
                    }
                />
            </View>
        </View>

        <FlatList
            data={ files }
            renderItem={({ item }) => <FileItem path={ path } file_name={ item } /> }
        />
    </View>
}

const directoryStyles = StyleSheet.create(
{
    directoryPanel:
    {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "lightgray",
    },
    
    directoryPanelButtons:
    {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        flex: 1,
    },

    directoryNameText:
    {
        fontSize: 20,
        paddingHorizontal: 10,
    }
});
