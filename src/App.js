import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import ContainerContainer from "./ContentContainer";

function App() {
  const [tasks, setTasks] = useState([{name: 'Something', description: 'Do this thing', id: 0}])
  console.log(tasks)
  return (
    <>
      <Navbar />
      <Sidebar />
      <ContainerContainer tasks={tasks}/>
    </>
  )
}

export default App;
