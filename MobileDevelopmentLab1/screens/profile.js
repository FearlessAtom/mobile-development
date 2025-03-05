import { Text, TextInput, TouchableOpacity, View } from "react-native"
import { profileStyles } from "../styles"

export function ProfileScreen()
{
    return <View style={{ padding: 10 }}>
        <Text style={ profileStyles.title }>Registration</Text>

        <Text style={profileStyles.label}>Email address</Text>
        <TextInput style={ profileStyles.inputField } />

        <Text style={[profileStyles.label, { marginTop: 15 }]}>Password</Text>
        <TextInput secureTextEntry={true} style={ profileStyles.inputField } />

        <Text style={[profileStyles.label, { marginTop: 15 }]}>Confirm password</Text>
        <TextInput secureTextEntry={true} style={ profileStyles.inputField } />

        <Text style={[profileStyles.label, { marginTop: 30 }]}>First name</Text>
        <TextInput style={ profileStyles.inputField } />

        <Text style={[profileStyles.label, { marginTop: 15 }]}>Last name</Text>
        <TextInput style={ profileStyles.inputField } />

        <TouchableOpacity style={ profileStyles.signUpButton }>
            <Text style={{ color: "white"}}>Sign up</Text>
        </TouchableOpacity>
    </View>
}
