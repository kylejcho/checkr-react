import React from 'react'
import getDate from 'date-fns/getDate'
import { SidebarHome } from './SidebarHome'
import { SidebarLists } from './SidebarLists'
import { SidebarShortcuts } from './SidebarShortcuts'

function Sidebar({ changeContent, contentType, tasks }) {
   //Tab clicks changes ContentType state
   return (
      <>
         <div id='sidebar'>
            <SidebarHome changeContent={changeContent} contentType={contentType} />
            <SidebarShortcuts
               changeContent={changeContent}
               contentType={contentType}
               getDate={getDate}
               Date={Date}
            />
            <SidebarLists changeContent={changeContent} tasks={tasks} />
         </div>
      </>
   )
}
export default React.memo(Sidebar)
