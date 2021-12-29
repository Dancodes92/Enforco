import React from 'react'
import { Link } from "react-router-dom"

function Test() {
  return (
    <div>
      <h1>this is a test page</h1>
      <Link to="/another">
        <p>this goes to another page</p>
      </Link>
    </div>
  )
}

export default Test
