import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function InputListOptions({ tasks, openList, createList}) {
    const [searchValue, setSearchValue] = useState('')

    return (
        <AnimatePresence>
            {openList && (
                <motion.div 
                    id="inputListOptions"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    transition={{duration:0.2}}
                >
                    <input id="inputListTextArea" type="text" placeholder="Type a list" onClick={(e)=>e.stopPropagation()} onChange={e=>setSearchValue(e.target.value)}></input>
                    <div id="createListButton" onClick={()=>createList(searchValue)}>Create "{searchValue}"</div>
                    {tasks.map(task=>{
                        if (task.list && task.list.toLowerCase().includes(searchValue)) {
                            return <p className="inputListItem" id="SchoolList" key={task.list} onClick={()=>createList(task.list)}>{task.list}</p>
                        } 
                    })}
                </motion.div>
            )}
        </AnimatePresence>
  )
}
