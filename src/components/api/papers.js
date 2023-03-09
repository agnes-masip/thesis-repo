import { API } from "aws-amplify";
import { createPaper, updatePaper, deletePaper } from '../../graphql/mutations';

import { listPapers, getPaper } from "../../graphql/queries";

export async function newPaper(paperData) {
	
	const response = await API.graphql({
		query: createPaper,
		variables: {
			input: paperData
		}
	});
	const newPaperId = response.data.createPaper.id;
	return newPaperId;

}

export const updatePaperById = async(paperData) => {
	await API.graphql({
		query: updatePaper,
		variables: {
			input: paperData
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


