import React, { Component } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';

export default class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null,
    };
  }

  componentDidMount() {
    // change this line to grab the id passed on the URL
    // console.log('Movie.js componentDidMount');
    // console.log(this.props.addToSavedList);
    const id = this.props.match.params.id;
    this.fetchMovie(id);
  }

  fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((response) => {
        this.setState(() => ({ movie: response.data }));
      })
      .catch((error) => {
        console.error(error);
      });
  };
  // Uncomment this code when you're ready for the stretch problems
  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  // saveMovie = () => {
  //   const addToSavedList = this.props.addToSavedList;
  //   addToSavedList(this.state.movie);
  // };

  render() {
    // console.log('Movie.js render');
    // console.log(this.props.addToSavedList);
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <div className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        <div
          className="save-button"
          onClick={() => this.props.addToSavedList(this.state.movie)}
        >
          Save
        </div>
      </div>
    );
  }
}
