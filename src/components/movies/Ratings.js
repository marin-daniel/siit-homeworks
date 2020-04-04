import React from 'react';

function Ratings({ movieRating }){
        return (
            <p>{movieRating.Source}: {movieRating.Value}</p>
        );
    }

export default Ratings;