// We are using react-bootstrap to show reusability and reduced hard-coding
// navigation component
import NavigationBar from "./components/NavigationBar.tsx";
// importing react-bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css'

// importing router
import { Route, Routes} from "react-router-dom";
import SignUp from "./pages/SignUp.tsx";

import AddStudentDetails from "./pages/AddStudentDetails.tsx";
import StudentDashboard from "./pages/StudentDashboard.tsx";
import RepresentativeDashBoard from "./pages/RepresentativeDashBoard.tsx";
import AddUniversity from "./pages/AddUniversity.tsx";
import AddCourse from "./formCards/AddCourse.tsx";
import HomePage from "./pages/HomePage.tsx";
// App is component where all components or the web application merge and form web application
// JSDoc comments.
function App() {


  return (
      <>
              <NavigationBar />
              <Routes>
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/" element={<HomePage />} />
                  <Route path="/addUniversity" element={<AddUniversity />} />
                  <Route path="/addCourse" element={<AddCourse />} />
                  <Route path="/addStudentDetails" element={<AddStudentDetails />} />
                  <Route path="/student-dashboard" element={<StudentDashboard /> } />
                  <Route path="/representative-dashboard" element={<RepresentativeDashBoard />} />
              </Routes>
      </>
  )
}//App()

//exporting to main
export default App
