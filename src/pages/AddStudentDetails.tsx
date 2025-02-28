import {Button, Container, Form} from "react-bootstrap";
import PersonalInfo from "../formCards/PersonalInfo.tsx";
import Address from "../formCards/Address.tsx";
import {useState} from "react";
import {IStudentFormData} from "../types/FormDataTypes.ts";
import * as React from "react";
import TestScores from "../formCards/TestScores.tsx";

//Created by Liesetty
//all formCard should be handled here includes validation, api requests
//here we import all formCard folder cards related to student details
//we are handling state change of those cards as parent-child relation
//we validate all cards data here and submit api request

function AddStudentDetails() {
    // useState for form data
    const [formData, setFormData]= useState<IStudentFormData>({
        firstName: "",
        lastName: "",
        gender: "",
        email: "",
        dob: "",
        martialStatus:"",
        mobile: "",
        addressLine: "",
        city: "",
        country: "",
        pincode: "",
        state: "",
        citizenship: "",
        fatherMoblie: "",
        motherMobile: "",
        nationality: "",
    });

    // useState for errors
    const [errors, setErrors] = useState<Partial<IStudentFormData>>({})

    // handleChange function call on every control change by user in all cards with onChange event listener
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // an object declaration e.target will be current user changing or working control in the particular formCard card
        const {name, value} = e.target;
        //we use a non-primitive data type Number its says a typescript fun with {value?:any}: Number means accept all number
        const numValue = Number(value);
        let errorMsg = "";
        // validation for PersonalInfo
        if (name === "gender" && !value) errorMsg = "Please select a gender"; //gender validation

        if (name === "dob" && !value) errorMsg = "Please Enter/Select Date of Birth"; //dob validation

        if (name === "martialStatus" && !value) errorMsg = "Please select a Martial Status"; //martialStatus validation

        if (name === "mobile" && !/^\d(10)$/.test(value))  errorMsg = "Please enter a Valid Mobile number"; //mobile number validation here we used regex validation where .test tests the value has 10digit or not

        // Validation for Address
        if (name === "addressLine" && !value) errorMsg = "Address Line is required";

        if (name === "city" && !value) errorMsg = "City is Required";

        if (name === "state" && !value) errorMsg = "State is Required";

        if (name === "pincode" && !/^\d{5}$/.test(value)) errorMsg = "Enter a Valid Pin code"


        // validation for Background Information
        if (name === "nationality" && !value) errorMsg = "Nationality is required";

        if (name === "citizenship" && !value) errorMsg = "Citizenship is required"

        if (name === "fatherMobile" && !/^\d(10)$/.test(value)) errorMsg = "Please Enter a Valid Mobile Number";

        if (name === "motherMobile" && !/^\d(10)$/.test(value)) errorMsg = "Please Enter a Valid Mobile Number";


        // Validation for test Scores
        if(name === "greScore" && (numValue <260 || numValue >340)) errorMsg = "GRE Score must be 260 to 340";

        if(name === "greVerbalScore" && (numValue <130 || numValue >170)) errorMsg = "GRE Verbal Score must be 130 to 170";

        if(name === "greQuantScore" && (numValue <130 || numValue >170)) errorMsg = "GRE Quantitative Score must be 130 to 170";

        if(name === "ieltsScore" && (numValue <0 || numValue >9)) errorMsg = "IELTS Score must be 0 to 9";

        if(name === "ieltsListScore" && (numValue <0 || numValue >9)) errorMsg = "IELTS Listening Score must be 0 to 9";

        if(name === "ieltsReadScore" && (numValue <0 || numValue >9)) errorMsg = "IELTS Reading Score must be 0 to 9";

        if(name === "ieltsWriteScore" && (numValue <0 || numValue >9)) errorMsg = "IELTS Writing Score must be 0 to 9";

        if(name === "ieltsSpeakScore" && (numValue <0 || numValue >9)) errorMsg = "IELTS Speaking Score must be 0 to 9";

        if(name === "tofelScore" && (numValue <0 || numValue >30)) errorMsg = "TOFEL Score must be 0 to 30";

        if(name === "tofelListScore" && (numValue <0 || numValue >30)) errorMsg = "TOFEL Listening Score must be 0 to 30";

        if(name === "tofelReadScore" && (numValue <0 || numValue >30)) errorMsg = "TOFEL Reading Score must be 0 to 30";

        if(name === "tofelWriteScore" && (numValue <0 || numValue >30)) errorMsg = "TOFEL Writing Score must be 0 to 30";

        if(name === "tofelSpeakScore" && (numValue <0 || numValue >30)) errorMsg = "TOFEL Speaking Score must be 0 to 30";

        if(name === "duolingoScore" && (numValue <10 || numValue >160)) errorMsg = "Duolingo Speaking Score must be 0 to 160";

        //each validation send error message is passed to a key with useState we change state of the error message tag
        setErrors({...errors, [name]: errorMsg});
        //assigning formData after that
        setFormData({...formData,[name]: value});
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("FormData Submitted",formData);
    };

    return (
        <Container className="mt-5">
            <h2 className="text-center">Add Student Details</h2>
            <Form onSubmit={handleSubmit}>
                <PersonalInfo formData={formData} handleChange={handleChange} errors={errors} />
                <Address formData={formData} handleChange={handleChange} errors={errors} />
                <TestScores formData={formData} handleChange={handleChange} errors={errors}/>

                <div className="text-center mt-3">
                    <Button variant="primary" type="submit">
                        Submit Details
                    </Button>

                </div>
            </Form>
        </Container>
    )
}

export default AddStudentDetails;