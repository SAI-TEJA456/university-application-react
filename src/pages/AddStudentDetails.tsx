import {Button, Container, Form} from "react-bootstrap";
import PersonalInfo from "../formCards/PersonalInfo.tsx";
import Address from "../formCards/Address.tsx";
import {useContext, useState} from "react";
import {IEducationDel, IGeneral, IStudentTestScores} from "../types/FormDataTypes.ts";
import * as React from "react";
import TestScores from "../formCards/TestScores.tsx";

import EduDetails from "../formCards/EduDetails.tsx";
import BackgorundInfo from "../formCards/BackgorundInfo.tsx";
import {UserContext} from "../components/UserContext.tsx";


//Created by Liesetty
//all formCard should be handled here includes validation, api requests
//here we import all formCard folder cards related to student details
//we are handling state change of those cards as parent-child relation
//we validate all cards data here and submit api request

interface IStudentFormData extends IGeneral, IEducationDel, IStudentTestScores{}

function AddStudentDetails() {

    //using user context so that i can get data related to user and display on readonly fields
    const {user} = useContext(UserContext) || {};


    // useState for form data
    const [formData, setFormData]= useState<IStudentFormData>({
       ...user
    } as IStudentFormData);


    // useState for errors
    const [errors, setErrors] = useState<Partial<IStudentFormData>>({})

    // handleChange function call on every control change by user in all cards with onChange event listener

    // this will match the key = name for validation and give the output
    //I will try reducing the code and getting better DSA usage in this code

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // an object declaration e.target will be current user changing or working control in the particular formCard card
        const {name, value} = e.target;
        //we use a non-primitive data type Number its says a typescript fun with {value?:any}: Number means accept all number



        const errorMsg = userInputValidation(name, value)

        //each validation send error message is passed to a key with useState we change state of the error message tag
        setErrors({...errors, [name]: errorMsg});
        //assigning formData after that
        setFormData((prevData) =>({...prevData,[name]: value}));

    };

    const userInputValidation = (name : string , value : string) =>{
        const numValue = Number(value);
        let errorMsg = "";

        // validation for PersonalInfo
        if (name === "firstName" && !value) errorMsg = "Please Enter you First Name";
        if (name === "lastName" && !value) errorMsg = "Please Enter you Last Name";
        if (name === "middleName" && !value) errorMsg = "Please Enter you Middle Name";
        if (name === "gender" && !value) errorMsg = "Please select a gender"; //gender validation

        //DOB validation keep minimum age to 20 consider even 3 three skip classes according my age for masters
        if (name === "dob") {
            //we will be having a date object mm/dd/yy gives perfect validation upto date
            const todaysDate = new Date()
            const userDate = new Date(value)
            const minDate = new Date()
            minDate.setFullYear(todaysDate.getFullYear()-20);
            if (userDate >= todaysDate) {
                errorMsg = "Date of birth cannot be today or a future date.";
            } else if (userDate >= minDate) {
                errorMsg = "You must be at least 20 years old to apply for a Master's.";
            }else if(!userDate) {
                errorMsg = "Please enter your Date of Birth";
            }
        }

        if (name === "martialStatus" && !value) errorMsg = "Please select a Martial Status"; //martialStatus validation

        if (name === "mobile" && !/^\d{10}$/.test(value))  errorMsg = "Please enter a Valid Mobile number"; //mobile number validation here we used regex validation where .test tests the value has 10digit or not


        // Validation for Address
        if (name === "addressLine" && !value) errorMsg = "Address Line is required";

        if (name === "city" && !value) errorMsg = "City is Required";

        if (name === "state" && !value) errorMsg = "State is Required";


        if (name === "country" && !value) errorMsg = "Country is Required";

        if (name === "pincode" && !/^[0-9]{5}$/.test(value)) errorMsg = "Enter a Valid 5 digit Pin code"



        // validation for Background Information
        if (name === "nationality" && !value) errorMsg = "Nationality is required";

        if (name === "citizenship" && !value) errorMsg = "Citizenship is required"


        if (name === "fatherMobile" && !/^[0-9]{10}$/.test(value)) errorMsg = "Please Enter a Valid Mobile Number";

        if (name === "motherMobile" && !/^[0-9]{10}$$/.test(value)) errorMsg = "Please Enter a Valid Mobile Number";



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


        // Validation for Educational Score
        // .includes is search element for objects
        if(name === "tenthPercent" && (numValue <0 || numValue >100)) errorMsg = "Percentage must be between 0 and 100";
        if(name === "interPercent" && (numValue <0 || numValue >100)) errorMsg = "Percentage must be between 0 and 100";
        if(name === "bTechPercent" && (numValue <0 || numValue >100)) errorMsg = "Percentage must be between 0 and 100";

        if(name === "tenthGpa" && ((numValue <0 || numValue >10) || !numValue)) errorMsg = "GPA must be between 0 and 10";

        if(name === "interGpa" && ((numValue <0 || numValue >10) || !numValue)) errorMsg = "GPA must be between 0 and 10";

        if(name === "bTechGpa" && ((numValue <0 || numValue >10) || !numValue)) errorMsg = "GPA must be between 0 and 10";

        if(name === "numBTechBackLogs" && ((numValue <0) || !numValue)) errorMsg = "Backlogs cannot be negative";

        if(name === "numIntBackLogs" && ((numValue <0) || !numValue)) errorMsg = "Backlogs cannot be negative";


        return errorMsg;
    }

    // on submiting by the user i need to validate errors if not user might submit the form without filling data
    //I can do one thing is hide submit button until all required fields are filled or validate everything again
    //test both of them lets see which works better
    //need to consider user-friendly too.  (Date March 7)
    //scenario 1
    //consider user-friendly and avoiding disabling submit button
    //i will do one thing pass the existing validation on change errors to handleSubmit function
    //scenario 2 what if user submit without even interacting with any input lets validate error fields
    //while passing error works?
    //scenario 3
    //lengthy validation as per formData

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //get existing validation errors
        if (Object.values(errors).some(error => error)) {
            alert("Please Enter All required fields");
            return;
        }

        const validationErrors: Partial<IStudentFormData> = {};

        const requiredFields: (keyof IStudentFormData)[] = [];

        requiredFields.forEach(key =>{
            const errMsg = userInputValidation(key, formData[key] || "");
            if (errMsg){
                validationErrors[key] = errMsg;
            }
        });

        if(Object.keys(validationErrors).length > 0){
            setErrors(prevErrors => ({...prevErrors, ...validationErrors}));
            return;
        }




        console.log("FormData Submitted",formData);
    };



    return (
        <Container className="mt-5">
            <h2 className="text-center">Add Student Details</h2>
            <Form onSubmit={handleSubmit}>
                <PersonalInfo formData={formData} handleChange={handleChange} errors={errors} />

                <EduDetails formData={formData} handleChange={handleChange} errors={errors} />
                <TestScores formData={formData} handleChange={handleChange} errors={errors}/>
                <Address formData={formData} handleChange={handleChange} errors={errors} />
                <BackgorundInfo formData={formData} handleChange={handleChange} errors={errors} />


                <div className="text-center mt-3">
                    <Button variant="primary" type="submit" >

                        Submit Details
                    </Button>

                </div>
            </Form>
        </Container>
    )
}

export default AddStudentDetails;