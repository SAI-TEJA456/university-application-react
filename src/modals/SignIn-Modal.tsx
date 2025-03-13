// <FormControl> renders a form control with Bootstrap styling
// <FormGroup> wraps a from control with proper spacing, label, help text and validation state
// created by Liesetty
// used some sources to use library and learnt
import {Form, Button, Modal} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {useState, useEffect, useContext} from "react";
import api from "../api/axiosConfig.ts";
import {AxiosError} from "axios";
import {IUser, UserContext} from "../components/UserContext.tsx";

//form data structure
interface IFormData {
    firstName: string;
    middleName?: string;
    lastName: string;
    email: string;
    password: string;
    role: "Student" | "Representative";
}

//validation
// we are using yup library from react to declare rules for validation
const schema = yup.object().shape({
    email: yup.string().email("Invalid email format").required("Email is required"),
    password: yup.string()
        .min(8, "Password must be at least 8 characters")
        .matches(/^(?!.*[@#$]{2,})[A-Za-z0-9]*[@#$]{1}[A-Za-z0-9]*$/, "Must contain exactly one special character (@, #, or $)")
        .matches(/[0-9]/, "Must contain at least one number")
        .required("Password is required"),
    role: yup.string().oneOf(["Student", "Representative"]).required("Please select a role"),
});

//SignIn Modal used for sign in with in the page
//lets validate sign in page with a react hook form with yup library

function SignInModal(
    { show, handleClose }: { show: boolean; handleClose: () => void }) {
    // to change state to false a boolean upon click close button
    // it's is an alternate way but doing this will not be a child component or Modal for Navigation bar
    // const [show, setShow] = useState(false);
    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    const navigate = useNavigate();
    //to updateUser data here
    const {updateUser} = useContext(UserContext) || {};


    const [loading, setLoading] = useState(false);//loading when get request is made
    const [error, setError] = useState("");




    const {
        register, //register input username
        handleSubmit, //calls onSubmit event
        watch, //watch user input changes
        formState: { errors }, //handle error assigning
    } = useForm({ resolver: yupResolver(schema) });//yupResolver integrates rules set in yup reduces complex validation and makes easy to dfine rules

    // real-time password validation tracking
    //check in console
    const password = watch("password", ""); // Watch password field
    const [passwordValidation, setPasswordValidation] = useState({
        minLength: false,
        specialChar: false,
        number: false,
    });

    //useEffect
    /*
    *
*useEffect() = React Hook that tells React DO SOME CODE WHEN (pick one):
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
* USES
* #1 Handling Event Listeners
* #2 DOM manipulation
* #3 Subscriptions(real-time updates)
* #4 Fetching Data from an API
* #5 Clean up when a component unmounts
* */
    //here we are are doing real-time validation
    //password is validated on mount by call validatePassword function and dependencies [password it will change when user do something]
    //due to this useEffect trigger and calls validate password method until user chnage passowrd field
    useEffect(() => {
        validatePassword(password);
    }, [password]);

    // real-time password validation function
    //function to validate password
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

        setPasswordValidation({minLength, specialChar, number});
    };

    // Track password field changes for real-time validation
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        validatePassword(e.target.value);
    }


    //Handle form submission
    //async returns a promise (object/class) of the data we declared in formData
    const onSubmit = async (data: Partial<IFormData>) => {
        //state to show we are finding user and login him
        setLoading(true);//starts loading
        setError("");//error can anything
        try {
            //post is like we are submit data to server for further validation
            //using post will enclose data of the user
            //await is like data from object assigned to response Json data from api
            const response = await api.post("/api/users/login",{
                firstName: data.firstName,
                middleName: data.middleName,
                lastName: data.lastName,
                email: data.email,
                password: data.password,
                role: data.role,
            })
            //so when we mad an HTTP request we have certain status code
            //for now 200 means OK or successfull
            if(response.status === 200){
                // here we start storing data received from api request
                console.log("What data I am receiving?", response.data);
                const userData : IUser = response.data;

                //updating user data in useContext declared
                updateUser?.(userData);
                //store user data in local storage
                localStorage.setItem("user", JSON.stringify(userData));
                //here we open dashboard
                // alert("Signed in successfully");
                //depending on the role we navigate to rsepective routes declared in App.tsx
                navigate(userData.role === "Student" ? "/student-dashboard" : "/representative-dashboard");
                //closes signIn-Modal
                handleClose();
            }
        }catch(err){
            //axios handle api error very well
            //which ever error is caused while fetching assigned to axios errors
            const axiosError = err as AxiosError<{message?: string}>;
            console.log("Sign In Error", axiosError);
            //if it is true that means we got response from server so we error with server message
            if(axiosError.response){
                setError(axiosError.response.data.message || "Invalid email or password");
            }else{
                //else we set this error
                setError("Something went wrong, please try again");
            }
        } finally {
            //once data response is validated from api we change state to false loading.
            setLoading(false);
        }
    };

    return (
        //OnHide event listener = backdrop clicked or esc key
        <Modal
            show={show}
            onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Sign In</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/*    Crate Sign In Form here*/}
                <Form onSubmit={handleSubmit(onSubmit)}>
                    {/*email address*/}
                    <Form.Group className="mb-3" controlId="formBasciEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" {...register("email")} />
                        <Form.Text className="text-muted">
                            Enter your registered email address
                        </Form.Text>
                        <span className="text-danger">{errors.email?.message}</span>
                    </Form.Group>
                    {/*password*/}
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" {...register(("password"))} onChange = {handlePasswordChange} />
                        <ul className="text-muted small mt-2">
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
                    {/*roles*/}
                    <Form.Group className="mb-3" >
                        <Form.Check inline type="radio" label="Student" value="Student" {...register("role")}/>
                        <Form.Check inline type="radio" label="Representative" value="Representative" {...register("role")}/>
                        <span className="text-danger">{errors.role?.message}</span>
                    </Form.Group>
                    {/*API Error*/}
                    {error && <p className="text-danger">{error}</p>}
                    {/*submit button*/}
                    <Button variant="primary" type="submit" disabled={loading}>
                        {loading? "Signing In..." : "Sign In"}
                    </Button>
                </Form>
                {/*signUp link*/}
                <div className="mt-3 text-center">
                    <p>
                        Dont have an account?{" "}
                        <Link to="/signup" onClick={handleClose}>Sign Up</Link>
                    </p>
                </div>
            </Modal.Body>
        </Modal>

    );
}

export default SignInModal;