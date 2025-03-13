//Created by Liesetty

// March 11 working on it
//Let's Understand why we are using UserContext
/*
* UserContext Stores Data related user - name, email,role, Token(will do this in feature)
*
* we are using useContext()= 1. It is a react hook that lets components share data
* without passing props manually
* (like we did in sign-in modal what happens over there is we use parent-child model
* NavigationBar.tsx is parent and SignIn-Modal.tsx receive props).
* 2. using useContext for storing user details we will be access user data from any component directly
*
* useContext= practice notes
*
 * useContext() = React Hook that allows you to share values
 *                between multiple levels of components
 *                without passing props through each level
 *
 * PROVIDER COMPONENT
 * 1. import {createContext} from 'react'
 * 2.export const MyContext = createContext();
 * 3.<MyContext.Provider value={value}>
 *     <child>
 *         </MyContext.Provider>
 *
 * CONSUMER COMPONENT
 * 1. import React, {useContext} from 'react';
 *    import {MyContext} from './MyComponentA';
 * 2. const value = useContext(MyContext);
 *
 * Now Let's Understand what are storing options after authentication and how data will acts upon certain changes
 * 1.useState- temporary data
 * - stores data when page is open (you can test at addStudentDetails if I don't change)
 * - lost on page reload
 * - Ideal for UI state but not authentication state
 * - best use in this project for understanding is setting errors
 *
 * 2. Local storage - persistent user data
 * - persists even after page reloads (until manually cleared)
 * - easily accessible across components/pages unlike useState we have to pass it through props
 * - Less secure because some details have to be not shown in developer tools which it does
 * - states are fast in first access than local storage
 * example - localStorage.setItem("user", JSON.stringify({name : "Sai Teja"}) //declaring local storage
 * const user = JSON.parse(localStorage.getItem("user") || "{}");
 *
 * 3. Session Storage - similar to local storage difference is clears on closing tabs)
 * - I used this in my PHP project
 * - less risky than the local storage
 * - we can use sessions for storing data for a certain time
 *      lets me explain what I did in my php project we store some data related
 *      to rental houses as user might go to other page and come back using
 *      session we can reduce unnecessary data requests to database with that and
 *      data will be lost once user close the tabs. we might use for university data
 *
 * 4. React Context + useState / Local storage - sharing data across components
 * - Stores user data in memory (useState or local Storage) and refreshing will give data back
 * - using useContext data available globally
 * - used when multiple components need same data
 * - still risky for authentication data as local storage attack by XSS attack
 *
 * 5. React Context +Local storage + JWT - JSON web Token for authenticate users (May use in future)
 * - Token = used for authentication & API security
 * - Toked mainly stored in HTTP(Hypertext Transfer Protocol)- cookies, can be stored in Local storage.
 * - user making an API request, Token is sent to backend for authentication
 * - if we store in local storage(risky always) if they change data they can't make API request without a valid token
 */



import {createContext, useState} from "react";
import * as React from "react";

// define what data to be stored and data type for typeSafety(may add data in future)
export interface IUser {
    firstName : string;
    middleName? : string;
    lastName : string;
    email: string;
    role: string;
}

//acts like this user
interface UserContextType {
    user: IUser | null; //holds specific user's data who logged in
    updateUser: (user: IUser | null) => void; //updates user data after login or sign out
}

// use practice notes
//creating context (think like a Db for storing data)
export const UserContext = createContext<UserContextType | null>(null); //creates global storage

//provider component

//{children} a special prop in react helps in wrapping other components
//this component I am exporting it to main.tsx and wrapping my entire application (<App /> with <UserProvider><UserProvider/>
//this will allow in updating storage and user state management like logged in /out
//lets have an example as UserProvider is components and {children} can be signIn-Modal.tsx,Navigationbar.tsx, AddStudentDetails.tsx, etc.
//here children components changing anything related to user data will automatically trigger this function and update state and storage
//state for show user details where ever we fetech.
export function UserProvider({children} : {children: React.ReactNode}){
    //storing data in local storage with useState
    const [user, setUser] = useState<IUser | null>(() =>{
        return JSON.parse(localStorage.getItem("user") || "null"); //max storage 5mb
    });

    //Update both state and local storage
    const updateUser = (newUser : IUser | null) =>{
        setUser(newUser);
        //checking if someone trying to log in
        if (newUser){
            localStorage.setItem("user", JSON.stringify(newUser));
        }else {
            //is user state is null or trying to sign out
            localStorage.removeItem("user");
        }
    };

    return(
        // Here we are allowing UserProvider to return its methods to all components.
        // .Provider is a property of UserContext, and it is a React component that wraps other components to share data globally.
        // In main.tsx, we declared <UserProvider><App /></UserProvider>.
        // App is a child component, and when the application runs, it calls this function.
        // After running its methods, it returns values as props to all child components of `App`.
        // UserContext.Provider is a React built-in component for wrapping other components to share data.

        <UserContext.Provider value={{user, updateUser}}>
            {children}
        </UserContext.Provider>)
}