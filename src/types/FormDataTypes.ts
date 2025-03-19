// Created by liesetty
/*
* Interface = one interface can be used but all the components doesn't need all the data of one interface
*               and some caused required troubles.
*              so the best approach is to use inheritance - extends keyword allowing to use multiple interfaces.
* Typescript =   interfaces does not support inheritance exactly like classes but using extends keyword we can achieve it
*
*Inheritance = parent -child
* Encapsulation - grouping related data together while hiding unnecessary details.
* Polymorphism = allows a single function, interface, or class to handle different data structures.
*                   using Partial<> enables flexible data management.
* Composition = we compose smaller, reusable interfaces
* */

//first user related data should be base used by lot of components


export interface IUserData{
    firstName:string;
    middleName?:string;
    lastName:string;
    email:string;
    role: "Student" | "Representative" | string;
}

export interface IAuthData{
    password: string
    confirmPassword?: string //sign In dont need
}


export interface IGeneral extends IUserData{
    gender:string;
    dob:string;
    maritalStatus:string;
    mobile:string;
    addressLine: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
    nationality: string;
    citizenship: string;

    // something? means an optional field
    fatherMobile?: string;
    motherMobile?: string;
}

export interface IEducationDel extends IUserData{
    tenthPercent?: string;
    tenthGpa: string;

    interPercent?: string;
    interGpa: string;
    numIntBackLogs: string;

    bTechPercent?: string;
    bTechGpa: string;
    numBTechBackLogs: string;
}

export interface IStudentTestScores extends IUserData{
    greScore?: string;
    greVerbalScore?: string;
    greQuantScore?: string;

    ieltsScore?: string;
    ieltsListScore?: string;
    ieltsSpeakScore?: string;
    ieltsReadScore?: string;
    ieltsWriteScore?: string;

    tofelScore?: string;
    tofelListScore?: string;
    tofelSpeakScore?: string;
    tofelReadScore?: string;
    tofelWriteScore?: string;

    duolingoScore?: string;
}

export interface IUniversityGeneral {
    universityAbout: string;
    universityCountry: string;
    universityImages:  File[] ;
    universityLogoImg: string;
    universityName: string;
    universityState: string;
    universityType: "Public" | "Private";
    universityUrl: string
    courseData?: ICourseDetails[];
}

export interface ICourseDetails{
    courseName: string;
    courseDescription: string;
    annualTuitionFee: string;
    totalTuitionFee: string;
    courseDuration?: string;
    // //linking test scores
    // testScoreRequirements: IStudentTestScores;
    // educationRequirements?: Partial<IEducationDel>;
    // courseApplicationRequire: IApplicationProcess;
}

export interface  IApplicationProcess{
    applicationDes: string;
    courseUrl: string;
    applicationDeadline: string;
    applicationFee?: string;
}