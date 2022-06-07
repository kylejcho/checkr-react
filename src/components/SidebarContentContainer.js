import React, {useEffect, useState, useCallback } from 'react'
import Sidebar from './Sidebar'
import Content from './Content'
import { UserAuth } from '../contexts/AuthContext'
import {auth} from "../firebase"
import { collection, getDocs } from "firebase/firestore"; 
import { db } from "../firebase";
import {onAuthStateChanged } from 'firebase/auth'
function SidebarContentContainer({} ) {
    const { user } = UserAuth()
    const [openTask, setOpenTask] = useState(null)
    const [contentType, setContentType] = useState('home')
    const [tasks, setTasks] = useState(null)

    //useEffect(() => hideScroll(), [contentType])
    
    const changeContent = useCallback((type) => {
        setContentType(type)
        setOpenTask(null)
    },[])

      const removeTask = useCallback((task) => {
        setTasks(tasks => tasks.filter(item => item.id !== task))
      },[]); 
    
    
      const updateTasks = useCallback((subTasks) => {
        const prevTasks = tasks.filter(task => !subTasks.includes(task))
        setTasks([...prevTasks,...subTasks])
        console.log(tasks)
      },[tasks])
    
      const viewTask = useCallback((task) => {
        setOpenTask(task)
      },[])
    
    
    const data = async () => {
        const arr = []
        const querySnapshot = await getDocs(collection(db, `${auth.currentUser.uid}`))
        querySnapshot.forEach((doc) => {
            const task = {
                name: doc.data().name, 
                description: doc.data().description, 
                dueDate: doc.data().dueDate.toDate(), 
                list: doc.data().list,
                complete: doc.data().complete,
                id: doc.data().id
            };
            console.log(task)
            arr.push(task)
        });
        setTasks([...arr])
    }
    

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, currentUser =>{
            if (currentUser) {
                data()
            }
        })
        return ()=> {
            unsubscribe()
        }
    },[])

if (tasks && auth.currentUser) {
    return (
        <div id="sidebarContentContainer">
          <Sidebar changeContent={changeContent} contentType={contentType} />
          <Content contentType={contentType} tasks={tasks} updateTasks={updateTasks} removeTask={removeTask} openTask={openTask} viewTask={viewTask} />
        </div>
    )
    } else return <div id="loadingScreen">LOADING</div>
}


function hideScroll() {
    document.querySelector('#contentContainer').style.overflow = 'hidden';
    setTimeout(() => document.querySelector('#contentContainer').style.overflowY = 'auto', 500);
}

export default SidebarContentContainer