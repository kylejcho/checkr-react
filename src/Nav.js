import React from "react";
import './index.css'

export default function Nav() {
    return (
        <>
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
                        <div id="searchResultsContainer" class="hidden"></div>
                    </div>
                    <ion-icon name="add-outline" id="addButton"></ion-icon>
                </div>
                <div id="navSettingsContainer">
                    <div id="darkLightModeContainer">
                        <ion-icon name="moon-outline"></ion-icon>
                    </div>
                    <div id="userProfileContainer">
                        <ion-icon name="person-circle-outline"></ion-icon>
                    </div>
                </div>
            </nav>
        </>
    )
}