/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPaper = /* GraphQL */ `
  query GetPaper($id: ID!) {
    getPaper(id: $id) {
      id
      author
      title
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
        author
        title
      }
      nextToken
    }
  }
`;
