import { API } from "aws-amplify";
import { createUser, updateUser, deleteUser } from '../graphql/mutations';

import { listUsers, getUser } from "../graphql/queries";

const newUser = await API.graphql({
    query: createUser,
    variables: {
        input: {
		"username": "Lorem ipsum dolor sit amet",
		"email": "test12346789@testemailtestemail.com",
		"password": "Lorem ipsum dolor sit amet"
	}
    }
});

const updatedUser = await API.graphql({
    query: updateUser,
    variables: {
        input: {
		"username": "Lorem ipsum dolor sit amet",
		"email": "test12346789@testemailtestemail.com",
		"password": "Lorem ipsum dolor sit amet"
	}
    }
});

const deletedUser = await API.graphql({
    query: deleteUser,
    variables: {
        input: {
            id: "YOUR_RECORD_ID"
        }
    }
});

//QUERIES

// List all items
const allUsers = await API.graphql({
    query: listUsers
});
console.log(allUser);

// Get a specific item
const oneUser = await API.graphql({
    query: getUser,
    variables: { id: 'YOUR_RECORD_ID' }
});