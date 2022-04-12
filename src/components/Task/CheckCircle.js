import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ReactComponent as CheckCircleEmptyIcon } from "../../icons/checkCircleEmpty.svg"
import { ReactComponent as CheckCircleIcon } from "../../icons/checkmark-circle.svg"

export default function CheckCircle({ task, taskContainer, checkTask }) {
    useEffect(()=>{
        taskContainer.current.classList.toggle('completed', task.complete);
    },[])

    const [complete, setComplete] = useState(task.complete)

    function handleClick() {
        setComplete(!complete)

        setTimeout(() => checkTask(taskContainer.current.id), 200);
        setTimeout(() => taskContainer.current.classList.toggle('completed'),0); 
    }

    const pathVariants = {
        initial: {
            opacity: 0,
            pathLength : 0
        },
        animate: {
            opacity: complete ? 1 : 0,
            pathLength: complete ? 1 : 0,
            transition: {
                duration: 0.3,
                ease: "easeInOut"
            }
        }
    }

    return (
        <div className="checkContainer" onClick={handleClick}>
            <motion.svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 512">
                <title>ionicons-v5-e</title>
                <path
                    d="M448,256c0-106-86-192-192-192S64,150,64,256s86,192,192,192S448,362,448,256Z" style={{fill:'none',stroke:'#000',strokeMiterlimit:'10',strokeWidth:'40px'}}
                />
                <motion.polyline 
                    variants={pathVariants}
                    initial='initial'
                    animate='animate'
                    points="352 176 217.6 336 160 272" style={{fill:'none',stroke:'#000',strokeLinecap:'round',strokeLinejoin:'round',strokeWidth:'40px'}}
                />
            </motion.svg>
        </div>
    )
}