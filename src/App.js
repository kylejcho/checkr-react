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
      {name: 'Something', description: 'Do this thing', dueDate: addDays(new Date(), 1), complete: false, id: uuidv4()}, 
      {name: 'Something', description: 'Do this thing', dueDate: addDays(new Date(), 1), complete: false,  id: uuidv4()}, 
      {name: 'Thing', description: 'Do this', dueDate: new Date(), complete: false, id: uuidv4()}, 
      {name: 'Things', description: 'Do these', dueDate: new Date(), complete: false, id: uuidv4()},
      {name: 'Somethingy', description: 'Do this thingy', dueDate: addDays(new Date(), 1), complete: false, id: uuidv4()}, 
      {name: 'Thing', description: 'Do this', dueDate: addDays(new Date(), 2), complete: false,  id: uuidv4()}, 
      {name: 'Thingies', description: 'Do these thingies', dueDate: addDays(new Date(), 2), complete: false, id: uuidv4()}])
  },[])
  
  useEffect(()=>{
    updateSubLayout(tasks);
    updateTaskPosition();
  }, [tasks])

  function addTask(task) {
    setTasks(prevTasks => [...prevTasks, task])
  }

  function checkTask(task) {
    let prevTasks = [...tasks];
    const checkedTask = prevTasks.find(item => item.id === task.current.id);
    checkedTask.complete = !checkedTask.complete;
    setTasks([...prevTasks]);
  } 

  function removeTask(task) {
    let prevTasks = [...tasks];
    prevTasks.forEach(item => {
      if (item.id === task) {
        const index = prevTasks.indexOf(item)
        prevTasks.splice(index, 1);
        setTasks([...prevTasks]);
        return 
      }
    })
  }

  return (
    <>
      <Navbar />
      <Sidebar />
      <Content tasks={tasks} checkTask={checkTask} removeTask={removeTask} />
      <Form addTask={addTask}/>
    </>
  )
}