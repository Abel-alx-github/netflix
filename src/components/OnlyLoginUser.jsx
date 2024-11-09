
import React, { useEffect, useState } from 'react'
import { AuthUseUser } from '../context/AuthContext'
import { Navigate } from 'react-router-dom';

const OnlyLoginUser = ({ children }) => {
  // const [person , setPerson] = useState(); 
   
  const {user} = AuthUseUser();

  // const navigate = useNavigate();
    if (!user.email){
      return <Navigate to="/" />
    }
    return children;
  
}

export default OnlyLoginUser;