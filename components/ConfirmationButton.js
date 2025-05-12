import { useState } from "react";
import { Button, StyleSheet, TouchableOpacity } from "react-native";
import { View } from "react-native";
import Dialog from "react-native-dialog";

export default function ConfirmationButton ({ button_title, button_color, message, onYes, onCancel })
{
    const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);

    return <View>
        <Button
            color={ button_color ? button_color : "#2196F3" }
            title={ button_title }
            onPress=
            {
                () =>
                {
                    console.log("Atom");
                    setIsConfirmationVisible(true)
                }
            }
        />

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
            }
        />
        </Dialog.Container>
    </View>
}

const confirmationButtonStyles = StyleSheet.create(
{
    confirmationButton:
    {
        marginTop: 16,
    },
});
