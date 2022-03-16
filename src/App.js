import React, { useState } from "react";
import './index.css'
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";

export default function App() {
  const [tasks, setTasks] = useState([{name: 'Something', description: 'Do this thing', id: 0},{name: 'Thing', description: 'Do it', id: 1}])
  console.log(tasks)
  
  return (
    <>
      <Navbar />
      <Sidebar />
      <Main tasks={tasks} />
    </>
  )
}