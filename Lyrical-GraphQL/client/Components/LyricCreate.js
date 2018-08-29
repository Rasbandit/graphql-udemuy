import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import fetchSong from '../queries/fetchSong';
import GQLAddLyric from '../queries/addLyricToSong';

class LyricCreate extends Component {
  constructor() {
    super();

    this.state = {
      content: '',
    };
  }

  onSubmit(event) {
    event.preventDefault();

    this.props.mutate({
      variables: {
        songId: this.props.songId,
        content: this.state.content,
      },
    });
    this.setState({ content: '' });
  }

  render() {
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <label htmlFor="lyric">Lyric:</label>
        <input
          name="lyric"
          type="text"
          value={this.state.content}
          onChange={event => this.setState({ content: event.target.value })}
        />
      </form>
    );
  }
}

export default graphql(GQLAddLyric)(LyricCreate);
