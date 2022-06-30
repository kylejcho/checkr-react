import React, { useState, useEffect, useRef } from 'react'
import { ShortCutsArrowIcon } from './iconComponents/ShortCutsArrowIcon'

export function SidebarLists({ tasks, changeContent }) {
   const [uniqueLists, setUniqueLists] = useState([])
   const tabsContainer = useRef()

   //Create a new array of unique lists on tasks state changes
   useEffect(() => {
      setUniqueLists([...new Set(tasks.map(task => task.list))])
   }, [tasks])

   //Render list tabs from uniqueLists array state
   return (
      <>
         <p id='sidebarListsTitle' className='sidebarTitle'>
            <ShortCutsArrowIcon tabsContainer={tabsContainer} />
            Lists
         </p>
         <div id='sidebarListsContainer'>
            <div id='sidebarLists' className={`sidebarTabsContainer`} ref={tabsContainer}>
               {uniqueLists.map(list => {
                  if (list) {
                     return (
                        <div
                           className='sidebarListContainer sidebarTab'
                           key={list + 'Container'}
                           onClick={() => changeContent(list)}
                        >
                           <div className='dot'></div>
                           <p>{list}</p>
                        </div>
                     )
                  }
               })}
            </div>
         </div>
      </>
   )
}
