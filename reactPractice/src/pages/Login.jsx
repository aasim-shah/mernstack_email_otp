import {useState} from 'react'
import { Link , useNavigate } from 'react-router-dom'
import {useDispatch , useSelector} from 'react-redux'
import { login } from '../features/auth/authSlice'




function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [err, seterr] = useState('')
    const [inputs, setInputs] = useState({
        email : "",
        password : ""
    })

    const handleOnChange = (e) => {
        setInputs({...inputs , [e.target.name] : e.target.value})
    }

     
    const handleOnSubmit = async(e) => {
        e.preventDefault()
        dispatch(login(inputs)).then(res => {
            console.log(res)
            if(res.payload.token){
                navigate('/')
            }else{
                seterr('Wrong Credintials !')
            }
        }).catch(err => console.log(err))
        console.log(inputs)
    }
    return (
        <div>
            <div className="h-[87vh] w-full flex justify-center items-center">
                <div className="w-10/12 sm:w-4/12 mx-auto">
                        <div className="mb-3">
                            <input type="email" onChange={(e)=>{handleOnChange(e)}} required name="email" placeholder="Email ... " className="outline-blue-300 border-2 py-2 px-3 w-full rounded-md" />
                        </div>
                        <div className="mb-3">
                            <input name="password" onChange={(e)=>{handleOnChange(e)}} pattern=".{4,16}" title="8 or more Character" type="password" placeholder="Password " className="outline-blue-300 border-2 py-2 px-3 w-full rounded-md" />
                        </div>
                        {err !== "" ? (<span className='text-sm text-red-500 font-semibold my-2 mx-2'>{err}</span>) : ""}
                        <div className="">
                            <button onClick={handleOnSubmit} className="py-1 px-3 bgThemeClr text-white rounded-sm font-bold w-full ">Login</button>
                        </div>
                    <div className="flex flex-row mt-3 justify-evenly">
                        <p className="text-sm text-gray-500">Already Having  Account ? </p>
                        <Link to="/signup" className="underline textThemeClr">Signup</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login