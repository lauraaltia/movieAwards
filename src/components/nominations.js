import React from "react";

function Nominations(props) {
  let nominations = props.nominations;
  let unnominateMovie = props.unnominateMovie;

  return (
    <div>
      {nominations.length
        ? nominations.map((nominee) => {
            return (
              <div key={nominee.imdbID}>
                <h1>{nominee.Title}</h1>
                <h2>{nominee.Year}</h2>
                {nominee.Poster !== "N/A" ? (
                  <img src={nominee.Poster} alt="movie poster" />
                ) : (
                  //TODO: Create unique image for movie poster unavailable
                  <img
                    src={`http://www.interlog.com/~tfs/images/posters/TFSMoviePosterUnavailable.jpg`}
                    alt="movie poster unavailable"
                  />
                )}
                <button onClick={() => unnominateMovie(nominee)}>Remove</button>
              </div>
            );
          })
        : null}
    </div>
  );
}

export default Nominations;
