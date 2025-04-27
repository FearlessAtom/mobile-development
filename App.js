import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { OneSignal, LogLevel } from 'react-native-onesignal';
import { onesignal_api_key } from "./secret.js";

export default function App()
{
    const [date, setDate] = useState();

    const [heading, setHeading] = useState("");
    const [contents, setContents] = useState("");

    const url = "https://onesignal.com/api/v1/notifications";

    useEffect(() =>
    {
        OneSignal.Debug.setLogLevel(LogLevel.Verbose);
        OneSignal.initialize("aa04624c-2caa-451a-a181-47329b81b405");
        OneSignal.Notifications.requestPermission(true);
    }, []);

    const send_notification_request = (title, description) => {
        fetch(url, {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: `Basic ${onesignal_api_key}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                app_id: "aa04624c-2caa-451a-a181-47329b81b405",
                headings: { en: title },
                contents: { en: description },
                included_segments: ["All"],
            }),
        });
    };

    return <View>
        <TextInput onChangeText={setHeading} value={heading} style={ styles.input } placeholder="Title"></TextInput>
        <TextInput onChangeText={setContents} value={contents} numberOfLines={4} multiline={true}
            style={[ styles.input, { marginTop: 5 } ]} placeholder="Description" />
        <Pressable onPress={() => send_notification_request(heading, contents)}
            ><Text>Click here</Text></Pressable>
    </View>
}

const styles = StyleSheet.create(
{
    input:
    {
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 10, 
        borderWidth: 1,
        fontSize: 25,
    }
});
