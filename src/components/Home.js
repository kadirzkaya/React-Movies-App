import React, { useContext, useEffect } from 'react'
import MovieContext from '../context/MovieContext';
import star from '../img/star.png'
import '../css/home.css'

function Home() {
  const { movies, fetchApi } = useContext(MovieContext);

  useEffect(() => {
    fetchApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const renderedMovies = movies.map((movie) => {
    return (
      <div key={movie.id} className='cardItem'>
        <div className="card" >
          <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} className="card-img-top" alt="movie" />
          <div className="card-body d-flex align-items-center">
            <h5 className="card-title w-75 mb-0">{movie.title}</h5>
            <p className="card-text w-25 d-flex align-items-center justify-content-end column-gap-1">
              <img src={star} alt='star' />
              <span>{movie.vote_average}</span>
            </p>
          </div>
          <div className="card-footer text-body-secondary">
            {movie.release_date}
          </div>
        </div>

        <p className='card-overview w-100'>
          {movie.overview}
        </p>
      </div>
    )
  })

  return (
    <div className='d-flex flex-wrap gap-3 justify-content-center mt-4 pb-4'>{renderedMovies}</div>
  )
}

export default Home