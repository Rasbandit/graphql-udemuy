import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import fetchSong from '../queries/fetchSong';

import LyricList from './LyricList';
import LyricCreate from './LyricCreate';

class SongDetail extends Component {
  render() {
    if (this.props.data.loading) return <div>Loading...</div>;

    const { song } = this.props.data;

    return (
      <div>
        <Link to="/">Back</Link>
        <h3>{song.title}</h3>
        <LyricList lyrics={song.lyrics} />
        <LyricCreate songId={song.id} />
      </div>
    );
  }
}

export default graphql(fetchSong, {
  options: props => ({ variables: { id: props.params.id } }),
})(SongDetail);
