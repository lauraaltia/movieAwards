import React from "react";

class MovieList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchWord: "",
      movies: [],
      nominations: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.nominateMovie = this.nominateMovie.bind(this);
    this.unnominateMovie = this.unnominateMovie.bind(this);
  }

  nominateMovie(movie) {
    let nominations = this.state.nominations;
    if (nominations.length >= 5) {
      return;
    }
    for (let i = 0; i < nominations.length; i++) {
      let nominee = nominations[i];
      if (nominee.imdbID === movie.imdbID) return;
    }

    this.setState({
      nominations: [...nominations, movie],
    });
  }

  unnominateMovie(movie) {
    this.setState({
      nominations: this.state.nominations.filter((nominee) => {
        return movie.imdbID !== nominee.imdbID;
      }),
    });
  }

  handleChange(event) {
    this.setState({ searchWord: event.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const searchWord = this.state.searchWord;
    const key = process.env.REACT_APP_OMDB_API_KEY;
    let results = await fetch(
      `https://www.omdbapi.com/?apikey=${key}&s=${searchWord}&type=movie`
    );

    let json = await results.json();
    let searchResults = json.Search;
    this.setState({
      movies: searchResults,
    });
  }

  render() {
    const movies = this.state.movies;
    const nominations = this.state.nominations;

    return (
      <div>
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>
              Search:
              <input
                type="text"
                value={this.state.searchWord}
                onChange={this.handleChange}
              />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>

        <div>
          {movies.map((movie) => {
            return (
              <div key={movie.imdbID}>
                <h1>{movie.Title}</h1>
                <h2>{movie.Year}</h2>
                <img src={movie.Poster} alt="Poster for Movie" />
                <button onClick={() => this.nominateMovie(movie)}>
                  Nominate
                </button>
              </div>
            );
          })}
        </div>

        <div>
          {nominations.map((nominee) => {
            return (
              <div key={nominee.imdbID}>
                <h1>{nominee.Title}</h1>
                <h2>{nominee.Year}</h2>
                <img src={nominee.Poster} alt="Poster for Movie" />
                <button onClick={() => this.unnominateMovie(nominee)}>
                  Remove
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default MovieList;
