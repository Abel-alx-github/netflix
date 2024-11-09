import axios from "axios";

const {
  VITE_API_KEY_APP,
  VITE_AUTH_DOMAIN,
  VITE_PROJECT_ID,
  VITE_STORAGE_BUCKET,
  VITE_MESSAGING_SENDER_ID,
  VITE_APP_ID,
  
  } = import.meta.env

export const api = import.meta.env.VITE_API_KEY;

export const baseUrl = "https://api.themoviedb.org/3";

// export const baseUrlOmdb = import.meta.env.VITE_API_KEY_OMDB;

const endpoints = {
    popular: `${baseUrl}/movie/popular?api_key=${api}`,
    topRated: `${baseUrl}/movie/top_rated?api_key=${api}`,    
    trending: `${baseUrl}/movie/popular?api_key=${api}&language=en=US&page=2`,    
    comedy: `${baseUrl}/search/movie?api_key=${api}&language=en=US&query=comedy&page=1&include_adult=false`,    
    upcoming: `${baseUrl}/movie/upcoming?api_key=${api}`,    
}

export const imageUrl = (filename, size) => {
  return `https://image.tmdb.org/t/p/${size}/${filename}/`;  
} 

export const searchMovie = async (query) => {
  const baseUrlForSearching =`${baseUrl}/search/movie`;
  try{
    const response = await axios.get(baseUrlForSearching, {
      params: {
        api_key:api,
        query:query,
      }
    });
    // console.log(response.data.results, " befor filtertmdb service 41");
    let movies = response.data.results;
    // let data = [];
    // let m;
    // movies.map( async movie => (
    //     data.push(await fetchTMDbVideos(movie.id))
    //   ));
    //  console.log(data, "tmdb service data 47");

    //  const data = await movies?.map(movie => (
    //      fetchTMDbVideos(movie.id)
    //  ));
    //  console.log(data, "data   46");

    return movies.length > 0 ? movies : "no movie"
  }
  catch (er) {
    throw new Error("Error Fetching data: " + er.message);
  }
}

export const fetchTMDbVideos = async (movieId) => {
  const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${api}&language=en-US`);
  const data = await response.json();
  return data.results?.filter(res => res.site === "YouTube");
};
 

export default endpoints;