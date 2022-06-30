import React, { useRef } from 'react'

export function ShortCutsArrowIcon({ tabsContainer }) {
   const arrow = useRef()
   function handleClick() {
      arrow.current.classList.toggle('collapse')
      tabsContainer.current.classList.toggle('collapse')
   }

   return (
      <svg
         id='shortcutsArrow'
         className='sidebarArrow'
         xmlns='http://www.w3.org/2000/svg'
         width='24'
         height='24'
         viewBox='0 0 512 512'
         onClick={handleClick}
         ref={arrow}
      >
         <title>ionicons-v5-a</title>
         <polyline
            points='112 184 256 328 400 184'
            style={{
               fill: 'none',
               strokeLinecap: 'round',
               strokeLinejoin: 'round',
               strokeWidth: '50px',
            }}
         />
      </svg>
   )
}
