import { STATUS } from "@/constants/constants";

const classifyTaskStatus = (tasks = []) => {
    const unfinished = [];
    const inProgress = [];
    const done = [];

    tasks.forEach((task) => {
        if (task.status === STATUS.DONE) {
            done.push(task);
        }

        if (task.status === STATUS.INPROGRESS) {
            inProgress.push(task);
        }

        if (task.status === STATUS.UNFINISHED) {
            unfinished.push(task);
        }
    });

    return [unfinished, inProgress, done];
};

export default classifyTaskStatus;
