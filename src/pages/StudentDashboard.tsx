//get some icon and show it has student dashboard icon
//this dahboard will appear when student try to sign in/up

// import {useState} from "react";
import {Container} from "react-bootstrap";
import {Link} from "react-router-dom";
function StudentDashboard() {
   // const [studentName] = useState("Test name");
   // const [addStudent, setAddStudent] = useState(false);
   return (
      <>
         <Container className="mt-5 pt-3">
            <Link type="button" to={"/addStudentDetails"}>Add your Details</Link>

         </Container>
      </>
   )
}

export default StudentDashboard;