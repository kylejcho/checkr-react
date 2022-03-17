import React, { useState, useEffect} from "react";
import './index.css'
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import { checkEmptyGroups } from "./components/SubGroup";

export default function App() {
  const [tasks, setTasks] = useState([])

  useEffect(()=>{ 
    setTasks([{name: 'Something', description: 'Do this thing', dueDate: new Date(), id: 0}, {name: 'Thing', description: 'Do this', dueDate: new Date(), id: 1}])
  },[])
  
  useEffect(()=>{
    checkEmptyGroups(tasks);
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