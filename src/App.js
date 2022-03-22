import './index.css'
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import { checkEmptyGroups, updateSubHeight } from "./components/SubGroup";
import { updateTaskPosition } from "./components/Task";
import React, { useState, useEffect} from "react";
import { addDays } from "date-fns";

export default function App() {
  const [tasks, setTasks] = useState([])

  useEffect(()=>{ 
    setTasks([
      {name: 'Something', description: 'Do this thing', dueDate: addDays(new Date(), 1), id: 0}, 
      {name: 'Something', description: 'Do this thing', dueDate: addDays(new Date(), 1), id: 8}, 
      {name: 'Thing', description: 'Do this', dueDate: new Date(), id: 1}, 
      {name: 'Things', description: 'Do these', dueDate: new Date(), id: 2},
      {name: 'Somethingy', description: 'Do this thingy', dueDate: addDays(new Date(), 1), id: 3}, 
      {name: 'Thing', description: 'Do this', dueDate: addDays(new Date(), 2), id: 4}, 
      {name: 'Thingies', description: 'Do these thingies', dueDate: addDays(new Date(), 2), id: 5}])
  },[])
  
  useEffect(()=>{
    checkEmptyGroups(tasks);
    updateSubHeight();
    updateTaskPosition();
  }, [tasks])

  return (
    <>
      <Navbar />
      <Sidebar />
      <Main tasks={tasks} />
    </>
  )
}