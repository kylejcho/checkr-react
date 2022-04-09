import React, { useRef} from "react";
import CheckCircle from "./CheckCircle";
import DeleteCircle from "./DeleteCircle";
import { motion, Reorder } from "framer-motion";

export default function Task({ task, checkTask, removeTask, type }) {
    const taskContainer = useRef();
    return (
        <Reorder.Item 
            value={task} 
            id={task}
            transition={{duration: 0.4}}
        >
            <motion.div layout className="taskContainer" id={task.id} ref={taskContainer}>
                <CheckCircle task={task} taskContainer={taskContainer} type={type} checkTask={checkTask} />
                <div className="nameContainer">{task.name}</div>
                <DeleteCircle taskContainer={taskContainer} removeTask={removeTask} />
                <div className="descriptionContainer">{task.description}</div>
            </motion.div>
        </Reorder.Item>
    )
}

