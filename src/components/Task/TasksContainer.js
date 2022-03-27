import React from 'react'
import SubGroup from '../SubGroup';

export default function TasksContainer({ tasks, removeTask}) {
    return (
        <div className="tasksContainer" id="homeContainer">
            <div id="titleContainer" className="tasksTitle">Good Afternoon, User</div>
            <SubGroup tasks={tasks} removeTask={removeTask} type = "today" />
            <SubGroup tasks={tasks} removeTask={removeTask} type = "tomorrow" />
            <SubGroup tasks={tasks} removeTask={removeTask} type = "upcoming" />
        </div> 
    )
}