import React from 'react'
import { Bars } from  'react-loader-spinner'

function Loader({width , height , colour }) {
  return (
    <div className=''>
        <Bars
          height = {height}
          className="mx-auto"
          width = {width}
          radius = "9"
          color = {colour}
          ariaLabel = 'three-dots-loading'     
          wrapperStyle={{display : "flex" , justifyContent:"center"}}
          wrapperClass
        />
    </div>
  )
}

export default Loader