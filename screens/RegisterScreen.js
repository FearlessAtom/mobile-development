import { authentication } from "../firebase/config.js";
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function RegisterScreen({ navigation })
{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignUp = async() =>
    {
        if (!email || !password || !confirmPassword)
        {
            Alert.alert("Fill in all the fields!");
            return;
        }

        if (password !== confirmPassword)
        {
            Alert.alert("Passwords do not match!");
            return;
        }

        console.log("Atom");

        const result = await createUserWithEmailAndPassword(authentication, email, password).catch(error => console.log(error));

        console.log("Atom2");

        navigation.replace("Login");
    };

    return <View style={styles.container}>
        <Text style={styles.title}>Registration</Text>

        <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            placeholderTextColor="#666"
        />

        <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            placeholderTextColor="#666"
        />

        <TextInput
            style={styles.input}
            placeholder="Confirm password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholderTextColor="#666"
        />

        <TouchableOpacity onPress={handleSignUp} style={styles.button}>
            <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.replace("Login")}>
                <Text style={styles.loginLink}>Log in</Text>
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
        backgroundColor: '#007AFF',
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
