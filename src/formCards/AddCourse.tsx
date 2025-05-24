//Created by Liesetty

import {IApplicationProcess, ICourseDetails, IStudentTestScores} from "../types/FormDataTypes.ts";
import * as React from "react";
import {useEffect, useState} from "react";
import {Button, Card, Form} from "react-bootstrap";
import TestScores from "./TestScores.tsx";


interface ICourseData extends ICourseDetails, IStudentTestScores, IApplicationProcess {}

//
function AddCourse({
                       onCourseChange,
                       setValidationHandler
                   } : {
                       onCourseChange : (courses : ICourseData[]) => void;
                       setValidationHandler: (handler: ()=>Promise<boolean>)=>void;
                   }){

    const [courseData, setCourseData] = useState<ICourseData[]>([]);

    const [courseErrors, setCourseErrors] = useState<Partial<ICourseData>[]>([]);

    useEffect(()=>{
        const validateCourseData = async ()=>{

            return validateRequiredFieldsOnSubmit();
        }
        // this will check wehter parent sends validateCourse state = true
        // if (triggerSubmitValidation){
        //     // if true this function do required code and returns a boolean validateRequiredFieldsOnSubmit();
        //     // which update useRef current reference true or false
        //     validationResultRef.current = validateRequiredFieldsOnSubmit();
        // }
    //    until set validation handler is true we validate course data and
    //     as course data chnages after useEffect mounts it avoids rerender and run inside code as per course data
        if (setValidationHandler){
            setValidationHandler(()=> validateCourseData());
        }
    }, [courseData]);


    const handleCourseChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const updatedCourses = [...courseData];
        updatedCourses[index] = { ...updatedCourses[index], [name]: value };
        setCourseData(updatedCourses);
        const updatedErrors = [...courseErrors];

        const currentErrorMsg = handleCourseValidation(name, value);
        updatedErrors[index] = {...updatedErrors[index], [name]: currentErrorMsg}
        setCourseErrors(updatedErrors);

        //Object.keys return array of keys and .some test for atleast one value passes this test
        // Object.values return array of values and .every test for all values.
        // const isCourseDataValid = Object.values(updatedErrors[index]).every((errMsg => !errMsg))

            // Check if the field belongs to testScoreRequirements
            onCourseChange(updatedCourses);


        // onCourseFieldChange(name, value, index) // Send updated courses back to AddUniversity.tsx
    };

    //this creates a new course form on every click
    const addCourseData = () =>{
        //newCourse have all data of ICourseData type
        const newCourse : ICourseData ={} as ICourseData;
        //new errors for each created new course
        const newErrors : Partial<ICourseData> = {};
        // updateCourses is variable store array of courseData by this [...courseData, newCourse]
        const updatedCourses = [...courseData, newCourse]
        // same a updatedCourse
        const updatedErrors = [...courseErrors, newErrors]
        //after creating a indexed variables assigning each to forms creating a courseData state for each new course
        setCourseData(updatedCourses);
        setCourseErrors(updatedErrors);
        //this will update to addUniversity
        onCourseChange([...updatedCourses]);
    }

    //handles courseData validation

    const handleCourseValidation = (name: string, value: string)=>{
        const numValue = Number(value)
        let errorMsg = "";
        if (name === "courseName"){
            if (!value) {
                errorMsg = "Please Enter Course Name";
            }else if (/\d/.test(value)){
                errorMsg = "Course Name Should not contain numbers."
            }
        }//course name validation

        if (name === "courseDescription"){
            if (!value) {
                errorMsg = "Please Enter Some Information About Course Description";
            } else if (value.trim().split(" ").length <= 100) {
                errorMsg = "Course Description should be atleast 100 words."
            }
        } // validation for description

        if (["annualTuitionFee", "totalTuitionFee", "applicationFee"].includes(name)){
            if (!numValue){
                errorMsg = "Please Enter Tuition Fee for this course.";
            }else if (numValue < 0){
                errorMsg = " Tuition Fee cannot be negative";
            }
        }// validation related to field

        if (name === "duration")
        {
            if (!numValue && numValue <= 3){
                errorMsg ="Please Enter course duration in numbers and less than or equal to 3 years."
            } else if (numValue <= 0){
                errorMsg = "Course Duration cannot be 0 or negative."
            }
        }// validation for course duration

        if (name === "applicationDeadline"){
                //we will be having a date object yy/mm/dd time gives perfect validation upto date
                const todayDate = new Date();
                const userDate = new Date(value)
                if (userDate <= todayDate) {
                    errorMsg = "last date to apply is completed";
                }
                    else if (!userDate) {
                    errorMsg = "Please enter Last Date to apply. ";
                }
        }// validation for application deadline

        if (name === "courseUrl"){
            try{
                new URL(value);
                errorMsg = "";
            }catch (e) {
                console.log(e);
               errorMsg = "Please enter a valid URL";
            }
        } // validation for course url



        // Validation for test Scores
        if(name === "greScore"){
            if (isNaN(numValue)){
                errorMsg = "Score Should be in number";
            }else if (numValue <260 || numValue >340){
                errorMsg = "GRE Score must be 260 to 340";
            }
        }

        if(["greVerbalScore", "greQuantScore"].includes(name)){
            if (isNaN(numValue)){
                errorMsg = "Score Should be in number";
            }else if (numValue <130 || numValue >170){
                errorMsg = "GRE Sub Score must be 130 to 170";
            }
        }

        if(["ieltsScore", "ieltsListScore", "ieltsReadScore", "ieltsWriteScore", "ieltsSpeakScore"].includes(name)){
            if (isNaN(numValue)){
                errorMsg = "Score Should be in number";
            }else if (numValue <0 || numValue >9){
                errorMsg = "IELTS Score must be 0 to 9";
            }
        }

        if(["tofelListScore", "tofelReadScore", "tofelWriteScore", "tofelSpeakScore"].includes(name)){
            if (isNaN(numValue)){
                errorMsg = "Score Should be in number";
            }else if (numValue <130 || numValue >170){
                errorMsg = "TOFEL Score must be 0 to 30";
            }
        }

        if(name === "duolingoScore"){
            if (isNaN(numValue)){
                errorMsg = "Score Should be in number";
            }else if (numValue <10 || numValue >160){
                errorMsg = "Duolingo Speaking Score must be 0 to 160";
            }
        }


        return errorMsg
    }

    const validateRequiredFieldsOnSubmit = (): boolean=>{
        const updatedErrors: Partial<ICourseData>[] = [];
        const requiredFields: (keyof ICourseData)[] = [
            "courseName",
            "courseDescription",
            "courseUrl",
            "applicationDeadline",
            "applicationFee",
            "annualTuitionFee",
            "greScore",
            "ieltsScore",
            "tofelScore"
        ]
        courseData.forEach(course =>{
            const courseErrors: Partial<ICourseData> = {};
            requiredFields.forEach(key =>{
                const value = course[key] ?? "";
                const errMsg = handleCourseValidation(key, value);
                if (errMsg){
                    courseErrors[key] = errMsg;
                }
            });
            updatedErrors.push(courseErrors);
        });
        setCourseErrors(updatedErrors);
        const errorExist = updatedErrors.some(errMsg => Object.values(errMsg).some(msg => msg));
        return !errorExist;
    }

    //tried this type creates a infinite loop
    //
    // if (triggerSubmitValidation){
    //     validationResultRef.current = validateRequiredFieldsOnSubmit();
    // }

    return(
    <>
        <div>
            {/*    To add courses related to university and it's application process */}
            {/*    need to create a button to add multiple courses and still working on form*/}
            <Card className="mt-3 p-3">
                <h3 className="text-center">Add Course (Only Master for simplicity)</h3>
                <div>
                    {/*course data updates as per index creates in addCourse function*/}
                    {courseData.map((course: ICourseData, index: number) =>(
                        <div key={index}>
                            {/*Course name*/}
                            <Form.Group className="mb-3">
                                <Form.Label>Course Name:</Form.Label>

                                <Form.Control type="text" name="courseName" value={course.courseName ?? ""}
                                              onChange={(e) => {
                                                  handleCourseChange(index, e)
                                              }} />

                                {courseErrors[index].courseName &&
                                    <span className="text-danger">{courseErrors[index].courseName}</span>}
                            </Form.Group>


                            {/*Course Description*/}
                            {/*<Form.Group className="mb-3">*/}
                            {/*    <Form.Label>Add Some Course Description:</Form.Label>*/}
                            {/*    <Form.Control type="textarea" name="courseDescription" value={course.courseDescription ?? ""} onChange={(e) =>{handleCourseChange(index, e)}} />*/}
                            {/*    {courseErrors[index].courseDescription && <span className="text-danger">{courseErrors[index].courseDescription}</span> }*/}
                            {/*</Form.Group>*/}
                            <div className="mb-3">
                                <label className="form-label">Add Some University Description:</label>
                                <textarea className="form-control" name="courseDescription"
                                          value={course.courseDescription ?? ""} onChange={(e) => {
                                    handleCourseChange(index, e)
                                }}></textarea>
                                {courseErrors[index].courseDescription &&
                                    <span className="text-danger">{courseErrors[index].courseDescription}</span>}
                            </div>
                            {/*annul tuition fee*/}
                            <div className="mb-3">
                                <label className="form-label">Annual Tuition Fee:</label>
                            <div className="input-group">
                                <span className="input-group-text">$</span>
                                <input type="text" className="form-control" name="annualTuitionFee" value={course.annualTuitionFee ?? ""}
                                       onChange={(e) => {
                                           handleCourseChange(index, e)}}/>
                            </div>
                                {courseErrors[index].annualTuitionFee && <span className="text-danger">{courseErrors[index].annualTuitionFee}</span>}
                            </div>
                            {/*<Form.Group className="mb-3">*/}
                            {/*    <Form.Label>Annual Tuition Fee:</Form.Label>*/}

                            {/*    <Form.Control type="text" name="annualTuitionFee" value={course.annualTuitionFee ?? ""}*/}
                            {/*                  onChange={(e) => {*/}
                            {/*                      handleCourseChange(index, e)*/}
                            {/*                  }} />*/}

                            {/*    {courseErrors[index].annualTuitionFee &&*/}
                            {/*        <span className="text-danger">{courseErrors[index].annualTuitionFee}</span>}*/}
                            {/*</Form.Group>*/}
                            {/*total tuition fee*/}
                            <div className="mb-3">
                                <label className="form-label">Total Tuition Fee:</label>
                                <div className="input-group">
                                    <span className="input-group-text">$</span>
                                    <input type="text" className="form-control" name="totalTuitionFee" value={course.totalTuitionFee ?? ""}
                                           onChange={(e) => {
                                               handleCourseChange(index, e)
                                           }}/>
                                </div>
                                {courseErrors[index].totalTuitionFee && <span className="text-danger">{courseErrors[index].totalTuitionFee}</span>}
                            </div>
                            {/*Course Duration*/}
                            <Form.Group className="mb-3">
                                <Form.Label>Course Duration (in years):</Form.Label>

                                <Form.Control type="text" name="duration" value={course.duration ?? ""}
                                              onChange={(e) => {
                                                  handleCourseChange(index, e)
                                              }}/>
                                {courseErrors[index].duration &&
                                    <span className="text-danger">{courseErrors[index].duration}</span>}

                            </Form.Group>

                            {/*Application Deadline*/}
                            <Form.Group className="mb-3">
                                <Form.Label>Last Date To apply for this Course:</Form.Label>

                                <Form.Control type="Date" name="applicationDeadline"
                                              value={course.applicationDeadline ?? ""} onChange={(e) => {
                                    handleCourseChange(index, e)
                                }}/>
                                {courseErrors[index].applicationDeadline &&
                                    <span className="text-danger">{courseErrors[index].applicationDeadline}</span>}

                            </Form.Group>

                            {/*application fee*/}
                            <div className="mb-3">
                                <label className="form-label">Application fee:</label>
                                <div className="input-group">
                                    <span className="input-group-text">$</span>
                                    <input type="text" className="form-control" name="applicationFee" value={course.applicationFee ?? ""}
                                           onChange={(e) => {
                                               handleCourseChange(index, e)
                                           }}/>
                                </div>
                                {courseErrors[index].applicationFee && <span className="text-danger">{courseErrors[index].applicationFee}</span>}
                            </div>
                            {/*<Form.Group className="mb-3">*/}
                            {/*    <Form.Label>Application fee:</Form.Label>*/}

                            {/*    <Form.Control type="text" name="applicationFee" value={course.applicationFee ?? ""}*/}
                            {/*                  onChange={(e) => {*/}
                            {/*                      handleCourseChange(index, e)*/}
                            {/*                  }}/>*/}
                            {/*    {courseErrors[index].applicationFee && <span className="text-danger">{courseErrors[index].applicationFee}</span>}*/}

                            {/*</Form.Group>*/}

                            <Form.Group className="mb-3">
                                <Form.Label>Course URL:</Form.Label>

                                <Form.Control type="url" name="courseUrl" value={course.courseUrl ?? ""}
                                              onChange={(e) => {
                                                  handleCourseChange(index, e)
                                              }}/>
                                {courseErrors[index].courseUrl &&
                                    <span className="text-danger">{courseErrors[index].courseUrl}</span>}

                            </Form.Group>
                            {/*using existing test scorecards*/}
                            <TestScores formData={courseData[index] ?? {} as IStudentTestScores}
                                        handleChange={(e) => handleCourseChange(index, e)}
                                        errors={courseErrors[index] || {} as IStudentTestScores}/>
                        </div>
                    ))}
                </div>


            </Card>

            <Button className="btn-primary" onClick={addCourseData}>Add Course</Button>
        </div>
    </>)
}

export default AddCourse;