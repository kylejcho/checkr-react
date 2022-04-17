import React, { useEffect } from "react";
import { motion } from "framer-motion";

export default function TaskView(task) {

    useEffect(() => {
      console.log(task)
    }, [])
    

    return (
        <motion.div className="taskViewContainer" id={'taskView' + task.id} >
            <div className="taskViewNameContainer">
                <div className="taskViewCheckContainer completed" >
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 512 512">
                        <title>ionicons-v5-e</title>
                        <path d="M256,48C141.31,48,48,141.31,48,256s93.31,208,208,208,208-93.31,208-208S370.69,48,256,48ZM364.25,186.29l-134.4,160a16,16,0,0,1-12,5.71h-.27a16,16,0,0,1-11.89-5.3l-57.6-64a16,16,0,1,1,23.78-21.4l45.29,50.32L339.75,165.71a16,16,0,0,1,24.5,20.58Z"></path>
                    </svg>
                </div>
                <p className="taskViewName completed">PHYS231 homework assignment</p>
            </div>
            <div className="taskViewDescriptionContainer">
                Description:
                <p className="taskViewDescription">Chapter 14, questions 1-13</p>
            </div>
            <div className="taskViewDueDateContainer">
                Due:
                <div className="taskViewDueDate">Today 
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 512 512"><title>ionicons-v5-b</title><path d="M190.06,414,353.18,274.22a24,24,0,0,0,0-36.44L190.06,98c-15.57-13.34-39.62-2.28-39.62,18.22V395.82C150.44,416.32,174.49,427.38,190.06,414Z"></path></svg> 
                     Sunday, April 17th, 2022
                </div>
            </div>
            <div className="taskViewListContainer">
                List:
                <div className="taskViewList">
                    <div className="dot"></div>
                </div>
            </div>
        </motion.div>
    )
}