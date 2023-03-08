/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTeam = /* GraphQL */ `
  subscription OnCreateTeam($filter: ModelSubscriptionTeamFilterInput) {
    onCreateTeam(filter: $filter) {
      id
      name
      teamOwner
      members
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateTeam = /* GraphQL */ `
  subscription OnUpdateTeam($filter: ModelSubscriptionTeamFilterInput) {
    onUpdateTeam(filter: $filter) {
      id
      name
      teamOwner
      members
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteTeam = /* GraphQL */ `
  subscription OnDeleteTeam($filter: ModelSubscriptionTeamFilterInput) {
    onDeleteTeam(filter: $filter) {
      id
      name
      teamOwner
      members
      createdAt
      updatedAt
    }
  }
`;
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
      id
      username
      email
      password
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
      id
      username
      email
      password
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
      id
      username
      email
      password
      createdAt
      updatedAt
    }
  }
`;
export const onCreateList = /* GraphQL */ `
  subscription OnCreateList($filter: ModelSubscriptionListFilterInput) {
    onCreateList(filter: $filter) {
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
export const onUpdateList = /* GraphQL */ `
  subscription OnUpdateList($filter: ModelSubscriptionListFilterInput) {
    onUpdateList(filter: $filter) {
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
export const onDeleteList = /* GraphQL */ `
  subscription OnDeleteList($filter: ModelSubscriptionListFilterInput) {
    onDeleteList(filter: $filter) {
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
export const onCreatePaper = /* GraphQL */ `
  subscription OnCreatePaper($filter: ModelSubscriptionPaperFilterInput) {
    onCreatePaper(filter: $filter) {
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
export const onUpdatePaper = /* GraphQL */ `
  subscription OnUpdatePaper($filter: ModelSubscriptionPaperFilterInput) {
    onUpdatePaper(filter: $filter) {
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
export const onDeletePaper = /* GraphQL */ `
  subscription OnDeletePaper($filter: ModelSubscriptionPaperFilterInput) {
    onDeletePaper(filter: $filter) {
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
