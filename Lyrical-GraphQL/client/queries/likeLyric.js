import gql from 'graphql-tag';

const likeLyric = gql`
  mutation LikeLyric($id: ID) {
    likeLyric(id: $id) {
      id
      content
      likes
    }
  }
`;

export default likeLyric;
