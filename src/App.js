import Sidebar from "./components/Sidebar";
import Content from "./components/Content";
import Navbar from "./components/Navbar";
import React, { useState, useEffect} from "react";
import { v4 as uuidv4 } from 'uuid';
import { addDays, endOfDay} from "date-fns";

export default function App() {
  const [tasks, setTasks] = useState([])
  const [openTask, setOpenTask] = useState(null)
  const [contentType, setContentType] = useState('home')

  useEffect(() => {setTasks([
      {name: 'Coffee with friend', description: 'Starbucks', dueDate: endOfDay(new Date()), list: null, complete: false, id: uuidv4()},
      {name: 'Exercise', description: 'Workout out for 45 minutes', dueDate: endOfDay(new Date()), list: null, complete: false, id: uuidv4()},
      {name: 'Learn sign language', description: 'Practice english alphabet', dueDate: endOfDay(new Date()), list: 'Personal', complete: false,  id: uuidv4()}, 
      {name: 'Exercise', description: 'Workout out for 45 minutes', dueDate: addDays(endOfDay(new Date()), 1), list: null, complete: false, id: uuidv4()},
      {name: 'Read Animal Farm', description: 'Read two chapter', dueDate: addDays(endOfDay(new Date()), 1), list: 'Reading', complete: false, id: uuidv4()}, 
      {name: 'Learn sign language', description: 'Practice english alphabet', dueDate: addDays(endOfDay(new Date()), 1), list: null, complete: false,  id: uuidv4()}, 
      {name: 'Thing', description: 'Do this', dueDate: addDays(endOfDay(new Date()), 2), list: null, complete: false,  id: uuidv4()}, 
      {name: 'Thingies', description: 'Do these thingies', dueDate: addDays(endOfDay(new Date()), 2), list: null, complete: false, id: uuidv4()},
      {name: 'Baking class', description: 'Bring homemade pie', dueDate: endOfDay(new Date()), list: null, complete: true, id: uuidv4()}])
  },[])

  function changeContent(type) {
    setContentType(type)
    setOpenTask(null)
  }

  function addTask(task) {
    setTasks(prevTasks => [task, ...prevTasks])
    //console.log(tasks)
  }
  
  function removeTask(task) {
    setTasks(tasks => tasks.filter(item => item.id !== task))
  }; 

  function checkTask(task) {
    let prevTasks = [...tasks];
    const checkedTask = prevTasks.find(item => item.id === task);
    checkedTask.complete = !checkedTask.complete;
    const index = prevTasks.indexOf(checkedTask);
    if (checkedTask.complete) {
      prevTasks.push(prevTasks.splice(index,1)[0])
    } else {
      prevTasks.unshift(prevTasks.splice(index,1)[0])
    }
    setTasks([...prevTasks])
}

  function updateTasks(subTasks) {
    const prevTasks = tasks.filter(task => !subTasks.includes(task))
    setTasks([...prevTasks,...subTasks])
  }

  function viewTask(task) {
    setOpenTask(task)
  }

  return (
    <>
      <Navbar tasks={tasks} addTask={addTask} />
      <div id="sidebarContentContainer">
        <Sidebar changeContent={changeContent} />
        <Content contentType={contentType} tasks={tasks} updateTasks={updateTasks} removeTask={removeTask} checkTask={checkTask} openTask={openTask} viewTask={viewTask}  />
      </div>
    </>
  )
}