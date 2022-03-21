import React from "react";
import { isToday, isTomorrow, isAfter, addDays} from "date-fns";
import Task from "./Task";

export default function SubGroup({ tasks }) {
    return (
        <>
            <div className="subGroup" id="overdue" style={{height: '0px', opacity: '0', marginTop: '0px'}}>
                <p className="subGroupTitle overdue">Overdue</p>
            </div>
            <div className="subGroup" id="today">
                <p className="subGroupTitle">Today</p>
                {tasks.map(task=>{
                    if (isToday(task.dueDate)) {
                        return <Task task={task} key={task.id}/>
                    }
                })}
            </div>
            <div className="subGroup" id="tomorrow">
                <p className="subGroupTitle">Tomorrow</p>
                {tasks.map(task=>{
                    if (isTomorrow(task.dueDate)) {
                        return <Task task={task} key={task.id}/>
                    }
                })}
            </div>
            <div className="subGroup" id="upcoming">
                <p className="subGroupTitle">Upcoming</p>
                {tasks.map(task=>{
                    if (isAfter(task.dueDate, addDays(new Date(),1))) {
                        return <Task task={task} key={task.id}/>
                    }
                })}
            </div>
        </>
    )
}

export function checkEmptyGroups(tasks) {
    const emptyToday = tasks.every(task=> !isToday(task.dueDate))
    const emptyTomorrow = tasks.every(task=> !isTomorrow(task.dueDate))
    const isUpcoming = tasks.every(task=> !isAfter(task.dueDate, addDays(new Date(),1)))

    document.querySelector('#today').classList.toggle('empty', emptyToday)
    document.querySelector('#tomorrow').classList.toggle('empty', emptyTomorrow)
    document.querySelector('#upcoming').classList.toggle('empty', isUpcoming)
}

export function updateSubHeight() {
    const subGroup = document.querySelectorAll('.subGroup');
    subGroup.forEach(sub => {
        if (sub.children.length > 1) {
            sub.style.height = `${sub.children.length * 60}px `;
        }
    })
}