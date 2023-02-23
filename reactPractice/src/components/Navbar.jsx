import React from 'react'
import { Link } from 'react-router-dom'


function Navbar() {
  return (
       <nav className="bgThemeClr h-16  w-full flex items-center justify-center">

<div className="w-11/12 mx-auto flex flex-row justify-between items-center">
    <div className="text-xl font-bold text-white"><a to="/" className="">Quizett </a></div>
   <div className="flex flex-row ">
        <div className="hidden sm:flex">
            <Link to="/about" className="text-white mr-4  hover:border-b-2 border-white">About us</Link>
            <Link to="/about" className="text-white mr-4  hover:border-b-2 border-white">Contact us</Link>
            <Link to="/about" className="text-white mr-8  hover:border-b-2 border-white">Join us</Link>
        </div>

    <div className="icons relative " id="userIcon" >
        <span className="bg-gray-100  px-3 py-2 rounded-[2rem] ">user icon</span>
        <div className="loginContainer absolute w-32  bg-white border-2 hidden right-0 rounded-md py-2">
           <div className="flex flex-col w-full flex justify-center items-center">
            <Link to="/user/profile" className="mb-2  border-b-2  border-black">Profile</Link>
            <Link to="/login" className="mb-2 border-b-2  border-black">Login</Link>
           </div>
        </div>
    </div>

   </div>
</div>
</nav>



  )
}

export default Navbar