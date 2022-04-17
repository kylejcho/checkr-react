import React, { useState } from "react";
import TasksContainer from "./Task/TasksContainer";
import TaskView from "./Task/TaskView";
import { AnimatePresence } from "framer-motion";

export default function Content({ tasks, checkTask, removeTask }) {
    const [taskViewOpen, setTaskViewOpen] = useState(false)

    let taskView;

    function viewTask(task) {
        taskView = task;
        setTaskViewOpen(true);
        
    }

    return (
        <div id="contentContainer">
            <TasksContainer tasks={tasks} checkTask={checkTask} removeTask={removeTask} viewTask={viewTask} />
            <AnimatePresence>
                {taskViewOpen && <TaskView task={taskView} />}
            </AnimatePresence>
        </div>
    )
}