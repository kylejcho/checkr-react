import React, { useEffect, useState } from 'react'
import LightModeSVG from './LightModeSVG'

export default function DarkModeButton() {
   const [dark, setDark] = useState()

   useEffect(() => {
      if (localStorage.getItem('theme') === 'dark') {
         setDark(true)
      }
   })

   function toggleDarkMode() {
      if (dark) {
         document.body.classList.replace('dark', 'light')
         localStorage.setItem('theme', 'light')
         setDark(null)
      } else {
         document.body.classList.replace('light', 'dark')
         localStorage.setItem('theme', 'dark')
         setDark(true)
      }
   }

   return (
      <div id='darkModeContainer' onClick={toggleDarkMode}>
         <LightModeSVG dark={dark} />
      </div>
   )
}
