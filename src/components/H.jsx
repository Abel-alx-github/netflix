import axios from 'axios'
import React, { useEffect, useState } from 'react'
import endpoints, { imageUrl, searchMovie } from '../services/tmdbServices'
import bg from '../assets/signup-bg.jpg';
import { useNavigate } from 'react-router-dom';
import Search from './Search';
import { UserSearchMovie } from '../context/SearchMovieContext';
import { AuthUseUser } from '../context/AuthContext';

const Hero = () => {
  const [email, setEmail] = useState();
  const user = AuthUseUser();
  const {setFilms} = UserSearchMovie();
  console.log(user?.user?.email, "user")

 
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmail(document.getElementById("email").value);

  }
  
  const handleSearch = async (e) => {
    e.preventDefault();
    const title = document.getElementById("search").value 

    try {
        const movies = await searchMovie(title);
        setFilms(movies);
    }
    catch(er) {
        console.log(er);
    }
   
    
}
  const shorten = (text, len) => {
    if(!len || len >= text.length) return text;
        return text.slice(0, len) + "...";
  }

  if(email){
    return navigate("/login", {state: {userEmail: email}}) 
  }


  return (
    <div className={` relative w-full  ${ user?.user?.uid ? "min-h-[250px] -mb-[3rem]" : "min-h-[500px] mb-[10rem]"}`}>
      <div className='w-full h-full  '>
        <div className={`absolute w-full  h-full bg-gradient-to-r from-black`}>
        
          <img src={bg} alt="hero background"
               className='w-full h-full object-cover object-top' />

          <div className='absolute w-full top-[20%] lg:top-[25%] p-4 md:p-8 z-10'>
           {
            !user?.user?.uid ? 
           
           <>
           <h1 className='text-2xl md:text-5xl leading-snug font-nsans-bold  mx-auto text-center' >Unlimited movies, TV < br/> shows, and more</h1>
            <p className='text-center text-xs md:text-lg py-4'>Starts at USD 2.99. Cancel anytime.</p>
            <p className='text-center max-w-[85%] md:max-w-[35rem] mx-auto text-xs md:text-lg leading-[2]'>Ready to watch? Enter your email to create or restart your membership.</p>
            
            <form onSubmit={handleSubmit} className='flex mx-auto mt-10 max-w-[95%]  md:max-w-[40rem] flex-col md:flex-row justify-center gap-1'>
              <input id="email"
                     className='p-4 w-full md:w-[50%] px-3  bg-black border border-green-300 rounded-md'
                     type="email" 
                     required 
                     placeholder='Email address' />
              <button type="submit" className='py-4 px-3 mx-auto md:mx-0 rounded-md   bg-red-500 flex justify-center items-center' >Get Started <span className='ml-5'></span></button>
            </form>
           </>
           :
           ""
           }
           <div className={`mt-20  h-44 lg:mt-10  border-t-4 border-red-400 
                            rounded-full relative  `}>
                <Search handleSearch={handleSearch}
                        className="" />
            </div>
          
          </div>
         

        </div>
        <div  className="absolute w-full h-full md:h-full bg-black/90"/>
      </div>
    </div>
  )
}

export default Hero