import './index.css'
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Form from './components/Form/Form';
import Main from "./components/Main";
import { checkEmptyGroups, updateSubHeight } from "./components/SubGroup";
import { updateTaskPosition } from "./components/Task";
import React, { useState, useEffect} from "react";
import { v4 as uuidv4 } from 'uuid';
import { addDays } from "date-fns";

export default function App() {
  const [tasks, setTasks] = useState([])

  useEffect(()=>{ 
    setTasks([
      {name: 'Something', description: 'Do this thing', dueDate: addDays(new Date(), 1), id: uuidv4()}, 
      {name: 'Something', description: 'Do this thing', dueDate: addDays(new Date(), 1), id: uuidv4()}, 
      {name: 'Thing', description: 'Do this', dueDate: new Date(), id: uuidv4()}, 
      {name: 'Things', description: 'Do these', dueDate: new Date(), id: uuidv4()},
      {name: 'Somethingy', description: 'Do this thingy', dueDate: addDays(new Date(), 1), id: uuidv4()}, 
      {name: 'Thing', description: 'Do this', dueDate: addDays(new Date(), 2), id: uuidv4()}, 
      {name: 'Thingies', description: 'Do these thingies', dueDate: addDays(new Date(), 2), id: uuidv4()}])
  },[])
  
  useEffect(()=>{
    checkEmptyGroups(tasks);
    updateSubHeight();
    updateTaskPosition();
  }, [tasks])

  function addTask(task) {
    setTasks(prevTasks => [...prevTasks, task])
  }

  return (
    <>
      <Navbar />
      <Sidebar />
      <Main tasks={tasks} />
      <Form addTask={addTask}/>
    </>
  )
}