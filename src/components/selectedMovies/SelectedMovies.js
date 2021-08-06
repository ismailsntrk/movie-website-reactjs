import React, { useEffect, useContext, useState } from "react";
import ListService from "../../services/ListService";
import Carousel from "../carousel/Carousel";
import { AuthContext } from "../../services/AuthContext";
import MovieService from "../../services/MovieService";
import { useDispatch } from "react-redux";
import * as actionTypes from "../../redux/actions/actionsTypes";

const SelectedMovies = () => {
  const [recentMovies, setRecentMovies] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const dispatch = useDispatch();
  const authContext = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if(loading){
      if (authContext.isAuthenticated === true) {
        ListService.getLastWatched().then((data) => setRecentMovies(data));
        MovieService.getMovies().then((data) => setAllMovies(data));
      }
    }
    
    setLoading(false)
  }, [authContext.isAuthenticated, loading]);

  const allLastGenres = () => {
    let allGenres = recentMovies.lastWatched;
    let newArr = [];
    if (allGenres !== undefined) {
      allGenres.map((mov) => (newArr = newArr.concat(mov.Genre)));
    }

    return newArr;
  };

  const countDublicates = () => {
    const genres = allLastGenres();
    genres.sort();

    let current = null;
    let cnt = 0;
    let choosenArr = [{}];
    for (let i = 0; i < genres.length; i++) {
      if (genres[i] !== current) {
        if (cnt > 0) {
          choosenArr.push({ current, cnt });
        }
        current = genres[i];
        cnt = 1;
      } else {
        cnt++;
      }
    }
    if (cnt > 0) {
      choosenArr.push({ current, cnt });
    }
    let rankedGenres = choosenArr
      .sort((a, b) => parseFloat(a.cnt) - parseFloat(b.cnt))
      .reverse();

      if(rankedGenres.length > 2){
        const item = [rankedGenres[1] , rankedGenres[2]]
        setTimeout(() => {
          dispatch({ type: actionTypes.SELECTED_GENRES, payload: item });
        }, 300);
       
      }
    
    return rankedGenres;
  };

  const selectMovies = () => {
    let rankedGenres = countDublicates();
    let choosenMovies = [];
    if (rankedGenres.length >= 2) {
      allMovies.map((mov) => {
        const genreArr = mov.Genre.filter(
          (item) =>
            item === rankedGenres[1].current || item === rankedGenres[2].current
        );
        if (genreArr.length > 1) {
          choosenMovies.push(mov)
          return mov;
        }
        return null;
      });
      return choosenMovies;
    }
  };

  const choosenMovies = selectMovies();
 

  return (
    <div>
      <Carousel items={choosenMovies}/>
    </div>
  );
};

export default SelectedMovies;
