import React, {useEffect, useState, useCallback } from 'react'
import Sidebar from './Sidebar'
import Content from './Content'
import {auth} from "../firebase"
import { collection, getDocs } from "firebase/firestore"; 
import { db } from "../firebase";
import {onAuthStateChanged } from 'firebase/auth'

function SidebarContentContainer({} ) {
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
    )} else return (
        <div id="loadingScreen">
            <div id="loadingScreenLogoContainer">
                <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><title>ionicons-v5-k</title><path d="M416,221.25V416a48,48,0,0,1-48,48H144a48,48,0,0,1-48-48V96a48,48,0,0,1,48-48h98.75a32,32,0,0,1,22.62,9.37L406.63,198.63A32,32,0,0,1,416,221.25Z" style={{fill:'none',stroke:'#3880ff',strokeLinejoin:'round',strokeWidth:'50px'}}/><path d="M256,56V176a32,32,0,0,0,32,32H408" style={{fill:'none',stroke:'#3880ff',strokeLinecap:'round',strokeLinejoin:'round',strokeWidth:'50px'}}/><line x1="176" y1="288" x2="336" y2="288" style={{fill:'none',stroke:'#3880ff',strokeLinecap:'round',strokeLinejoin:'round',strokeWidth:'50px'}}/><line x1="176" y1="368" x2="336" y2="368" style={{fill:'none',stroke:'#3880ff',strokeLinecap:'round',strokeLinejoin:'round',strokeWidth:'50px'}}/></svg>
                <p>checkr.</p>
            </div>
            <div id="loadingCircle"></div>
        </div>
    )
}


function hideScroll() {
    document.querySelector('#contentContainer').style.overflow = 'hidden';
    setTimeout(() => document.querySelector('#contentContainer').style.overflowY = 'auto', 500);
}

export default SidebarContentContainer