import React from "react";
import MovieList from "./MovieList";
import Nominations from "./Nominations";

import "./Home.css";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchWord: "",
      movies: [],
      nominations: [],
      searchedWord: "",
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
    const searchWord = this.state.searchWord.split(" ").join("+");
    const key = process.env.REACT_APP_OMDB_API_KEY;
    let results = await fetch(
      `https://www.omdbapi.com/?apikey=${key}&s=${searchWord}&type=movie`
    );
    let json = await results.json();
    let searchResults = json.Search;
    if (searchResults) {
      this.setState({
        movies: searchResults,
        searchedWord: this.state.searchWord,
      });
    } else {
      // TODO: Create user-friendly error message to say no results were found
      this.setState({
        movies: [],
      });
    }
  }

  async submitNomination() {
    //TODO: POST request to Database to record nominations
  }

  render() {
    const movies = this.state.movies;
    const nominations = this.state.nominations;
    const searchedWord = this.state.searchedWord;

    return (
      <div>
        <div className="section-heading">
          <div className="section-heading__kicker">
            Movie Awards for Entrepreneurs
          </div>
          <div className="section-heading__heading">The Shoppies</div>
          <div className="section-heading__subheading">
            Nominating your favourite films online has never been easier or
            faster. Select five nominees and cast your vote.
          </div>
          <form onSubmit={this.handleSubmit}>
            <label>
              <input
                className="section-heading__search-input"
                type="text"
                placeholder="Enter a movie title"
                value={this.state.searchWord}
                onChange={this.handleChange}
              />
            </label>
            <input
              className="section-heading__search-button"
              type="submit"
              value="Search"
            />
          </form>
        </div>

        <div>
          <MovieList
            movies={movies}
            nominateMovie={this.nominateMovie}
            nominations={nominations}
            searchedWord={searchedWord}
          />
        </div>

        <div>
          <Nominations
            nominations={nominations}
            unnominateMovie={this.unnominateMovie}
            submitNomination={this.submitNomination}
          />
        </div>
      </div>
    );
  }
}

export default Home;
