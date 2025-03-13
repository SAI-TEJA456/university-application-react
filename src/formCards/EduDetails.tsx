
// Created by Liesetty
//form for student education details

import { Card, Col, Form, Row} from "react-bootstrap";
import * as React from "react";
import {IStudentFormData} from "../types/FormDataTypes.ts";
// 10th percentage and gpa*/}
//                 {/*    inter percentage and gpa , number of back logos*/}
//                 {/*    b tech
function EduDetails(
    {
        formData,
        handleChange,
        errors
    } :{
        formData : IStudentFormData,
        handleChange: (e : React.ChangeEvent<HTMLInputElement>)=>void;
        errors: Partial<IStudentFormData>
    }
){
    return (
        <Card className="mt-3 p-3>">
            <h2 className="text-center">Educational Information</h2>
            <Row>
                {/*10th scores*/}
                <Col md={3}>
                    <h4>10th Scores</h4>
                    <Form>
                        {/*percentage*/}
                        <Form.Group className="mb-3">
                            <Form.Label>Percentage (Optional)</Form.Label>
                            <Form.Control type="text" name="tenthPercent" value={formData.tenthPercent} onChange={handleChange}/>
                            {errors.tenthPercent && <span className="text-danger">{errors.tenthPercent}</span> }
                        </Form.Group>
                        {/*Gpa*/}
                        <Form.Group className="mb-3">
                            <Form.Label>GPA</Form.Label>
                            <Form.Control type="text" name="tenthGpa" value={formData.tenthGpa} onChange={handleChange} required/>
                            {errors.tenthGpa && <span className="text-danger">{errors.tenthGpa}</span> }
                        </Form.Group>
                    </Form>
                </Col>
                {/*Intermediate*/}
                <Col md={3}>
                    <h4>Intermediate</h4>
                    <Form>
                        {/*percentage*/}
                        <Form.Group className="mb-3">
                            <Form.Label>Percentage (Optional)</Form.Label>
                            <Form.Control type="text" name="interPercent" value={formData.interPercent} onChange={handleChange}/>
                            {errors.interPercent && <span className="text-danger">{errors.interPercent}</span> }
                        </Form.Group>
                        {/*Gpa*/}
                        <Form.Group className="mb-3">
                            <Form.Label>GPA</Form.Label>
                            <Form.Control type="text" name="interGpa" value={formData.interGpa} onChange={handleChange} required/>
                            {errors.interGpa && <span className="text-danger">{errors.interGpa}</span> }
                        </Form.Group>
                    {/*    Number of BackLogs*/}
                        <Form.Group className="mb-3">
                            <Form.Label>Number of BackLogs</Form.Label>
                            <Form.Control type="text" name="numIntBackLogs" value={formData.numIntBackLogs} onChange={handleChange} required/>
                            {errors.numIntBackLogs && <span className="text-danger">{errors.numIntBackLogs}</span> }
                        </Form.Group>
                    </Form>
                </Col>
                <Col md={3}>
                    <h4>Bachelor's</h4>
                    <Form>
                        {/*percentage*/}
                        <Form.Group className="mb-3">
                            <Form.Label>Percentage (Optional)</Form.Label>
                            <Form.Control type="text" name="bTechPercent" value={formData.bTechPercent} onChange={handleChange}/>
                            {errors.bTechPercent && <span className="text-danger">{errors.bTechPercent}</span> }
                        </Form.Group>
                        {/*Gpa*/}
                        <Form.Group className="mb-3">
                            <Form.Label>GPA</Form.Label>
                            <Form.Control type="text" name="bTechGpa" value={formData.bTechGpa} onChange={handleChange} required/>
                            {errors.bTechGpa && <span className="text-danger">{errors.bTechGpa}</span> }
                        </Form.Group>
                        {/*    Number of BackLogs*/}
                        <Form.Group className="mb-3">
                            <Form.Label>Number of BackLogs</Form.Label>
                            <Form.Control type="text" name="numBTechBackLogs" value={formData.numBTechBackLogs} onChange={handleChange} required/>
                            {errors.numBTechBackLogs && <span className="text-danger">{errors.numBTechBackLogs}</span> }
                        </Form.Group>
                    </Form>
                </Col>
            </Row>


        </Card>

    )
}

export default EduDetails;