export interface IStudentFormData{
    firstName:string;
    middleName?:string;
    lastName:string;
    email:string;
    gender:string;
    dob:string;
    martialStatus:string;
    mobile:string;
    addressLine: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
    nationality: string;
    citizenship: string;
    fatherMoblie?: string;
    motherMobile?: string;

    greScore?: number;
    greVerbalScore?: number;
    greQuantScore?: number;

    ieltsScore?: number;
    ieltsListScore?: number;
    ieltsSpeakScore?: number;
    ieltsReadScore?: number;
    ieltsWriteScore?: number;

    tofelScore?: number;
    tofelListScore?: number;
    tofelSpeakScore?: number;
    tofelReadScore?: number;
    tofelWriteScore?: number;

    duolingoScore?: number;
}

