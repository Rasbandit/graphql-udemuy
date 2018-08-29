import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class Companies extends Component {
  renderCompanies(companies) {
    return companies.map(({ id, name }) => (
      <h4 key={id}>
        <Link to={`/companies/${id}`}>{name}</Link>
      </h4>
    ));
  }

  render() {
    const companies = this.props.data.companies || [];
    return <div>{this.renderCompanies(companies)}</div>;
  }
}

const GetAllCompanies = gql`
  {
    companies {
      id
      name
    }
  }
`;

export default graphql(GetAllCompanies)(Companies);
