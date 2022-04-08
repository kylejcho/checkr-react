import React from "react";
import { isToday, isTomorrow, isAfter, addDays} from "date-fns";
import Task from "./Task/Task";

export default function SubGroup({ tasks, type, checkTask, removeTask }) {
    function checkType(dueDate) {
        if (type === 'today') {
            return isToday(dueDate);
        } else if (type === 'tomorrow') {
            return isTomorrow(dueDate)
        } else {
            return isAfter(dueDate, addDays(new Date(),1))
        }
    }
    return (
        <div className="subGroup" id={type}>
            <p className="subGroupTitle">{type[0].toUpperCase() + type.slice(1)}</p>
                {tasks.map(task=>{
                    if (checkType(task.dueDate)) {
                        return <Task tasks={tasks} task={task} key={task.id} checkTask={checkTask} removeTask={removeTask} type = {type}/>
                    } 
                    return null
                })}
        </div>
    )
}

export function updateSubLayout(tasks) {
    checkEmptyGroups(tasks);
    updateSubHeight();
}

function checkEmptyGroups(tasks) {
    const emptyToday = tasks.every(task=> !isToday(task.dueDate))
    const emptyTomorrow = tasks.every(task=> !isTomorrow(task.dueDate))
    const emptyUpcoming = tasks.every(task=> !isAfter(task.dueDate, addDays(new Date(),1)))

    document.querySelector('#today').classList.toggle('empty', emptyToday)
    document.querySelector('#tomorrow').classList.toggle('empty', emptyTomorrow)
    document.querySelector('#upcoming').classList.toggle('empty', emptyUpcoming)
}

function updateSubHeight() {
    const today = document.querySelector('#today');
    const tomorrow  = document.querySelector('#tomorrow');
    const upcoming  = document.querySelector('#upcoming');
    let todayLength = (today.children.length - 1) * 60;
    let tomorrowLength = (tomorrow.children.length - 1) * 60;

    if (todayLength === 0) {
       todayLength = 26;
    }
    if (tomorrowLength === 0) {
        tomorrowLength = 26;
    }

    tomorrow.style.transform = `translateY(${todayLength + 26}px)`;
    upcoming.style.transform = `translateY(${todayLength + tomorrowLength + 52}px)`;
}