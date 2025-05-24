// importing react-bootstrap navigation bar components and tags

import {Container, Form, Nav, Navbar, NavDropdown, Row, Col, Dropdown} from "react-bootstrap";
import SignInModal from "../modals/SignIn-Modal.tsx";
import {useContext, useState} from "react";
import {UserContext} from "./UserContext.tsx";
import {useNavigate} from "react-router-dom";
import {FaUserGraduate} from "react-icons/fa";

//March 11 working on connecting sign In/sign UP -> student Dashboard -> add student details
//user = Student or representative
//completes sign in /sign up after authentication they need to be redirected to respective dashboard
//we need to store name,email,role for future need and sharing
//disabling sign in / sign up button and add a sign out in icon+ name drop down so that user stored will be gone and return to home page
//we need import some random profile icon her as we disable button here after authentication.

//Navigation Bar Component
function NavigationBar() {
    //here we are using this to disable sign button and show icon+name by acces UserContext data
    // useContext(UserContext) means UserContext retieves user data and update function provided by userProvider
    const {user, clearData} = useContext(UserContext) || {};
    //it is a react-router built function,used to navigate between
    // components by the routes declared in App component
    const navigate = useNavigate();
    // lets create a state for showing signIn modal
    const [showSignIn, setShowSignIn] = useState(false);
    const fullName = `${(user?.firstName ?? "")} ${(user?.middleName ?? "")} ${(user?.lastName ?? "")}`
    //so when signout button is clicked by user this function invokes
    //this function will pass a null value which clear the localstorage
    const handleSignOut = () =>{
        clearData?.(); //optional because if not data not need this function to invoke
        //navigate to home route
        navigate("/");
    }
    return (
        //expand is a prop allow for collapsing 'lg' for breakpoint
        //Use spacing and flex utilities to size and position content
        <Navbar fixed="top" expand="lg" className="bg-slate-500">
            <Container>
                {/*title*/}
                <Navbar.Brand className="text-white" href="/">University Assistance</Navbar.Brand>
                {/*Dynamic Search Bar with <Form inline>*/}
                <Form>
                    <Row>
                        <Col xs="auto">
                            <Form.Control
                                type="text"
                                placeholder="Search for Universities"
                                className="mr-sm-2"/>
                        </Col>
                    </Row>
                </Form>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    {/*S::links*/}
                    <Nav className="me-auto">
                        {/*Home*/}
                        <Nav.Link href="/">Home</Nav.Link>
                        {/*SomeLinks*/}
                        <Nav.Link href="#link">Link</Nav.Link>
                        {/*Dropdown*/}
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Action</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    {/*here ?  this means we check if user exists or not
                     then if exits dropdown is shown
                     if not sign in button is shown
                     */}
                    {user ? (

                        <Dropdown>
                        <Dropdown.Toggle as="div" className="d-flex align-items-center" style={{cursor : "pointer"}}>
                            <FaUserGraduate size={20} className="me-2"/>
                            <span>{fullName}</span>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item disabled>some item</Dropdown.Item>
                            <Dropdown.Divider/>
                            <Dropdown.Item onClick={handleSignOut}>Sign Out</Dropdown.Item>
                        </Dropdown.Menu>
                        </Dropdown>
                    ): (
                        <Form>
                            <Row>
                                <Col xs="auto">
                                    {/*variant is for change color*/}
                                    {/*while clicking button onClick function changes setShowSignIn pass it Sign In Modal*/}
                                    <button className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-300 border-none shadow-md transition-colors duration-300" onClick={() => { setShowSignIn(true); }}>
                                        Sign In
                                    </button>
                                </Col>
                            </Row>
                        </Form>
                    )}
                    {/*E::links*/}
                </Navbar.Collapse>
            </Container>
        {/*    Lets pass state to sign In Component/Modal which popups within the page*/}
            <SignInModal show = {showSignIn} handleClose={() => setShowSignIn(false)} />
        </Navbar>
    )
}

export default NavigationBar;