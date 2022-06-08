import React from "react";
import { Route, Routes } from "react-router-dom";
import SidebarContentContainer from "./components/SidebarContentContainer";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import { AuthContextProvider} from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  
/* useEffect(() => {setTasks([
      {name: 'Coffee with friend', description: 'Starbucks', dueDate: endOfDay(new Date()), list: 'Personal', complete: false, id: uuidv4()},
      {name: 'Exercise', description: 'Workout out for 45 minutes', dueDate: endOfDay(new Date()), list: 'Personal', complete: false, id: uuidv4()},
      {name: 'Learn sign language', description: 'Practice english alphabet', dueDate: endOfDay(new Date()), list: 'Personal', complete: false,  id: uuidv4()}, 
      {name: 'Exercise', description: 'Workout out for 45 minutes', dueDate: addDays(endOfDay(new Date()), 1), list: 'Personal', complete: false, id: uuidv4()},
      {name: 'Read Animal Farm', description: 'Read two chapter', dueDate: addDays(endOfDay(new Date()), 1), list: 'Reading', complete: false, id: uuidv4()}, 
      {name: 'Job interview', description: 'Do these thingies', dueDate: addDays(endOfDay(new Date()), 1), list: null, complete: false, id: uuidv4()},
      {name: 'Learn sign language', description: 'Practice english alphabet', dueDate: addDays(endOfDay(new Date()), 1), list: 'Personal', complete: false,  id: uuidv4()}, 
      {name: 'Birthday party', description: 'Do this', dueDate: addDays(endOfDay(new Date()), 2), list: null, complete: false,  id: uuidv4()},
      {name: 'Go for a jog with friends', description: 'Do this', dueDate: addDays(endOfDay(new Date()), 2), list: null, complete: false,  id: uuidv4()}, 
      {name: 'Painting', description: 'Do this', dueDate: addDays(endOfDay(new Date()), 3), list: null, complete: false,  id: uuidv4()},
      {name: 'Weight training', description: 'Do this', dueDate: addDays(endOfDay(new Date()), 4), list: null, complete: false,  id: uuidv4()},
      {name: 'Read Animal Farm', description: 'Do this', dueDate: addDays(endOfDay(new Date()), 4), list: null, complete: false,  id: uuidv4()},
      {name: 'Baking class', description: 'Bring homemade pie', dueDate: endOfDay(new Date()), list: 'School', complete: true, id: uuidv4()}])
  },[])*/

    return (
      <AuthContextProvider>
        <Routes>
          <Route path='checkr-react/' element={<Signin />} />
          <Route path='checkr-react/signup' element={<Signup />} />
            <Route path='/checkr-react/home' element={<ProtectedRoute>
              <SidebarContentContainer />
            </ProtectedRoute>} />
        </Routes>
      </AuthContextProvider>
    )
}
