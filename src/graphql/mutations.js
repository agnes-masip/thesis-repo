/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPaper = /* GraphQL */ `
  mutation CreatePaper(
    $input: CreatePaperInput!
    $condition: ModelPaperConditionInput
  ) {
    createPaper(input: $input, condition: $condition) {
      id
      title
      author
    }
  }
`;
export const updatePaper = /* GraphQL */ `
  mutation UpdatePaper(
    $input: UpdatePaperInput!
    $condition: ModelPaperConditionInput
  ) {
    updatePaper(input: $input, condition: $condition) {
      id
      title
      author
    }
  }
`;
export const deletePaper = /* GraphQL */ `
  mutation DeletePaper(
    $input: DeletePaperInput!
    $condition: ModelPaperConditionInput
  ) {
    deletePaper(input: $input, condition: $condition) {
      id
    }
  }
`;
