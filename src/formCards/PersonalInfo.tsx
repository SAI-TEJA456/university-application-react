import {Button, Col, Container, Form, Row} from "react-bootstrap";
// Created by Liesetty
// Student details
// This details are in Student table

//for typescript functionality i am using interface
// we are using details
interface PersonalInfoProps {
    //this formData is a prop from AddStudentDetails page
    formData:{
        firstName:string;
        middleName:string;
        lastName:string;
        email:string;
        gender:string;
        dob:string;
        martialStatus:string;
        mobile:string;
    };
    //this handleChange is a prop from AddStudentDetails page
    handleChange: (e: React.ChangeEventHandler<HTMLInputElement>) =>void;
    //this errors is a prop from AddStudentDetails page
    errors:{
        gender?:string;
        dob?:string;
        martialStatus?:string;
        mobile?:string;
    };
}
function PersonalInfo() {
    return (
        <
    )
}
export default PersonalInfo;