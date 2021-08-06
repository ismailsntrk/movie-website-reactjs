import React, { useEffect, useState , useContext} from "react";
import { useParams } from "react-router-dom";
import MovieService from "../../services/MovieService";
import ReactPlayer from "react-player";
import ListService from '../../services/ListService'
import './MoviePage.scss'
import { AuthContext } from "../../services/AuthContext";
import { Modal } from "reactstrap";
import Signup from "../signFolders/signup/Signup";
const MoviePage = () => {
  const { movieTitle } = useParams();
  const [loading, setLoading] = useState(true);
  const [currentMovie, setCurrentMovie] = useState({});
  const authContext = useContext(AuthContext)
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  useEffect(() => {
    if (loading) {
      MovieService.getCurrentMovie(movieTitle).then((data) =>
        setCurrentMovie(data)
      );

      setLoading(false);
    }
  }, [loading, movieTitle]);

  const addList = (item) => {
   
      ListService.addMovieToList(item).then(res =>  res.message.msgError === false ? alert('Eklendi') : alert('Tekrar Deneyiniz'))
  
  
  };

  useEffect(() => {
    const timerFunc = async () => {
     await MovieService.updateWatchCounter(
        currentMovie._id,
        currentMovie.watchCounter
      );

     
       await ListService.addLastWatched(currentMovie)
       
    };

    let timer1 = setTimeout(() => timerFunc(), 1000);

    return () => {
      clearTimeout(timer1);
    };
  }, [currentMovie, currentMovie._id, currentMovie.watchCounter]);

  return (
    <div id="movie-main">
      <div id="movie-cont">
        <div id="title-cont">
        <h1 id="movie-title" style={{marginBottom:'0.5em'}}>{currentMovie.Title}</h1>
        {authContext.isAuthenticated === true ? (<div id="add-to-list-btn" onClick={() => addList(currentMovie)}>Listene Ekle</div>) : (<div id="add-to-list-btn" onClick={toggle}>Listene Ekle</div>)}
        

        </div>
      
      <div id="movie-player">
        {currentMovie.movieUrl ?  (<ReactPlayer width="100%" height="40em" controls={true} url={currentMovie.movieUrl} /> ) : (<div><ReactPlayer width="100%" height="40em" controls={true} url="https://www.youtube.com/watch?v=en2obAuDcUo" /></div>)}
       
      </div>
      <div id="about-cont">
        <div id="mov-poster">
    <img src={currentMovie.Poster} alt="mov-poster"></img>
        </div>
        <div id="mov-about">
      <p>  <strong> imdb :</strong> {currentMovie.imdbRating}</p>
      <p> <strong>
      Tür :
      </strong>
       {currentMovie.Genre}
      </p>
     
      <p> <strong>Yapım :</strong>  {currentMovie.Year}</p>
      <p><strong>Yönetmen :</strong>  {currentMovie.Director}</p>
      <p><strong>Oyuncular :</strong>  {currentMovie.Actors}</p>
      
      <p><strong>Özet :</strong> {currentMovie.Plot}</p>
      <p><strong>Ödüller :</strong> {currentMovie.Awards}</p>
        </div>
      </div>
     
      {/* <h1>Izlenme : {currentMovie.watchCounter}</h1> */}
      
      </div>

      <Modal centered={true} isOpen={modal} toggle={toggle}>
          <div>
            <Signup send={toggle}></Signup>
          </div>
        </Modal>
    </div>
  );
};

export default MoviePage;
