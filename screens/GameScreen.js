import { useState } from "react";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withSpring } from "react-native-reanimated";

export function GameScreen()
{
    const [count, setCount] = useState(0);

    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    const singleTap = Gesture.Tap()
        .onStart(()=> 
        {
            let increment = 1;
            console.log("Count: " + (count + increment));
            setCount(value => value + 1);
        });

    const doubleTap = Gesture.Tap()
        .maxDuration(50)
        .numberOfTaps(2)
        .onStart(()=>
        {
            let increment = 2;
            console.log("Count: " + (count + increment));
            setCount(value => value + increment);
        });

    const pan = Gesture.Pan()
        .onUpdate((event, context) =>
        {
            translateX.value = event.translationX;
            translateY.value = event.translationY;
        })
        .onEnd(() => 
        {
            translateX.value = withSpring(0);
            translateY.value = withSpring(0);
        });

    const animatedStyles = useAnimatedStyle(() =>
    {
        return {
            transform: [
                { translateX: translateX.value, },
                { translateY: translateY.value, }
            ],
        };
    });

    return <GestureHandlerRootView style={ GameScreenStyles.targetContainer }>
        <GestureDetector gesture={ Gesture.Race(pan, doubleTap, singleTap) }>
            <Animated.View style={[ GameScreenStyles.target, animatedStyles ]}></Animated.View>
        </GestureDetector>
    </GestureHandlerRootView>
}

const GameScreenStyles = StyleSheet.create(
{
    target:
    {
        backgroundColor: "red",
        width: 100,
        height: 100,
        borderRadius: 20,
    },

    targetContainer:
    {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
});
