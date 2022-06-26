import React from 'react'
import { motion } from 'framer-motion'

export default function LoadingScreen({}) {
   return (
      <motion.div
         id='loadingScreen'
         initial={{
            opacity: 0,
         }}
         animate={{
            opacity: 1,
         }}
         exit={{
            opacity: 0,
            transition: {
               duration: 0.25,
            },
         }}
         transition={{
            duration: 0.6,
         }}
      >
         <div id='loadingScreenLogoContainer'>
            <svg
               xmlns='http://www.w3.org/2000/svg'
               width='512'
               height='512'
               viewBox='0 0 512 512'
            >
               <title>ionicons-v5-k</title>
               <path
                  d='M416,221.25V416a48,48,0,0,1-48,48H144a48,48,0,0,1-48-48V96a48,48,0,0,1,48-48h98.75a32,32,0,0,1,22.62,9.37L406.63,198.63A32,32,0,0,1,416,221.25Z'
                  style={{
                     fill: 'none',
                     stroke: '#3880ff',
                     strokeLinejoin: 'round',
                     strokeWidth: '50px',
                  }}
               />
               <path
                  d='M256,56V176a32,32,0,0,0,32,32H408'
                  style={{
                     fill: 'none',
                     stroke: '#3880ff',
                     strokeLinecap: 'round',
                     strokeLinejoin: 'round',
                     strokeWidth: '50px',
                  }}
               />
               <line
                  x1='176'
                  y1='288'
                  x2='336'
                  y2='288'
                  style={{
                     fill: 'none',
                     stroke: '#3880ff',
                     strokeLinecap: 'round',
                     strokeLinejoin: 'round',
                     strokeWidth: '50px',
                  }}
               />
               <line
                  x1='176'
                  y1='368'
                  x2='336'
                  y2='368'
                  style={{
                     fill: 'none',
                     stroke: '#3880ff',
                     strokeLinecap: 'round',
                     strokeLinejoin: 'round',
                     strokeWidth: '50px',
                  }}
               />
            </svg>
            <p>checkr.</p>
         </div>
         <div id='loadingCircle'></div>
      </motion.div>
   )
}
