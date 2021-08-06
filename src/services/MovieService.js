const MovieService = {
    getMovies: () => {
      return fetch("/mov/get", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => data);
    },

    updateWatchCounter: (id , watchCount) => {
      if(id !== undefined){
        return fetch(`/mov/updateWatch/${id}/${watchCount}`, {
          method: "put",
          headers: {
            "Content-Type": "application/json",
          },
        })
      }
    },

    getCurrentMovie: (title) => {
      return fetch(`/mov/getCurrent/${title}`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => data);
    },

    addMovie: (movie) => {
      return fetch("/mov/new", {
        method: "post",
        body: movie,
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => data);
    },
  };
  
  export default MovieService;
  