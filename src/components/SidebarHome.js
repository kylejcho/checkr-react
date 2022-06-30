import React from 'react'
import { HomeIcon } from './iconComponents/HomeIcon'

export function SidebarHome({ changeContent, contentType }) {
   return (
      <div
         id='sidebarHome'
         className='sidebarTab'
         onClick={() => changeContent('home')}
         style={{
            color: contentType === 'home' && '#3880ff',
         }}
      >
         <HomeIcon contentType={contentType} />
         <p>Home</p>
      </div>
   )
}
