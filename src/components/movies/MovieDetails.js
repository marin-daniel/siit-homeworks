import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import Ratings from './Ratings'

function MovieDetails() {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);

    async function getMovieById(id) {
        const res = await axios('https://ancient-caverns-16784.herokuapp.com/movies/' + id);
        setMovie(res.data);
    }
    
    useEffect(() => { 
        getMovieById(movieId); 
    }, [movieId]);

    if(movie) {
        console.log(movie);
        console.log(movie.Ratings);
        return (
            <>
                <div  className="d-flex justify-content-between bg-dark text-light p-2">
                    <div>
                        <h1 >{movie.Title}<span style={{ fontSize: "25px", color: "silver" }}> ({movie.Year})</span></h1>
                        <div style={{ color: "silver" }}>{movie.Rated} | {movie.Runtime} | {movie.Genre} | {movie.Released}</div>
                    </div>
                    <div className="d-flex align-items-center">                    
                        <svg className="p-1 bi bi-star-fill" width="2.5em" height="2.5em" viewBox="0 0 16 16" fill="orange" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927
                            0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                        </svg> 
                        <div className="p-1">
                            <p className="m-0" style={{ fontSize: "24px" }}>{movie.imdbRating}<span style={{ fontSize: "15px", color: "#6b6b6b" }}>/10</span></p>
                            <p className="m-0" style={{ fontSize: "15px"}}>{ movie.imdbVotes }</p>
                        </div>                        
                        <button className="d-flex align-items-center p-2 bg-transparent border-top-0 border-right-0 border-bottom-0">
                            <svg className="p-1 bi bi-star" width="2.5em" height="2.5em" viewBox="0 0 16 16" fill="silver" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73
                                3.523-3.356c.329-.314.158-.888-.283-.95l-4.898-.696L8.465.792a.513.513 0 00-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523
                                3.356-.83 4.73zm4.905-2.767l-3.686 1.894.694-3.957a.565.565 0 00-.163-.505L1.71 6.745l4.052-.576a.525.525 0 00.393-.288l1.847-3.658 1.846
                                3.658a.525.525 0 00.393.288l4.052.575-2.906 2.77a.564.564 0 00-.163.506l.694 3.957-3.686-1.894a.503.503 0 00-.461 0z" clipRule="evenodd" />
                            </svg>
                            <span className="p-1 " >Rate<br></br>This</span>
                        </button>
                       
                    </div>
                </div>
                <img src={movie.Poster} alt="movie poster"></img>
                <div style={{ backgroundColor: "#eee"}}>
                    <p className="my-0 py-2">{ movie.Plot }</p>
                    <h6 className="m-0">Director: <span className="font-weight-normal">{movie.Director}</span></h6>
                    <h6 className="m-0">Writers: <span className="font-weight-normal">{movie.Writer}</span></h6>
                    <h6 className="m-0">Stars: <span className="font-weight-normal">{movie.Actors}</span></h6>
                    <h6 className="m-0">Ratings: <span className="d-flex justify-content-between font-weight-normal">
                        { movie.Ratings.map(rating=> <Ratings movieRating={ rating } />)}
                    </span></h6>
                </div>                    
            </>
        );
    } else {
        return <h1>Loading ...</h1>;
    }
}

export default MovieDetails;