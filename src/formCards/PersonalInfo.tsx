import { Card, Form} from "react-bootstrap";
import {IStudentFormData} from "../types/FormDataTypes.ts"
import * as React from "react";

// Created by Liesetty
// this component acts only as form to get personal info user details
// This details are in Student table

//for typescript functionality i am using golbal interface to reduce redundancy
// we are using props from addStudentDetails form submission or sending data to DB happens their
//most of the validations are also will happen there


// here in params of personalInfo we are send interface declaration as objects
function PersonalInfo(
    {   formData,
        handleChange,
        errors}: {
        formData: IStudentFormData;
        handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
        //partial will let typescript know that errors will take only few inputs from interface
        errors: Partial<IStudentFormData>;
    }) {
    return (
        <Card className="mt-3 p-3">
            <h4 className="text-center"> Personal Information</h4>
            <Form className="mb-3">
                {/*First name we will keep it as readonly as we get this data from student dashboard*/}
                <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" value={formData.firstName} readOnly />
                </Form.Group>
                {/*Middle Name we will keep it as readonly as we get this data from student dashboard*/}
                <Form.Group className="mb-3">
                    <Form.Label>Middle Name</Form.Label>
                    <Form.Control type="text" value={formData.middleName} onChange={handleChange} />
                </Form.Group>
            {/*    Last Name we will keep it as readonly as we get this data from student dashboard*/}
                <Form.Group className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" value={formData.lastName} readOnly />
                </Form.Group>
            {/*    Email we will keep it as readonly as we get this data from student dashboard*/}
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" value={formData.email} readOnly/>
                </Form.Group>
            {/*    Gender*/}
                <Form.Group className="mb-3">
                    <Form.Label>Gender</Form.Label>
                    <Form.Check inline type="radio" label="Male" name="gender" value="male" onChange={handleChange} />
                    <Form.Check inline type="radio" label="Male" name="gender" value="female" onChange={handleChange} />
                    {errors.gender && <span className="text-danger">{errors.gender}</span>}
                </Form.Group>
            {/*    Date of Birth*/}
                <Form.Group className="mb-3">
                    <Form.Label>DOB</Form.Label>
                    <Form.Control type="date" value={formData.dob} name="dob" onChange={handleChange} />
                    {errors.dob && <span className="text-danger">{errors.dob}</span> }
                </Form.Group>
            {/*    Martial Status*/}
                <Form.Group className="mb-3">
                    <Form.Label>Martial Status</Form.Label>
                    <Form.Check inline type="radio" label="Married" name="martialStatus" value="married" onChange={handleChange} />
                    <Form.Check inline type="radio" label="Unmarried" name="martialStatus" value="unmarried" onChange={handleChange} />
                    {errors.martialStatus && <span className="text-danger">{errors.martialStatus}</span>}
                </Form.Group>
            {/*    Moblie Number*/}
                <Form.Group className="mb-3">
                    <Form.Label>Moblie Number</Form.Label>
                    <Form.Control type="tel" name="mobile" value={formData.mobile} onChange={handleChange} />
                    {errors.mobile && <span className="text-danger">{errors.mobile}</span> }
                </Form.Group>
            </Form>
        </Card>
    )
}
export default PersonalInfo;