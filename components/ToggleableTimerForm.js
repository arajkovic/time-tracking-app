import React, { useState } from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';


import TimerButton from './TimerButton';
import TimerForm from './TimerForm';

export default function ToggleableTimerForm(props) {
    const [isOpen, setIsOpen] = useState(false);

    const handleFormOpen = () => {
        setIsOpen(true);
    };

    const handleFormClose = () => {
        setIsOpen(false);
    };

    const handleFormSubmit = (timer) => {
        props.onFormSubmit(timer);

        setIsOpen(false);
    }

    return (
        <View style={[styles.container, !isOpen && styles.buttonPadding]}>
            {isOpen ? (
                <TimerForm
                    onFormSubmit={handleFormSubmit}
                    onFormClose={handleFormClose}
                />
            ) : (
                <TimerButton title='+' color='black' onPress={handleFormOpen}/>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
    },
    buttonPadding: {
        paddingHorizontal: 15,
    }
});