import React from "react";

class MovieList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchWord: "",
      movies: [
        {
          Title: "Titanic",
          Year: "1997",
          imdbID: "tt0120338",
          Type: "movie",
          Poster:
            "https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg",
        },
        {
          Title: "Titanic II",
          Year: "2010",
          imdbID: "tt1640571",
          Type: "movie",
          Poster:
            "https://m.media-amazon.com/images/M/MV5BMTMxMjQ1MjA5Ml5BMl5BanBnXkFtZTcwNjIzNjg1Mw@@._V1_SX300.jpg",
        },
      ],

      nominations: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.nominateMovie = this.nominateMovie.bind(this);
  }

  nominateMovie(movie) {
    let nominations = this.state.nominations;
    if (nominations.length >= 5) {
      return;
    }
    for (let i = 0; i < nominations.length; i++) {
      let nominee = nominations[i];
      if (nominee.Title === movie.Title) return;
    }

    this.setState({
      nominations: [...nominations, movie],
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
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default MovieList;
