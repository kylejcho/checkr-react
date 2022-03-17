import React from "react";

export default function Task({ task }) {
    return (
        <div className="taskContainer" id="task.id" style={{opacity: '1'}}>
            <div className="checkContainer">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 512">
                    <title>ionicons-v5-q</title>
                    <circle cx="256" cy="256" r="192" style={{fill:'none',stroke:'#000',strokeLineCap:'round',strokeLineJoin:'round',strokeWidth:'32px'}}/>
                </svg>
            </div>
            <div className="nameContainer">{task.name}</div>
            <div className="deleteContainer">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 512">
                    <title>ionicons-v5-m</title>
                    <path d="M256,48C141.31,48,48,141.31,48,256s93.31,208,208,208,208-93.31,208-208S370.69,48,256,48Zm75.31,260.69a16,16,0,1,1-22.62,22.62L256,278.63l-52.69,52.68a16,16,0,0,1-22.62-22.62L233.37,256l-52.68-52.69a16,16,0,0,1,22.62-22.62L256,233.37l52.69-52.68a16,16,0,0,1,22.62,22.62L278.63,256Z"></path>
                </svg>
            </div>
            <div className="descriptionContainer">{task.description}</div>
        </div>
    )
}