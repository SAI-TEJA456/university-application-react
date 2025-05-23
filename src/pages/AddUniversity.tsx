//to add university form
//should be available in university card with few details and modal to show more details
//added by representative
import {Button, Card, Container, Form} from "react-bootstrap";
import * as React from "react";
import {useRef, useState} from "react";
import {
    IApplicationProcess,
    IEducationDel,
    IStudentTestScores,
    IUniversityGeneral
} from "../types/FormDataTypes.ts";

import AddCourse from "../formCards/AddCourse.tsx";
import EduDetails from "../formCards/EduDetails.tsx";
import api from "../api/axiosConfig.ts";
import {AxiosError} from "axios";
import {useNavigate} from "react-router-dom";
//collected each form controls from different platform, yocket, flymasters, and some other platform
//available in google. data here is only form project purpose if any unnecessary data will be deleted in the future

//this tells university page what type of data is allowed for each property in state
interface IAddUniversity extends IUniversityGeneral, IApplicationProcess, IStudentTestScores, IEducationDel, IApplicationProcess {}

//this is Add university function
function AddUniversity() {


//useState have all values of university page.
    const [universityData, setUniversityData] = useState <IAddUniversity>({} as IAddUniversity);

    // as i am thinking have multiple course forms so i have make an array
    //the below one is for handling one object
    // const [courseData, setCourseData] = useState<ICourseDetails>({} as ICourseDetails);
    
//error will be applied to all the university page controls.
    //learnt a new thing in typescript that using this creates Record<K, T> is key, type-datatype for existing interface
    // why using this instead of creating a new interface i can use like this as here
    // i require all string to user errors.
    const [errors, setErrors] = useState<Partial<Record<keyof IAddUniversity, string>>>({});

    /*
    * I am trying to pass a callback or any other to child component and get return response to prevent submitting form like two way communication
    * till now i applied only one-way communication parent->child and not a dynamic component
    * here challenges - I am using a dynamic component as i need to add multiple courses
    *                 - older version will validate form while user entering data dynamically but for only one input at a time
    *                 - on submit I have to stop data submission if there are any errors in child component.
    *                   child component need to be validated again on submit and also some way it has to send message not to submit due to errors
    *                 - parent should send a message to validate some fields/inputs the two way communication
    *                  - tried a boolean, callback but going infinite rendering due to useState.
    *                 - so alternate way using useRef+ useEffect to prevent re-rendering and holding effect until errors cleared and preventing submission
    * * useState = Re-render the components when the state value changes.
    *
    * - as useSate re-renders we can control rendering with useEffect, useRef and many more hooks
    *
    * useRef() = "use Reference" Does not cause re-renders when its value changes.
    *             when you want a component to "remember" some information,
    *             but you don't want that information to trigger new renders.
    *
    * 1. Accessing/Interacting with DOM elements
    * 2. Handling Focus, Animations, and Translations
    * 3. Managing Timers and Intervals
    *
    * useEffect() = React Hook that tells React DO SOME CODE WHEN (pick one):
    *               This component re-renders
    *               This component mounts
    *               The state of a value
    * In simple to run side effects in function components
    * useEffect(function, [dependencies])
    *
    * 1. useEffect(() => {}) // Runs after every re-render
    * 2. useEffect(() => {},[]) //Runs only on mount
    * 3. useEffect(() => {}, [value]) //Runs on mount + when value changes
    *
    * base definition but still to clear doubts let's understand what we have done here
    *
    * 1. Course validation reference will save Promise information and when user do something
    *    It will send store info to avoid rerender
    * */
    // courseValidationHandlerRef - generic type of callback function with a promise.
    // Promise- it's a object used for asynchronous operation
    //initially we keep a async callback function which return a boolean
    //useRef save data on renderer
    const courseValidationHandlerRef = useRef<() => Promise<boolean>>(async () => true);

    const navigate = useNavigate();

    //handleUniversityChange function to handle general university data
    const handleUniversityChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>{
        const {name, value} = e.target;

        const errMsg = handleValidation(name, value);

       
        setUniversityData({...universityData, [name]: value});
        setErrors({...errors, [name]: errMsg});
    };

    //it handles files like images, pdf, docs
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        const name = e.target.name;
        //.files return Filelist object for type file input.
        const files= Array.from(e.target.files || []);
        //checking any file control and any files uploaded by user or not


            validateFile(name, files);

    }

    //files validation
    const validateFile  = (name: string, files: string | File[]) => {

        //declare image types learned from online
        const acceptedFormats = ["image/jpeg", "image/png"];
        //Array.from is adding data in to array from and iterable or array-like object
        //passing previous state into lambda function and add images to university Images property
        //checking invalid files by filtering array and call lambda function checking file type
        if (typeof files === "string") {

            const errMsg = "Add Some Images.";
            //set error message with saving previous errors
            setErrors((prevErrors) => ({...prevErrors, [name]: errMsg}))
            return;
        }
        const invalidFiles = files.filter(file => !acceptedFormats.includes(file.type));
            if (files && files.length > 0) {

                if (name === "universityImage") {
                    if (invalidFiles.length > 0) {
                        const errMsg = "Only JPEG or PNG images are allowed.";
                        //set error message with saving previous errors
                        setErrors((prevErrors) => ({...prevErrors, universityImage: errMsg}))
                    } else {
                        setUniversityData(prevState => ({
                            ...prevState,
                            //add images and not losing previous images
                            universityImage: [...files]

                        }));
                        setErrors((prevErrors) => ({...prevErrors, universityImage: ""}))
                    }
                } else if (name === "universityLogo") {
                    if (invalidFiles.length > 0) {
                        const errMsg = "Only JPEG or PNG images are allowed.";
                        //set error message with saving previous errors
                        setErrors((prevErrors) => ({...prevErrors, universityLogo: errMsg}))
                    } else {
                        if (files.length === 1)
                            setUniversityData(prevState => ({...prevState, universityLogo: files[0]}))
                        setErrors((prevErrors) => ({...prevErrors, universityLogo: ""}))
                    }
                }
            }
    }

