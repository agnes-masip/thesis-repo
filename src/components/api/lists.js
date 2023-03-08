import { API } from "aws-amplify";
import { createList, updateList, deleteList} from '../graphql/mutations';

import { listLists, getList } from "../graphql/queries";

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



