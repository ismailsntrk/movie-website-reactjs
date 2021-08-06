import React from "react";
import "./Carousel.scss";
import SwiperCore, { Virtual } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/swiper.scss";
import MovieCard from '../movieCard/MovieCard'
SwiperCore.use([Virtual]);

const Carousel = ({ items }) => {


 

  const loaded = () => {
    return (
      <div className="carousel-div">
            {/* <div id="carousel-img">
                  <div
                    className="card-body"
                    style={{ background: `url(${item.Poster}) top no-repeat` }}
                  >
                    <Link to={`/watch/${item.Title}`}>
                      <button className="card-btn">Y</button>
                    </Link>
                    <button onClick={() => addList(item)} className="card-btn">
                      +
                    </button>
                  </div>
                </div> */}
        <Swiper spaceBetween={3} slidesPerView={6.2}>
          {items ? (
            items.map((item) => (
              <SwiperSlide key={item._id} virtualIndex={item.index}>
            
 <MovieCard
              movieImdb={item.imdbRating}
              movieGenre={item.Genre}
              movieYear={item.Year}
              movieName={item.Title}
              movieImg={item.Poster}
            ></MovieCard> 
              </SwiperSlide>
            ))
          ) : (
            <h1>...</h1>
          )}
        </Swiper>
      </div>
    );
  };

  return <div>{loaded()}</div>;
};

export default Carousel;
