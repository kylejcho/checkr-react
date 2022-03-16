import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import ContainerContainer from "./ContentContainer";

export default function App() {
  const [tasks, setTasks] = useState([{name: 'Something', description: 'Do this thing', id: 0},{name: 'Something', description: 'Do this thing', id: 1}])
  console.log(tasks)
  
  return (
    <>
      <Navbar />
      <Sidebar />
      <ContainerContainer tasks={tasks} />
    </>
  )
}