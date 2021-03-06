import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function DarkModeSVG({ dark, toggleDarkMode }) {
   return (
      <div id='darkModeContainer' onClick={toggleDarkMode}>
         <svg
            xmlns='http://www.w3.org/2000/svg'
            width='22'
            height='22'
            viewBox='0 0 512 512'
         >
            <title>Toggle dark mode</title>
            <motion.path
               initial={{
                  pathLength: 0,
               }}
               animate={{
                  transition: {
                     delay: 0.6,
                  },
                  pathLength: 1,
               }}
               exit={{ pathLength: 0 }}
               transition={{
                  duration: 1,
                  ease: 'easeInOut',
               }}
               d='M160,136c0-30.62,4.51-61.61,16-88C99.57,81.27,48,159.32,48,248c0,119.29,96.71,216,216,216,88.68,0,166.73-51.57,200-128-26.39,11.49-57.38,16-88,16C256.71,352,160,255.29,160,136Z'
               style={{
                  fill: 'none',
                  pathLength: 0,
                  strokeLinecap: 'round',
                  strokeLinejoin: 'round',
                  strokeWidth: '40px',
               }}
            />
         </svg>
      </div>
   )
}
