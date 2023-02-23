import axios from "axios"
import authToken from "./authToken.service"
const API_URL = "http://localhost:5000/"


const checkOtp = async() =>{
    return axios.get(API_URL+"checkOtpVerified", {headers : authToken()})
}

const getOtp = async(email) =>{
    return axios.post(API_URL+"getOtpCode",{email}, {headers : authToken()})
}
const verifyOtp = async({email , otpCode}) =>{
    return axios.post(API_URL+"verifyOtp",{email , otpCode}, {headers : authToken()})
}

const getPrivateData = async () =>{
    return axios.get(API_URL+"private" , {headers : authToken()})
}


const postPrivateData = async (props) =>{
    console.log(authToken())
return axios.post(API_URL+"private", props ,{headers : authToken()})
}


    const authService = {getPrivateData , postPrivateData , checkOtp  , getOtp , verifyOtp}

export default authService