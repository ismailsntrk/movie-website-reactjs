import React, { useEffect, useContext, useState } from "react";
import ListService from "../../services/ListService";
import Carousel from "../carousel/Carousel";
import { AuthContext } from "../../services/AuthContext";

const LastWatched = () => {
  const [lastMovies, setLastMovies] = useState([]);
  const authContext = useContext(AuthContext);
  useEffect(() => {
    if (authContext.isAuthenticated === true) {
      ListService.getLastWatched().then((data) =>
        setLastMovies(data.lastWatched.reverse())
      );
    }
  }, [authContext.isAuthenticated]);

  return (
    <div>
      <Carousel items={lastMovies} />
    </div>
  );
};

export default LastWatched;
