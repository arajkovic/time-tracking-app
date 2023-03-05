import { v4 as uuidv4} from 'uuid';

export function millisecondsToHuman(milliseconds) {
    const time = parseInt(milliseconds, 10);

    return new Date(time).toISOString().slice(11, 19);
};

export function newTimer(attrs = {}) {
    const timer = {
        title: attrs.title || 'Title',
        project: attrs.project || 'Project',
        id: uuidv4(),
        elapsed: 0,
        isRunning: false,
    };

    return timer;
};