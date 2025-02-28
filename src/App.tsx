// We are using react-bootstrap to show reusability and reduced hard-coding
// navigation component
import NavigationBar from "./components/NavigationBar.tsx";
// importing react-bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css'

// importing router
import { Route, Routes} from "react-router-dom";
import SignUp from "./pages/SignUp.tsx";
// App is component where all components or the web application merge and form web application
function App() {


  return (
      <>
              <NavigationBar />
              <Routes>
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/" element={<h2 className="text-center mt-5">Welcome to University Assistance</h2>} />
              </Routes>
      </>
  )
}//App()

//exporting to main
export default App
