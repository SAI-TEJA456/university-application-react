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
import AddUniversity from "./formCards/AddUniversity.tsx";
import AddCourse from "./formCards/AddCourse.tsx";
// App is component where all components or the web application merge and form web application
function App() {


  return (
      <>
              <NavigationBar />
              <Routes>
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/" element={<h2 className="text-center mt-5">Welcome to University Assistance</h2>} />
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
