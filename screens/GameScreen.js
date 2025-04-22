import { useState } from "react";
import { Gesture, GestureDetector, GestureHandlerRootView, Directions } from "react-native-gesture-handler";
import { StyleSheet, Text, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring, runOnJS,useAnimatedReaction } from "react-native-reanimated";

export function GameScreen({ tasks, setTasks })
{
    const [count, setCount] = useState(0);
    const countValue = useSharedValue(0);

    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const scale = useSharedValue(1);
    const pressStart = useSharedValue(0);

    useAnimatedReaction(
        () => countValue.value,
        (current) => {
            runOnJS(setCount)(current);
        }
    );

    const updateTask = (key, delta = 1) => {
        setTasks(prev =>
            prev.map(task =>
                task.key === key
                    ? { ...task, value: Math.min(task.value + delta, task.max) }
                    : task
            )
        );
    };

    const singleTap = Gesture.Tap()
        .onStart(() => {
            countValue.value += 1;
            runOnJS(updateTask)("clicks");
            runOnJS(updateTask)("score100", 1);
        });

    const doubleTap = Gesture.Tap()
        .numberOfTaps(2)
        .maxDuration(250)
        .onStart(() => {
            countValue.value += 2;
            runOnJS(updateTask)("doubleClicks");
            runOnJS(updateTask)("score100", 2);
        });

    const pan = Gesture.Pan()
        .onUpdate(event => {
            translateX.value = event.translationX;
            translateY.value = event.translationY;
        })
        .onEnd(() => {
            translateX.value = withSpring(0);
            translateY.value = withSpring(0);
            runOnJS(updateTask)("pan");
        });

    const pinch = Gesture.Pinch()
        .onUpdate(event => {
            scale.value = event.scale;
        })
        .onEnd(event => {
            scale.value = withSpring(1);
            const points = Math.ceil(event.scale);
            countValue.value += points;
            runOnJS(updateTask)("pinch");
            runOnJS(updateTask)("score100", points);
        });

    const flingAction = directionKey => () => {
        const points = Math.floor(Math.random() * 5) + 1;
        countValue.value += points;
        runOnJS(updateTask)(directionKey);
        runOnJS(updateTask)("score100", points);
    };

    const flingRight = Gesture.Fling().direction(Directions.RIGHT).onEnd(flingAction("flingRight"));
    const flingLeft = Gesture.Fling().direction(Directions.LEFT).onEnd(flingAction("flingLeft"));
    const flings = Gesture.Exclusive(flingRight, flingLeft);

    const longPress = Gesture.LongPress()
        .onStart(() => {
            pressStart.value = Date.now();
        })
        .onEnd(() => {
            const durationSec = Math.ceil((Date.now() - pressStart.value) / 1000);
            countValue.value += durationSec;
            runOnJS(updateTask)("longPress", durationSec);
            runOnJS(updateTask)("score100", durationSec);
        });

    const taps = Gesture.Exclusive(doubleTap, singleTap);

    const animatedStyles = useAnimatedStyle(() => ({
        transform: [
            { translateX: translateX.value },
            { translateY: translateY.value },
            { scale: scale.value },
        ],
    }));

    return (
        <GestureHandlerRootView style={styles.targetContainer}>
            <GestureDetector gesture={Gesture.Simultaneous(Gesture.Exclusive(flings, pan, taps), pinch, longPress)}>
                <Animated.View style={[styles.target, animatedStyles]}>
                    <Text style={styles.count}>{count}</Text>
                </Animated.View>
            </GestureDetector>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    targetContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    target: {
        backgroundColor: "red",
        width: 150,
        height: 150,
        borderRadius: 75,
        borderColor: "darkred",
        borderWidth: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    count: {
        fontSize: 40,
        color: "#fff",
    },
});
