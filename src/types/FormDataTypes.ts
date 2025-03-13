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

    // something? means an optional field
    fatherMobile?: string;
    motherMobile?: string;

    tenthPercent?: string;
    tenthGpa: string;

    interPercent?: string;
    interGpa: string;
    numIntBackLogs: string;

    bTechPercent?: string;
    bTechGpa: string;
    numBTechBackLogs: string;



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
    role?: string;

}

