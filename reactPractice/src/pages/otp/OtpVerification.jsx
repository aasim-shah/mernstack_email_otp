import axios from 'axios'
import { useEffect, useState } from 'react'
import authService from '../../services/auth.service'
import { useNavigate } from 'react-router-dom'


function OtpVerification() {
    const navigate = useNavigate()
    const [otp, setOtp] = useState(false)
    const [err, setErr] = useState('')
    const [otpCode, setOtpCode] = useState('')
    const [email, setEmail] = useState('')

    const checkOtp = async () => {
        authService.checkOtp().then(res => {
            setEmail(res.data.email)
            if (res.data.otpVerified) {
                navigate('/')
            }
        }
        ).catch(err => console.log(err))
    }

const getOtp = async(e) => {
    e.preventDefault()
    authService.getOtp(email).then(res => {
        console.log(res)
        if(res.data.otp){
            setOtp(true)
        }
    }
    ).catch(err => console.log(err))    
}


const sendOtp = async(e) =>{
    e.preventDefault()
    authService.verifyOtp({email , otpCode}).then(res => {
        if(res.data.otpVerified){
            navigate('/')
        }else{
            setErr("Something Went Wrong !")
        }

    }).catch(err => console.log(err))

}

    useEffect(() => {
        checkOtp()

    }, [])
    return (
        <div>
            <div className="bg-gray-200 h-[93vh] w-full flex justify-center items-center">
                {!otp ? (<form method="post" className="">
                    <div className="mb-2 flex flex-row justify-between bg-white px-1 rounded-md">
                        <input onChange={(e) => setEmail(e.target.value)} type="text" name="email" readOnly className="rounded-md py-2 px-3 outline-none disabled" value={email} />
                        <button type="submit" onClick={getOtp} className="bgThemeClr py-1 rounded-md text-white w-32 ">sendCode</button>
                    </div>
                </form>) : ""}
                {otp ? (<form method="post" className="">
                    <div className="mt-4 flex justify-center">
                        <input onChange={(e) => {setOtpCode(e.target.value)}} type="text" name="otp" className="rounded-md py-2 px-3 outline-none" placeholder="Enter Your OTP ..." id="" />
                        <button onClick={sendOtp} type="submit" className="bgThemeClr py-1 rounded-md text-white w-32 ">Verfiy</button>
                    </div>
                    {err !== "" ? (<span className='text-sm text-red-500 font-semibold mt-3 mx-2'>{err}</span>) : ""}

                </form>) : ""}
            </div>
        </div>
    )
}

export default OtpVerification