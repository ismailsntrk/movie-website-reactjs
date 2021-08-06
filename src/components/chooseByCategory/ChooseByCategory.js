import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MovieService from "../../services/MovieService";
import Carousel from "../carousel/Carousel";

const ChooseByCategory = () => {
  const [allMovies, setAllMovies] = useState([]);
  const [selectedByCategory, setSelectedByCategory] = useState([]);

  const selectedGenres = useSelector(
    (state) => state.SelectedGenresReducer.state
  );

  useEffect(() => {
    MovieService.getMovies().then((data) => setAllMovies(data));
  }, []);

  useEffect(() => {
    let filteredItems = [];
    const filterByCategory = () => {
      if (selectedGenres) {
  

        allMovies.map((mov) => {
          return mov.Genre.map((item) =>
            item === selectedGenres[0].current ? filteredItems.push(mov) : undefined
          );
         
        });
        
        setSelectedByCategory(filteredItems.slice(0,10));
      }
    };
    filterByCategory();
  }, [allMovies, selectedGenres]);

  

  return (
    <div>
      {selectedGenres ? (
        <div>
          <Carousel items={selectedByCategory}></Carousel>{" "}
        </div>
      ) : null}
    </div>
  );
};

export default ChooseByCategory;
