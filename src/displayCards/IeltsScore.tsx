
// Created by Liesetty
// student scores display

import {Button, Col, Container, Form, Row} from "react-bootstrap";

function IeltsScore(){
    return (
        <Container className="mt-5 pt-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <h2 className="text-center">IELTS Score</h2>
                    {/*Liestening
                    Speaking
                    Reading
                    Writing
                    */}
                </Col>
            </Row>
        </Container>
    )
}

export default IeltsScore;