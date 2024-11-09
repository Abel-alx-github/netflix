import axios from "axios";
import { useEffect, useState } from "react";
import { imageUrl } from "../services/tmdbServices";
import MovieItem from "./MovieItem";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const MoveRow = ({title, url}) => {
    const [movies, setMovies] = useState([])
    const rowId = Math.floor(Math.random() * 10000);
    
    const slideRow = (offset) => {
        const row = document.getElementById("slider" + rowId);
        console.log(row.childNodes.scrollLeft, "child")
        row.scrollLeft = row.scrollLeft + offset;
    }

    useEffect( () => {
        axios.get(url).then(res => setMovies(() => res.data.results))
    }, [url]);

    
    if(!movies) return (
        <h2>Pending in row.........</h2>
    );

    return(
        <>
         <h2 className="font-nsans-bold md:text-xl mt-16 p-4 capitalize">{title}</h2>
         <div className="relative flex items-center group">
         
         <MdChevronLeft size={30} 
            onClick={() => slideRow(-500)}
            className={` z-10 absolute left-2 opacity-70 bg-white rounded-full cursor-pointer text-gray-700 hidden group-hover:block`}
         />
           
            <div id={`slider` +  rowId}
                className="w-full h-full overflow-y-hidden overflow-x-scroll whitespace-nowrap scroll-smooth
                            scrollbar-hide"   
            >
                {
                    movies.map(movie => (
                       <MovieItem  id={movie.id} key={movie.id} movie={movie} isLike={true} />))
                }
            </div>
            <MdChevronRight size={30} 
                onClick={() => slideRow(500)}
                className={` z-10 absolute right-2 opacity-70 bg-white rounded-full cursor-pointer text-gray-700 hidden group-hover:block`}
        />
         </div>   
            
        </>
    )
}

export default MoveRow;