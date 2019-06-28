import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
// import AnyComponent from './components/filename.jsx'
import Search from './components/Search.jsx';
import Movies from './components/Movies.jsx';
import Axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [{ deway: 'movies' }],
      favorites: [{ deway: 'favorites' }],
      showFaves: false,
      selectedGenre: null
    };
    this.handleSelection = this.handleSelection.bind(this);
    this.getMovies = this.getMovies.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.swapFavorites = this.swapFavorites.bind(this);
    // you might have to do something important here!
  }

  componentDidMount() {
    this.getMovies();
    this.getFaves();
  }

  handleSelection(genreid) {
    this.setState(
      {
        selectedGenre: genreid
      },
      err => {
        if (err) {
          console.log(err);
        }
      }
    );
  }

  getMovies() {
    Axios.get('/movies/search', {
      params: {
        genre_id: this.state.selectedGenre
      }
    }).then(results => {
      this.setState({ movies: results.data.results }, err => {
        if (err) {
          console.log(err);
        }
      });
    });
    // make an axios request to your server on the GET SEARCH endpoint
  }
  getFaves() {
    Axios.get('/movies/faves').then(results => {
      this.setState({ favorites: results.data }, err => {
        if (err) {
          console.log(err);
        } else {
          console.log(results);
        }
      });
    });
    // make an axios request to your server on the GET SEARCH endpoint
  }

  handleClick(movie) {
    if (!this.state.showFaves) {
      this.saveMovie(movie);
    } else {
      this.deleteMovie(movie);
    }
  }

  saveMovie(movie) {
    //console.log('save movie', movie);
    //save selected movie to db
    Axios.post('/movies/save', {
      data: {
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        release_date: movie.release_date,
        average_vote: movie.vote_average
      }
    })
      .then(data => {
        //get faves from server and update state
        alert('movie has been added as your favorite');
        var temp = this.state.favorites;
        temp.push(movie);
        this.setState({ favorites: temp });
      })
      .catch(err => {
        console.log(err);
      });
    // same as above but do something diff
  }

  deleteMovie(movie) {
    console.log('delete:', movie);
    Axios.delete('/movies/delete', {
      data: { id: movie.id }
    }).then(results => {
      alert('deleted!');
      //get faves from server and update state
      this.getFaves();
    });
  }

  swapFavorites() {
    //dont touch
    this.setState({
      showFaves: !this.state.showFaves
    });
  }

  render() {
    return (
      <div className='app'>
        <header className='navbar'>
          <h1>Bad Movies</h1>
        </header>

        <div className='main'>
          <Search
            swapFavorites={this.swapFavorites}
            showFaves={this.state.showFaves}
            handleSelection={this.handleSelection}
            getMovies={this.getMovies}
            swapFavorites={this.swapFavorites}
          />
          <Movies
            movies={
              this.state.showFaves ? this.state.favorites : this.state.movies
            }
            handleClick={this.handleClick}
            showFaves={this.state.showFaves}
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
