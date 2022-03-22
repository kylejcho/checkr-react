import React from 'react'
import SubGroups from './SubGroups'

export default function TasksContainer({ tasks }) {
    return (
        <div className="tasksContainer" id="homeContainer">
            <div id="titleContainer" className="tasksTitle">Good Afternoon, User</div>
            <SubGroups tasks={tasks}/>
        </div>
    )
}
