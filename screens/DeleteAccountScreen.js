import { authentication, firestore } from "../firebase/config.js";
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../contexts/AuthContext.js";
import ConfirmationButton from "../components/ConfirmationButton.js";
import { deleteDoc, doc } from "@firebase/firestore";

export default function DeleteAccountScreen({ navigation })
{
    const [password, setPassword] = useState("");
    const { setLoggedInUser } = useAuth();

    const user = authentication.currentUser;

    const delete_account = async() =>
    {
        if (!password)
        {
            Alert.alert("Fill in the password!");
            return;
        }

        await signInWithEmailAndPassword(authentication, user.email, password)
            .then(() =>
            {
                user.delete();

                const document = doc(firestore, "users", user.uid);
                deleteDoc(document);

                Alert.alert("Account deleted!");
                setLoggedInUser(null);
            })
            .catch(error =>
            {
                Alert.alert(error.message);
            });
    };

    return <View style={styles.container}>
        <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={ setPassword }
            placeholderTextColor="#666"
        />

        <ConfirmationButton
            button_title="Delete Account"
            button_color="red"
            onYes={ delete_account }
            message="Are you sure you want to delete your account?"
        />

        <View style={styles.footer}>
            <TouchableOpacity onPress={() => navigation.replace("Profile")}>
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
        backgroundColor: "red",
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
