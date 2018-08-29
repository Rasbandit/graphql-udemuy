<pre>
query UserQuery($id: String!){
  user(id: $id) {
    company {
			name
      id
    }
    firstName
    id
  }
}
</pre>


<pre>
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
}
</pre>