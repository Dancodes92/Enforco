import React from 'react'

function Spinner() {
  // create a spinner component with tailwind classes and have it spin
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )

}

export default Spinner
