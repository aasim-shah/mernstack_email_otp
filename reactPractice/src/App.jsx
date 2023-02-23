import { Route, Routes , BrowserRouter} from "react-router-dom"

import './App.css'
import Home from './components/home'
import Homepage from "./pages/Homepage"
import Login from "./pages/Login"
import OtpVerification from "./pages/otp/OtpVerification"
import PageNotFound from "./pages/PageNotFound"
import Signup from "./pages/Signup"

function App() {

  return (
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<Homepage/>} />
    <Route path='/otp' element={<OtpVerification  />} />
    <Route path='/login' element={<Login  />} />
    <Route path='/*' element={<PageNotFound  />} />
    <Route path='/signup' element={<Signup/>} />
  </Routes>
  </BrowserRouter>
  )
}

export default App
