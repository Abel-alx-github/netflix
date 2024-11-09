import React from 'react'
import { UseVideoContext } from '../context/SearchMovieContext'
import { useNavigate } from 'react-router-dom';

const StreamYoutube = () => {
  const {youtubeUrl, setYoutubeUrl} = UseVideoContext();
  const navigate = useNavigate();

  return  youtubeUrl ?
    (
    <div className='relative top-8 left-0 p-[0rem] h-screen w-full z-[100] '>
  
            ( <iframe
                className='w-full mx-auto h-[80%] block object-contain object-center'
                width=""
                height=""
                src={`https://youtube.com/embed/${youtubeUrl}`}
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              ></iframe>)

              <div 
              onClick={() => setYoutubeUrl("")}
              className="fixed top-24 border bg-black border-red-500 hover:bg-red-500  transition-colors ease-linear left-3  z-[100000]">
                <button className='px-3 py-1 lg:px-6 lg:py-3'>Back</button>
              </div>
              
       
        

    </div>
  )
   :
  ""
}

export default StreamYoutube