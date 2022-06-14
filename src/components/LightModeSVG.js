import React from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'

export default function LightModeSVG({ dark }) {
   const pathLength = useMotionValue(0)
   const opacity = useTransform(pathLength, [0, 0.5], [0, 1])

   return (
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
         <title>Toggle light mode</title>
         <motion.path
            initial={{
               opacity: 0,
               pathLength: dark ? 1 : 0,
            }}
            animate={{
               opacity: dark ? 0 : [0, 1, 1],
               pathLength: dark ? 0 : 1,
               transition: {
                  delay: dark ? 0 : 0.5,
                  duration: 0.6,
               },
            }}
            fill='none'
            strokeLinecap='round'
            strokeMiterlimit='10'
            strokeWidth='32'
            d='M256 48v48M256 416v48M403.08 108.92l-33.94 33.94M142.86 369.14l-33.94 33.94M464 256h-48M96 256H48M403.08 403.08l-33.94-33.94M142.86 142.86l-33.94-33.94'
         />
         <motion.circle
            initial={{
               pathLength: dark ? 1 : 0,
            }}
            animate={{
               opacity: dark ? [1, 1, 0] : [0, 1, 1],
               pathLength: dark ? 0 : 1,
               transition: {
                  delay: dark ? 0.2 : 0.3,
                  duration: 0.4,
               },
            }}
            cx='256'
            cy='256'
            r='80'
            fill='none'
            strokeLinecap='round'
            strokeMiterlimit='10'
            strokeWidth='32'
         />
         <motion.path
            initial={{
               pathLength: dark ? 0 : 1,
            }}
            animate={{
               opacity: dark ? 1 : [1, 1, 0],
               pathLength: dark ? 1 : 0,
               transition: {
                  delay: dark ? 0.4 : 0,
                  duration: 0.6,
               },
            }}
            d='M160,136c0-30.62,4.51-61.61,16-88C99.57,81.27,48,159.32,48,248c0,119.29,96.71,216,216,216,88.68,0,166.73-51.57,200-128-26.39,11.49-57.38,16-88,16C256.71,352,160,255.29,160,136Z'
            style={{
               fill: 'none',
               strokeLinecap: 'round',
               strokeLinejoin: 'round',
               strokeWidth: '40px',
            }}
         />
      </svg>
   )
}
