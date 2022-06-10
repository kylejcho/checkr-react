import { useMotionValue, Reorder, AnimatePresence } from 'framer-motion'
import { doc, updateDoc, deleteDoc } from 'firebase/firestore'
import React, { useRef, useState, useCallback } from 'react'
import { RaisedShadow } from './RaisedShadow'
import { auth, db } from '../../firebase'
import CheckCircle from './CheckCircle'

function Task({ task, subTasks, updateSubTasks, viewTask }) {
   const [showTask, setShowTask] = useState(true)
   const [selectTask, setSelectTask] = useState(false)
   const [complete, setComplete] = useState(task.complete)
   const taskContainer = useRef()

   const docRef = doc(db, `${auth.currentUser.uid}`, `${task.id}`)
   const checkTask = useCallback(() => {
      let prevTasks = [...subTasks]
      const checkedTask = prevTasks.find((item) => item.id === task.id)
      updateDoc(docRef, {
         complete: !checkedTask.complete,
      })
      checkedTask.complete = !checkedTask.complete
      const index = prevTasks.indexOf(checkedTask)
      if (checkedTask.complete) {
         prevTasks.push(prevTasks.splice(index, 1)[0])
      } else {
         prevTasks.unshift(prevTasks.splice(index, 1)[0])
      }
      updateSubTasks(prevTasks)
   }, [subTasks, task.id, updateSubTasks])

   const checkClickAnimation = useCallback(() => {
      setComplete(!complete)
   }, [complete])

   const removeTask = useCallback(
      (task) => {
         deleteDoc(docRef)
         updateSubTasks(subTasks.filter((item) => item.id !== task))
      },
      [subTasks, updateSubTasks]
   )

   function handleDeleteClick() {
      if (taskContainer.current.className.includes('viewing')) {
         setTimeout(() => viewTask(null), 0)
      }
      setTimeout(() => setShowTask(false), 0)
      setTimeout(() => {
         removeTask(taskContainer.current.id)
      }, 250)
   }

   const y = useMotionValue(0)
   const boxShadow = RaisedShadow(y)

   return (
      <>
         <AnimatePresence>
            {showTask && (
               <Reorder.Item
                  id={task.id}
                  ref={taskContainer}
                  className={`taskContainer`}
                  value={task}
                  style={{ boxShadow, y }}
                  whileDrag={{ scale: 1.04 }}
                  transition={{ duration: 0.25 }}
                  onDragStart={() => {
                     taskContainer.current.classList.add('dragging')
                  }}
                  onDragEnd={() => {
                     updateSubTasks(subTasks)
                     taskContainer.current.classList.remove('dragging')
                  }}
                  exit={{ opacity: 0, transition: { duration: 0.3 } }}
                  dragTransition={{ bounceStiffness: 1000, bounceDamping: 70 }}
                  onClick={(e) => {
                     e.stopPropagation()
                     updateSubTasks(subTasks)
                     viewTask(task)
                     setSelectTask(!selectTask)
                     document
                        .querySelectorAll('.taskContainer')
                        .forEach((taskContainer) =>
                           taskContainer.classList.remove('viewing')
                        )
                     taskContainer.current.classList.add('viewing')
                  }}
               >
                  <CheckCircle
                     task={task}
                     taskContainer={taskContainer}
                     checkTask={checkTask}
                     complete={complete}
                     checkClickAnimation={checkClickAnimation}
                  />
                  <div className='nameContainer'>{task.name}</div>
                  <div
                     className='deleteContainer'
                     onClick={(e) => {
                        handleDeleteClick()
                        e.stopPropagation()
                     }}
                  >
                     <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='20'
                        height='20'
                        viewBox='0 0 512 512'
                     >
                        <title>ionicons-v5-l</title>
                        <line
                           x1='368'
                           y1='368'
                           x2='144'
                           y2='144'
                           style={{
                              fill: 'none',
                              stroke: '#697384',
                              strokeLinecap: 'round',
                              strokeLinejoin: 'round',
                              strokeWidth: '32px',
                           }}
                        />
                        <line
                           x1='368'
                           y1='144'
                           x2='144'
                           y2='368'
                           style={{
                              fill: 'none',
                              stroke: '#697384',
                              strokeLinecap: 'round',
                              strokeLinejoin: 'round',
                              strokeWidth: '32px',
                           }}
                        />
                     </svg>
                  </div>
                  <div className='descriptionContainer'>{task.description}</div>
               </Reorder.Item>
            )}
         </AnimatePresence>
      </>
   )
}

export default React.memo(Task)
