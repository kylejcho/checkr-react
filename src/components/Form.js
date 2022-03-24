export default function Form() {
    return (
        <div id="taskFormContainer" style={{visibility: 'visible'}}>
            <div id="taskForm" style={{opacity: '1', transform: 'scale(1)'}}>
                <input id="inputTaskName" type="text" placeholder="I want to..." required=""></input>
                <textarea id="inputTaskDescription" name="description" rows="2" placeholder="Description..."></textarea>
                <div id="inputDueDateContainer">
                    <div className="inputDueDate selected" id="inputToday"><ion-icon name="calendar-number-outline" role="img" className="md hydrated" aria-label="calendar number outline"></ion-icon>Today</div>
                    <div className="inputDueDate" id="inputTomorrow"><ion-icon name="today-outline" role="img" className="md hydrated" aria-label="today outline"></ion-icon>Tomorrow</div>
                    <div id="inputCalendarContainer">
                        <div id="inputCalendar">
                            <ion-icon name="calendar-clear-outline" role="img" className="md hydrated" aria-label="calendar clear outline"></ion-icon>
                            <p id="dateSelection">Pick Date</p>
                        </div>
                        <div id="inputCalendarOptions">
                            <div id="calendarHeader">
                                <div id="calendarMonth">Mar 2022</div>
                                <div id="calendarArrowContainer">
                                    <ion-icon id="backMonthIcon" name="chevron-back-outline" role="img" className="md hydrated" aria-label="chevron back outline"></ion-icon>
                                    <ion-icon id="forwardMonthIcon" name="chevron-forward-outline" role="img" className="md hydrated" aria-label="chevron forward outline"></ion-icon>
                                </div>
                            </div>
                            <div id="daysOfWeek">
                                <div>S</div>
                                <div>M</div>
                                <div>T</div>
                                <div>W</div>
                                <div>T</div>
                                <div>F</div>
                                <div>S</div>
                            </div>
                            <div id="calendar">
                            <div className="calendarBlank"></div><div className="calendarBlank"></div><div className="calendarDayPast">1</div><div className="calendarDayPast">2</div><div className="calendarDayPast">3</div><div className="calendarDayPast">4</div><div className="calendarDayPast">5</div><div className="calendarDayPast">6</div><div className="calendarDayPast">7</div><div className="calendarDayPast">8</div><div className="calendarDayPast">9</div><div className="calendarDayPast">10</div><div className="calendarDayPast">11</div><div className="calendarDayPast">12</div><div className="calendarDayPast">13</div><div className="calendarDayPast">14</div><div className="calendarDayPast">15</div><div className="calendarDayPast">16</div><div className="calendarDayPast">17</div><div className="calendarDayPast">18</div><div className="calendarDayPast">19</div><div className="calendarDayPast">20</div><div className="calendarDayPast">21</div><div className="calendarDayPast">22</div><div className="calendarDay">23</div><div className="calendarDay">24</div><div className="calendarDay">25</div><div className="calendarDay">26</div><div className="calendarDay">27</div><div className="calendarDay">28</div><div className="calendarDay">29</div><div className="calendarDay">30</div><div className="calendarDay">31</div></div>
                        </div>
                    </div>
                    <div id="inputListContainer">
                        <div id="inputList">
                            <div className="dot"></div>
                            <p id="listSelectionName">Add to list</p>
                        </div>
                        <div id="inputListOptions">
                            <input id="inputListTextArea" type="text" placeholder="Type a list"></input>
                            <div id="createListButton" className="hidden"></div>
                        <p className="inputListItem" id="SchoolList">School</p><p className="inputListItem" id="ReadingList">Reading</p><p className="inputListItem" id="PersonalList">Personal</p></div>
                    </div>
                </div>
                <button id="taskFormAddButton"><ion-icon name="arrow-forward-circle-outline" role="img" className="md hydrated" aria-label="arrow forward circle outline"></ion-icon>Add task</button>
            </div>
        </div>
    )
}