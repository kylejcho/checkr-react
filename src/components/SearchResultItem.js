import React from 'react'

export default function SearchResultItem({ name, description }) {
   return (
      <div className='searchResultItem' id='search4'>
         <div className='searchResultCircle'>
            <svg
               xmlns='http://www.w3.org/2000/svg'
               width='16'
               height='16'
               viewBox='0 0 512 512'
            >
               <title>ionicons-v5-q</title>
               <circle
                  cx='256'
                  cy='256'
                  r='192'
                  style={{
                     fill: 'none',
                     strokeLinecap: 'round',
                     strokeLinejoin: 'round',
                     strokeWidth: '32px',
                  }}
               ></circle>
            </svg>
         </div>
         <p className='searchResultName'>{name}</p>
         <p className='searchResultDescription'>{description}</p>
         <div className='searchResultArrow'>
            <svg
               xmlns='http://www.w3.org/2000/svg'
               width='24'
               height='24'
               viewBox='0 0 512 512'
            >
               <title>ionicons-v5-a</title>
               <polyline
                  points='262.62 336 342 256 262.62 176'
                  style={{
                     fill: 'none',
                     stroke: '#3880ff',
                     strokeLinecap: 'round',
                     strokeLinejoin: 'round',
                     strokeWidth: '32px',
                  }}
               ></polyline>
               <line
                  x1='330.97'
                  y1='256'
                  x2='170'
                  y2='256'
                  style={{
                     fill: 'none',
                     stroke: '#3880ff',
                     strokeLinecap: 'round',
                     strokeLinejoin: 'round',
                     strokeWidth: '32px',
                  }}
               ></line>
               <path
                  d='M256,448c106,0,192-86,192-192S362,64,256,64,64,150,64,256,150,448,256,448Z'
                  style={{
                     fill: 'none',

                     strokeMiterlimit: '10',
                     strokeWidth: '32p',
                  }}
               ></path>
            </svg>
         </div>
      </div>
   )
}
