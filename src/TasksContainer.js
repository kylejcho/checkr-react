import React from 'react'
import Task from './Task'

export default function TasksContainer({ tasks }) {
    return (
        <>
            <div className="tasksContainer" id="homeContainer">
                <div id="titleContainer" className="tasksTitle">Good Afternoon, User</div>
                <div className="subGroup" id="overdue" style={{height: '0px', opacity: '0', marginTop: '0px'}}>
                    <p className="subGroupTitle overdue">Overdue</p>
                </div>
                <div className="subGroup empty" id="today">
                    <p className="subGroupTitle">Today</p>
                    {tasks.map(task=>{
                        return <Task task={task} key={task.id} />
                    })}
                </div>
                <div className="subGroup empty" id="tomorrow">
                    <p className="subGroupTitle">Tomorrow</p>
                </div>
                <div className="subGroup empty" id="upcoming">
                    <p className="subGroupTitle">Upcoming</p>
                </div>
            </div>
        </>
    )
}
