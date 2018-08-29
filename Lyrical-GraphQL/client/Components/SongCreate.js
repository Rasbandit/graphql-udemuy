import React, { Component } from 'react';
import gql from 'graphql-tag';
import fetchSongs from './../queries/fetchSongs';
import { graphql } from 'react-apollo';
import { Link, hashHistory } from 'react-router';

class Create extends Component {
  constructor() {
    super();

    this.state = {
      title: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange({ target: { value, name } }) {
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props
      .mutate({
        variables: {
          title: this.state.title,
        },
        refetchQueries: [{ query: fetchSongs }],
      })
      .then(() => {
        hashHistory.push('/');
      })
      .catch(() => alert('it failed'));
  }

  render() {
    return (
      <div>
        <Link to="/">Back</Link>
        <h3>Create a new song</h3>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="title">Song Title:</label>
          <input type="text" id="title" name="song_title" value={this.state.title} onChange={this.handleChange} />
        </form>
      </div>
    );
  }
}

const mutation = gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      title
    }
  }
`;

export default graphql(mutation)(Create);
