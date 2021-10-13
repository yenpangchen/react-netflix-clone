import React, { useState, useEffect } from "react";
import axios from "./axios.js";
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import OutsideClickHandler from "react-outside-click-handler";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      // .then((response) => console.log(response.data.results))
      // .catch((err) => console.log(err));
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "390",
    wudth: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    // set trailerUrl to stop playing other video if one is playing
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      // console.log(movie);
      movieTrailer(movie?.title || movie?.name || movie?.original_name || " ")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          // console.log("urlParams", urlParams);
          // console.log("url", url);
          setTrailerUrl(urlParams.get("v"));
          // console.log("the url for the trailer is " + trailerUrl);
        })
        .catch((err) => console.log(err));
      // console.log("trailerUrl:", trailerUrl);
    }
  };

  const handleImage = (movie) => {
    let src = "";
    if (isLargeRow) {
      src = movie?.poster_path;
    } else if (movie.backdrop_path != null) {
      src = movie?.backdrop_path;
    } else {
      src = movie?.poster_path;
    }
    return src;
  };

  // console.log(movies);

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row__posters">
        {/* row posters */}
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            src={`${base_url}${
              // isLargeRow ? movie.poster_path : movie.backdrop_path
              handleImage(movie)
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {/* container -> posters */}

      {/* when clicking outside of the video, automatically close the previous watching one to only open a video at one time. */}
      <OutsideClickHandler
        onOutsideClick={() => {
          setTrailerUrl("");
        }}
      ></OutsideClickHandler>

      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
