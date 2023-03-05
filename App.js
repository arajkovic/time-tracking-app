import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    KeyboardAvoidingView,
    ScrollView,
    Text,
} from 'react-native';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

import EditableTimer from './components/EditableTimer';
import ToggleableTimerForm from './components/ToggleableTimerForm';

import { newTimer } from './utils/TimerUtils';

export default function App() {
    const [timers, setTimers] = useState([
        {
            title: 'Mow the lawn',
            project: 'House Chores',
            id: uuidv4(),
            elapsed: 5456099,
            isRunning: true,
        },
        {
            title: 'Bake squash',
            project: 'Kitchen Chores',
            id: uuidv4(),
            elapsed: 1273998,
            isRunning: true,
        },
    ]);

    const handleCreateFormSubmit = (timer) => {
        setTimers([newTimer(timer), ...timers]);
    };

    const handleFormSubmit = (attrs) => {
        setTimers(timers.map((timer) => {
            if(timer.id === attrs.id) {
                const { title, project } = attrs;

                return {
                    ...timer,
                    title,
                    project,
                };
            }

            return timer;
        }));
    };

    const handleRemovePress = (timerId) => {
        setTimers(timers.filter(({ id }) => id !== timerId));
    };

    const toggleTimer = (timerId) => {
        setTimers(timers.map((timer) => {
            const { id, isRunning } = timer;

            if (id === timerId) {
                return {
                    ...timer,
                    isRunning: !isRunning,
                };
            }

            return timer;
        }));
    };

    useEffect(() => {
        const TIME_INTERVAL = 1000;

        const intervalId = setInterval(() => {
            setTimers((prevTimers) => prevTimers.map((timer) => {
                const { elapsed, isRunning } = timer;

                return {
                    ...timer,
                    elapsed: isRunning ? elapsed + TIME_INTERVAL : elapsed,
                };
            }));
        }, TIME_INTERVAL);

        return () => {
            clearInterval(intervalId);
        };

    }, []);

    return (
        <View style={styles.appContainer}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Timers</Text>
            </View>

            <KeyboardAvoidingView behavior='padding' style={styles.timerListContainer}>
                <ScrollView style={styles.timerList}>
                    <ToggleableTimerForm onFormSubmit={handleCreateFormSubmit}/>

                    {timers.map(({ title, project, id, elapsed, isRunning }) => (
                        <EditableTimer
                            key={id}
                            id={id}
                            title={title}
                            project={project}
                            elapsed={elapsed}
                            isRunning={isRunning}
                            onFormSubmit={handleFormSubmit}
                            onRemovePress={handleRemovePress}
                            onStartPress={toggleTimer}
                            onStopPress={toggleTimer}
                        />
                    ))}
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
    },
    titleContainer: {
        paddingTop: 48,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#D6D7DA',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    timerListContainer: {
        flex: 1,
    },
    timerList: {
        paddingBottom: 15,
    },
});
