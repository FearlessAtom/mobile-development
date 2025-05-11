import React, { useEffect, useState } from "react";
import { Text, View, TextInput, Button, StyleSheet, Alert } from "react-native";
import { authentication, firestore } from "../firebase/config.js";
import { doc, getDoc, setDoc } from "@firebase/firestore";

export default function ProfileScreen()
{
    const user = authentication.currentUser;

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [emailAddress, setEmailAddress] = useState("");

    const document = doc(firestore, "users", user.uid);

    useEffect(() => 
    {
        (async() =>
        {
            const data = (await getDoc(document)).data();
            
            setFirstName(data.firstName);
            setLastName(data.lastName);
            setDateOfBirth(data.dateOfBirth);
            setEmailAddress(user.email);
        })();
    }, []);

    const save_profile = async() =>
    {
        if (!user)
        {
            Alert.alert("Error", "No user is signed in.");
            return;
        }

        try
        {

            await setDoc(document,
            {
                firstName,
                lastName,
                dateOfBirth,
            });

            Alert.alert("Success", "Saved successfully!");
        }

        catch (error)
        {
            console.log(error);
            Alert.alert("Error", "Error saving your profile.");
        }
    };

    return <View style={styles.container}>
        <Text style={styles.label}>First Name</Text>
        <TextInput
            style={[ styles.muted, styles.input ]}
            value={ emailAddress }
            placeholder="Email address"
            readOnly={ true }
        />

        <Text style={styles.label}>First Name</Text>
        <TextInput
            style={styles.input}
            value={firstName}
            onChangeText={ setFirstName }
            placeholder="Enter first name"
        />

        <Text style={styles.label}>Last Name</Text>
        <TextInput
            style={styles.input}
            value={lastName}
            onChangeText={ setLastName }
            placeholder="Enter last name"
        />

        <Text style={styles.label}>Date of Birth</Text>
        <TextInput
            style={[ styles.input, { marginBottom: 16 } ]}
            value={ dateOfBirth }
            onChangeText={ setDateOfBirth }
            placeholder="YYYY-MM-DD"
        />

        <Button title="Save Profile" onPress={ save_profile } />
    </View>
}

const styles = StyleSheet.create(
{
    container:
    {
        padding: 16,
        flex: 1,
        backgroundColor: "#fff",
    },

    label:
    {
        fontWeight: "bold",
        marginTop: 16,
    },

    input:
    {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 8,
        borderRadius: 4,
        marginTop: 4,
    },

    muted:
    {
        color: "gray",
    }
});
