import React, { useState } from 'react'
import {FaSearch} from 'react-icons/fa';

const Search = ({handleSearch}) => {
    
    
    return (
    <form onSubmit={handleSearch} className=' py-5 flex flex-col justify-center mx-auto w-[70%] relative   '>
        <FaSearch size={20}  className='absolute left-4' />        
        <input 
            id="search"
            type="text" placeholder='Search your movie by title'
            required
            className=' bg-gray-400/50 py-2 md:py-4 border border-green-200 px-10 rounded-full block w-full mx-auto' />
        <button 
        type='sumbit'
        // onClick={handleSearch}
        className='absolute right-0 py-2 rounded-full bg-green-500 outline-none md:py-4 px-2 md:px-12'>  Search</button>
    </form>
  )
}

export default Search