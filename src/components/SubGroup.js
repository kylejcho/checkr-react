import React, { useState, useEffect } from "react";
import { isToday, isTomorrow, isAfter, addDays} from "date-fns";
import Task from "./Task/Task";
import { motion, Reorder} from "framer-motion";

export default function SubGroup({ tasks, type, checkTask, removeTask, reorderTasks}) {
    function checkType(dueDate) {
        if (type === 'today') {
            return isToday(dueDate);
        } else if (type === 'tomorrow') {
            return isTomorrow(dueDate)
        } else {
            return isAfter(dueDate, addDays(new Date(),1))
        }
    }

    /*
    const [items, setItems] = useState([])
    useEffect(() => {
      setItems([...tasks])
    }, [tasks])
    console.log(items)
*/


    return (
        <motion.div layout className="subGroup" id={type}>
            <motion.p layout className="subGroupTitle">{type[0].toUpperCase() + type.slice(1)}</motion.p>
            <Reorder.Group values={tasks} onReorder={reorderTasks}>
            {tasks.map(task=>{
                if (checkType(task.dueDate)) {
                    return <Task tasks={tasks} task={task} key={task.id} checkTask={checkTask} removeTask={removeTask} type={type}/>
                } 
                return null
            })}
            </Reorder.Group>
        </motion.div>
    )
}

export function updateSubLayout(tasks) {
    checkEmptyGroups(tasks);
}

function checkEmptyGroups(tasks) {
    const emptyToday = tasks.every(task=> !isToday(task.dueDate))
    const emptyTomorrow = tasks.every(task=> !isTomorrow(task.dueDate))
    const emptyUpcoming = tasks.every(task=> !isAfter(task.dueDate, addDays(new Date(),1)))

    document.querySelector('#today').classList.toggle('empty', emptyToday)
    document.querySelector('#tomorrow').classList.toggle('empty', emptyTomorrow)
    document.querySelector('#upcoming').classList.toggle('empty', emptyUpcoming)
}
