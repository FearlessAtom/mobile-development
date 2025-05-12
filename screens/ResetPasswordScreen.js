import { authentication } from "../firebase/config.js";
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Button } from 'react-native';
import { sendPasswordResetEmail } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

export default function ResetPasswordScreen({ navigation })
{
    const [emailAddress, setEmailAddress] = useState("");

    const send_email = async() =>
    {
        if (!emailAddress)
        {
            Alert.alert("Fill in the email address!");
            return;
        }

        await sendPasswordResetEmail(authentication, emailAddress)
            .then(() => navigation.replace("Login"))
            .catch(error => console.log(error.message));
    };

    return <View style={ styles.container }>
        <TextInput
            style={ styles.input }
            placeholder="Email Address"
            value={ emailAddress }
            onChangeText={ setEmailAddress }
            placeholderTextColor="#666"
        />

        <Button
            title="Send email"
            onPress={ send_email }
        />

        <View style={styles.footer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.loginLink}>Back</Text>
            </TouchableOpacity>
        </View>
    </View>
}

const styles = StyleSheet.create(
{
    container:
    {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },

    title:
    {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        alignSelf: 'center',
    },

    input:
    {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 12,
        borderRadius: 8,
        marginBottom: 10,
        fontSize: 16,
    },

    button:
    {
        backgroundColor: "blue",
        padding: 14,
        borderRadius: 8,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },

    buttonText:
    {
        color: 'white',
        fontSize: 16,
    },

    loader:
    {
        marginLeft: 10,
    },

    footer:
    {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },

    footerText:
    {
        fontSize: 14,
        marginRight: 5,
    },

    loginLink:
    {
        fontSize: 14,
        color: '#007AFF',
        fontWeight: 'bold',
    },
});
