import React, { Component } from 'react';
import gql from 'graphql-tag';
import fetchSongs from './../queries/fetchSongs';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';

class SongList extends Component {
  renderSongs() {
    return this.props.data.songs.map(({ id, title }) => (
      <li key={id} className="collection-item">
        <Link to={`/songs/${id}`}>{title}</Link>
        <i className="material-icons" onClick={() => this.deleteSong(id)}>
          delete
        </i>
      </li>
    ));
  }

  deleteSong(id) {
    this.props.mutate({ variables: { id } }).then(() => {
      this.props.data.refetch();
    });
  }

  render() {
    if (this.props.data.loading) return <div>Loading...</div>;
    return (
      <section>
        <ul className="collection">{this.renderSongs()}</ul>
        <Link to="/songs/new" className="btn-floating btn-large red right">
          <i className="material-icons right">add</i>
        </Link>
      </section>
    );
  }
}

const DELETE = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`;

export default graphql(DELETE)(graphql(fetchSongs)(SongList));
