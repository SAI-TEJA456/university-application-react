//to add university form
//should be available in university card with few details and modal to show more details
//added by representative
import {Button, Card, Container, Form} from "react-bootstrap";
import * as React from "react";
import {useState} from "react";
import {
    IApplicationProcess,
    ICourseDetails,
    IEducationDel,
    IStudentTestScores,
    IUniversityGeneral
} from "../types/FormDataTypes.ts";
// import { useNavigate} from "react-router-dom";
import AddCourse from "../formCards/AddCourse.tsx";
import EduDetails from "../formCards/EduDetails.tsx";

interface IAddUniversity extends IUniversityGeneral, ICourseDetails, IApplicationProcess, IStudentTestScores, IEducationDel, IApplicationProcess {}
function AddUniversity() {

    const [universityData, setUniversityData] = useState <IAddUniversity>({} as IAddUniversity);

    // as i am thinking have multiple course forms so i have make an array
    //the below one is for handling one object
    // const [courseData, setCourseData] = useState<ICourseDetails>({} as ICourseDetails);


    const [applicationProcess, setApplicationProcess] = useState<IApplicationProcess>({} as IApplicationProcess)

    // const naviagte =useNavigate();
    

    const [errors, setErrors] = useState<Partial<IAddUniversity>>({} as IAddUniversity);

    const handleUniversityChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> ) =>{
        const {name, value} = e.target;
        const errorMsg = handleValidation(name, value);

       
        setUniversityData({...universityData, [name]: value});
        setErrors({...errors, [name]: errorMsg});
    };

    const handleApplicationChange = (e : React.ChangeEvent<HTMLInputElement>) =>{
        const {name, value} = e.target;
        const errorMsg = handleValidation(name, value);

        setApplicationProcess({...applicationProcess, [name] : value});
        setErrors({...errors, [name] : errorMsg});
    }
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>)=>{

        if (e.target.files && e.target.files.length >0){
            const files= Array.from(e.target.files);
            setUniversityData(prevState => ({...prevState, universityImages : [...(prevState.universityImages || []), ...files]}));
        }
    }




     const handleValidation =  (name: string , value: string) =>{
        const numValue = Number(value);
        let errMsg ="";

        if (name === "universityName" && !value) errMsg = "Please Enter University name.";

        if (name === "universityAbout" && !value) errMsg = "Please Enter Some Information About University";

         if (name === "universityState" && !value) errMsg = "Please Enter University State.";

         if (name === "universityCountry" && !value) errMsg = "Please Enter University Country.";

         if (name === "universityUrl" && !value.includes("https://")) errMsg = "Please Enter a Valid Url";

         if (name === "universityType" && !value) errMsg = "Please select a type";

         if(name === "universityImages" && !value) errMsg = "Please add Some Images";

         if (name === "universityLogoImg" && !value) errMsg= "Please add University Logo";

         if (name === "courseName" && !value) errMsg = "Please Enter Course Name";

         if (name === "annualTuitionFee" && !numValue && numValue<0) errMsg = "Please Enter Annual Tuition Fee";

         if (name === "totalTuitionFee" && !numValue && numValue<0) errMsg = "Please Enter Total Tuition Fee";

         if (name === "courseDuration" && !numValue && (numValue<0 || numValue > 2))  errMsg = "Please Enter Course Duration"
        return errMsg;
     }


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>)=> {
        e.preventDefault();



        console.log("submit", universityData);
    }

    return (
        <Container>

            {/*To add a University*/}
            <Card className="mt-3 p-3">
                <h3 className="text-center">Add University</h3>
                <Form onSubmit={handleSubmit}>
                    {/*University name*/}
                    <Form.Group className="mb-3">
                        <Form.Label>University Name:</Form.Label>

                        <Form.Control type="text" name="universityName" value={universityData.universityName ?? ""}
                                      onChange={handleUniversityChange} required/>

                        {errors.universityName && <span className="text-danger">{errors.universityName}</span>}
                    </Form.Group>
                    {/*university Description*/}
                    <Form.Group className="mb-3">
                        <Form.Label>Add Some University Description:</Form.Label>
                        <Form.Control type="textarea" name="universityAbout"
                                      value={universityData.universityAbout ?? ""} onChange={handleUniversityChange}
                                      required/>
                        {errors.universityAbout && <span className="text-danger">{errors.universityAbout}</span>}
                    </Form.Group>
                    {/*State*/}
                    <Form.Group className="mb-3">
                        <Form.Label>University State:</Form.Label>

                        <Form.Control type="text" name="universityState" value={universityData.universityState ?? ""}
                                      onChange={handleUniversityChange} required/>

                        {errors.universityState && <span className="text-danger">{errors.universityState}</span>}
                    </Form.Group>
                    {/*Country*/}
                    <Form.Group className="mb-3">
                        <Form.Label>University Country:</Form.Label>

                        <Form.Control type="text" name="universityCountry"
                                      value={universityData.universityCountry ?? ""} onChange={handleUniversityChange}
                                      required/>

                        {errors.universityCountry && <span className="text-danger">{errors.universityCountry}</span>}
                    </Form.Group>
                    {/*University Website*/}
                    <Form.Group className="mb-3">
                        <Form.Label>University Website Link (Home Page Preferred):</Form.Label>

                        <Form.Control type="url" name="universityUrl" value={universityData.universityUrl ?? ""}
                                      onChange={handleUniversityChange}/>
                        {errors.universityUrl && <span className="text-danger">{errors.universityUrl}</span>}

                    </Form.Group>

                    {/*University type can pick dropdown or radio*/}
                    <Form.Group className="mb-3">
                        <Form.Label>University Type (Public or Private):</Form.Label>

                        <Form.Select name="universityType" value={universityData.universityType ?? ""}
                                     onChange={handleUniversityChange} required>
                            <option value="Public">Public</option>
                            <option value="Private">Private</option>
                        </Form.Select>
                        {errors.universityType && <span className="text-danger">{errors.universityType}</span>}

                    </Form.Group>

                    {/*University Image need to allow multiple images and I am facing issues while adding images like it's going blank*/}
                    <div className="mb-3">
                        <label htmlFor="formFileMultiple" className="form-label">University Images :</label>
                        <input className="form-control" type="file" name="universityImages" onChange={handleFileChange} multiple/>
                    </div>
                    {/*<Form.Group className="mb-3">*/}
                    {/*    <Form.Label>University Images :</Form.Label>*/}

                    {/*    <Form.Control type="file" multiple name="universityImages" onChange={handleFileChange}/>*/}
                    {/*    {typeof errors?.universityImages === "string" && (*/}
                    {/*        <span className="text-danger">{errors.universityImages}</span>)}*/}
                    {/*</Form.Group>*/}

                    {/*University logo*/}
                    <Form.Group className="mb-3">
                        <Form.Label>University Logo</Form.Label>

                        <Form.Control type="file" name="universityLogoImg" onChange={handleFileChange}/>
                        {errors.universityLogoImg && <span className="text-danger">{errors.universityLogoImg}</span>}

                    </Form.Group>


                    {/*Application process*/}
                    <Form.Group className="mb-3">
                        <Form.Label>How to apply for specific course:</Form.Label>
                        <Form.Control type="textarea" name="applicationDes"
                                      value={applicationProcess.applicationDes ?? ""} onChange={handleApplicationChange}
                                      required/>
                        {errors.applicationDes && <span className="text-danger">{errors.applicationDes}</span>}
                    </Form.Group>
                    <AddCourse onCourseChange={(updatedCourse) => setUniversityData({
                        ...universityData,
                        courseData: updatedCourse
                    })} errors={errors}/>
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
