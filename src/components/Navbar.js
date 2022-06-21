import React, { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Form from './Form/Form'
import DarkModeButton from './DarkModeButton'
import { ReactComponent as Logo } from '../icons/document-text-outline.svg'
import { ReactComponent as User } from '../icons/user.svg'
import { ReactComponent as Settings } from '../icons/settings.svg'
import { ReactComponent as Logout } from '../icons/logout.svg'
import { ReactComponent as SearchIcon } from '../icons/search-outline.svg'
import { UserAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import SearchResultItem from './SearchResultItem'

function Navbar({
   tasks,
   uniqueLists,
   addDataTask,
   changeContent,
   contentType,
   viewTask,
}) {
   const [formOpen, setFormOpen] = useState(false)
   const [profileOpen, setProfileOpen] = useState(false)
   const [searchValue, setSearchValue] = useState('')

   const searchResultsContainer = useRef()
   const searchContainer = useRef()
   const searchInput = useRef()

   //Unfocus from searchbar if outside is clicked
   function useOutsideDetection() {
      useEffect(() => {
         const handleClickOutside = (e) => {
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
      }, [searchResultsContainer, searchContainer, tasks, contentType])
   }

   useOutsideDetection(searchResultsContainer)

   const result = async (e) => {
      const taskId = e.target.id.slice(6)
      const resultTask = tasks.filter((task) => {
         console.log(task.id)
         console.log(taskId)
         if (task.id === taskId) {
            return task
         }
      })
      if (contentType !== 'all' && contentType !== 'home') {
         await changeContent('all')
         setTimeout(() => {
            setTimeout(() => {
               viewTask(...resultTask)
            }, 200)
            document
               .querySelectorAll('.taskContainer')
               .forEach((taskContainer) => {
                  taskContainer.classList.remove('viewing')
               })
            document.querySelector(`#${taskId}`).classList.add('viewing')
         }, 300)
      } else {
         setTimeout(() => {
            viewTask(...resultTask)
            document
               .querySelectorAll('.taskContainer')
               .forEach((taskContainer) => {
                  taskContainer.classList.remove('viewing')
               })
            document.querySelector(`#${taskId}`).classList.add('viewing')
         }, 150)
      }
   }

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

   const { user, logout } = UserAuth()
   const navigate = useNavigate()

   const handleLogout = async () => {
      try {
         await logout()
         navigate('/')
      } catch (e) {
         console.log(e.message)
      }
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
                     onFocus={() =>
                        searchContainer.current.classList.toggle('selected')
                     }
                     onBlur={() =>
                        searchContainer.current.classList.toggle('selected')
                     }
                     onChange={(e) => {
                        setSearchValue(e.target.value)
                     }}
                     ref={searchInput}
                  ></input>
               </div>
               {searchValue && (
                  <div
                     id='searchResultsBackgroundContainer'
                     ref={searchResultsContainer}
                  >
                     <div id='searchResultsContainer'>
                        <div id='noResults'>{`No Results for '${searchValue}'`}</div>
                        {tasks.map((task) => {
                           if (
                              task.name
                                 .toLowerCase()
                                 .includes(searchValue.toLowerCase())
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
         <div
            id='profileContainer'
            onClick={() => setProfileOpen(!profileOpen)}
         >
            <svg
               xmlns='http://www.w3.org/2000/svg'
               width='22'
               height='22'
               viewBox='0 0 512 512'
            >
               <title>ionicons-v5-j</title>
               <path d='M258.9,48C141.92,46.42,46.42,141.92,48,258.9,49.56,371.09,140.91,462.44,253.1,464c117,1.6,212.48-93.9,210.88-210.88C462.44,140.91,371.09,49.56,258.9,48ZM385.32,375.25a4,4,0,0,1-6.14-.32,124.27,124.27,0,0,0-32.35-29.59C321.37,329,289.11,320,256,320s-65.37,9-90.83,25.34a124.24,124.24,0,0,0-32.35,29.58,4,4,0,0,1-6.14.32A175.32,175.32,0,0,1,80,259C78.37,161.69,158.22,80.24,255.57,80S432,158.81,432,256A175.32,175.32,0,0,1,385.32,375.25Z' />
               <path d='M256,144c-19.72,0-37.55,7.39-50.22,20.82s-19,32-17.57,51.93C191.11,256,221.52,288,256,288s64.83-32,67.79-71.24c1.48-19.74-4.8-38.14-17.68-51.82C293.39,151.44,275.59,144,256,144Z' />
            </svg>
            <AnimatePresence
               initial={false}
               exitBeforeEnter
               onExitComplete={() => null}
            >
               {profileOpen && (
                  <motion.div
                     id='profileOptionsContainer'
                     onClick={() => setProfileOpen(false)}
                  >
                     <motion.div
                        id='profileOptions'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                     >
                        <div className='profileOption'>
                           <User className='userSVG' />
                           Profile
                        </div>
                        <div className='profileOption'>
                           <Settings className='settingsSVG' />
                           Settings
                        </div>
                        <div
                           id='logoutOption'
                           className='profileOption'
                           onClick={handleLogout}
                        >
                           <Logout className='settingsSVG' />
                           Log out
                        </div>
                     </motion.div>
                  </motion.div>
               )}
            </AnimatePresence>
         </div>
         <AnimatePresence
            initial={false}
            exitBeforeEnter
            onExitComplete={() => null}
         >
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
