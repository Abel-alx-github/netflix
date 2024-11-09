
import React, { useEffect, useState } from 'react'
import Hero from '../components/H'
import MoveRow from '../components/MoveRow'
import endpoints from '../services/tmdbServices'
import { UserSearchMovie, UseVideoContext } from '../context/SearchMovieContext'
import MovieItem from '../components/MovieItem'
import { AuthUseUser } from '../context/AuthContext'
import StreamYoutube from '../components/StreamYoutube'



const Home = () => {
  const user = AuthUseUser();
  const films = UserSearchMovie();
  console.log(films, "films 14 home");
  const {filmsSet} = UserSearchMovie();
  const {youtubeUrl} = UseVideoContext();
  const foundNoMovie = () => ( <div 
    className={`absolute pl-4 ${!user?.user?.uid ? "lg:mt-[100px]" : "mt-52 md:mt-[250px]"}  md:pl-44`}>
<p className='text-lg '>Oops! No movie found for this search result</p>
</div>)

  return (
    <div>
      {youtubeUrl && <StreamYoutube /> }
      {!youtubeUrl && < Hero/>}
      
      {
        (films?.films === "no movie") ? foundNoMovie() : ""
      
      }
      
     
     {
      films?.films?.length > 0 ? (
        <div className={`absolute ${!user?.user?.uid ? " lg:mt-[100px]" : "mt-52 md:mt-[250px]"} `}>
          {
            films.films !== "no movie" && films.films.map((f, idx) => (
              < MovieItem movie={f} key={idx} isLike={true} />
            ))
          }
       </div>
      ) :
     
     
     <>
      
      < MoveRow title="Upcomming" url={endpoints.upcoming} />
      < MoveRow title="tranding" url={endpoints.trending} />
      < MoveRow title="comedy" url={endpoints.comedy} />
      < MoveRow title="popular" url={endpoints.popular} />
      < MoveRow title="top rated" url={endpoints.topRated} />
     
      </>
    }
    </div>
  )
}

export default Home