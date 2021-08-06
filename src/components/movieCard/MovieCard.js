import React, { useEffect, useState } from "react";
import "./MovieCard.scss";
import { Link } from "react-router-dom";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


const MovieCard = ({
  movieName,
  movieImg,
  movieImdb,
  movieYear,
  movieGenre,
}) => {
  const [allGenres, setAllGenres] = useState([]);

 
  useEffect(() => {
    if(movieGenre){
      const genres = movieGenre.map((item) => item + "");
      setAllGenres(genres);
    }
   
  }, [movieGenre]);
  return (
    <Link style={{ textDecoration: "none" }} to={`/watch/${movieName}`}>
      <div id="card-cont">
        <div style={{ background: `url(${movieImg}) center center` }} id="poster">
          
          <div id="back-side">
          <div className="card-item">{movieYear}</div>
          <div className="card-item" id='circular-bar'><CircularProgressbar maxValue={10} value={movieImdb} text={`${movieImdb}%`} /></div>
          <div className="card-item" id="genre-item">
            {allGenres.map((item) => (
              <div  key={item}>{item}</div>
            ))}
          </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
