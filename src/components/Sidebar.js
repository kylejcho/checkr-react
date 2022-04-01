import React from "react";

export default function Sidebar() {
return (
    <>
        <div id="sidebar">
            <div id="sidebarHome" className="sidebarTab viewing">
                <ion-icon name="home-outline"></ion-icon>
                <p>Home</p>
            </div>
            <p id = "sidebarShortcutsTitle" className="sidebarTitle"><ion-icon name="chevron-down-outline" id = "shortcutsArrow" className="sidebarArrow"></ion-icon>Shortcuts</p>
            <div id="sidebarShortcuts" className="sidebarTabsContainer">
                <div id="sidebarShortcutsToday" className="sidebarShortcut sidebarTab">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512"><rect fill="none" stroke="#697384" strokeLinejoin="round" strokeWidth="32" x="48" y="80" width="416" height="384" rx="48"/><line fill="none" stroke="#697384" strokeLinejoin="round" strokeWidth="32" strokeLinecap="round" x1="128" y1="48" x2="128" y2="80"/><line fill="none" stroke="#697384" strokeLinejoin="round" strokeWidth="32" strokeLinecap="round" x1="384" y1="48" x2="384" y2="80"/><line fill="none" stroke="#697384" strokeLinejoin="round" strokeWidth="32" strokeLinecap="round" x1="464" y1="160" x2="48" y2="160"/><text className = "todayIconNumber" x="50%" y="62%" textAnchor="middle" fill="#697384" fontSize="250px" fontFamily="Inter" textLength="55%" dy=".3em"></text></svg>
                    <p>Today</p>
                    <div className = "sidebarCount" id="todayCount"></div>
                </div>
                <div id="sidebarShortcutsWeek" className="sidebarShortcut sidebarTab">
                    <ion-icon name="calendar-outline"></ion-icon>
                    <p>Next 7 Days</p>
                    <div className = "sidebarCount" id="weekCount"></div>
                </div>
                <div id="sidebarShortcutsAllTasks" className="sidebarShortcut sidebarTab">
                    <ion-icon name="list-outline"></ion-icon>
                    <p>All Tasks</p>
                    <div className = "sidebarCount" id="allCount"></div>
                </div>
            </div>
            <p id="sidebarListsTitle" className="sidebarTitle"><ion-icon name="chevron-down-outline" id = "listsArrow" className="sidebarArrow"></ion-icon>Lists</p>
            <div id="sidebarLists" className="sidebarTabsContainer"></div>
            <div id="sidebarListsClose"></div>
        </div>
    </>
    )
}