import React, { useRef } from "react";
import InputCalendarOptions from "./InputCalendarOptions";
import { v4 as uuidv4 } from 'uuid';

export default function Form({addTask}) {
    const taskNameRef = useRef();
    const taskDescriptionRef = useRef();
    const formContainerRef = useRef();
    const form = useRef();

    function handleAddTaskClick() {
        const task = {name: taskNameRef.current.value, description: taskDescriptionRef.current.value, dueDate: new Date(), id: uuidv4()};
        addTask(task);
        console.log(task)
    }

    function handleCancelClick() {
        //formContainerRef.current.classList.add('hidden');
        //form.current.classList.add('hidden')
    }

    return (
        <div id="taskFormContainer" className="hidden" ref={formContainerRef} onClick={handleCancelClick}>
            <div id="taskForm" className="hidden" ref={form}>
                <input ref={taskNameRef} id="inputTaskName" type="text" placeholder="I want to..." required=""></input>
                <textarea ref={taskDescriptionRef} id="inputTaskDescription" name="description" rows="2" placeholder="Description..."></textarea>
                <div id="inputDueDateContainer">
                    <div className="inputDueDate selected" id="inputToday"><ion-icon name="calendar-number-outline" role="img" className="md hydrated" aria-label="calendar number outline"></ion-icon>Today</div>
                    <div className="inputDueDate" id="inputTomorrow"><ion-icon name="today-outline" role="img" className="md hydrated" aria-label="today outline"></ion-icon>Tomorrow</div>
                    <div id="inputCalendarContainer">
                        <div id="inputCalendar">
                            <ion-icon name="calendar-clear-outline" role="img" className="md hydrated" aria-label="calendar clear outline"></ion-icon>
                            <p id="dateSelection">Pick Date</p>
                        </div>
                        <InputCalendarOptions />
                    </div>
                    <div id="inputListContainer">
                        <div id="inputList">
                            <div className="dot"></div>
                            <p id="listSelectionName">Add to list</p>
                        </div>
                        <div id="inputListOptions">
                            <input id="inputListTextArea" type="text" placeholder="Type a list"></input>
                            <div id="createListButton" className="hidden"></div>
                        <p className="inputListItem" id="SchoolList">School</p><p className="inputListItem" id="ReadingList">Reading</p><p className="inputListItem" id="PersonalList">Personal</p></div>
                    </div>
                </div>
                <button id="taskFormAddButton" onClick={handleAddTaskClick}><ion-icon name="arrow-forward-circle-outline" role="img" className="md hydrated" aria-label="arrow forward circle outline"></ion-icon>Add task</button>
            </div>
        </div>
    )
}