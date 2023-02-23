import {useState} from 'react'
import { Link , useNavigate} from 'react-router-dom'
import {useDispatch , useSelector} from 'react-redux'
import { login, register } from '../features/auth/authSlice'

function Signup() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [inputs, setInputs] = useState({
        fullName : "",
        email : "",
        password : "",
        Cpassword : ""
    })

    const handleOnChange = (e) => {
        setInputs({...inputs , [e.target.name] : e.target.value})
    }

     
    const handleOnSubmit = async(e) => {
        e.preventDefault()
        if(inputs.password === inputs.Cpassword){
            dispatch(register(inputs)).then(res => {
                console.log(res)
                if(res.payload.token){
                    navigate('/otp')
                }
            }).catch(err => console.log(err))
        }
    }
    return (
        <div>
            <div className="h-[87vh] w-full flex justify-center items-center">
                <div className="w-10/12 sm:w-4/12 mx-auto">

                    <form method="post" >

                        <input  onChange={(e)=>{handleOnChange(e)}} type="text" name="fullName" placeholder="Full Name ..." id="" required className="outline-blue-300 rounded-md border-2 py-2 px-3 mb-2 w-full" />

                        <div className="mb-3">
                            <input type="text" onChange={(e)=>{handleOnChange(e)}} name="email" placeholder="Email " required className="outline-blue-300 rounded-md border-2 py-2 px-3 w-full" />
                        </div>

                        <div className="mb-3">
                            <input name="password" onChange={(e)=>{handleOnChange(e)}} pattern=".{4,16}" title="4 or more Character" required type="password" placeholder="Password " className="outline-blue-300 rounded-md border-2 py-2 px-3 w-full" />
                        </div>
                        <div className="mb-3">
                            <input name="Cpassword" onChange={(e)=>{handleOnChange(e)}} pattern=".{4,16}" title="4 or more Character" required type="password" placeholder="Confirm Password " className="outline-blue-300 rounded-md border-2 py-2 px-3 w-full" />
                        </div>
                        <div className="">
                            <button type="submit" onClick={handleOnSubmit} className="py-1 px-3 bgThemeClr rounded-md font-bold w-full text-white  ">R E G I S T E R</button>
                        </div>
                    </form>
                    <div className="flex flex-row mt-3 justify-evenly">
                        <p className="text-sm text-gray-500">Not having Account ? </p>
                        <Link to="/login" className="underline textThemeClr">Login</Link>
                    </div>
                </div>

            </div>





        </div>
    )
}

export default Signup