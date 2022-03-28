import React from 'react'
import SubGroup from '../SubGroup';

export default function TasksContainer({ tasks, checkTask, removeTask}) {
    return (
        <div className="tasksContainer" id="homeContainer">
            <div id="titleContainer" className="tasksTitle">Good Afternoon, User</div>
            <SubGroup tasks={tasks} checkTask={checkTask} removeTask={removeTask} type = "today" />
            <SubGroup tasks={tasks} checkTask={checkTask} removeTask={removeTask} type = "tomorrow" />
            <SubGroup tasks={tasks} checkTask={checkTask} removeTask={removeTask} type = "upcoming" />
        </div> 
    )
}