import { API } from "aws-amplify";
import { createPaper, updatePaper, deletePaper } from '../../graphql/mutations';

import { listPapers, getPaper } from "../../graphql/queries";

export const newPaper = async (paperData) => {
	await API.graphql({
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
}

export const updatedPaper = async(paperData) => {
	await API.graphql({
		query: updatePaper,
		variables: {
			input: {
				"title": paperData["title"],
				"description": paperData["description"],
				"likes": paperData["likes"],
				"author": paperData["author"],
				"journal": paperData["journal"],
				"year": paperData["year"],
				"volume": paperData["volume"],
				"issue": paperData["issue"],
				"doi": paperData["doi"],
				"issn": paperData["issn"],
				"citationStorageLocation": paperData["citationStorageLocation"]
			}
		}
	})
}


export const deletePaperById = async (id) => {
    try {
        await API.graphql({
          query: deletePaper,
          variables: {
              input: {
                  id: id
              }
          }
      });
    } catch (error) {
        console.log('error on deleting paper', error);
    }
  };

//QUERIES

// List all items
export const getAllPapers = async() => {
	await API.graphql({
		query: listPapers
	});
}

// Get a specific item
export const getPaperById = async(paperId) => {
	await API.graphql({
		query: getPaper,
		variables: { id: paperId }
	});
}


