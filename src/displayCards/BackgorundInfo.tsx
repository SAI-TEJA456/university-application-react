
// Created by Liesetty
// student background info display
import {Button, Col, Container, Form, Row} from "react-bootstrap";

function BackgorundInfo() {
    return (
        <Container className="mt-5 pt-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <h2 className="text-center">Nationality Information</h2>
                    {/*nationality
                    citizenship
                    */}
                    <h2 className="text-center">Background Information</h2>
                    {/*father mobile number optional
                    mother mobile number optional
                    */}
                </Col>
            </Row>
        </Container>
    )
}

export default BackgorundInfo;