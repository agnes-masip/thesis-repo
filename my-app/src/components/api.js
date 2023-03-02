import React from 'react';
import { API } from "aws-amplify";


// contains functions for interaction with API

const USER_ENDPOINT = "";
const PAPER_ENDPOINT = "";
const LIST_ENDPOINT = "";

const ERROR_MALFORMED = "ERROR: Malformed query!";
const ERROR_FORBIDDEN = "ERROR: User not authorized!";
const ERROR_NOT_FOUND = "ERROR: This resource does not exist!";
const ERROR_OTHER = "ERROR: An unknown error occurred!";
const ERROR_INTERNAL_SERVER = "ERROR: Internal server error!";

const CODE_MALFORMED = 400;
const CODE_FORBIDDEN = 403;
const CODE_NOT_FOUND = 404;
const CODE_OK = 200; // will also use this for 201
const CODE_SERVER_ERROR = 500;

function returnGetRequests(apiData){
    switch (apiData.status) {
        case CODE_MALFORMED: 
            return ERROR_MALFORMED;
        case CODE_FORBIDDEN:
            return ERROR_FORBIDDEN;
        case CODE_NOT_FOUND:
            return ERROR_NOT_FOUND;
        case CODE_SERVER_ERROR:
            return ERROR_INTERNAL_SERVER;
        case CODE_OK:
            return apiData; 
        default:
            return ERROR_OTHER;
    }
}

function returnCreateAddModifyRequests(apiData){
    switch (apiData.status){
        case CODE_MALFORMED:
            return ERROR_MALFORMED;
        case CODE_FORBIDDEN: 
            return ERROR_FORBIDDEN;
        case CODE_SERVER_ERROR:
            return ERROR_INTERNAL_SERVER;
        case CODE_OK:
            return apiData;
        default:
            return ERROR_OTHER;
    }
}

function returnDeleteRequests(apiData){
    switch (apiData.status){
        case CODE_MALFORMED:
            return ERROR_MALFORMED;
        case CODE_FORBIDDEN:
            return ERROR_FORBIDDEN;
        case CODE_NOT_FOUND:
            return ERROR_NOT_FOUND;
        case CODE_SERVER_ERROR:
            return ERROR_INTERNAL_SERVER;
        case CODE_OK:
            return apiData;
        default:
            return ERROR_OTHER;
    }
}

async function executeQuery(query, variables){
    const apiData = await API.graphql({query: query, variables: variables});
    return apiData;
}

// list-related functions
export async function getList(listId, userId) {
    const apiData = await executeQuery("", {listId: listId, userId: userId});
    // assumption: {status: 200, listId: 0, userId: 0, papers: {paperId1: {paperName, paperAuthor ...}, paperId2: {paperName, paperAuthor ...}}}
    returnGetRequests(apiData);
}

export async function createList(listName, userId) {
    const apiData = await executeQuery("", {listName: listName, userId: userId});
    returnCreateAddModifyRequests(apiData);
}

export async function deleteList(listId, userId) {
    const apiData = await executeQuery("", {listId: listId, userId: userId});
    returnDeleteRequests(apiData);
}

export async function addPaperToList(paperId, listId, userId) {
    const apiData = await executeQuery("", {paperId: paperId, listId: listId, userId: userId});
    returnCreateAddModifyRequests(apiData);
}

export async function removePaperFromList(paperId, listId, userId) {
    const apiData = await executeQuery("", {paperId: paperId, listId: listId, userId: userId});
    returnDeleteRequests(apiData);
}

export async function addCollaborator(listId, userId) {
    const apiData = await executeQuery("", {listId: listId, userId: userId});
    returnCreateAddModifyRequests(apiData);
}

export async function removeCollaborator(listId, userId) {
    const apiData = await executeQuery("", {listId: listId, userId: userId});
    returnDeleteRequests(apiData);
}

export async function getAllListsForUser(userId) {
    const apiData = await executeQuery("", {userId: userId});
    returnGetRequests(apiData);
}

// paper-related functions
export async function createPaper(paperInfo, userId) {
    const apiData = await executeQuery("", {paperInfo: paperInfo, userId: userId});
    returnCreateAddModifyRequests(apiData);
} //paperinfo is a JSON object?

export async function updatePaper(paperInfo, userId) {//paperinfo contains at least paperId and one other paper property
    let currentPaper = getPaper(paperInfo.paperId, userId);
    for (let key in paperInfo){
        currentPaper[key] = paperInfo[key];
    }
    const apiData = await executeQuery("", {paperInfo: paperInfo, userId: userId});
    returnCreateAddModifyRequests(apiData);
} 

export async function getPaper(paperId, userId) {
    const apiData = await executeQuery("", {paperId: paperId, userId: userId});
    returnGetRequests(apiData);
}

export async function deletePaper(paperId, userId) {
    const apiData = await executeQuery("", {paperId: paperId, userId: userId});
    returnDeleteRequests(apiData);
}

// user-related functions'
export async function createUser(userInfo) {
    const apiData = await executeQuery("", {userInfo: userInfo});
    returnCreateAddModifyRequests(apiData);
}

export async function updateUsername(userId, newUsername) {
    const apiData = await executeQuery("", {userId: userId, username: newUsername});
    returnCreateAddModifyRequests(apiData);
}

export async function updatePassword(userId, newPassword) {// !! password MUST be encrypted at this point !!
    const apiData = await executeQuery("", {userId: userId, password: newPassword});
    returnCreateAddModifyRequests(apiData);
} 

export async function updateEmail (userId, newEmail) {
    const apiData = await executeQuery("", {userId: userId, email: newEmail});
    returnCreateAddModifyRequests(apiData);
}

export async function deleteUser(userId) { // also delete (shared) lists?
    const apiData = await executeQuery("", {userId: userId});
    returnDeleteRequests(apiData);
}

export async function checkCredentials(username, password) { // only encrypted passwords, returns userId if authorized?
    const apiData = await executeQuery("", {username: username, password: password});
    returnGetRequests(apiData);
}

export async function getUserId(username, email) { // assumption: username and email must be unique --> db constraint
    const apiData = await executeQuery("", {username: username, email: email});
    returnGetRequests(apiData);
}

export async function getUserInfo(userId) {
    const apiData = await executeQuery("", {userId: userId});
    returnGetRequests(apiData);
}