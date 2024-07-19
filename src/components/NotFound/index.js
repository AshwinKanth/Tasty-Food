import React from 'react'
import { Link } from 'react-router-dom'
import "./index.css"

const NotFound = () => {
  return (
    <div className='notFound-container'>
      <img src='https://res.cloudinary.com/dq1ktqbtb/image/upload/v1721292836/Group_lb2zbz.png' className='notFoundImage' alt='' />
      <h1 className='notFound-heading'>Page Not Found</h1>
      <p className='notFoundDescription'>We are sorry, the page you requested could not be found.Please go back to the homepage</p>
      <Link to="/" className="link">
        <button className="shop-now-btn" type='button'>Home Page</button>
      </Link>
    </div>
  )
}

export default NotFound