import Profile from './Profile'
import React, { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Form from './Form/Form'
import DarkModeButton from './DarkModeButton'
import { ReactComponent as Logo } from '../icons/document-text-outline.svg'
import { ReactComponent as SearchIcon } from '../icons/search-outline.svg'
import SearchResultItem from './SearchResultItem'

function Navbar({
   tasks,
   uniqueLists,
   addDataTask,
   changeContent,
   contentType,
   viewTask,
}) {
   //Manages task form open/close states
   const [formOpen, setFormOpen] = useState(false)
   const [searchValue, setSearchValue] = useState('')

   const searchResultsContainer = useRef()
   const searchContainer = useRef()
   const searchInput = useRef()

   //Unfocus from searchbar if outside is clicked
   function useOutsideDetection() {
      useEffect(() => {
         const handleClickOutside = e => {
            if (searchResultsContainer.current) {
               if (searchResultsContainer.current.contains(e.target)) {
                  result(e)
               }
               setSearchValue('')
               searchInput.current.value = ''
            }
         }
         // Bind the event listener
         document.addEventListener('mousedown', handleClickOutside)
         return () => {
            // Unbind the event listener on clean up
            document.removeEventListener('mousedown', handleClickOutside)
         }
      })
   }

   useOutsideDetection(searchResultsContainer)

   //Actions based on user's search selection
   const result = async e => {
      const taskId = e.target.id.slice(6)
      const resultTask = tasks.filter(task => {
         if (task.id === taskId) {
            return task
         }
      })
      if (contentType !== 'all' && contentType !== 'home') {
         await changeContent('all')
         setTimeout(() => {
            //wait for contentChange animation to view task
            setTimeout(() => {
               viewTask(...resultTask)
            }, 200)

            //Remove any previous viewing class and add one to the selected task
            document.querySelectorAll('.taskContainer').forEach(taskContainer => {
               taskContainer.classList.remove('viewing')
            })
            document.querySelector(`#${taskId}`).classList.add('viewing')
         }, 375)
      } else {
         //Start view task immediatly if already at 'all' or 'home' content page
         setTimeout(() => {
            viewTask(...resultTask)
            document.querySelectorAll('.taskContainer').forEach(taskContainer => {
               taskContainer.classList.remove('viewing')
            })
            document.querySelector(`#${taskId}`).classList.add('viewing')
         }, 150)
      }
   }

   //Line tracing animation properties for add button
   const pathVariants = {
      initial: {
         opacity: 1,
         pathLength: 1,
      },
      animate: {
         pathLength: formOpen ? 0 : 1,
         stroke: formOpen ? '#3880ff' : '#697384',
         rotate: formOpen ? 90 : 0,
         transition: {
            duration: 0.4,
            ease: 'easeOut',
         },
      },
   }

   return (
      <nav id='navbar'>
         <div id='pageTitle'>
            <Logo className='logo' />
            <p>checkr.</p>
         </div>
         <div id='searchAddContainer'>
            <div id='searchContainer' ref={searchContainer}>
               <div id='searchItemsContainer'>
                  <SearchIcon id='searchIcon' />
                  <input
                     id='searchBar'
                     type='text'
                     placeholder='Search tasks...'
                     onFocus={() => searchContainer.current.classList.toggle('selected')}
                     onBlur={() => searchContainer.current.classList.toggle('selected')}
                     onChange={e => {
                        setSearchValue(e.target.value)
                     }}
                     ref={searchInput}
                  ></input>
               </div>
               {searchValue && (
                  <div id='searchResultsBackgroundContainer' ref={searchResultsContainer}>
                     <div id='searchResultsContainer'>
                        <div id='noResults'>{`No Results for '${searchValue}'`}</div>
                        {tasks.map(task => {
                           if (
                              task.name.toLowerCase().includes(searchValue.toLowerCase())
                           ) {
                              return (
                                 <SearchResultItem
                                    name={task.name}
                                    key={`search${task.id}`}
                                    task={task}
                                    description={task.description}
                                    changeContent={changeContent}
                                 />
                              )
                           }
                        })}
                     </div>
                  </div>
               )}
            </div>
            <motion.div
               id='addButtonContainer'
               whileTap={{ scale: 0.9 }}
               onClick={() => !formOpen && setFormOpen(true)}
            >
               <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 512 512'
                  width='26'
                  height='26'
               >
                  <title>ionicons-v5-a</title>
                  <motion.line
                     variants={pathVariants}
                     id='addButton'
                     initial='initial'
                     animate='animate'
                     x1='256'
                     y1='256'
                     x2='400'
                     y2='256'
                     style={{
                        fill: 'none',
                        strokeLinecap: 'round',
                        strokeLinejoin: 'round',
                        strokeWidth: '32px',
                     }}
                  />
                  <motion.line
                     variants={pathVariants}
                     id='addButton'
                     initial='initial'
                     animate='animate'
                     x1='256'
                     y1='256'
                     x2='256'
                     y2='112'
                     style={{
                        fill: 'none',
                        strokeLinecap: 'round',
                        strokeLinejoin: 'round',
                        strokeWidth: '32px',
                     }}
                  />
                  <motion.line
                     variants={pathVariants}
                     id='addButton'
                     initial='initial'
                     animate='animate'
                     x1='256'
                     y1='256'
                     x2='112'
                     y2='256'
                     style={{
                        fill: 'none',
                        strokeLinecap: 'round',
                        strokeLinejoin: 'round',
                        strokeWidth: '32px',
                     }}
                  />
                  <motion.line
                     variants={pathVariants}
                     id='addButton'
                     initial='initial'
                     animate='animate'
                     x1='256'
                     y1='256'
                     x2='256'
                     y2='400'
                     style={{
                        fill: 'none',
                        strokeLinecap: 'round',
                        strokeLinejoin: 'round',
                        strokeWidth: '32px',
                     }}
                  />
               </svg>
            </motion.div>
         </div>
         <DarkModeButton />
         <Profile />
         <AnimatePresence initial={false} exitBeforeEnter onExitComplete={() => null}>
            {formOpen && (
               <Form
                  tasks={tasks}
                  addDataTask={addDataTask}
                  uniqueLists={uniqueLists}
                  handleClose={() => setFormOpen(false)}
               />
            )}
         </AnimatePresence>
      </nav>
   )
}

export default React.memo(Navbar)
