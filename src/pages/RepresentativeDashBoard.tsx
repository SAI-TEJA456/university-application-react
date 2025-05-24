import {Link} from "react-router-dom";
import {Card, Container} from "react-bootstrap";
import {FaUserGraduate} from "react-icons/fa";

function RepresentativeDashBoard() {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const fullName = `${user.firstName ?? ""} ${user.middleName ?? ""} ${user.lastName ?? ""}`
    return (<>
        <Container className="mt-5 pt-3">
            <Card className="p-3 text-center" style={{width: "18rem"}}>
                <FaUserGraduate size={50 } className="mb-2" />
                <h5>{fullName}</h5>
            </Card>
        </Container>
        <h1>underdevelopment</h1>
        <Link to={"/addUniversity"} type="button"  className="variant">Add University</Link>
    </>);
}


export default RepresentativeDashBoard;