import React from 'react'

function PageNotFound() {
  return (
    <div>
        <div className="bg-yellow-100 w-full flex flex-col justify-center items-center h-[100vh]">
    <p className="text-4xl font-black">404 / Page Not Found !!</p>
    <p className="text-sm mt-3">Want to visit Homepage ?<a to="/" className="underline"> HOMEPAGE </a></p>
</div>
    </div>
  )
}

export default PageNotFound