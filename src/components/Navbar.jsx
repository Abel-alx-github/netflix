

import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthUseUser } from '../context/AuthContext';

const Navbar = () => {
  const {user, logOut} = AuthUseUser();
  
  // console.log("user===in navbar", user)

  const navigate = useNavigate();

  const signout = async () => {
      try {
        await logOut();
        navigate("/");

      }
      catch (error) {
        console.log(error.message);
      }
  }

  return (
    <div className='z-[1001] fixed bg-black top-0 left-0 w-full p-4  flex items-center justify-between '>
        <Link to="/" 
        > 
            <h1
            className='uppercase text-red-600 font-nsans-bold cursor-pointer 
                       lg:text-4xl'
            >netflix</h1>
        </Link>

        {
          user?.email ? 
         
        <div className=''>
          <Link to={`${user.email ? "/profile" : "/"} `}>
            <button
            className='capitalize pr-4'
            >Profile</button>
           </Link>
       
            <button
              onClick={signout}
              className='capitalize bg-red-600 px-3 py-1 lg:px-6 lg:py-2 rounded cursor-pointer'
            >logout</button>

        </div>
          :
         <div className=''>
              <Link to="/login">
                <button
                className='capitalize pr-4'
                >login</button>
              </Link>

              <Link to="/signup">
                <button
                  className='capitalize bg-red-600 px-6 py-2 rounded cursor-pointer'
                >signup</button>
               </Link>
          </div>
         
         }
    </div>
  )
}

export default Navbar