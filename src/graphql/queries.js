/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPaper = /* GraphQL */ `
  query GetPaper($id: ID!) {
    getPaper(id: $id) {
      id
      title
      description
      likes
      author
      createdAt
      updatedAt
    }
  }
`;
export const listPapers = /* GraphQL */ `
  query ListPapers(
    $filter: ModelPaperFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPapers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        description
        likes
        author
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
