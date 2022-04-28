import React from "react";

export default function Sidebar({ changeContent }) {   
    
    function pickType(type) {
        changeContent(type)
    }
return (
    <>
        <div id="sidebar">
            <div id="sidebarHome" className="sidebarTab viewing">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512" style={{fill:'none',strokeLinecap:'round',strokeLinejoin:'round',strokeWidth:'32px'}}>
                <title>ionicons-v5-i</title>
                <path d="M80,212V448a16,16,0,0,0,16,16h96V328a24,24,0,0,1,24-24h80a24,24,0,0,1,24,24V464h96a16,16,0,0,0,16-16V212"/>
                <path d="M480,256,266.89,52c-5-5.28-16.69-5.34-21.78,0L32,256"/>
                <polyline points="400 179 400 64 352 64 352 133"/>
            </svg>
                <p>Home</p>
            </div>
            <p id = "sidebarShortcutsTitle" className="sidebarTitle">
                <svg id = "shortcutsArrow" className="sidebarArrow" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512">
                    <title>ionicons-v5-a</title>
                    <polyline points="112 184 256 328 400 184" style={{fill:'none',strokeLinecap:'round',strokeLinejoin:'round',strokeWidth:'50px'}}/>
                </svg>
                Shortcuts
            </p>
            <div id="sidebarShortcuts" className="sidebarTabsContainer">
                <div id="sidebarShortcutsToday" className="sidebarShortcut sidebarTab" onClick={()=>pickType('today')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512">
                        <rect fill="none" stroke="#697384" strokeLinejoin="round" strokeWidth="32" x="48" y="80" width="416" height="384" rx="48"/>
                        <line fill="none" stroke="#697384" strokeLinejoin="round" strokeWidth="32" strokeLinecap="round" x1="128" y1="48" x2="128" y2="80"/>
                        <line fill="none" stroke="#697384" strokeLinejoin="round" strokeWidth="32" strokeLinecap="round" x1="384" y1="48" x2="384" y2="80"/>
                        <line fill="none" stroke="#697384" strokeLinejoin="round" strokeWidth="32" strokeLinecap="round" x1="464" y1="160" x2="48" y2="160"/>
                        <text className = "todayIconNumber" x="50%" y="62%" textAnchor="middle" fill="#697384" fontSize="250px" fontFamily="Inter" textLength="55%" dy=".3em"></text>
                    </svg>
                    <p>Today</p>
                    <div className = "sidebarCount" id="todayCount"></div>
                </div>
                <div id="sidebarShortcutsWeek" className="sidebarShortcut sidebarTab" onClick={()=>pickType('week')}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512" stroke="#697384" fill="#697384">
                    <rect fill="none" strokeLinejoin="round" strokeWidth="32" x="48" y="80" width="416" height="384" rx="48"/>
                    <circle cx="296" cy="232" r="24"/>
                    <circle cx="376" cy="232" r="24"/>
                    <circle cx="296" cy="312" r="24"/>
                    <circle cx="376" cy="312" r="24"/>
                    <circle cx="136" cy="312" r="24"/>
                    <circle cx="216" cy="312" r="24"/>
                    <circle cx="136" cy="392" r="24"/>
                    <circle cx="216" cy="392" r="24"/>
                    <circle cx="296" cy="392" r="24"/>
                    <line fill="none" strokeLinejoin="round" strokeWidth="32" strokeLinecap="round" x1="128" y1="48" x2="128" y2="80"/>
                    <line fill="none" strokeLinejoin="round" strokeWidth="32" strokeLinecap="round" x1="384" y1="48" x2="384" y2="80"/>
                    <line fill="none" strokeLinejoin="round" strokeWidth="32" x1="464" y1="160" x2="48" y2="160"/>
                </svg>
                    <p>Next 7 Days</p>
                    <div className = "sidebarCount" id="weekCount"></div>
                </div>
                <div id="sidebarShortcutsAllTasks" className="sidebarShortcut sidebarTab" onClick={()=>pickType('all')}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512"><title>ionicons-v5-o</title>
                    <line x1="160" y1="144" x2="448" y2="144" style={{fill:'none',strokeLinecap:'round',strokeLinejoin:'round',strokeWidth:'32px'}}/>
                    <line x1="160" y1="256" x2="448" y2="256" style={{fill:'none',strokeLinecap:'round',strokeLinejoin:'round',strokeWidth:'32px'}}/>
                    <line x1="160" y1="368" x2="448" y2="368" style={{fill:'none',strokeLinecap:'round',strokeLinejoin:'round',strokeWidth:'32px'}}/>
                    <circle cx="80" cy="144" r="16" style={{fill:'none',strokeLinecap:'round',strokeLinejoin:'round',strokeWidth:'32px'}}/>
                    <circle cx="80" cy="256" r="16" style={{fill:'none',strokeLinecap:'round',strokeLinejoin:'round',strokeWidth:'32px'}}/>
                    <circle cx="80" cy="368" r="16" style={{fill:'none',strokeLinecap:'round',strokeLinejoin:'round',strokeWidth:'32px'}}/>
                </svg>
                    <p>All Tasks</p>
                    <div className = "sidebarCount" id="allCount"></div>
                </div>
            </div>
            <p id="sidebarListsTitle" className="sidebarTitle" onClick={()=>pickType('list')}>
                <svg id = "listsArrow" className="sidebarArrow" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512">
                    <title>ionicons-v5-a</title>
                    <polyline points="112 184 256 328 400 184" style={{fill:'none',strokeLinecap:'round',strokeLinejoin:'round',strokeWidth:'50px'}}/>
                </svg>
                Lists
            </p>
            <div id="sidebarLists" className="sidebarTabsContainer"></div>
            <div id="sidebarListsClose"></div>
        </div>
    </>
    )
}