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
    setTasks([{name: 'Something', description: 'Do this thing', dueDate: addDays(new Date(), 1), id: 0}, {name: 'Thing', description: 'Do this', dueDate: new Date(), id: 1}, {name: 'Things', description: 'Do these', dueDate: new Date(), id: 2}])
  },[])
  
  useEffect(()=>{
    checkEmptyGroups(tasks);
    updateSubHeight();
    updateTaskPosition();
  }, [tasks])
  
  console.log(tasks)

  return (
    <>
      <Navbar />
      <Sidebar />
      <Main tasks={tasks} />
    </>
  )
}