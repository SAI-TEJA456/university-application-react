//axios learning and implementing
//Most used api in the industry
//Axios a Js library used for HTTP requests from frontend to backend
//fetch() is replaced with Axios as it has cleaner syntax
/*
* Axios features
* - supports automatic JSON conversion
* - proper error handling
* - supports request and response interceptors
* - we use same async and await
* */

//here we are creating centralized Axios instance
//which avoid manual axios.get and .post in all files
import axios from 'axios';

// creating an Axios instance
const api = axios.create({
    baseURL: "https://localhost:7288/" ,//backend .Net web Api url
    headers: {
        "Content-Type": "application/json",
    }
})

// we use this to make  requests in all files with same url

export default api;