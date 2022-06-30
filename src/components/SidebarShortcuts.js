import React, { useRef } from 'react'
import getDate from 'date-fns/getDate'
import { ShortCutsArrowIcon } from './iconComponents/ShortCutsArrowIcon'

export function SidebarShortcuts({ changeContent, contentType }) {
   const tabsContainer = useRef()
   return (
      <>
         <p id='sidebarShortcutsTitle' className='sidebarTitle'>
            <ShortCutsArrowIcon tabsContainer={tabsContainer} />
            Shortcuts
         </p>
         <div
            id='sidebarShortcuts'
            className={`sidebarTabsContainer`}
            ref={tabsContainer}
         >
            <div
               id='sidebarShortcutsToday'
               className='sidebarShortcut sidebarTab'
               onClick={() => changeContent('today')}
               style={{
                  color: contentType === 'today' && '#3880ff',
               }}
            >
               <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 512 512'
               >
                  <rect
                     fill='none'
                     stroke='#697384'
                     strokeLinejoin='round'
                     strokeWidth='32'
                     x='48'
                     y='80'
                     width='416'
                     height='384'
                     rx='48'
                     style={{
                        stroke: contentType === 'today' && '#3880ff',
                     }}
                  />
                  <line
                     fill='none'
                     stroke='#697384'
                     strokeLinejoin='round'
                     strokeWidth='32'
                     strokeLinecap='round'
                     x1='128'
                     y1='48'
                     x2='128'
                     y2='80'
                     style={{
                        stroke: contentType === 'today' && '#3880ff',
                     }}
                  />
                  <line
                     fill='none'
                     stroke='#697384'
                     strokeLinejoin='round'
                     strokeWidth='32'
                     strokeLinecap='round'
                     x1='384'
                     y1='48'
                     x2='384'
                     y2='80'
                     style={{
                        stroke: contentType === 'today' && '#3880ff',
                     }}
                  />
                  <line
                     fill='none'
                     stroke='#697384'
                     strokeLinejoin='round'
                     strokeWidth='32'
                     strokeLinecap='round'
                     x1='464'
                     y1='160'
                     x2='48'
                     y2='160'
                     style={{
                        stroke: contentType === 'today' && '#3880ff',
                     }}
                  />
                  <text
                     className='todayIconNumber'
                     x='50%'
                     y='62%'
                     textAnchor='middle'
                     fill='#697384'
                     fontSize='250px'
                     fontFamily='Inter'
                     textLength='55%'
                     dy='.3em'
                     style={{
                        fill: contentType === 'today' && '#3880ff',
                     }}
                  >
                     {getDate(new Date())}
                  </text>
               </svg>
               <p>Today</p>
               <div className='sidebarCount' id='todayCount'></div>
            </div>
            <div
               id='sidebarShortcutsWeek'
               className='sidebarShortcut sidebarTab'
               onClick={() => changeContent('week')}
               style={{
                  color: contentType === 'week' && '#3880ff',
               }}
            >
               <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 512 512'
                  stroke='#697384'
                  fill='#697384'
                  style={{
                     stroke: contentType === 'week' ? '#3880ff' : '#697384',
                     fill: contentType === 'week' ? '#3880ff' : '#697384',
                  }}
               >
                  <rect
                     fill='none'
                     strokeLinejoin='round'
                     strokeWidth='32'
                     x='48'
                     y='80'
                     width='416'
                     height='384'
                     rx='48'
                  />
                  <circle cx='296' cy='232' r='24' />
                  <circle cx='376' cy='232' r='24' />
                  <circle cx='296' cy='312' r='24' />
                  <circle cx='376' cy='312' r='24' />
                  <circle cx='136' cy='312' r='24' />
                  <circle cx='216' cy='312' r='24' />
                  <circle cx='136' cy='392' r='24' />
                  <circle cx='216' cy='392' r='24' />
                  <circle cx='296' cy='392' r='24' />
                  <line
                     fill='none'
                     strokeLinejoin='round'
                     strokeWidth='32'
                     strokeLinecap='round'
                     x1='128'
                     y1='48'
                     x2='128'
                     y2='80'
                  />
                  <line
                     fill='none'
                     strokeLinejoin='round'
                     strokeWidth='32'
                     strokeLinecap='round'
                     x1='384'
                     y1='48'
                     x2='384'
                     y2='80'
                  />
                  <line
                     fill='none'
                     strokeLinejoin='round'
                     strokeWidth='32'
                     x1='464'
                     y1='160'
                     x2='48'
                     y2='160'
                  />
               </svg>
               <p>Next 7 Days</p>
               <div className='sidebarCount' id='weekCount'></div>
            </div>
            <div
               id='sidebarShortcutsAllTasks'
               className='sidebarShortcut sidebarTab'
               onClick={() => changeContent('all')}
               style={{
                  color: contentType === 'all' && '#3880ff',
               }}
            >
               <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 512 512'
                  style={{
                     stroke: contentType === 'all' && '#3880ff',
                  }}
               >
                  <title>ionicons-v5-o</title>
                  <line
                     x1='160'
                     y1='144'
                     x2='448'
                     y2='144'
                     style={{
                        fill: 'none',
                        strokeLinecap: 'round',
                        strokeLinejoin: 'round',
                        strokeWidth: '32px',
                     }}
                  />
                  <line
                     x1='160'
                     y1='256'
                     x2='448'
                     y2='256'
                     style={{
                        fill: 'none',
                        strokeLinecap: 'round',
                        strokeLinejoin: 'round',
                        strokeWidth: '32px',
                     }}
                  />
                  <line
                     x1='160'
                     y1='368'
                     x2='448'
                     y2='368'
                     style={{
                        fill: 'none',
                        strokeLinecap: 'round',
                        strokeLinejoin: 'round',
                        strokeWidth: '32px',
                     }}
                  />
                  <circle
                     cx='80'
                     cy='144'
                     r='16'
                     style={{
                        fill: 'none',
                        strokeLinecap: 'round',
                        strokeLinejoin: 'round',
                        strokeWidth: '32px',
                     }}
                  />
                  <circle
                     cx='80'
                     cy='256'
                     r='16'
                     style={{
                        fill: 'none',
                        strokeLinecap: 'round',
                        strokeLinejoin: 'round',
                        strokeWidth: '32px',
                     }}
                  />
                  <circle
                     cx='80'
                     cy='368'
                     r='16'
                     style={{
                        fill: 'none',
                        strokeLinecap: 'round',
                        strokeLinejoin: 'round',
                        strokeWidth: '32px',
                     }}
                  />
               </svg>
               <p>All Tasks</p>
               <div className='sidebarCount' id='allCount'></div>
            </div>
         </div>
      </>
   )
}
