import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { onesignal_api_key } from "./secret.js";
import React, { use, useEffect, useState } from 'react';
import { Alert, FlatList, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { OneSignal, LogLevel } from 'react-native-onesignal';
import RNDateTimePicker, { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

export default function App()
{
    const [date, setDate] = useState("");

    const { getItem, setItem } = useAsyncStorage("tasks");
    const [tasks, setTasks] = useState([]);

    const [heading, setHeading] = useState("");
    const [contents, setContents] = useState("");

    const app_id = "aa04624c-2caa-451a-a181-47329b81b405";
    const url = "https://onesignal.com/api/v1/notifications";

    useEffect(() =>
    {
        OneSignal.Debug.setLogLevel(LogLevel.Verbose);
        OneSignal.initialize("aa04624c-2caa-451a-a181-47329b81b405");
        OneSignal.Notifications.requestPermission(true);

        reload_tasks();
    }, []);

    const send_notification_cancellation_request = async (message_id) =>
    {
        const response = await fetch(`${url}/${message_id}?app_id=${app_id}`,
        {
            method: "DELETE",
            headers:
            {
                accept: "application/json",
                Authorization: `Basic ${onesignal_api_key}`,
                "Content-Type": "application/json",
            },
        });
    };

    const send_notification_request = async(title, description, send_after) =>
    {
        const response = await fetch(url,
        {
            method: "POST",
            headers:
            {
                Accept: "artepplication/json",
                Authorization: `Basic ${onesignal_api_key}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
            {
                app_id,
                headings: { en: title },
                contents: { en: description },
                included_segments: ["All"],
                send_after,
            }),
        });

        return (await response.json()).id;
    };

    const reload_tasks = async() =>
    {
        setTasks(JSON.parse(await getItem()));
    }

    const add_task = async(heading, contents, date, notification_id) =>
    {
        const data = JSON.parse(await getItem());

        const item = {
            id: data.length + 1,
            heading,
            contents,
            date,
            notification_id
        };

        await setItem(JSON.stringify([...data, item]));
    }

    const add_task_and_notification = async() =>
    {
        if (heading.trim() === "" || contents.trim() === "" || date.trim() == "")
        {
            Alert.alert("Error", "Please fill in all the fields!");
            return;
        }

        const message_id = await send_notification_request(heading, contents, date);

        if (!message_id)
        {
            Alert.alert("Error", "Error requesting a notification!");
            return;
        }

        await add_task(heading, contents, date, message_id);

        await reload_tasks();

        setHeading("");
        setContents("");
        setDate("");
    }

    const change_time = () =>
    {
        DateTimePickerAndroid.open(
        {
            value: new Date(),
            onChange: on_time_change,
            mode: "time",
            display: "spinner",
        });
    }

    const on_time_change = (event, selectedTime) =>
    {
        setDate(selectedTime.toISOString());
    }

    const reset_date = () =>
    {
       setDate("");
    }

    const remove_task = async(task_id) =>
    {
        const tasks = JSON.parse(await getItem());
        const task = tasks.find(task => task.id = task_id);

        const index = tasks.indexOf(task);

        if (index > -1)
        {
            tasks.splice(index, 1);
        }

        await setItem(JSON.stringify(tasks));

        send_notification_cancellation_request(task.notification_id);

        reload_tasks();
    }

    return <View style={ styles.container }>
        <TextInput onChangeText={ setHeading } value={heading} style={ styles.input } placeholder="Title"></TextInput>
        <TextInput onChangeText={ setContents } value={contents} numberOfLines={4} multiline={true}
            style={[ styles.input, { marginTop: 5 } ]} placeholder="Description" />

        <TouchableOpacity onPress={ change_time }>
            <TextInput value={date} style={[ styles.input, { marginTop: 5 } ]} placeholder="Date" readOnly={ true }></TextInput>
        </TouchableOpacity>
        
        <TouchableOpacity style={[ styles.button, { backgroundColor: "blue" } ]} onPress={ add_task_and_notification }>
            <Text style={ styles.buttonText }>Add Task</Text>
        </TouchableOpacity>

        <FlatList
            data={ tasks }
            renderItem={( { item } ) =>
                <View style={styles.taskItem}>
                    <Text style={styles.taskText}>{item.heading}</Text>
                    <Text style={styles.dateText}>{new Date(item.date).toLocaleString()}</Text>
                    <TouchableOpacity onPress={() => remove_task(item.id)} style={styles.removeButton}>
                        <Text style={styles.removeButtonText}>Remove</Text>
                    </TouchableOpacity>
                </View>
            }
            keyExtractor={ (item) => item.id }
            contentContainerStyle={ styles.listContent }
        />
    </View>
}

const styles = StyleSheet.create(
{
    container:
    {
        paddingHorizontal: 10,
    },

    input:
    {
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        fontSize: 25,
    },

    button:
    {
        marginTop: 5,
        borderRadius: 5,
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
    },

    buttonText:
    {
        fontSize: 25,
        color: "white",
    },

    taskItem:
    {
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
        marginVertical: 8,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset:
        {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },

    taskText:
    {
        fontSize: 18,
    },

    removeButton:
    {
        backgroundColor: '#ff4d4d',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 5,
    },

    removeButtonText:
    {
        color: '#fff',
        fontWeight: 'bold',
    },
});
