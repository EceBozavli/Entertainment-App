import { useState, useEffect } from 'react';
import { data } from './movies';
import './App.css';

function App() {
  const [allMovies, setAllMovies] = useState(data);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchMovie, setSearchMovie] = useState('');
  const [searchSeries, setSearchSeries] = useState('');
  const [searchBookMarked, setSearchBookMarked] = useState('');
  const [isClick, setIsClick] = useState(false);
  const [isClickSeries, setIsClickSeries] = useState(false);
  const [isClickBookMarked, setIsClickBookMarked] = useState(false);
  const [isClickTrend, setIsClickTrend] = useState(true);
  const filMovies = allMovies.filter(movie => movie.type === 'Movie');
  const filSeries = allMovies.filter(movie => movie.type === 'TV Series');
  const filBookMarkedMovies = allMovies.filter(movie => movie.isBookMarked && movie.type === 'Movie');
  const filBookMarkedSeries = allMovies.filter(movie => movie.isBookMarked && movie.type === 'TV Series');

  function handleShow() {
    setIsClick(false);
    setIsClickSeries(false);
    setIsClickBookMarked(false);
    setIsClickTrend(true);
  }

  function handleMovie() {
    setIsClick(true);
    setIsClickSeries(false);
    setIsClickBookMarked(false);
    setIsClickTrend(false);
  }

  function handleSeries() {
    setIsClickSeries(true);
    setIsClick(false);
    setIsClickBookMarked(false);
    setIsClickTrend(false);
  }

  function handleBookMarked() {
    setIsClickBookMarked(true);
    setIsClick(false);
    setIsClickSeries(false);
    setIsClickTrend(false);
  }

  function handleSearchMovie(e) {
    setSearchMovie(e.target.value);
  }

  function handleSearchSeries(e) {
    setSearchSeries(e.target.value);
  }

  function handleSearchBookMarked(e) {
    setSearchBookMarked(e.target.value);
  }

  function toggleBookmark(movieId) {
    console.log("Toggling bookmark for movie ID:", movieId);

    setAllMovies(prevMovies =>
      prevMovies.map(movie =>
        movie.id === movieId
          ? { ...movie, isBookMarked: !movie.isBookMarked }
          : movie
      )
    );
  }

  const filteredFilMovies = filMovies.filter(x =>
    x.name.toLowerCase().includes(searchMovie.toLowerCase())
  );

  const filteredFilSeries = filSeries.filter(x =>
    x.name.toLowerCase().includes(searchSeries.toLowerCase())
  );

  const filteredFilBookMarkedMovies = filBookMarkedMovies.filter(x =>
    x.name.toLowerCase().includes(searchBookMarked.toLowerCase())
  );

  const filteredFilBookMarkedSeries = filBookMarkedSeries.filter(x =>
    x.name.toLowerCase().includes(searchBookMarked.toLowerCase())
  );

  const displayMovies = isClick
    ? filteredFilMovies
    : isClickSeries
      ? filteredFilSeries
      : allMovies;

  useEffect(() => {
    console.log("Bookmarked movies count:", filBookMarkedMovies.length);
  }, [filBookMarkedMovies]);

  return (
    <div className="app-container">
      <header className="header">
        <div className="logo">
          <img src="./public/img/header/Movie.svg" alt="Movie Logo" />
        </div>
        <div className="btn-group">
          <button onClick={handleShow} className={isClickTrend ? 'active' : ''}>
            <img src="./public/img/header/full.svg" alt="Full" />
            <span>Home</span>
          </button>
          <button onClick={handleMovie} className={isClick ? 'active' : ''}>
            <img src="./public/img/header/moviesss.svg" alt="Movies" />
            <span>Movies</span>
          </button>
          <button onClick={handleSeries} className={isClickSeries ? 'active' : ''}>
            <img src="./public/img/header/series.svg" alt="Series" />
            <span>TV Series</span>
          </button>
          <button onClick={handleBookMarked} className={isClickBookMarked ? 'active' : ''}>
            <img src="./public/img/header/Bookmark.svg" alt="Bookmark" />
            <span>Bookmarked</span>
          </button>
        </div>
        <div className="avatar">
          <img src="./public/img/header/avatar.svg" alt="Avatar" />
        </div>
      </header>

      <div className="content-area">
        {!isClick && !isClickSeries && !isClickBookMarked && (
          <div className="search-area">
            <img src="./public/img/header/search.svg" alt="Search" />
            <input
              type="text"
              placeholder="Search for movies or TV series"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        )}

        <div className="trending-area">
          {isClickTrend && (
            <>
              <h3>Trending</h3>
              <div className="trend-movies">
                <img src="./public/img/trending/1.svg" alt="Trending movie 1" />
                <img src="./public/img/trending/2.svg" alt="Trending movie 2" />
                <img src="./public/img/trending/3.svg" alt="Trending movie 3" />
                <img src="./public/img/trending/4.svg" alt="Trending movie 4" />
                <img src="./public/img/trending/5.svg" alt="Trending movie 5" />
              </div>
            </>
          )}
        </div>

        <div className="recomended-area">
          {isClick ? (
            <>
              <div className="search-movies">
                <img src="./public/img/header/search.svg" alt="Search" />
                <input
                  type="text"
                  placeholder="Search for movies"
                  value={searchMovie}
                  onChange={handleSearchMovie}
                />
              </div>
              <h3>Movies</h3>
            </>
          ) : isClickSeries ? (
            <>
              <div className="search-series">
                <img src="./public/img/header/search.svg" alt="Search" />
                <input
                  type="text"
                  placeholder="Search for series"
                  value={searchSeries}
                  onChange={handleSearchSeries}
                />
              </div>
              <h3>Series</h3>
            </>
          ) : isClickBookMarked ? (
            <>
              <div className="search-book-marked">
                <img src="./public/img/header/search.svg" alt="Search" />
                <input
                  type="text"
                  placeholder="Search for bookmarked"
                  value={searchBookMarked}
                  onChange={handleSearchBookMarked}
                />
              </div>

              <h3>Bookmarked Movies</h3>
              <div className="recomend-movies">
                <ul>
                  {filteredFilBookMarkedMovies.length > 0 ? (
                    filteredFilBookMarkedMovies.map((movie, index) => (
                      <li key={index}>
                        <div className="movie-item">
                          <img src={movie.img} alt={movie.name} className="movie-poster" />
                          <button
                            className="bookmark-btn"
                            onClick={() => toggleBookmark(movie.id)}
                          >
                            <img
                              src={movie.isBookMarked ? "./public/img/bookmark-filled.svg" : "./public/img/bookmark-empty.svg"}
                              alt={movie.isBookMarked ? "Bookmarked" : "Not bookmarked"}
                            />
                          </button>
                        </div>
                        <div className="inner">
                          <p className="year">{movie.year}</p>
                          <div className="type">
                            <img src="./public/img/header/moviesss.svg" alt="Movie" className="mv" />
                            <p className="type-inner">{movie.type}</p>
                          </div>
                          <p className="audience">{movie.audience}</p>
                        </div>
                        <h6>{movie.name}</h6>
                      </li>
                    ))
                  ) : (
                    <p className="no-results">No bookmarked movies found</p>
                  )}
                </ul>
              </div>

              <h3>Bookmarked TV Series</h3>
              <div className="recomend-movies">
                <ul>
                  {filteredFilBookMarkedSeries.length > 0 ? (
                    filteredFilBookMarkedSeries.map((series, index) => (
                      <li key={index}>
                        <div className="movie-item">
                          <img src={series.img} alt={series.name} className="movie-poster" />
                          <button
                            className="bookmark-btn"
                            onClick={() => toggleBookmark(series.id)}
                          >
                            <img
                              src={series.isBookMarked ? "./public/img/bookmark-filled.svg" : "./public/img/bookmark-empty.svg"}
                              alt={series.isBookMarked ? "Bookmarked" : "Not bookmarked"}
                            />
                          </button>
                        </div>
                        <div className="inner">
                          <p className="year">{series.year}</p>
                          <div className="type">
                            <img src="./public/img/header/series.svg" alt="Series" className="sr" />
                            <p className="type-inner">{series.type}</p>
                          </div>
                          <p className="audience">{series.audience}</p>
                        </div>
                        <h6>{series.name}</h6>
                      </li>
                    ))
                  ) : (
                    <p className="no-results">No bookmarked TV series found</p>
                  )}
                </ul>
              </div>
            </>
          ) : (
            <h3>Recommended for you</h3>
          )}

          {!isClickBookMarked && (
            <div className="recomend-movies">
              <ul>
                {displayMovies.map((movie, index) => (
                  <li key={index}>
                    <div className="movie-item">
                      <img src={movie.img} alt={movie.name} className="movie-poster" />
                      <button
                        className="bookmark-btn"
                        onClick={() => toggleBookmark(movie.id)}
                      >
                        <img
                          src={movie.isBookMarked ? "./public/img/bookmark-filled.svg" : "./public/img/bookmark-empty.svg"}
                          alt={movie.isBookMarked ? "Bookmarked" : "Not bookmarked"}
                        />
                      </button>
                    </div>
                    <div className="inner">
                      <p className="year">{movie.year}</p>
                      <div className="type">
                        {movie.type === 'Movie' ? (
                          <img src="./public/img/header/moviesss.svg" alt="Movie" className="mv" />
                        ) : (
                          <img src="./public/img/header/series.svg" alt="Series" className="sr" />
                        )}
                        <p className="type-inner">{movie.type}</p>
                      </div>
                      <p className="audience">{movie.audience}</p>
                    </div>
                    <h6>{movie.name}</h6>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;