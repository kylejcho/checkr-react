import React, { useRef, useState, useCallback, useEffect } from 'react'
import { useMotionValue, Reorder, AnimatePresence } from 'framer-motion'
import { ReactComponent as Delete } from '../../icons/delete.svg'
import { RaisedShadow } from './RaisedShadow'
import CheckCircle from './CheckCircle'

function Task({ task, tasksCopy, subTasks, updateSubTasks, updateTasks, viewTask }) {
   const [showTask, setShowTask] = useState(true)

   const [selectTask, setSelectTask] = useState(false)

   const taskContainer = useRef()

   const checkTask = () => {
      let newSubTasks = [...subTasks]
      const checkedSubTask = newSubTasks.find(item => item.id === task.id)
      checkedSubTask.complete = !checkedSubTask.complete
      const subIndex = newSubTasks.indexOf(checkedSubTask)
      if (checkedSubTask.complete) {
         newSubTasks.push(newSubTasks.splice(subIndex, 1)[0])
      } else {
         newSubTasks.unshift(newSubTasks.splice(subIndex, 1)[0])
      }

      const newTasks = [...tasksCopy]
      const a = newTasks.filter(task => !newSubTasks.includes(task))
      updateTasks([...a, ...newSubTasks])
      updateSubTasks(newSubTasks)
   }

   const removeTask = () => {
      const newTasks = [...tasksCopy]
      updateSubTasks(subTasks.filter(item => item.id !== task.id))
      updateTasks(newTasks.filter(item => item.id !== task.id))
   }

   const reorderTask = () => {
      const prevTasks = [...tasksCopy]
      const a = prevTasks.filter(task => !subTasks.includes(task))
      updateTasks([...a, ...subTasks])
   }

   function handleDeleteClick() {
      setTimeout(() => {
         setShowTask(false)
         if (taskContainer.current.className.includes('viewing')) {
            viewTask(null)
         }
      }, 0)
      setTimeout(() => removeTask(), 250)
   }

   const y = useMotionValue(0)
   const boxShadow = RaisedShadow(y)

   return (
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
                  taskContainer.current.classList.remove('dragging')
                  reorderTask()
               }}
               exit={{ opacity: 0, transition: { duration: 0.3 } }}
               dragTransition={{ bounceStiffness: 1000, bounceDamping: 70 }}
               onClick={e => {
                  e.stopPropagation()
                  viewTask(task)
                  setSelectTask(!selectTask)
                  document
                     .querySelectorAll('.taskContainer')
                     .forEach(taskContainer => taskContainer.classList.remove('viewing'))
                  taskContainer.current.classList.add('viewing')
               }}
            >
               <CheckCircle
                  task={task}
                  taskContainer={taskContainer}
                  checkTask={checkTask}
               />
               <div className='nameContainer'>{task.name}</div>
               <div
                  className='deleteContainer'
                  onClick={e => {
                     handleDeleteClick()
                     e.stopPropagation()
                  }}
               >
                  <Delete />
               </div>
               <div className='descriptionContainer'>{task.description}</div>
            </Reorder.Item>
         )}
      </AnimatePresence>
   )
}

export default React.memo(Task)
