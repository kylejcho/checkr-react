import React from 'react'
export function HomeIcon({ contentType }) {
   return (
      <svg
         xmlns='http://www.w3.org/2000/svg'
         width='24'
         height='24'
         viewBox='0 0 512 512'
         style={{
            fill: 'none',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            strokeWidth: '32px',
            stroke: contentType === 'home' ? '#3880ff' : '#697384',
         }}
      >
         <title>ionicons-v5-i</title>
         <path d='M80,212V448a16,16,0,0,0,16,16h96V328a24,24,0,0,1,24-24h80a24,24,0,0,1,24,24V464h96a16,16,0,0,0,16-16V212' />
         <path d='M480,256,266.89,52c-5-5.28-16.69-5.34-21.78,0L32,256' />
         <polyline points='400 179 400 64 352 64 352 133' />
      </svg>
   )
}
