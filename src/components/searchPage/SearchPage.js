import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MovieService from "../../services/MovieService";
import MovieCard from "../movieCard/MovieCard";
import './SearchPage.scss'

const SearchPage = () => {
  const [items, setItems] = useState([]);
  const [, setLoading] = useState(false);
  const searchContent = useSelector(
    (state) => state.SearchContentReducer.state
  );

  useEffect(() => {
    setLoading(true);
    MovieService.getMovies().then((data) => setItems(data));
    setLoading(false);
  }, []);

  let filteredMovies = items.filter((movie) => {
    return (
      movie.Title.toLowerCase().indexOf(
        searchContent.length >= 2 ? searchContent.toLocaleLowerCase() : ""
      ) !== -1
    );
  });

  const searchResults = () => {
    return (
      <div id="search-page">
        <h1>Arama Sonuclari</h1>
        <div id="items">
        {filteredMovies.map((item) => (
          <div key={item._id}>
            <MovieCard
              movieImdb={item.imdbRating}
              movieGenre={item.Genre}
              movieYear={item.Year}
              movieName={item.Title}
              movieImg={item.Poster}
            ></MovieCard>
          </div>
        ))}
        </div>
      </div>
    );
    // return <Carousel items={filteredMovies}></Carousel>;
  };

  const noResult = () => {
    return (
      <div>
        <h1>Sonuc bulunamadi</h1>
      </div>
    );
  };

  return (
    <div>
      
      {filteredMovies.length ? searchResults() : noResult()}
    </div>
  );
};

export default SearchPage;
