import React, { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function TaskViewCheckCircle({ taskContainer, checkTask, complete, checkClickAnimation }) {
    function handleClick() {
        checkClickAnimation()
        if (document.querySelector('.taskViewContainer')) {
            document.querySelector('.taskViewContainer').classList.toggle('completed')
        }
        setTimeout(() => taskContainer.current.classList.toggle('completed'), 0); 
        setTimeout(() => checkTask(taskContainer.current.id), 300);
    }

    const pathVariants = {
        initial: {
            opacity: 0,
            pathLength: 0,
            stroke: "#3880ff"
        },
        animate: {
            stroke: complete ? ["#3880ff","#3880ff",'#979fac'] : '#979fac',
            scale: 1,
            opacity: complete ? 1 : 0,
            pathLength: complete ? 1 : 0,
            transition: {
                times: [0,0.9, 1],
                duration: 0.4,
                ease: "easeOut"
            }
        }
    }
    const svgVariants = {
        initial: {
            stroke: '#000',
        },
        animate: {
            stroke: '#979fac',
            pathLength: complete ? 1 : 0,
            transition: {
                delay: 0.6,
                duration: 0.3,
                ease: "easeInOut"
            }
        }
    }
    const circleVariants = {
        initial: {
            opacity: complete ? 1 : 0,
        },
        animate: {
            opacity: complete ? 1 : 0,
            transition: {
                delay: 0.6,
                duration: 0.3,
                ease: "easeInOut"
            }
        }
    }

    return (
        <AnimatePresence initial={false}>
        <div className="taskViewCheckContainer"
            onClick={(e) => {
                e.stopPropagation()
                handleClick()
            }}  
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 512 512">
                <title>ionicons-v5-e</title>
                <circle 
                    style={{
                        fill:'none',
                        stroke:'#000',
                        opacity: complete ? 0:1,
                        strokeLinecap:'round',
                        strokeLinejoin:'round',
                        strokeWidth:'40px'
                    }}
                    cx="256" cy="256" r="192" 
                />
                <motion.path
                    style={{fill:'#e9ebf1'}}
                    variants={circleVariants}
                    initial='initial'
                    animate='animate'
                    d="M256,464C141.31,464,48,370.69,48,256S141.31,48,256,48s208,93.31,208,208S370.69,464,256,464Z"
                />
                <motion.path
                    variants={svgVariants}
                    initial='initial'
                    animate='animate'
                    style={{
                        fill:'none',
                        strokeMiterlimit:'10',
                        strokeWidth:'40px'
                    }}
                    d="M448,256c0-106-86-192-192-192S64,150,64,256s86,192,192,192S448,362,448,256Z" 
                />
                <motion.polyline 
                    initial='initial'
                    animate='animate'
                    variants={pathVariants}
                    style={{
                        fill: 'none',
                        strokeLinecap:'round',
                        strokeLinejoin:'round',
                        strokeWidth:'40px'
                    }}
                    points="352 176 217.6 336 160 272" 
                />
            </svg>
        </div>
        </AnimatePresence>
    )
}