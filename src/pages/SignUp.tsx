import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {useContext, useState} from "react";
import api from "../api/axiosConfig.ts";
import {AxiosError} from "axios";
import {UserContext} from "../components/UserContext.tsx";
import {useNavigate} from "react-router-dom";
import {IUser} from "../components/UserContext.tsx"
// created by Liesetty
//Sign up validation without Libraries
//we are using Regex = Regular Expression used for validate input, search, replace text, extract useful data

//March 12 here now redirecting user to respective dashboards
interface IValidationErrors{
    firstName?: string;
        middleName?: string;//can be null
        lastName?: string;
        email?: string;
        password?: string;
        confirmPassword?: string;
        role?:  string;
}

function SignUp() {
    //create state for input
    const [formData, setFormData] = useState({
        // object creation
        firstName: "",
        middleName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: ""
    });

    const [passwordValidation, setPasswordValidation] = useState({
        minLength: false,
        specialChar: false,
        number: false,
    })

    //for storing user details on sign up
    const {updateUser} = useContext(UserContext) || {};
    const navigate = useNavigate();

    // create state for errors
    const [errors, setErrors] = useState<IValidationErrors>({
        firstName: "",
        middleName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: ""
    });

    // loading state have to be used so that some API requests take some time to receive data
    const [loading, setLoading] = useState(false);

    //function to validate password
    // we set three conditions and we pass it to regex .test method which validate and store boolean values
    const validatePassword = (inpPassword: string) => {
        const minLength = /.{8,}/.test(inpPassword);
    //     . = matching any character
    //     {8,} condition to minimum character required
        const specialChar = /[A-Za-z0-9]*[@#$]{1}[A-Za-z0-9]*$/.test(inpPassword);
    //     [A-Za-z0-9]* = allows combination of letters and number before special charcater
    //     [@#$] = maintain exactly one special char.
    //     [A-Za-z0-9]*$ = allows combination of letters and number after special charcater
        const number = /[0-9]/.test(inpPassword);
    //     condition to have atleast one numeric digit
    //     Regex uses .test(input) for password

        // another useState which assign all boolean values
        setPasswordValidation({minLength, specialChar, number});
    };

    // Handling input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        // ...formData here as state try to always render and as new value ...this will catch previous data and combine with new data
        // [name] : value} this will work as key: value
        setFormData({...formData, [name] : value});

        //password validation we send to another function for dynamic/ real tme validation
        if(name == "password"){
            validatePassword(value);
        }
        setErrors({...errors, [e.target.name]: ""});
    };
    // Handling form submission
    // we will be send data to the data base using backend server.
    // backend server will handle all API request made in the frontend and maintain safety
    //anything with ":" is object notation
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        let validationErrors: IValidationErrors= {}

        // here all if conditons store errors message in a object
        if(!formData.firstName) validationErrors.firstName = "First name is required";
        if(!formData.lastName) validationErrors.lastName = "Last name is required";
        // we check email format @something.com is entered or not
        if(!formData.email.includes("@")) validationErrors.email = "Invalid email format";
        if(!formData.role) validationErrors.role = "Please select a role";

        if (!passwordValidation.minLength) validationErrors.password = "Password must be at least 8 characters long.";
        if (!passwordValidation.specialChar) validationErrors.password = "Password must contain exactly one special character (@, #, or $).";
        if (!passwordValidation.number) validationErrors.password = "Password must contain at least one number.";

        if (formData.password !== formData.confirmPassword) validationErrors.confirmPassword = "Passwords do not match.";

        if(Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setLoading(true);//starts loading means API request is starting
        try{
            //as we need to send data to server lets create post request
            //"/api/user" is url we create for user table
            const response = await api.post("/api/users", formData)//api is the one we created with base url/server url
            //checking on successful request which status i am receiving
            console.log(response.status);
            if (response.status === 201){
                const userData : IUser = {
                    firstName: formData.firstName,
                    middleName: formData.middleName,
                    lastName: formData.lastName,
                    email: formData.email,
                    role: formData.role
                }
                //update user as it need object
                updateUser?.(userData);
                //now we need to store data in local storage
                localStorage.setItem("user", JSON.stringify(userData));
                //now we need to redirect to respective dashboard
                console.log("Redirecting to:",formData.role === "Student" ? "/student-dashboard" : "/representative-dashboard")
                navigate(formData.role === "Student" ? "/student-dashboard" : "/representative-dashboard");
            }
            // alert("Signed up successfully");//we need redirect to user or representative page
            console.log(response.data);// just check which data sent
        } catch (err){
            const axiosError = err as AxiosError<{message?: string}>;
            console.log("Sign Up Error", axiosError);
            if(axiosError.response){
                setErrors((validationErrors) ={...validationErrors, email: axiosError.response.data.message});
            }else{
                alert("Something went wrong, Please try again later.");
            }
        }// all async-await works better using try-catch for error handling
        // if more than one error that store in object set to errors useState
        finally {
            setLoading(false); //stops loading
        }


    };

    return (
        <Container className="mt-5 pt-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <h2 className="text-center">Create an Account</h2>
                    <Form onSubmit={handleSubmit}>
                    {/*    First name*/}
                        <Form.Group className="mb-3" controlId="formBasicFirstName">
                            <Form.Label>First Name</Form.Label>
                            {/*onchange catches data entered by user pass to handleChange function. */}
                            {/*value entered by user will be assigned to objects in useState*/}
                            <Form.Control type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
                            {/*error are set to each key in error useState as per validation*/}
                            <span className="text-danger">{errors.firstName}</span>
                        </Form.Group>
                    {/*    Middle Name*/}
                        <Form.Group className="mb-3" controlId="formBasicMiddleName">
                            <Form.Label>Middle Name</Form.Label>
                            <Form.Control type="text" name="middleName" value={formData.middleName} onChange={handleChange} />
                        </Form.Group>
                    {/*    Last Name*/}
                        <Form.Group className="mb-3" controlId="formBasicLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
                            <span className="text-danger">{errors.lastName}</span>
                        </Form.Group>
                        {/*Email address*/}
                        <Form.Group className="mb-3" controlId="formBasciEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} />
                            <span className="text-danger">{errors.email}</span>
                        </Form.Group>
                        {/*password*/}
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} />
                            <ul className="text-muted small mt-2">
                                {/*hear real-time validation where state passwordValidation values were compared assigned its values*/}
                                <li className={passwordValidation.minLength ? "text-success" : "text-danger"}>
                                    {passwordValidation.minLength ? "✔" : "✘"} At least 8 characters
                                </li>
                                <li className={passwordValidation.specialChar ? "text-success" : "text-danger"}>
                                    {passwordValidation.specialChar ? "✔" : "✘"} Exactly one special character (@, #, or $)
                                </li>
                                <li className={passwordValidation.number ? "text-success" : "text-danger"}>
                                    {passwordValidation.number ? "✔" : "✘"} At least one number
                                </li>
                            </ul>
                        </Form.Group>
                        {/*Confirm password*/}
                        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
                            <span className="text-danger">{errors.confirmPassword}</span>
                        </Form.Group>
                        {/*roles*/}
                        <Form.Group className="mb-3">
                            <Form.Check inline type="radio" label="Student" name="role" value="Student" onChange={handleChange} />
                            <Form.Check inline type="radio" label="Representative" name="role" value="Representative" onChange={handleChange} />
                            <br/>
                            <span className="text-danger">{errors.role}</span>
                        </Form.Group>
                        {/*submit button*/}
                        <Button variant="primary" type="submit" disabled={loading}>
                            {loading? "Signing Up..." : "Sign Up"}
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default SignUp;