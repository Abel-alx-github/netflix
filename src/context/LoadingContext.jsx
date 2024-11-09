
import React, { createContext, useContext, useState } from 'react'


export const LoadingContext = createContext();


const LoadingContextProvider = ({children}) => {
   const [loading, setLoading] = useState(false);
    
    return (
    <LoadingContext.Provider value={{loading, setLoading}}>
        {children}
    </LoadingContext.Provider>
  )
}

export const UseLoadingContext = () => {
    return useContext(LoadingContext);
}

export default LoadingContextProvider