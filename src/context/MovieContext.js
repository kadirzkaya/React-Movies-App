import { createContext, useState } from "react";

const MovieContext=createContext();

const localToken=localStorage.getItem("token");

function MovieProvider({children}){
    const [token, setToken]=useState(localToken);
    const [movies, setMovies]=useState([]);

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYzlkMjFiNDBkODcyNzdjODgzNDE4YTIxMTI4YjM3NiIsInN1YiI6IjY0Zjk2OGM3NGNjYzUwMTg2OWQ2OTQzYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6Rqu86eA1N0g9cfwKH1gEOEpgYNdBPmtJyrgnP1uDlg'
        }
      };
      
      const fetchApi=async()=>{
        return await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1',options)
        .then(response => response.json())
        .then(response => setMovies(response.results))
        .catch(err => console.error(err));
      }
    
        const values={
            token,
            movies,
            setToken,
            setMovies,
            fetchApi
        }
    
        return(
            <MovieContext.Provider value={values}>
                {children}
            </MovieContext.Provider>
        )
    
    }
    
    export {MovieProvider};
    
    export default MovieContext;