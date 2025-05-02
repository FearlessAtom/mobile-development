import { useContext, useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import * as FileSystem from "expo-file-system";
import ConfirmationButton from "../components/ConfirmationButton";
import Feather from "react-native-vector-icons/Feather"
import { useNavigation } from "@react-navigation/native";
import { get_file_name, format_bytes } from "../App";

export default function FileScreen({ route })
{
    const { path } = route.params || {};
    const navigation = useNavigation();

    const [fileContents, setFileContents] = useState("");

    useEffect(() => 
    {
        (async() =>
        {
            setFileContents(await FileSystem.readAsStringAsync(path));
        })();
    }, []);

    const save = async() => 
    {
        await FileSystem.writeAsStringAsync(path, fileContents);
    }

    const info = async() => 
    {
        let information = await FileSystem.getInfoAsync(path);
        Alert.alert("File information", `Name: ${file_name}\n` +
            `Size: ${format_bytes(information.size)}\n` +
            `Last modified: ${new Date(information.modificationTime).toLocaleString()}`);
    }

    const file_name = get_file_name(path);

    return <View>
        <View style={ fileScreenStyles.filePanel }>
            <Text style={ fileScreenStyles.fileNameText }>{ file_name }</Text>
            <View style={ fileScreenStyles.filePanelButtons }>
                <TouchableOpacity style={ fileScreenStyles.button } onPress={ info }>
                    <Feather size={ 35 } name="info"></Feather>
                </TouchableOpacity>
                
                <TouchableOpacity style={ fileScreenStyles.button } onPress={ save }>
                    <Feather size={ 35 } name="save"></Feather>
                </TouchableOpacity>

                <ConfirmationButton
                    message={`Are you sure you want to delete the file "${file_name}"`}
                    button={
                        <Feather size={ 35 } name="file-minus" />
                    }
                    onYes=
                    {
                        () =>
                        {
                            (async() =>
                            {
                                await FileSystem.deleteAsync(path);
                                navigation.goBack();
                            })();
                        }
                    }
                />
            </View>
        </View>
        <TextInput style={ fileScreenStyles.textInput } onChangeText={ setFileContents } value={ fileContents }
            multiline={true} autoFocus={true}></TextInput>
    </View>
}

const fileScreenStyles = StyleSheet.create(
{
    textInput:
    {
        fontSize: 20,
    },

    filePanel:
    {
        display: "flex",
        flexDirection: "row",
        backgroundColor: "lightgray",
        alignItems: "center",
    },

    fileNameText:
    {
        fontSize: 20,
        paddingHorizontal: 10,
    },
    
    filePanelButtons:
    {
        marginLeft: "auto",
        flexDirection: "row",
    },

    button:
    {
        paddingHorizontal: 5,  
    },
});
