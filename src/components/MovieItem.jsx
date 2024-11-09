import React, { useEffect, useState } from 'react'
import { imageUrl } from '../services/tmdbServices';
import { FaHeart, FaRegHeart, FaTimes, FaYoutube } from "react-icons/fa"
import {doc, updateDoc, arrayUnion,arrayRemove} from 'firebase/firestore';
import { AuthUseUser } from '../context/AuthContext';
import { db } from '../services/firebaseServices';
import { useNavigate } from 'react-router-dom';
import {fetchTMDbVideos} from '../services/tmdbServices';
import { UseVideoContext } from '../context/SearchMovieContext';
import { UseLoadingContext } from '../context/LoadingContext';


const MovieItem = ({movie, isLike}) => {
    const {youtubeUrl, setYoutubeUrl} = UseVideoContext();
    const {loading , setLoading} = UseLoadingContext();

    const [like, setLike] = useState(false);
    const { user } = AuthUseUser();
    const navigate = useNavigate();
    const { title, backdrop_path, poster_path } = movie;
    
    // const [youTubeUrl, setYouTubeUrl] = useState();
    console.log(movie.id, "movie 18")
    
    const showYouTube = async () => {
        setLoading(true);
        const mv = await fetchTMDbVideos(movie.id);
        setYoutubeUrl(mv[0]?.key);
        setLoading(false);

    }

    const favMovie = async () => {
        try {
            setLike(!like)
            const uid = user?.uid;
            if(!uid) return navigate("/login")
            console.log("lets like===")    
            const userDocRef = doc(db, "Users", uid);
            const userData = {fav : arrayUnion({...movie})}
            await updateDoc(userDocRef, userData)
        }
        catch (err){
            console.log(err, "error while updateDoc...")
        }
    }

    return (
  
       <div
        className={`group relative w-[200px] sm:w-[200px] md:w-[250px] lg:w-[300px]  inline-block 
                    rounded-lg overflow-hidden cursor-pointer m-2`}
    >
      

        
         <img src={imageUrl(backdrop_path ?? poster_path, "w500" )} alt={title}
             className='w-full h-full block object-cover object-top'
         />
        
        <button
            onClick={showYouTube}
            className=' absolute bottom-[5px]
                         left-[5px] text-xs px-1 py-1 lg:text-md lg:px-3 lg:py-2 border border-red-400 flex'
            >Play</button>
        
        <div className='absolute top-0 left-0 '>
            <p onClick={favMovie}>
                {
                    like ?
                     (isLike && < FaHeart  className='absolute top-1 left-1 text-gray-300' />)
                     :
                      (isLike && <FaRegHeart className='absolute top-1 left-1 text-gray-300'/>)
                }
               
            </p>
          
            <p
            className='mt-4 bg-black/50 whitespace-normal text-xs md:text-sm flex justify-center items-center h-full
                       font-nsans-light '
            >{title}</p>

          
            
        </div>
    </div>
  )
}

export default MovieItem