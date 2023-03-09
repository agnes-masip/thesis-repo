import { API } from "aws-amplify";
import { createList, updateList, deleteList} from '../../graphql/mutations';

import { listLists, getList } from "../../graphql/queries";

<<<<<<< HEAD
export async function addPaperToList(listId, paperId) {
    try {
      const list = await getListById (listId);
      let listData = list;
      let listPapers = listData.papers;
      if (!listPapers.includes(paperId)) { listPapers.push(paperId); }
      listData.papers = listPapers;
      await updateListById(listData);
    } catch (error) {
      console.error('Error on adding paper to list', error);
    }
  }

  const getListById = async(listID) => {
    const listData = await API.graphql({
      query: getList,
      variables: { id: listID }
    });
    return listData.data.getList;
  }

  const updateListById = async(listData) => {
    try {
      delete listData["createdAt"];
      delete listData["updatedAt"];
      await API.graphql({
        query: updateList,
        variables: {
            input: listData
        }
      });
    } catch (error) {
      console.error("Error on update list", error);
    }
  }

export const createNewList = async () =>{
    const newList = await API.graphql({
        query: createList,
        variables: {
            input: {
            "title": "Lorem ipsum dolor sit amet",
            "papers": [],
            "listOwner": "Lorem ipsum dolor sit amet",
            "sharedWith": []
        }
        }
    });
}

export const updateAList = async () =>{
    const updatedList = await API.graphql({
        query: updateList,
        variables: {
            input: {
            "title": "Lorem ipsum dolor sit amet",
            "papers": [],
            "listOwner": "Lorem ipsum dolor sit amet",
            "sharedWith": []
        }
=======
export async function createNewList (listData) { // provide: title, papers, listOwner, sharedWith
    const newList = await API.graphql({
        query: createList,
        variables: {
            input: listData
>>>>>>> 68bf2b2dbdf354cdb3b23ad1d749610338984dd6
        }
    });
}

export async function deleteListById (listId) {
    const deletedList = await API.graphql({
        query: deleteList,
        variables: {
            input: {
                id: listId
            }
        }
    });   
}


//QUERIES

async function getAllLists() {
    const listData = await API.graphql({query: listLists}); 
    return listData.data.listLists.items;
}

export async function getAllListsForUser(userId) {
    const lists = await getAllLists();
    return lists.filter(list => list.listOwner = userId);
}


export async function getListById (listID) {
    const listData = await API.graphql({
      query: getList,
      variables: { id: listID }
    });
    return listData.data.getList;
}

// alter papers in list
export async function deletePaperFromList (listId, paperId) {
    try{
      const list = await getListById(listId);
      let listData = list;
      let listPapers = listData.papers;
      if (listPapers.includes(paperId)) { listPapers = listPapers.filter(id => id != paperId); }
      listData.papers = listPapers;
      await updateListById(listData);
    } catch (error) {
      console.error("Error on deleting paper from list", error);
    }
}

export async function addPaperToList (listId, paperId) {
    try {
      const list = await getListById (listId);
      let listData = list;
      let listPapers = listData.papers;
      if (!listPapers.includes(paperId)) { listPapers.push(paperId); }
      listData.papers = listPapers;
      await updateListById(listData);
    } catch (error) {
      console.error('Error on adding paper to list', error);
    }
}

async function updateListById (listData) {
    try {
      delete listData["createdAt"];
      delete listData["updatedAt"];
      await API.graphql({
        query: updateList,
        variables: {
            input: listData
        }
      });
    } catch (error) {
      console.error("Error on update list", error);
    }
}

