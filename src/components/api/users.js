import { API } from "aws-amplify";
import { createUser, updateUser, deleteUser } from '../../graphql/mutations';

import { listUsers, getUser } from "../../graphql/queries";

export async function newUser (userData){ //provide: username, email, password
    const newUserData = await API.graphql({
        query: createUser,
        variables: {
            input: userData
        }
    });
    return newUserData.data.createUser;
}

export async function updateUserById (userData){
    try {
        delete userData["createdAt"];
        delete userData["updatedAt"];
    } catch (error) {}
    await API.graphql({
        query: updateUser,
        variables: {
            input: userData
        }
    });
}

export async function deleteUserById (userId){
    await API.graphql({
        query: deleteUser,
        variables: {
            input: {
                id: userId
            }
        }
    });
}

//QUERIES

// List all items
export async function getAllUsers() {
    const allUsers = await API.graphql({
        query: listUsers
    });
    return allUsers.data.listUsers.items;
}

// Get a specific item
export async function getUserById(userId) {
    const user = await API.graphql({
        query: getUser,
        variables: { id: userId }
    });
    return user.data.getUser;
}

export async function getUserByEmail(email){
    const users = await getAllUsers();
    return users.filter(user => user.email === email);
}

export async function userEmailExists(email){
    const users = await getAllUsers();
    return users.filter(user => user.email === email).length === 1;
}

export async function usernameExists(username){
    const users = await getAllUsers();
    return users.filter(user => user.username === username).length === 1;
}

export async function getUserByUsername(username){
    const users = await getAllUsers();
    return users.filter(user => user.username === username);
}