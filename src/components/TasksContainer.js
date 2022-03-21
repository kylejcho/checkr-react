import React from 'react'
import SubGroup from './SubGroup'

export default function TasksContainer({ tasks }) {
    return (
        <div className="tasksContainer" id="homeContainer">
            <div id="titleContainer" className="tasksTitle">Good Afternoon, User</div>
            <SubGroup tasks={tasks}/>
        </div>
    )
}