//handling university page data validation
     const handleValidation =  (name: string , value: string) => {
         const numValue = Number(value);
         let errMsg = "";

         if (name === "universityName"){
             if (!value) {
                 errMsg = "Please Enter University name.";
             } else if (!isNaN(numValue)) {
                 errMsg = "University Name Should not have numbers."
             }
         }//validation for university name

        if (name === "universityDescription") {
            if (!value) {
                errMsg = "Please Enter Some Information About University";
            } else if (value.trim().split(" ").length <= 100) {
                errMsg = "University Description should be atleast 100 words."
            }
        }//validation for description

         if (name === "state"){
             if (!value) {
                 errMsg = "Please Enter University State.";
             } else if (!isNaN(numValue)) {
                 errMsg = "State Should not have numbers."
             }
         }// validation for state

         if (name === "country"){
             if (!value) {
                 errMsg = "Please Enter University Country.";
             } else if (!isNaN(numValue)) {
                 errMsg = "Country Should not have numbers."
             }
         }// validation for Country


         if (name === "universityUrlHome"){
             //for validating url we regx pattern from online
             const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/;
             if (!urlRegex.test(value)){
                 errMsg = "Please Enter a Valid Url";
             }
             //or in built react URL object use in add course
         }
         // if (name === "universityUrlHome" && !value.includes("https://")) errMsg = "Please Enter a Valid Url";

         if (name === "universityType"){
             if (!value || numValue == 1) {
                 errMsg = "Please select a type";
             }
         }

         // images i need type file in this function iget only string input so need to validation separately
         // if(name === "universityImage" && !value) errMsg = "Please add Some Images";

         // if (name === "universityLogo" && !value) errMsg= "Please add University Logo";

         //Aplication related validation
         if (name === "applicationProcess"){
             if (!value) {
                 errMsg = "Please Enter Some Information About Application Process";
             } else if (value.trim().split(" ").length <= 100) {
                 errMsg = "Application Description should be atleast 100 words."
             }
         }

         //checking how validate course data as it dynamic i mean multiple courses.
         // console.log("course data", universityData.courseData);



         // Validation for Educational Score
         // .includes is search element for objects
         if (["tenthPercent", "interPercent", "bTechPercent"].includes(name)){
             if (isNaN(numValue)){
                 errMsg = "Percentage Should be in number";
             }else if (numValue <0 || numValue >100){
                 errMsg = "Percentage must be between 0 and 100";
             }
         }//validation for percentage.

         if (["tenthGpa", "interGpa", "bTechGpa"].includes(name)){
             if (isNaN(numValue)){
                 errMsg = "GPA Should be in number";
             }else if (numValue <0 || numValue >10){
                 errMsg = "GPA must be between 0 and 10";
             }
         }//validation for gpa

         if (["numBTechBackLogs", "numIntBackLogs"].includes(name)){
             if (isNaN(numValue)){
                 errMsg = "Backlogs Should be number";
             }
             else if (numValue <0){
                 errMsg = "Backlogs cannot be negative";
             }
         }// validation for backlogs.

        return errMsg;
     }


     //handles submit
    //as handle submit need to receive addCourse response that to proceed further or not
    //add course have some logic which need to be finished so we use async
    const handleSubmit = async (e: React.FormEvent) => {
        //prevent default of submit button and prevent reload
        e.preventDefault();
        e.persist();
        //initial value was false so validateCourse = true is passed as prop to addCourse only on submission
        // setValidateCourse(true);
        // need to required fields validation on submit
        // as I need all fields i will name tags and store it in a array
        // lets collect form elements first all input related.
        const form = e.currentTarget as HTMLFormElement
        const formElements = form.querySelectorAll("input, textarea, select");
        //we get Nodelist of form elements
        console.log("form elements:", formElements);

        //Array.from separating an object- array form node list process-
        // .map to find a HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement out all form elements and
        // .filter will filter anything we passed and return those object here name - attribute, value

        const requiredFields = Array.from(formElements)
            .map((e) => (e as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement).name)
            .filter((name) => !name.includes("course"));

        console.log(requiredFields);
        requiredFields.forEach(key => {
            const typedKey = key as keyof IAddUniversity
            const inputValue = (typedKey != "courses") ? (universityData[typedKey] ?? "") : "";
            const errMsg = typeof inputValue === "string" ? handleValidation(typedKey, inputValue) : "";
               setErrors(prevState=>({...prevState, [typedKey]: errMsg}));
            if (typedKey === "universityImage" || typedKey === "universityLogo") {
                const files: string | File[] = (Array.isArray(inputValue)) ? inputValue : inputValue instanceof File ? [inputValue] : "";
                validateFile(typedKey, files);
            }
        })
        //await- will stop parent here until we Promise from add course
        const isCourseValid = await courseValidationHandlerRef.current();
        // if (Object.values(errors).some(error => error)) {
        //     alert("Please Enter All required fields");
        //     return;
        // }

        //problem is when form submitted with empty values in course ref needs time to update
        //as addCourse need to validate and update ref
        //use effect delay addcourse here code doesn't
        if (!isCourseValid || Object.values(errors).some(error => error)) {
            alert("Please Enter All required fields");
            return;
        }
        //need write API request after testing

        try {
            const chnagedFormData = new FormData();
            if (universityData.universityImage){
                (universityData.universityImage as File[]).forEach(
                    file =>{
                        chnagedFormData.append("universityImage", file)
                    }
                );
            }

            if (universityData.universityLogo){
                chnagedFormData.append("universityLogo", universityData.universityLogo as File);
            }

            console.log("FormData Contents:");
            for (const [key, value] of chnagedFormData.entries()) {
                console.log(`${key}:`, value);
            }

            const uploadResponse = await api.post("api/uploads/university-images", chnagedFormData, {
                headers:{
                    "Content-Type": "multipart/form-data"
                }
            })

            const { universityImage, universityLogo} = uploadResponse.data;

            const updatedUniversityData = {
                ...universityData,
                universityImage: universityImage,
                universityLogo: universityLogo
            }

            const response = await api.post("api/universities", updatedUniversityData);
            console.log("University Data Submitted:", response.status);
            console.log("University Data Submitted:", response.data);

            if (response.status === 201) {
                alert("University Details Submitted Sucessfully");
                navigate("/representative-dashboard");
            }
        }catch (e) {
            const axiosError = e as AxiosError<{message?: string}>
            if (axiosError.response){
                console.log("Subbmission Error:", axiosError)
            }
        }
    }

    return (
        <Container>

            {/*To add a University*/}
            <Card className="mt-3 p-3">
                <h3 className="text-center">Add University</h3>
                {/*handleSubmit is called when form is  submitted*/}
                <Form onSubmit={handleSubmit}>
                    {/*University name*/}
                    <div className="mb-3">
                        <label className="form-label">
                            University Name:
                        </label>
                        <input className="form-control" type="text" name="universityName"  placeholder="expample: University of Central Missouri"
                               value={universityData.universityName ?? ""}
                               onChange={handleUniversityChange} />
                        {errors.universityName && <span className="text-danger">{errors.universityName}</span>}
                    </div>
                    {/*old version having problems keeping only this for sample need to change for everything*/}
                    {/*<Form.Group className="mb-3">*/}
                    {/*    <Form.Label>University Name:</Form.Label>*/}

                    {/*    <Form.Control type="text" name="universityName" value={universityData.universityName ?? ""}*/}
                    {/*                  onChange={handleUniversityChange} />*/}

                    {/*    {errors.universityName && <span className="text-danger">{errors.universityName}</span>}*/}
                    {/*</Form.Group>*/}
                    {/*university Description*/}
                    <div className="mb-3">
                        <label className="form-label">Add Some University Description:</label>
                        <textarea className="form-control" name="universityDescription" value={universityData.universityDescription ?? ""} onChange={handleUniversityChange}></textarea>
                        {errors.universityDescription && <span className="text-danger">{errors.universityDescription}</span>}
                    </div>
                    {/*State*/}
                    <Form.Group className="mb-3">
                        <Form.Label>University State:</Form.Label>

                        <Form.Control type="text" name="state" value={universityData.state ?? ""}
                                      onChange={handleUniversityChange} />

                        {errors.state && <span className="text-danger">{errors.state}</span>}
                    </Form.Group>
                    {/*Country*/}
                    <Form.Group className="mb-3">
                        <Form.Label>University Country:</Form.Label>

                        <Form.Control type="text" name="country"
                                      value={universityData.country ?? ""} onChange={handleUniversityChange}
                                      />

                        {errors.country && <span className="text-danger">{errors.country}</span>}
                    </Form.Group>
                    {/*University Website*/}
                    <Form.Group className="mb-3">
                        <Form.Label>University Website Link (Home Page Preferred):</Form.Label>

                        <Form.Control type="url" name="universityUrlHome" value={universityData.universityUrlHome ?? ""}
                                      onChange={handleUniversityChange}/>
                        {errors.universityUrlHome && <span className="text-danger">{errors.universityUrlHome}</span>}

                    </Form.Group>

                    {/*University type can pick dropdown or radio*/}
                    <Form.Group className="mb-3">
                        <Form.Label>University Type (Public or Private):</Form.Label>

                        <Form.Select name="universityType" value={universityData.universityType ?? ""}
                                     onChange={handleUniversityChange} >
                            <option value={1}>Please Select a Value</option>
                            <option value="Public">Public</option>
                            <option value="Private">Private</option>
                        </Form.Select>
                        {errors.universityType && <span className="text-danger">{errors.universityType}</span>}

                    </Form.Group>

                    {/*University Image need to allow multiple images and I am facing issues while adding images like it's going blank*/}
                    <div className="mb-3">
                        <label htmlFor="formFileMultiple" className="form-label">University Images :</label>
                        <input className="form-control" type="file" name="universityImage" onChange={handleFileChange}
                               multiple/>
                        {errors.universityImage && (
                            <span className="text-danger">{errors.universityImage}</span>)}
                    </div>
                    {/*<Form.Group className="mb-3">*/}
                    {/*    <Form.Label>University Images :</Form.Label>*/}

                    {/*    <Form.Control type="file" multiple name="universityImage" onChange={handleFileChange}/>*/}
                    {/*</Form.Group>*/}

                    {/*University logo*/}
                    <div className="mb-3">
                        <label className="form-label">University Logo</label>
                        <input className="form-control" type="file" name="universityLogo" onChange={handleFileChange}/>
                        {errors.universityLogo && <span className="text-danger">{errors.universityLogo}</span>}
                    </div>
                    {/*<Form.Group className="mb-3">*/}
                    {/*    <Form.Label>University Logo</Form.Label>*/}

                    {/*    <Form.Control type="file" name="universityLogo" onChange={handleFileChange}/>*/}
                    {/*    {errors.universityLogo && <span className="text-danger">{errors.universityLogo}</span>}*/}

                    {/*</Form.Group>*/}


                    {/*Application process*/}
                    <div className="mb-3">
                        <label className="form-label">How to apply for specific course:</label>
                        <textarea className="form-control" name="applicationProcess"
                                  value={universityData.applicationProcess ?? ""} onChange={handleUniversityChange}></textarea>
                        {errors.applicationProcess && <span className="text-danger">{errors.applicationProcess}</span>}
                    </div>
                    {/*<Form.Group className="mb-3">*/}
                    {/*    <Form.Label>How to apply for specific course:</Form.Label>*/}
                    {/*    <Form.Control type="textarea" name="applicationProcess"*/}
                    {/*                  value={applicationProcess.applicationProcess ?? ""} onChange={handleApplicationChange}*/}
                    {/*                  />*/}
                    {/*    {errors.applicationProcess && <span className="text-danger">{errors.applicationProcess}</span>}*/}
                    {/*</Form.Group>*/}

                    {/*
                    An addCourse Component dynamic version to add multiple course
                    - onCourseChange have a callback function receiving a - updateCourse data of type ICourseData[index of current data] which store
                        in universityData(...universityData means contains all previous entered/ stored data IAddUniversity data and update courseData)
                        setValidation handler we are passing a handler that is a Promise<Boolean>
                        validationResultRef tells current reference of addCourse.
                    */}
                    <AddCourse onCourseChange={(updatedCourse) => setUniversityData({
                        ...universityData,
                        courses: updatedCourse
                    })} setValidationHandler={(handler)=>{(courseValidationHandlerRef.current = handler)}}/>
                    {/*
                    formData a prop will send back IEducationDel data to IAdduniversityData
                    handleChange is a callback function call handleUniversityChange any changes in EduDetails to update universityData.
                    */}
                    <EduDetails formData={universityData ?? {} as IEducationDel} handleChange={handleUniversityChange}
                                errors={errors}/>
                    <div className="text-center mt-3">
                        <Button variant="primary" type="submit">

                            Submit Details
                        </Button>

                    </div>

                </Form>
            </Card>
        </Container>
    )
}

export default AddUniversity;


// research -
// following yocket website for gather details
// and some other university pages
//
// about college some description
// <h1>Add University</h1>*/}
// General university details*/}
//
// university images
// universityname
// university state
// country
//
// about universiyty
// courses representative able to more than one university
// course name
// about course
// costs - anual tution, total tution
// addmission fee
// requriments
// tofel score over all
// ielts score over all
// gre -overall
// duolingo over all
//
// how to apply
// general description and university link for more details
