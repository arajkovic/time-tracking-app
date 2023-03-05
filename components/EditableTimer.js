import React, { useState } from 'react';

import TimerForm from './TimerForm';
import Timer from './Timer';

export default function EditableTimer({
    id,
    title,
    project,
    elapsed,
    isRunning,
    onFormSubmit,
    onRemovePress,
    onStartPress,
    onStopPress,
}) {
    const [editFormOpen, setEditFormOpen] = useState(false);

    const handleEditPress = () => {
        openForm();
    };

    const handleFormClose = () => {
        closeForm();
    };

    const handleSubmit = (timer) => {
        onFormSubmit(timer);
        closeForm();
    };

    const closeForm = () => {
        setEditFormOpen(false);
    };

    const openForm = () => {
        setEditFormOpen(true);
    };

    if(editFormOpen) {
        return (
            <TimerForm
                id={id}
                title={title}
                project={project}
                onFormSubmit={handleSubmit}
                onFormClose={handleFormClose}
            />
        );
    }

    return (
        <Timer
            id={id}
            title={title}
            project={project}
            elapsed={elapsed}
            isRunning={isRunning}
            onEditPress={handleEditPress}
            onRemovePress={onRemovePress}
            onStartPress={onStartPress}
            onStopPress={onStopPress}
        />
    );
};
