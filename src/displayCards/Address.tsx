
// Created by Liesetty
//to display address this can edit or given remarks by representative
import {Button, Col, Container, Form, Row} from "react-bootstrap";

function Address() {
    return (
        <Container className="mt-5 pt-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <h2 className="text-center">Address</h2>
                    {/*address line
                    city state country
                    pincode
                    */}
                </Col>
            </Row>
        </Container>
    )
}

export default Address;