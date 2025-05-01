import { Alert, Button, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as FileSystem from "expo-file-system";
import { createNativeStackNavigator, NativeStackView } from "@react-navigation/native-stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native"
import { useEffect, useState } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import { StatusBar } from "react-native";
import Dialog from "react-native-dialog"

const PromptButton = ( { initialValue, onDone, onCancel, button } ) =>
{
    const [isPromptVisible, setIsPromptVisible] = useState(false);
    const [inputValue, setInputValue] = useState(initialValue);

    return <View>
        <TouchableOpacity onPress={ () => setIsPromptVisible(true) }
            style={ directoryStyles.directoryPanelButton }
        >
            { button }
        </TouchableOpacity>

        <Dialog.Container visible={ isPromptVisible } >
            <Dialog.Input onChangeText={ setInputValue } selectTextOnFocus={ true } autoFocus={ true } style={{ fontSize: 18 }}
                value={ inputValue } />
            <Dialog.Button label="Cancel" onPress={
                () =>
                {
                    if(onCancel) onCancel();
                    setIsPromptVisible(false);
                }
            } />
            <Dialog.Button label="Done" onPress={
                () => 
                {
                    if (onDone) onDone(inputValue);
                    setIsPromptVisible(false);
                }
            } />
        </Dialog.Container>
    </View>
}

const root_path = FileSystem.documentDirectory + "AppData/";

function File({ path, file_name })
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
        file: require("./images/file.png"),
        directory: require("./images/directory.png"),
    }

    const on_click = () =>
    {
        if (isDirectory)
        {
            navigation.push("Directory", { path: path + file_name + "/" });
        }

        else
        {
            Alert.alert("Atom");
        }
    }

    return <TouchableOpacity onPress={ on_click } style={ fileStyles.item }>
        <Image source={ icons[get_icon(isDirectory)] } style={{ width: 50, height: 50 }} />
        <Text style={ fileStyles.fileNameText }>{ file_name }</Text>
    </TouchableOpacity>
}

const fileStyles = StyleSheet.create(
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

function DirectoryScreen({ route })
{
    const { path } = route.params || {};

    const [files, setFiles] = useState([]);

    const reload_files = async() => setFiles(await FileSystem.readDirectoryAsync(path));

    useEffect(() =>
    {
        (async() =>
        {
            await reload_files();
        })();
    }, []);

    const parts = path.split("/").filter(Boolean);
    const directory_name = parts[parts.length - 1];

    return <View style={{ flex: 1 }}>
        <View style={ directoryStyles.directoryPanel }>
            <Text style={ directoryStyles.directoryNameText }>{ directory_name }</Text>

            <View style={ directoryStyles.directoryPanelButtons }>
                <PromptButton initialValue="New Directory"
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
                        <AntDesign size={ 30 } name="addfolder" />
                    }
                />

                <PromptButton initialValue="New File"
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
                        <AntDesign size={ 30 } name="addfile" />
                    }
                />
            </View>
        </View>

        <FlatList
            data={ files }
            renderItem={({ item }) => <File path={ path } file_name={ item } /> }
        />
    </View>
}

const directoryStyles = StyleSheet.create(
{
    directoryPanel:
    {
        flexDirection: "row",
        alignItems: "center",
    },
    
    directoryPanelButtons:
    {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        flex: 1,
    },

    directoryPanelButton:
    {
        paddingHorizontal: 5,
    },

    directoryNameText:
    {
        fontSize: 20,
        paddingHorizontal: 10,
    }
});

const Stack = createNativeStackNavigator();

export default function App()
{
    return <NavigationContainer>
        <View style={{ height: StatusBar.currentHeight }}></View>

        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Directory" initialParams={{ path: FileSystem.documentDirectory }}>
                { props => <DirectoryScreen { ...props } /> }
            </Stack.Screen>
        </Stack.Navigator>
    </NavigationContainer>
}
