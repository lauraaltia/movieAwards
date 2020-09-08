import React from "react";
import "./Nominations.css";

function Nominations(props) {
  let nominations = props.nominations;
  let unnominateMovie = props.unnominateMovie;
  let submitNomination = props.submitNomination;

  return (
    <div className="nominations-background">
      <div className="nominations-background-text">Nominations</div>
      <div className="nominations-list-horizontal-scroll">
        {nominations.length
          ? nominations.map((nominee) => {
              return (
                <div key={nominee.imdbID} className="movie">
                  {nominee.Poster !== "N/A" ? (
                    <img
                      className="movie-poster"
                      src={nominee.Poster}
                      alt="movie poster"
                    />
                  ) : (
                    //TODO: Create unique image for movie poster unavailable
                    <img
                      className="movie-poster"
                      src={`http://www.interlog.com/~tfs/images/posters/TFSMoviePosterUnavailable.jpg`}
                      alt="movie poster unavailable"
                    />
                  )}
                  <div className="movie-title">
                    {nominee.Title}
                    <span className="movie-year"> ({nominee.Year})</span>
                  </div>
                  <button
                    className="movie-remove-button"
                    onClick={() => unnominateMovie(nominee)}
                  >
                    Remove
                  </button>
                </div>
              );
            })
          : null}
      </div>
      <div className="nominations-background-text">
        <button
          className="nominations-submit-button"
          onClick={() => submitNomination()}
          disabled={nominations.length < 5}
        >
          Submit Nominations
        </button>
      </div>
    </div>
  );
}

export default Nominations;
