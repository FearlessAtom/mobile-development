import { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Dialog from "react-native-dialog";

export default function PromptButton( { message, initialValue, onDone, onCancel, button } )
{
    const [isPromptVisible, setIsPromptVisible] = useState(false);
    const [inputValue, setInputValue] = useState(initialValue);

    return <View>
        <TouchableOpacity onPress={ () => setIsPromptVisible(true) }
            style={ promptButtonStyles.promptButton }
        >
            { button }
        </TouchableOpacity>

        <Dialog.Container visible={ isPromptVisible } >
            <Dialog.Title>{ message }</Dialog.Title>
            <Dialog.Input onChangeText={ setInputValue } selectTextOnFocus={ true } autoFocus={ true } style={{ fontSize: 18 }}
                value={ inputValue } />
            <Dialog.Button label="Cancel" onPress={
                () =>
                {
                    if(onCancel) onCancel();
                    setIsPromptVisible(false);
                }
            } />
            <Dialog.Button label="Done" onPress={
                () => 
                {
                    if (onDone) onDone(inputValue);
                    setIsPromptVisible(false);
                }
            } />
        </Dialog.Container>
    </View>
}

const promptButtonStyles = StyleSheet.create(
{
    promptButton:
    {
        paddingHorizontal: 5,  
    },
});
