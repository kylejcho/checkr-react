import Sidebar from "./components/Sidebar";
import Content from "./components/Content";
import Navbar from "./components/Navbar";
import Form from "./components/Form/Form";
import {ReactComponent as Logo} from './icons/document-text-outline.svg'
import {ReactComponent as SearchIcon} from './icons/search-outline.svg'
import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect, useCallback } from "react";
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

  const changeContent = useCallback((type) => {
    setContentType(type)
    setOpenTask(null)
  },[])

  const addTask = useCallback((task) =>  {
    setTasks(prevTasks => [task, ...prevTasks])
    //console.log(tasks)
  },[])
  
  const removeTask = useCallback((task) => {
    setTasks(tasks => tasks.filter(item => item.id !== task))
  },[tasks]); 


  const updateTasks = useCallback((subTasks) => {
    const prevTasks = tasks.filter(task => !subTasks.includes(task))
    setTasks([...prevTasks,...subTasks])
    console.log(tasks)
  },[tasks])

  const viewTask = useCallback((task) => {
    setOpenTask(task)
  },[openTask])




  const [formOpen, setFormOpen] = useState(false);
    
  const pathVariants = {
      initial: {
          opacity: 1,
          pathLength: 1
      },
      animate: {
          pathLength: formOpen ? 0 : 1,
          stroke: formOpen ? '#3880ff' : '#697384',
          rotate: formOpen ? 90 : 0,
          transition: {
              duration: 0.4,
              ease: "easeOut"
          }
      }
  }



  return (
    <>
      <nav id = "navbar">
          <div id="pageTitle">
          <Logo className="logo"/>
              <p>checkr.</p>
          </div>
          <div id="searchAddContainer">
              <div id="searchContainer">
                  <div id="searchItemsContainer">
                      <SearchIcon id="searchIcon" />
                      <input id="searchBar" type="text" placeholder="Search tasks..."></input>
                  </div>
                  <div id="searchResultsContainer" className="hidden"></div>
              </div>
              <motion.div 
                id = 'addButtonContainer'
                whileTap={{ scale: 0.9 }}
                onClick={() => !formOpen && setFormOpen(true)}
              >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="26" height="26">
                    <title>ionicons-v5-a</title>
                    <motion.line variants={pathVariants} id="addButton" initial="initial" animate="animate"  x1="256" y1="256" x2="400" y2="256" style={{fill:'none',strokeLinecap:'round',strokeLinejoin:'round',strokeWidth:'32px'}}/>
                    <motion.line variants={pathVariants} id="addButton" initial="initial" animate="animate" x1="256" y1="256" x2="256" y2="112" style={{fill:'none',strokeLinecap:'round',strokeLinejoin:'round',strokeWidth:'32px'}}/>
                    <motion.line variants={pathVariants} id="addButton" initial="initial" animate="animate"  x1="256" y1="256" x2="112" y2="256" style={{fill:'none',strokeLinecap:'round',strokeLinejoin:'round',strokeWidth:'32px'}}/>
                    <motion.line variants={pathVariants} id="addButton" initial="initial" animate="animate" x1="256" y1="256" x2="256" y2="400" style={{fill:'none',strokeLinecap:'round',strokeLinejoin:'round',strokeWidth:'32px'}}/>
                  </svg>
              </motion.div>
          </div>
          <div id="darkModeContainer">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 512 512">
                   <title>ionicons-v5-j</title>
                  <path 
                      d="M160,136c0-30.62,4.51-61.61,16-88C99.57,81.27,48,159.32,48,248c0,119.29,96.71,216,216,216,88.68,0,166.73-51.57,200-128-26.39,11.49-57.38,16-88,16C256.71,352,160,255.29,160,136Z" 
                      style={{fill:'none',strokeLinecap:'round',strokeLinejoin:'round',strokeWidth:'40px'}}
                  />
              </svg>
          </div>
          <div id="profileContainer">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 512 512">
                  <title>ionicons-v5-j</title>
                  <path d="M258.9,48C141.92,46.42,46.42,141.92,48,258.9,49.56,371.09,140.91,462.44,253.1,464c117,1.6,212.48-93.9,210.88-210.88C462.44,140.91,371.09,49.56,258.9,48ZM385.32,375.25a4,4,0,0,1-6.14-.32,124.27,124.27,0,0,0-32.35-29.59C321.37,329,289.11,320,256,320s-65.37,9-90.83,25.34a124.24,124.24,0,0,0-32.35,29.58,4,4,0,0,1-6.14.32A175.32,175.32,0,0,1,80,259C78.37,161.69,158.22,80.24,255.57,80S432,158.81,432,256A175.32,175.32,0,0,1,385.32,375.25Z"/>
                <path d="M256,144c-19.72,0-37.55,7.39-50.22,20.82s-19,32-17.57,51.93C191.11,256,221.52,288,256,288s64.83-32,67.79-71.24c1.48-19.74-4.8-38.14-17.68-51.82C293.39,151.44,275.59,144,256,144Z"/>
              </svg>
          </div>
          <AnimatePresence
              initial={false}
              exitBeforeEnter
              onExitComplete={() => null}
          >
              {formOpen && <Form tasks={tasks} addTask={addTask} handleClose={()=>setFormOpen(false)}/>}
          </AnimatePresence>
      </nav>

      <div id="sidebarContentContainer">
        <Sidebar changeContent={changeContent} />
        <Content contentType={contentType} tasks={tasks} updateTasks={updateTasks} removeTask={removeTask} openTask={openTask} viewTask={viewTask}  />
      </div>
    </>
  )
}