
// Created by Liesetty
//form for student scores
// instead having card for each score section i have combined them
//after searching, changing and planing all the scores requirements i finalized this form
//avoided multiple unnecessary commits
import { Card, Col, Container, Form, Row} from "react-bootstrap";
import { IStudentTestScores} from "../types/FormDataTypes.ts";
import * as React from "react";
//Here
function TestScores(
    {
        formData,
        handleChange,
        errors,
    } :{
        formData: IStudentTestScores;
        handleChange: (e : React.ChangeEvent<HTMLInputElement>) => void;
        errors: Partial<IStudentTestScores>;
    }
){
    return (
        <Container>
            {/*thinking to make four cards with 2 by 2 Grid*/}
            <Row>
                <Col md={6}>
                    {/*Gre Score*/}
                    <Card className="mt-3 p-3>">
                        <h4 className="text-center">GRE Scores</h4>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Overall Score</Form.Label>

                                <Form.Control type="text" name="greScore" value={formData.greScore ?? ""} onChange={handleChange}/>

                                {errors.greScore && <span className="text-danger">{errors.greScore}</span> }
                            </Form.Group>
                            {/*for Individual score*/}
                            <Row>
                                <Col md={6}>
                                {/*    Gre verbal score*/}
                                    <Form.Group className="mb-3">
                                        <Form.Label>Verbal Score</Form.Label>

                                        <Form.Control type="text" name="greVerbalScore" value={formData.greVerbalScore ?? ""} onChange={handleChange}/>

                                        {errors.greVerbalScore && <span className="text-danger">{errors.greVerbalScore}</span> }
                                    </Form.Group>
                                </Col>
                                {/*Gre Quantative Score*/}
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Quantitative Score</Form.Label>

                                        <Form.Control type="text" name="greQuantScore" value={formData.greQuantScore ?? ""} onChange={handleChange}/>

                                        {errors.greQuantScore && <span className="text-danger">{errors.greQuantScore}</span> }
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Form>
                    </Card>
                </Col>
                {/*IELTS Score*/}
                <Col md={6}>
                    <Card className="mt-3 p-3">
                        <h4 className="text-center">IELTS Score</h4>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Over all</Form.Label>

                                <Form.Control type="text" name="ieltsScore" value={formData.ieltsScore || ""} onChange={handleChange}/>

                                {errors.ieltsScore && <span className="text-danger">{errors.ieltsScore}</span> }
                            </Form.Group>
                            {/*    individual score*/}
                            <Row>
                                {/*Listening*/}
                                <Col md={3}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Listening</Form.Label>

                                        <Form.Control type="text" name="ieltsListScore" value={formData.ieltsListScore || ""} onChange={handleChange}/>

                                        {errors.ieltsListScore && <span className="text-danger">{errors.ieltsListScore}</span> }
                                    </Form.Group>
                                </Col>
                                {/*Speaking*/}
                                <Col md={3}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Speaking</Form.Label>

                                        <Form.Control type="text" name="ieltsSpeakScore" value={formData.ieltsSpeakScore || ""} onChange={handleChange}/>

                                        {errors.ieltsSpeakScore && <span className="text-danger">{errors.ieltsSpeakScore}</span> }
                                    </Form.Group>
                                </Col>
                                {/*Reading*/}
                                <Col md={3}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Reading</Form.Label>

                                        <Form.Control type="text" name="ieltsReadScore" value={formData.ieltsReadScore || ""} onChange={handleChange}/>

                                        {errors.ieltsReadScore && <span className="text-danger">{errors.ieltsReadScore}</span> }
                                    </Form.Group>
                                </Col>
                                {/*    writing*/}
                                <Col md={3}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Writing</Form.Label>

                                        <Form.Control type="text" name="ieltsWriteScore" value={formData.ieltsWriteScore || ""} onChange={handleChange}/>

                                        {errors.ieltsWriteScore && <span className="text-danger">{errors.ieltsWriteScore}</span> }
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Form>
                    </Card>
                </Col>
            </Row>
        {/*    second row*/}
            <Row>
                {/*TOFEL*/}
                <Col md={6}>
                    <Card className="mt-3 p-3">
                        <h4 className="text-center">TOFEL Score</h4>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Over all</Form.Label>

                                <Form.Control type="text" name="tofelScore" value={formData.tofelScore || ""} onChange={handleChange}/>

                                {errors.tofelScore && <span className="text-danger">{errors.tofelScore}</span> }
                            </Form.Group>
                            {/*    individual score*/}
                            <Row>
                                {/*Listening*/}
                                <Col md={3}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Listening</Form.Label>

                                        <Form.Control type="text" name="tofelListScore" value={formData.tofelListScore || ""} onChange={handleChange}/>

                                        {errors.tofelListScore && <span className="text-danger">{errors.tofelListScore}</span> }
                                    </Form.Group>
                                </Col>
                                {/*Speaking*/}
                                <Col md={3}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Speaking</Form.Label>

                                        <Form.Control type="text" name="tofelSpeakScore" value={formData.tofelSpeakScore || ""} onChange={handleChange}/>

                                        {errors.tofelSpeakScore && <span className="text-danger">{errors.tofelSpeakScore}</span> }
                                    </Form.Group>
                                </Col>
                                {/*Reading*/}
                                <Col md={3}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Reading</Form.Label>

                                        <Form.Control type="text" name="tofelReadScore" value={formData.tofelReadScore || ""} onChange={handleChange}/>

                                        {errors.tofelReadScore && <span className="text-danger">{errors.tofelReadScore}</span> }
                                    </Form.Group>
                                </Col>
                                {/*    writing*/}
                                <Col md={3}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Writing</Form.Label>

                                        <Form.Control type="text" name="tofelWriteScore" value={formData.tofelWriteScore || ""} onChange={handleChange}/>

                                        {errors.tofelWriteScore && <span className="text-danger">{errors.tofelWriteScore}</span> }
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Form>
                    </Card>
                </Col>
                {/*Duolingo*/}
                <Col md={6}>
                    <Card className="mt-3 p-3">
                        <h4 className="text-center">Duolingo Score</h4>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Over all</Form.Label>

                                <Form.Control type="text" name="duolingoScore" value={formData.duolingoScore || ""} onChange={handleChange}/>

                                {errors.duolingoScore && <span className="text-danger">{errors.duolingoScore}</span> }
                            </Form.Group>
                            {/*    individual score are not required for university*/}
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default TestScores;