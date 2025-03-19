
//get some icon and show it has student dashboard icon
//this dahboard will appear when student try to sign in/up

// import {useState} from "react";
import {Card, Container} from "react-bootstrap";
import {Link} from "react-router-dom";
import {FaUserGraduate} from "react-icons/fa";
function StudentDashboard() {
   const user = JSON.parse(localStorage.getItem("user") || "{}");
   return (
      <>
         <Container className="mt-5 pt-3">
             <Card className="p-3 text-center" style={{width: "18rem"}}>
                 <FaUserGraduate size={50 } className="mb-2" />
                 <h5>{user.firstName + " "  + user.middleName + " " + user.lastName}</h5>
             </Card>
            <Link type="button" to={"/addStudentDetails"}>Add your Details</Link>
         </Container>
      </>

   )
}

export default StudentDashboard;