import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Form from "./Form/Form";

export default function Navbar({ addTask }) {
    const [formOpen, setFormOpen] = useState(false);
    
    return (
        <nav id = "navbar">
            <div id="pageTitle">
                <ion-icon name="document-text-outline" class="logo"></ion-icon>
                <p>todo.</p>
            </div>
            <div id="searchAddContainer">
                <div id="searchContainer">
                    <div id="searchItemsContainer">
                        <ion-icon name="search-outline" id="searchIcon"></ion-icon>
                        <input id="searchBar" type="text" placeholder="Search tasks..."></input>
                    </div>
                    <div id="searchResultsContainer" className="hidden"></div>
                </div>
                <motion.div 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => !formOpen && setFormOpen(true)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" id="addButton" viewBox="0 0 512 512"><title>ionicons-v5-a</title>
                        <line x1="400" y1="256" x2="112" y2="256" style={{fill:'none',strokeLinecap:'round',strokeLinejoin:'round',strokeWidth:'32px'}}/>
                        <line x1="256" y1="112" x2="256" y2="400" style={{fill:'none',strokeLinecap:'round',strokeLinejoin:'round',strokeWidth:'32px'}}/>
                    </svg>
                </motion.div>
            </div>
            <div id="navSettingsContainer">
                <div id="darkLightModeContainer">
                    <ion-icon name="moon-outline"></ion-icon>
                </div>
                <div id="userProfileContainer">
                    <ion-icon name="person-circle-outline"></ion-icon>
                </div>
            </div>
            <AnimatePresence
                initial={false}
                exitBeforeEnter={true}
                onExitComplete={() => null}
            >
                {formOpen && <Form addTask={addTask} handleClose={()=>setFormOpen(false)}/>}
            </AnimatePresence>
        </nav>
    )
}