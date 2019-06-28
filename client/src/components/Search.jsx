import React from 'react';
import Axios from 'axios';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      genres: []
    };
  }
  componentDidMount() {
    this.getGenres();
  }

  getGenres() {
    Axios.get('/movies/genres')
      .then(data => {
        console.log(data.data);
        this.setState({
          genres: data.data
        });
      })
      .catch(err => {
        console.log(err);
      });
    //make an axios request in this component to get the list of genres from your endpoint GET GENRES
  }

  render() {
    return (
      <div className='search'>
        <button
          onClick={() => {
            this.props.swapFavorites();
          }}
        >
          {this.props.showFaves ? 'Show Results' : 'Show Favorites'}
        </button>
        <br />
        <br />

        {/* Make the select options dynamic from genres !!! */}
        {/* How can you tell which option has been selected from here? */}

        <select>
          {this.state.genres.map(genre => {
            return <option value='{genre.name}'>{genre.name}</option>;
          })}
        </select>
        <br />
        <br />

        <button>Search</button>
      </div>
    );
  }
}

export default Search;
