//to add university form
//should be available in university card with few details and modal to show more details
//added by representative
import {Card, Form} from "react-bootstrap";
import * as React from "react";

function AddUniversity() {
    return (
        <>
        {/*research -
        following yocket website for gather details
        and some other university pages
        */}
        {/*about college some description*/}
            <h1>Add University</h1>
        {/*    General university details*/}
        {/*
        university images
        universityname
        university state
        country
        */}
            {/*about universiyty*/}
            {/*courses representative able to more than one university
            course name
            about course
            costs - anual tution, total tution
            addmission fee
            requriments
            tofel score over all
            ielts score over all
            gre -overall
            duolingo over all
            */}
            {/*how to apply
            general description and university link for more details
            */}

            <Card className="mt-3 p-3">
                <h4 className="text-center">About University</h4>
                <Form>
                    {/*University name*/}
                    <Form.Group className="mb-3">
                        <Form.Label>C</Form.Label>

                        <Form.Control type="text" name="universityName" value={} onChange={} required/>

                        { && <span className="text-danger">{}</span> }
                    </Form.Group>
                    {/*university Description*/}
                    <Form.Group className="mb-3">
                        <Form.Label>Add Some University Description</Form.Label>
                        <Form.Control type="textarea" name="universityDes" value={} onChange={} required/>
                        { && <span className="text-danger">{}</span> }
                    </Form.Group>
                    {/*citizenship*/}
                    <Form.Group className="mb-3">
                        <Form.Label>C</Form.Label>

                        <Form.Control type="text" name="citizenship" value={formData.citizenship} onChange={handleChange} required/>

                        {errors.citizenship && <span className="text-danger">{errors.citizenship}</span> }
                    </Form.Group>
                    {/*Father Mobile Number*/}
                    <Form.Group className="mb-3">
                        <Form.Label>Father Mobile Number (optional)</Form.Label>

                        <Form.Control type="tel" name="fatherMobile" value={formData.fatherMobile} onChange={handleChange}/>
                        {errors.fatherMobile && <span className="text-danger">{errors.fatherMobile}</span> }

                    </Form.Group>
                    {/*Mother Mobile Number*/}
                    <Form.Group className="mb-3">
                        <Form.Label>Mother Mobile Number (optional)</Form.Label>

                        <Form.Control type="tel" name="motherMobile" value={formData.motherMobile} onChange={handleChange}/>

                        {errors.motherMobile && <span className="text-danger">{errors.motherMobile}</span> }
                    </Form.Group>
                </Form>
            </Card>
        </>
    )
}
export default AddUniversity;