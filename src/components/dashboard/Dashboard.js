import React, { useEffect, useState, useContext } from "react";
import Carousel from "../carousel/Carousel";
import "./Dashboard.scss";
import { useSelector } from "react-redux";
import SearchPage from "../searchPage/SearchPage";
import MovieService from "../../services/MovieService";
import LastWatched from "../lastWatched/LastWatched";
import SelectedMovies from "../selectedMovies/SelectedMovies";
import ChooseByCategory from "../chooseByCategory/ChooseByCategory";
import Nslider from "../nSlider/Nslider";
import { AuthContext } from "../../services/AuthContext";
import MovieViewsRank from "../movieViewRank/MovieViewsRank";
const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);

  const searchContent = useSelector(
    (state) => state.SearchContentReducer.state
  );
  const selectedGenres = useSelector(
    (state) => state.SelectedGenresReducer.state
  );
  const authContext = useContext(AuthContext);

  useEffect(() => {
    setLoading(true);
    MovieService.getMovies().then((data) =>
      setItems(data.slice(Math.max(data.length - 15, 1)).reverse())
    );

    setLoading(false);
  }, []);
  

  useEffect(() => {
   
  }, [items]);

  const searchPage = () => {
    return <SearchPage></SearchPage>;
  };

  const dash = () => {
    return (
      <div>
        <Nslider></Nslider>
        <div className="dashboard-main">
          <br></br>
          <div className="new-series">
            <p className="label">Yeni Eklenenler</p>
            <div className="carousel-container">
              <Carousel items={items}></Carousel>
            </div>
            <hr className="carousel-line"></hr>
          </div>
          <div className="new-series">
            <p className="label">En Çok İzlenenler</p>
            <div className="carousel-container">
              <MovieViewsRank></MovieViewsRank>
            </div>
            <hr className="carousel-line"></hr>
          </div>
          {authContext.isAuthenticated === true ? (
            <div>
              {" "}
              <div>
                <div className="new-series">
                  <p className="label">Senin Icin Secilen Filmler</p>
                  <div className="carousel-container">
                    <SelectedMovies></SelectedMovies>
                  </div>
                  <hr className="carousel-line"></hr>
                </div>
              </div>
              <div>
                <div className="new-series">
                  <p className="label">En Son Izlenenler</p>
                  <div className="carousel-container">
                    <LastWatched></LastWatched>
                  </div>
                  <hr className="carousel-line"></hr>
                </div>
              </div>
              <div>
                <div className="new-series">
                  <p className="label">
                     {selectedGenres ? selectedGenres[0].current : "Aksiyon"}{" "}
                  </p>
                  <div className="carousel-container">
                    <ChooseByCategory></ChooseByCategory>
                  </div>
                  <br></br>
                </div>
              </div>
            </div>
          ) : (
            <div>{selectedGenres ? selectedGenres[0].current : "Aksiyon"}</div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div>
      {loading === false ? (
        searchContent ? (
          searchPage()
        ) : (
          dash()
        )
      ) : (
        <div>
          <h1>Loading</h1>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
