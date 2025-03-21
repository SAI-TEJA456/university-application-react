
// Created by Liesetty
//form for student background info
import { Card, Form} from "react-bootstrap";
import {IGeneral} from "../types/FormDataTypes.ts";
import * as React from "react";

function BackgorundInfo(
    {
        formData,
        handleChange,
        errors,
    } :{
        formData: IGeneral;
        handleChange: (e : React.ChangeEvent<HTMLInputElement>) => void;
        errors: Partial<IGeneral>;
    }
) {
    return (

        <Card className="mt-3 p-3">
            <h4 className="text-center">Background Information</h4>
            <div>
                {/*nationality*/}
                <Form.Group className="mb-3">
                    <Form.Label>Nationality</Form.Label>
                    <Form.Control type="text" name="nationality" value={formData.nationality ?? ""} onChange={handleChange} />
                    {errors.nationality && <span className="text-danger">{errors.nationality}</span> }
                </Form.Group>
                {/*citizenship*/}
                <Form.Group className="mb-3">
                    <Form.Label>Citizenship</Form.Label>

                    <Form.Control type="text" name="citizenship" value={formData.citizenship ?? ""} onChange={handleChange} />

                    {errors.citizenship && <span className="text-danger">{errors.citizenship}</span> }
                </Form.Group>
                {/*Father Mobile Number*/}
                <Form.Group className="mb-3">
                    <Form.Label>Father Mobile Number (optional)</Form.Label>

                    <Form.Control type="tel" name="fatherMobile" value={formData.fatherMobile ?? ""} onChange={handleChange}/>
                    {errors.fatherMobile && <span className="text-danger">{errors.fatherMobile}</span> }

                </Form.Group>
                {/*Mother Mobile Number*/}
                <Form.Group className="mb-3">
                    <Form.Label>Mother Mobile Number (optional)</Form.Label>

                    <Form.Control type="tel" name="motherMobile" value={formData.motherMobile ?? ""} onChange={handleChange}/>

                    {errors.motherMobile && <span className="text-danger">{errors.motherMobile}</span> }
                </Form.Group>
            </div>
        </Card>
    )
}

export default BackgorundInfo;