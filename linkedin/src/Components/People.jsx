import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class People extends Component {
  renderPeople(users) {
    return users.map(({ id, firstName }) => (
      <h4 key={id}>
        <Link to={`/people/${id}`}>{firstName}</Link>
      </h4>
    ));
  }

  render() {
    const users = this.props.data.users || [];
    return <div>{this.renderPeople(users)}</div>;
  }
}

const GetAllUsers = gql`
  {
    users {
      id
      firstName
    }
  }
`;

export default graphql(GetAllUsers)(People);
