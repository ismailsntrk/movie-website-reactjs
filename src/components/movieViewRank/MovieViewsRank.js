import React, { useEffect, useState } from "react";
import MovieService from "../../services/MovieService";
import Carousel from "../carousel/Carousel";

const MovieViewsRank = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const allMovies = async () => {
      await MovieService.getMovies().then((data) => setMovies(data));
    };

    allMovies();
  }, []);

  let sortedMovies = movies.sort(
    (a, b) => parseFloat(a.watchCounter) - parseFloat(b.watchCounter)
  );

  sortedMovies = sortedMovies
    .slice(Math.max(sortedMovies.length - 15, 1))
    .reverse();

  return (
    <div>
      <Carousel items={sortedMovies}></Carousel>
    </div>
  );
};

export default MovieViewsRank;
