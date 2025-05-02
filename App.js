import { Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as FileSystem from "expo-file-system";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, useFocusEffect, useNavigation } from "@react-navigation/native"
import { useCallback, useEffect, useState } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { StatusBar } from "react-native";
import Dialog from "react-native-dialog";

const ConfirmationButton = ({ message, onYes, onCancel, button }) =>
{
    const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);

    return <View>
        <TouchableOpacity onPress={ () => setIsConfirmationVisible(true) }
            style={ directoryStyles.directoryPanelButton }
        >
            { button }
        </TouchableOpacity>

        <Dialog.Container visible={ isConfirmationVisible } >
            <Dialog.Title>{ message }</Dialog.Title>
            <Dialog.Button label="Cancel" onPress={
                () =>
                {
                    if(onCancel) onCancel();
                    setIsConfirmationVisible(false);
                }
            } />
            <Dialog.Button label="Yes" onPress={
                () => 
                {
                    if (onYes) onYes();
                    setIsConfirmationVisible(false);
                }
            } />
        </Dialog.Container>
    </View>
}

const PromptButton = ( { message, initialValue, onDone, onCancel, button } ) =>
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
            <Dialog.Title>{ message }</Dialog.Title>
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

    const parts = path.split("/").filter(Boolean);
    const directory_name = parts[parts.length - 1];

    return <View style={{ flex: 1 }}>
        <View style={ directoryStyles.directoryPanel }>
            <Text style={ directoryStyles.directoryNameText }>{ directory_name }</Text>

            <View style={ directoryStyles.directoryPanelButtons }>
                <TouchableOpacity onPress={ reload_files }>
                    <MaterialCommunityIcons size={35} name="reload"/>
                </TouchableOpacity>

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

const format_bytes = (bytes, decimals = 2) =>
{
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const size = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

    return `${size} ${sizes[i]}`;
}

const format_percentage = (value, decimals = 2) =>
{
    if (typeof value !== 'number') return 'NaN%';

    const percent = (value * 100).toFixed(decimals);
    return `${percent}%`;
}

const HomeScreen = () =>
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
            onPress={ () => navigation.push("Directory", { path: root_path })}>

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

const Stack = createNativeStackNavigator();

export default function App()
{
    return <NavigationContainer>
        <View style={ styles.container }>
            <View style={{ height: StatusBar.currentHeight }}></View>

            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen component={ HomeScreen } name="Home" />
                <Stack.Screen component={ DirectoryScreen } name="Directory" />
            </Stack.Navigator>
        </View>
    </NavigationContainer>
}

const styles = StyleSheet.create(
{
    container:
    {
        flex: 1,
    },
});
