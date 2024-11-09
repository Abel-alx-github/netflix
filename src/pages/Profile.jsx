import {db} from '../services/firebaseServices';
import {arrayRemove, doc, onSnapshot, updateDoc, } from "firebase/firestore";
import { AuthUseUser } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import signupBg from '../assets/signup-bg.jpg';

import MovieItem from '../components/MovieItem';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import {FaCross, FaTimes} from 'react-icons/fa'
import { fetchTMDbVideos, imageUrl } from '../services/tmdbServices';
import { UseVideoContext } from '../context/SearchMovieContext';
import StreamYoutube from '../components/StreamYoutube';
import { UseLoadingContext } from '../context/LoadingContext';
// import Loading from '../components/Loading';

const Profile = () => {
    const {user} = AuthUseUser();
    const [movies, setMovies] = useState();
    const [watch, setWatch] = useState();
    // const [loading, setLoading] = useState(false);
    const {youtubeUrl, setYoutubeUrl} = UseVideoContext();

    const {loading, setLoading} = UseLoadingContext();


   
    useEffect( () => {
        if(user){
            const uid = user?.uid;
            const userRef = doc(db, "Users", uid);
            onSnapshot(userRef, (doc) => {
                if(doc.data()){
                //   const data = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))  
                   setMovies( doc.data().fav);
                   console.log(movies, "movies") 
                }
            })
        }
    }, [user?.uid])

    
    useEffect(() => {
        console.log(watch);
        setLoading(true);
        const showYouTube = async (movieId) => {
             

            // console.log(movie, "in show youtube 19");
            const mv = await fetchTMDbVideos(movieId);
            console.log(mv, "mv 20 profile");
            setYoutubeUrl(mv[0]?.key);
           !mv.length && alert("Sorry!! The movie dose not found on Youtube")
            setLoading(false);

        };
        watch && showYouTube(watch);

        // watch && youtubeUrl ? setLoading(true) : setLoading(false);  
    },[watch])

    if(!watch || youtubeUrl) {
        setLoading(false);
    }

    
    const removeMovie = async (movie) => {
        try {
            const userData = {
                fav: arrayRemove(movie)
               }
            const docRef = doc(db, "Users", user.uid);
            await updateDoc(docRef, userData);
        }
        catch(er) {
            console.log(er, "error while updating delating")
        }
    }

  

   if(!movies){
    return (
        <div className="flex justify-center items-center w-full h-[100vh] top-10 ">
          <h2>Pending...</h2>
        </div>
      )
   }
{console.log(youtubeUrl)}
// {loading && <Loading />}
    { 
    if(youtubeUrl) return <StreamYoutube /> }
    return(
     <div> 
       <img src={signupBg} alt="signup-bg"
            className='hidden sm:block absolute w-full h-[300px] object-cover '
       /> 
       <div className='fixed top-0 left-0 w-full h-[300px] bg-black/60 '/>
       <div className='absolute top-[100px] left-20 right-0'>
           <h2 className=" font-nsans-bold md:text-xl p-4 capitalize">My Favourit Movies</h2>
            <p className='pl-4 text-gray-400'>{user.email}</p>
            <p className='pl-4'><span className='mr-2'>{movies.length}</span>Movies</p>
       </div>

       <div className='absolute top-[300px] left-0 right-0'>
            <h2 className='upeercase my-6 mx-16 font-nsans-bold'>My all time best movie collections</h2>
                {!movies.length && <p className='my-8 mx-16 font-nsans-light'>You have no movie!</p>}
            <div className="relative flex items-center group">
        
            
          
            <div id={`slider`}
               className="w-full h-full overflow-x-scroll whitespace-wrap scroll-smooth
               scrollbar-hide"   
            >
               {
                   movies.map( (movie, idx) => (
                                   
                <div key={idx}
                   
                    className="relative w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block 
                                rounded-lg overflow-hidden cursor-pointer m-2"
                >
                    <img
                        // onClick={() => setLoading(true)}
                        src={imageUrl(movie.backdrop_path ?? movie.poster_path, "w500" )} alt={movie.title}
                        className='w-full h-40 block object-cover object-top'
                    />
                    <div className='absolute top-0 left-0 w-full h-40 bg-black/70 '>
                        <p
                        className='whitespace-normal text-xs md:text-sm flex justify-center items-center h-full font-nsans-bold'
                        >{movie.title}</p>
                       
                    </div>
                        <p >
                        < FaTimes size={15} 
                                    onClick={() => removeMovie(movie)}
                                    className='absolute top-2 right-1 text-gray-200 '/>
                           
                        </p>
                        <button
                         onClick={() => setWatch(movie.id)}
                          className=' absolute bottom-[5px]
                         left-[5px] text-xs px-1 py-1 lg:text-md lg:px-3 lg:py-2 border border-red-400 flex'
            >Play</button>
                </div>
                                   
                                   
                                   
                                 
                
                      ))                
               }
           </div>
           
      </div>   
           
       </div>
       </div>
    )
}

export default Profile;