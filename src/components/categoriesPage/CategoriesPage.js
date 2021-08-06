import React, { useState, useEffect } from "react";
import MovieGenres from "./genres/MovieGenres";
import "./CategoriesPage.scss";
import { useSelector } from "react-redux";
import MovieCard from "../movieCard/MovieCard";
import Pagination from "./pagination/Pagination";
import MovieService from '../../services/MovieService'
import SearchPage from "../searchPage/SearchPage";
const CategoriesPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(12);
  const currentState = useSelector(
    (state) => state.CurrentCategoryReducer.state
  );

  const searchContent = useSelector(
    (state) => state.SearchContentReducer.state
  );

    useEffect(() => {

    
      setLoading(true);
    
      MovieService.getMovies().then(data => {
        let items = data
        if (currentState !== undefined) {
          const newItems = [];
         items.map((item) =>  item.Genre.map(itm => itm === currentState[0] ? newItems.push(item) : null) );
          setPosts(newItems);
        } else setPosts(items);
      })
      
    
  
      setCurrentPage(1);
      setLoading(false);
    }, [currentState]);
  
 

  //get current posts
  const sortedPosts = posts.sort(function(b, a) {
    return parseFloat(a.imdbRating) - parseFloat(b.imdbRating);
})
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);

  //changePage

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };



  const searchPage = () => {
    return <SearchPage></SearchPage>;
  };


  const loaded = () => {
    return (
      <div className="category_main">
        <div id="main_row">
          <div className="genre_div">
            <MovieGenres></MovieGenres>
          </div>
          <div className="item-div">
            
            <div>
              {currentState ? (
                <div className="filter_area">
                  <h1>{currentState[1]}</h1>
                </div>
              ) : null}
            </div>

            <div className="item-cont">
              
              {currentPosts.map((item) =>
              
            
                  <div id="posters" key={item._id}>
                    <MovieCard 
                      movieImdb={item.imdbRating}
                      movieGenre={item.Genre}
                      movieYear={item.Year}
                      movieName={item.Title}
                      movieImg={item.Poster}
                    ></MovieCard>
                  </div>
            
              )}
            </div>
            <div id="pagi">
            <Pagination
              postsPerPage={postPerPage}
              totalPosts={posts.length}
              paginate={paginate}
            ></Pagination>
            </div>
          </div>
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
          loaded()
        ) 
      ) : (
        <div>
          <h1>Loading</h1>
        </div>
      )}
    </div>
  );

};



export default CategoriesPage;
