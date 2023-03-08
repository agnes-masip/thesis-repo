import { API } from "aws-amplify";
import { createList, updateList, deleteList} from '../graphql/mutations';

import { listLists, getList } from "../graphql/queries";

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

const deletedList = await API.graphql({
    query: deleteList,
    variables: {
        input: {
            id: "YOUR_RECORD_ID"
        }
    }
});

//QUERIES

// List all items
const allLists = await API.graphql({
    query: listLists
});
console.log(allList);

// Get a specific item
const oneList = await API.graphql({
    query: getList,
    variables: { id: 'YOUR_RECORD_ID' }
});

