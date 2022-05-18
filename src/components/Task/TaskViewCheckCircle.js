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
        },
        animate: {
            stroke: '#979fac',
            scale: 2,
            opacity: complete ? 1 : 0,
            pathLength: complete ? 1 : 0,
            transition: {
                times: [0,0.7, 1],
                duration: 0.4,
                ease: "easeOut"
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