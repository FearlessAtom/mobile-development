import { authentication } from "../firebase/config.js";
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../contexts/AuthContext.js";

export default function LoginScreen({ navigation })
{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { setLoggedInUser } = useAuth();

    const handleSignUp = async() =>
    {
        if (!email || !password)
        {
            Alert.alert("Fill in all the fields!");
            return;
        }

        await signInWithEmailAndPassword(authentication, email, password)
            .then(result => setLoggedInUser(result.user))
            .catch(error => console.log(error));
    };

    return <View style={styles.container}>
        <Text style={styles.title}>Log in</Text>

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

        <TouchableOpacity onPress={handleSignUp} style={styles.button}>
            <Text style={styles.buttonText}>Sign in</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account yet?</Text>
            <TouchableOpacity onPress={() => navigation.replace("Register")}>
                <Text style={styles.loginLink}>Register</Text>
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
