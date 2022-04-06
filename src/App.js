import Sidebar from "./components/Sidebar";
import Content from "./components/Content";
import Form from './components/Form/Form';
import Navbar from "./components/Navbar";
import { updateTaskPosition } from "./components/Task/Task";
import { updateSubLayout } from "./components/SubGroup";
import React, { useState, useEffect} from "react";
import { v4 as uuidv4 } from 'uuid';
import { addDays } from "date-fns";

export default function App() {
  const [tasks, setTasks] = useState([])

  useEffect(()=>{
    setTasks([
      {name: 'Coffee with friend', description: 'Starbucks', dueDate: new Date(), complete: false, id: uuidv4()},
      {name: 'Exercise', description: 'Workout out for 45 minutes', dueDate: new Date(), complete: false, id: uuidv4()},
      {name: 'Read Animal Farm', description: 'Read two chapter', dueDate: addDays(new Date(), 1), complete: false, id: uuidv4()}, 
      {name: 'Learn sign language', description: 'Practice english alphabet', dueDate: addDays(new Date(), 1), complete: false,  id: uuidv4()}, 
      {name: 'Thing', description: 'Do this', dueDate: addDays(new Date(), 2), complete: false,  id: uuidv4()}, 
      {name: 'Thingies', description: 'Do these thingies', dueDate: addDays(new Date(), 2), complete: false, id: uuidv4()},
      {name: 'Baking class', description: 'Bring homemade pie', dueDate: new Date(), complete: true, id: uuidv4()}])
  },[])
  
  useEffect(()=>{
    updateSubLayout(tasks);
    updateTaskPosition();
    console.log(tasks)
  },[tasks])

  function addTask(task) {
    setTasks(prevTasks => [task, ...prevTasks])
    console.log(tasks)
  }

  function checkTask(task) {
    let prevTasks = [...tasks];
    const checkedTask = prevTasks.find(item => item.id === task);
    checkedTask.complete = !checkedTask.complete;
    setTasks([...prevTasks]);
  }

  function removeTask(task) {
    let prevTasks = [...tasks];
    const taskIndex = prevTasks.findIndex(item => item.id === task);
    prevTasks.splice(taskIndex, 1);
    setTasks([...prevTasks]);
  }

  return (
    <>
      <Navbar />
      <Sidebar />
      <Content tasks={tasks} checkTask={checkTask} removeTask={removeTask} />
      <Form addTask={addTask} />
    </>
  )
}