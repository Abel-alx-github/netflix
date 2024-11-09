
import React, { createContext, useContext, useState } from 'react'

const SearchMovieContext = createContext()

const SearchMovieContextProvider = ({children}) => {
    const [films, setFilms] = useState();

    return (
    <SearchMovieContext.Provider value={{films, setFilms}}>
       { children}
    </SearchMovieContext.Provider>
  )
}

export const UserSearchMovie = () => {
    return useContext(SearchMovieContext);
}

export default SearchMovieContextProvider;

// context to provide the current youtube video url on rowitem click

export const VideoContext = createContext();

export const VideoContextProvider = ({ children }) => {
  const [youtubeUrl, setYoutubeUrl] = useState();

  return(
    <VideoContext.Provider value={{ youtubeUrl, setYoutubeUrl }}>
      {children}
    </VideoContext.Provider>
  )
}

export const UseVideoContext = () => {
  return useContext(VideoContext);
}