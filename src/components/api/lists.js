import { API } from "aws-amplify";
import { createList, updateList, deleteList} from '../../graphql/mutations';

import { listLists, getList } from "../../graphql/queries";

const createNewList = async () =>{
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

const updateAList = async () =>{
    const updatedList = await API.graphql({
        query: updateList,
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

const deleteAList = async () =>{
    const deletedList = await API.graphql({
        query: deleteList,
        variables: {
            input: {
                id: "YOUR_RECORD_ID"
            }
        }
    });   
}


//QUERIES

const getAllLists = async () =>{
    // List all items
const allLists = await API.graphql({
    query: listLists
});
//onsole.log(allLists);  
}

const getAList = async () =>{
    

// Get a specific item
const oneList = await API.graphql({
    query: getList,
    variables: { id: 'YOUR_RECORD_ID' }
});    
}

export const getListById = async(listID) => {
    const listData = await API.graphql({
      query: getList,
      variables: { id: listID }
    });
    return listData.data.getList;
}

// alter papers in list
export const deletePaperFromList = async(listId, paperId) => {
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

export const addPaperToList = async(listId, paperId) => {
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

export const updateListById = async(listData) => {
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

