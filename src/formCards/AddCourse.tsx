// import {Button, Card, Form} from "react-bootstrap";
// import TestScores from "./TestScores.tsx";
// import {ICourseDetails, IStudentTestScores} from "../types/FormDataTypes.ts";
// import * as React from "react";

import {IApplicationProcess, ICourseDetails, IStudentTestScores} from "../types/FormDataTypes.ts";
import * as React from "react";
import {Button, Card, Form} from "react-bootstrap";
import {useState} from "react";
import TestScores from "./TestScores.tsx";


interface ICourseData extends ICourseDetails, IStudentTestScores, IApplicationProcess {}

function AddCourse({errors, onCourseChange}: {errors : Partial<ICourseData>, onCourseChange : (courses : ICourseData[]) => void}){

    const [courseData, setCourseData] = useState<ICourseData[]>([]);

    const handleCourseChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const updatedCourses = [...courseData];

        // Check if the field belongs to testScoreRequirements



            updatedCourses[index] = { ...updatedCourses[index], [name]: value };


        setCourseData(updatedCourses);
        onCourseChange(updatedCourses); // Send updated courses back to AddUniversity.tsx
    };

    const addCourseData = () =>{
        const newCourse : ICourseData ={} as ICourseData
        const updateCourses = [...courseData, newCourse]
        setCourseData(updateCourses);
        onCourseChange([...updateCourses]);
    }
    return(
    <>
        <div>
            {/*    To add courses related to university and it's application process */}
            {/*    need to create a button to add multiple courses and still working on form*/}
            <Card className="mt-3 p-3">
                <h3 className="text-center">Add Course (Only Master for simplicity)</h3>
                <div>
                    {courseData.map((course: ICourseData, index: number) =>(
                        <div key ={index}>
                            {/*Course name*/}
                            <Form.Group className="mb-3">
                                <Form.Label>Course Name:</Form.Label>

                                <Form.Control type="text" name="courseName" value={course.courseName ?? ""} onChange={(e) =>{handleCourseChange(index, e)}} required/>

                                {errors.courseName && <span className="text-danger">{errors.courseName}</span> }
                            </Form.Group>


                            {/*Course Description*/}
                            <Form.Group className="mb-3">
                                <Form.Label>Add Some Course Description:</Form.Label>
                                <Form.Control type="textarea" name="courseDescription" value={course.courseDescription ?? ""} onChange={(e) =>{handleCourseChange(index, e)}} required/>
                                {errors.courseDescription && <span className="text-danger">{errors.courseDescription}</span> }
                            </Form.Group>
                            {/*annul tuition fee*/}
                            <Form.Group className="mb-3">
                                <Form.Label>Annual Tuition Fee:</Form.Label>

                                <Form.Control type="text" name="annualTuitionFee" value={course.annualTuitionFee ?? ""} onChange={(e) =>{handleCourseChange(index, e)}} required/>

                                {errors.annualTuitionFee && <span className="text-danger">{errors.annualTuitionFee}</span> }
                            </Form.Group>
                            {/*total tuition fee*/}
                            <Form.Group className="mb-3">
                                <Form.Label>Total Tuition Fee:</Form.Label>

                                <Form.Control type="text" name="totalTuitionFee" value={course.totalTuitionFee ?? ""} onChange={(e) =>{handleCourseChange(index, e)}} required/>

                                {errors.totalTuitionFee && <span className="text-danger">{errors.totalTuitionFee}</span> }
                            </Form.Group>
                            {/*Course Duration*/}
                            <Form.Group className="mb-3">
                                <Form.Label>Course Duration (in years):</Form.Label>

                                <Form.Control type="text" name="courseDuration" value={course.courseDuration ?? ""} onChange={(e) =>{handleCourseChange(index, e)}}/>
                                {errors.courseDuration && <span className="text-danger">{errors.courseDuration}</span> }

                            </Form.Group>

                            {/*Application Deadline*/}
                            <Form.Group className="mb-3">
                                <Form.Label>Last Date To apply for this Course:</Form.Label>

                                <Form.Control type="Date" name="applicationDeadline" value={course.applicationDeadline ?? ""} onChange={(e) =>{handleCourseChange(index, e)}}/>
                                {errors.applicationDeadline && <span className="text-danger">{errors.applicationDeadline}</span> }

                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Application fee:</Form.Label>

                                <Form.Control type="text" name="applicationFee" value={course.applicationFee ?? ""} onChange={(e) =>{handleCourseChange(index, e)}}/>
                                {errors.applicationFee && <span className="text-danger">{errors.applicationFee}</span> }

                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Course URL:</Form.Label>

                                <Form.Control type="url" name="courseUrl" value={course.courseUrl ?? ""} onChange={(e) =>{handleCourseChange(index, e)}}/>
                                {errors.courseUrl && <span className="text-danger">{errors.courseUrl}</span> }

                            </Form.Group>
                            {/*using existing test scorecards*/}
                            <TestScores formData={courseData[index] ?? {} as IStudentTestScores} handleChange={(e) =>handleCourseChange(index, e)} errors={errors || {} as IStudentTestScores} />
                        </div>
                    ))}
                </div>


            </Card>

            <Button className="btn-primary" onClick={addCourseData}>Add Course</Button>
        </div>
        </>)
}

export default AddCourse;