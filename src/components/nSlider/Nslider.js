import React , {useEffect , useState} from "react";
import Slider from "react-animated-slider";
import "react-animated-slider/build/horizontal.css";
import "./Nslider.scss";
import MovieService from "../../services/MovieService";
import {Link} from 'react-router-dom'



const Nslider = () => {
  const [, setLoading] = useState(false);
  const [posters , setPosters] = useState([])
  


  useEffect(() =>{
    setLoading(true);
    
    MovieService.getMovies().then(data => {
      let selectedMovies = [];
      selectedMovies.push(data[Math.floor(Math.random() * data.length)])
      const a = data[Math.floor(Math.random() * data.length)]
      const b = data[Math.floor(Math.random() * data.length)]
      if(selectedMovies.Title !== a.Title){
        selectedMovies.push(a)
        if(b.Title !== a.Title ){
          selectedMovies.push(b)
        }
      }
      
      setPosters(selectedMovies)
      

    })
    
  
    
    setLoading(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <div>
      {window.innerWidth <= 800 ? (
        <div>
          <Slider
            touchDisabled={true}
            className="slider-wrapper"
            
            autoplay={2500}
          >
            {posters.map((item) => (
                
              <div
                key={item.imdbID}
                className="slider-content"
                style={{
                  background: `url(${item.Poster}) repeat center center`,
                  
                }}
              >
                <div className="inner">
              
               
                </div>
              </div>
            ))}
          </Slider>
        </div>
      ) : (
        <div className="carousel-div">
             
          <Slider className="slider-wrapper" autoplay={2500}>
            {posters.map((item) => (
                
              <Link to={`/watch/${item.Title}`} key={item.imdbID}
              className="slider-content"
              style={{
                background: `url(${item.Poster}) repeat bottom`,
                backgroundPosition:'center',
                 backgroundSize:'contain'
              }}>
              
               
              <div className="inner">
              <h1>{item.Title}</h1>
              </div>
           
              </Link>
            ))}
          </Slider>
        </div>
      )}
    </div>
  );
};

export default Nslider;
