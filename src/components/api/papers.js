import { API } from "aws-amplify";
import { createPaper, updatePaper, deletePaper } from '../graphql/mutations';

import { listPapers, getPaper } from "../graphql/queries";

const newPaper = await API.graphql({
    query: createPaper,
    variables: {
        input: {
		"title": "Lorem ipsum dolor sit amet",
		"description": "Lorem ipsum dolor sit amet",
		"likes": 1020,
		"author": [],
		"journal": "Lorem ipsum dolor sit amet",
		"year": 1020,
		"volume": "Lorem ipsum dolor sit amet",
		"issue": "Lorem ipsum dolor sit amet",
		"doi": "Lorem ipsum dolor sit amet",
		"issn": "Lorem ipsum dolor sit amet",
		"citationStorageLocation":  "https://www.google.com/"
	}
    }
});

const updatedPaper = await API.graphql({
    query: updatePaper,
    variables: {
        input: {
		"title": "Lorem ipsum dolor sit amet",
		"description": "Lorem ipsum dolor sit amet",
		"likes": 1020,
		"author": [],
		"journal": "Lorem ipsum dolor sit amet",
		"year": 1020,
		"volume": "Lorem ipsum dolor sit amet",
		"issue": "Lorem ipsum dolor sit amet",
		"doi": "Lorem ipsum dolor sit amet",
		"issn": "Lorem ipsum dolor sit amet",
		"citationStorageLocation":  "https://www.google.com/"
	}
    }
});


const deletedPaper = await API.graphql({
    query: deletePaper,
    variables: {
        input: {
            id: "YOUR_RECORD_ID"
        }
    }
});

//QUERIES

// List all items
const allPapers = await API.graphql({
    query: listPapers
});
console.log(allPapers);

// Get a specific item
const onePaper = await API.graphql({
    query: getPaper,
    variables: { id: 'YOUR_RECORD_ID' }
});


