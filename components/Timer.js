import React from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';

import TimerButton from './TimerButton';
import { millisecondsToHuman } from '../utils/TimerUtils';

export default function Timer({ 
    id,
    title,
    project,
    elapsed,
    isRunning,
    onEditPress,
    onRemovePress,
    onStartPress,
    onStopPress,
}) {
    const elapsedString = millisecondsToHuman(elapsed);

    const handleRemovePress = () => {
        onRemovePress(id);
    };

    const handleStartPress = () => {
        onStartPress(id);
    };

    const handleStopPress = () => {
        onStopPress(id);
    };

    return (
        <View style={styles.timerContainer}>
            <Text style={styles.title}>{title}</Text>

            <Text>{project}</Text>

            <Text style={styles.elapsedTime}>{elapsedString}</Text>

            <View style={styles.buttonGroup}>
                <TimerButton color='blue' small title='Edit' onPress={onEditPress}/>
                <TimerButton color='blue' small title='Remove' onPress={handleRemovePress}/>
            </View>

            {renderActionButton({
                isRunning,
                handleStartPress,
                handleStopPress,
            })}
        </View>
    )
}

function renderActionButton({ isRunning, handleStartPress, handleStopPress }) {
    if (isRunning) {
        return (
            <TimerButton
                color='#DB2828'
                title='Stop'
                onPress={handleStopPress}
            />
        );
    }

    return (
        <TimerButton
            color='#21BA45'
            title='Start'
            onPress={handleStartPress}
        />
    )
};

const styles = StyleSheet.create({
    timerContainer: {
        backgroundColor: 'white',
        borderColor: '#d6d7da',
        borderWidth: 2,
        borderRadius: 10,
        padding: 15,
        margin: 15,
        marginBottom: 0,
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    elapsedTime: {
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingVertical: 15,
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});