/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTeam = /* GraphQL */ `
  mutation CreateTeam(
    $input: CreateTeamInput!
    $condition: ModelTeamConditionInput
  ) {
    createTeam(input: $input, condition: $condition) {
      id
      name
      teamOwner
      members
      createdAt
      updatedAt
    }
  }
`;
export const updateTeam = /* GraphQL */ `
  mutation UpdateTeam(
    $input: UpdateTeamInput!
    $condition: ModelTeamConditionInput
  ) {
    updateTeam(input: $input, condition: $condition) {
      id
      name
      teamOwner
      members
      createdAt
      updatedAt
    }
  }
`;
export const deleteTeam = /* GraphQL */ `
  mutation DeleteTeam(
    $input: DeleteTeamInput!
    $condition: ModelTeamConditionInput
  ) {
    deleteTeam(input: $input, condition: $condition) {
      id
      name
      teamOwner
      members
      createdAt
      updatedAt
    }
  }
`;
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      username
      email
      password
      createdAt
      updatedAt
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      username
      email
      password
      createdAt
      updatedAt
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      username
      email
      password
      createdAt
      updatedAt
    }
  }
`;
export const createList = /* GraphQL */ `
  mutation CreateList(
    $input: CreateListInput!
    $condition: ModelListConditionInput
  ) {
    createList(input: $input, condition: $condition) {
      id
      title
      papers
      listOwner
      sharedWith
      createdAt
      updatedAt
    }
  }
`;
export const updateList = /* GraphQL */ `
  mutation UpdateList(
    $input: UpdateListInput!
    $condition: ModelListConditionInput
  ) {
    updateList(input: $input, condition: $condition) {
      id
      title
      papers
      listOwner
      sharedWith
      createdAt
      updatedAt
    }
  }
`;
export const deleteList = /* GraphQL */ `
  mutation DeleteList(
    $input: DeleteListInput!
    $condition: ModelListConditionInput
  ) {
    deleteList(input: $input, condition: $condition) {
      id
      title
      papers
      listOwner
      sharedWith
      createdAt
      updatedAt
    }
  }
`;
export const createPaper = /* GraphQL */ `
  mutation CreatePaper(
    $input: CreatePaperInput!
    $condition: ModelPaperConditionInput
  ) {
    createPaper(input: $input, condition: $condition) {
      id
      title
      description
      likes
      author
      journal
      year
      volume
      issue
      doi
      issn
      citationStorageLocation
      createdAt
      updatedAt
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
      description
      likes
      author
      journal
      year
      volume
      issue
      doi
      issn
      citationStorageLocation
      createdAt
      updatedAt
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
      title
      description
      likes
      author
      journal
      year
      volume
      issue
      doi
      issn
      citationStorageLocation
      createdAt
      updatedAt
    }
  }
`;
