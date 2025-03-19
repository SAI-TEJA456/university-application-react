
// Created by Liesetty
//form for address
import {Card, Col, Form, Row} from "react-bootstrap";
import {IGeneral} from "../types/FormDataTypes.ts";
import * as React from "react";

{/*address line
                    city state country
                    pincode
                    */}
// lets do same as Personal info
function Address({formData, handleChange, errors}:
    {
        formData : IGeneral,
        handleChange: (e:React.ChangeEvent<HTMLInputElement>) => void;
        errors: Partial<IGeneral>
    }
) {
    return (
        <Card className="mt-3 p-3">
            <h4 className="text-center">Address Details</h4>
            <div className="mb-3">
            {/*    Address line*/}
                <Form.Group className="mb-3">
                    <Form.Label>Address Line</Form.Label>
                    <Form.Control type="text" name="addressLine" value={formData.addressLine} onChange={handleChange} />
                    {errors.addressLine && <span className="text-danger">{errors.addressLine}</span> }
                </Form.Group>
            {/*    City*/}
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>City</Form.Label>
                            <Form.Control type="text" name="city" value={formData.city} onChange={handleChange}/>
                            {errors.city && <span className="text-danger">{errors.city}</span> }
                        </Form.Group>
                    </Col>
                    {/*State*/}
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>State</Form.Label>
                            <Form.Control type="text" name="state" value={formData.state} onChange={handleChange}/>
                            {errors.state && <span className="text-danger">{errors.state}</span> }
                        </Form.Group>
                    </Col>
                </Row>
                <Row>

                    {/*country*/}
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Country</Form.Label>
                            <Form.Control type="text" name="country" value={formData.country} onChange={handleChange}/>
                            {errors.country && <span className="text-danger">{errors.country}</span> }
                        </Form.Group>
                    </Col>

                    {/*pin code*/}
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Pin code</Form.Label>
                            <Form.Control type="text" name="pincode" value={formData.pincode} onChange={handleChange}/>
                            {errors.pincode && <span className="text-danger">{errors.pincode}</span> }
                        </Form.Group>
                    </Col>
                </Row>
            </div>
        </Card>
    )
}

export default Address;