import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class Person extends Component {
  constructor() {
    super();

    this.state = {
      edit: false,
      firstName: '',
      age: '',
    };
  }

  componentWillReceiveProps({
    data: {
      user: { firstName, age },
    },
  }) {
    this.setState({ firstName, age });
  }

  toggleEdit = () => {
    this.setState({ edit: true });
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value })
  }

  toggleMutate = () => {
    this.props.mutate({
      variables: {
        id: this.props.data.user.id,
        firstName: this.state.firstName,
        age: +this.state.age
      },
      refetchQueries: [{ query: getUsers }],
    })
    this.setState({ edit: false })
  }

  render() {
    console.log(this.props.data.user);
    if (this.props.data.loading) return <div>Loading...</div>;

    const { user } = this.props.data;
    if (this.state.edit) {
      return (
        <div id="person-edit">
          <Link to="/">Back</Link>
          <label htmlFor="firstName">
            Name:
            <input type="text" id="firstName" name="firstName" value={this.state.firstName} onChange={this.handleChange} />
          </label>
          <label htmlFor="Age">
            Age:
            <input type="text" id="age" name="age" value={this.state.age} onChange={this.handleChange} />
          </label>
          <button onClick={this.toggleMutate}>Save</button>
        </div>
      )
    }
    return (
      <div>
        <Link to="/">Back</Link>
        <h1>{user.firstName}</h1>
        <h2>Age: {user.age}</h2>
        <h2>
          Company: <Link to={`/companies/${user.company.id}`}>{user.company.name}</Link>
        </h2>
        <button onClick={this.toggleEdit}>Edit</button>
      </div>
    );
  }
}

const GetUsers = gql`
  query UserQuery($id: String!) {
    user(id: $id) {
      company {
        name
        id
      }
      age
      firstName
      id
    }
  }
`;

const UpdateUser = gql`
mutation UpdateUser($id: String!, $firstName: String, $Age: Int) {
  updateUser(id: $id, firstName: $firstName, age: $Age) {
		id
    firstName
    age
    company {
      id
      name
    }
  }
}`

export default graphql(UpdateUser)(graphql(GetUsers, {
  options: props => ({ variables: { id: props.match.params.id } }),
})(Person));
