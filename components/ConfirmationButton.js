import { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { View } from "react-native";
import Dialog from "react-native-dialog";

export default function ConfirmationButton ({ message, onYes, onCancel, button })
{
    const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);

    return <View>
        <TouchableOpacity onPress={ () => setIsConfirmationVisible(true) }
            style={ confirmationButtonStyles.confirmationButton }
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
            }
        />
        </Dialog.Container>
    </View>
}

const confirmationButtonStyles = StyleSheet.create(
{
    confirmationButton:
    {
        paddingHorizontal: 5,  
    },
});
