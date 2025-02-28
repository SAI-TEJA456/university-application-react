// importing react-bootstrap navigation bar components and tags
import {Container, Form, Nav, Navbar, NavDropdown, Row, Col, Button} from "react-bootstrap";
import SignInModal from "../modals/SignIn-Modal.tsx";
import {useState} from "react";

//Navigation Bar Component
function NavigationBar() {
    // lets create a state for showing signIn modal
    const [showSignIn, setShowSignIn] = useState(false);
    return (
        //expand is a prop allow for collapsing 'lg' for breakpoint
        //Use spacing and flex utilities to size and position content
        <Navbar fixed="top" expand="lg" className="bg-body-tertiary">
            <Container>
                {/*title*/}
                <Navbar.Brand href="#home">University Assistance</Navbar.Brand>
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
                        <Nav.Link href="#home">Home</Nav.Link>
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
                    <Form>
                        <Row>
                            <Col xs="auto">
                                {/*variant is for change color*/}
                                {/*while clicking button onlCick function changes setShowSignIn pass it Sign In Modal*/}
                                <Button variant="primary" onClick={() =>{setShowSignIn(true)}}>Sign In</Button>
                            </Col>
                        </Row>
                    </Form>
                    {/*E::links*/}
                </Navbar.Collapse>
            </Container>
        {/*    Lets pass state to sign In Component/Modal which popups within the page*/}
            <SignInModal show = {showSignIn} handleClose={() => setShowSignIn(false)} />
        </Navbar>
    )
}

export default NavigationBar;