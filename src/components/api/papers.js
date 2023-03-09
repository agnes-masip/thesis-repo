import { API } from "aws-amplify";
import { createPaper, updatePaper, deletePaper } from '../../graphql/mutations';

import { listPapers, getPaper } from "../../graphql/queries";

export async function newPaper (paperData) { // provide: title!, description!, likes, author!, journal, year, volume, issue, doi, issn, citationStorageLocation
	try{
		await API.graphql({
			query: createPaper,
			variables: {
				input: paperData
			}
		});
	}catch(error){
		console.log('error on creating paper', error);
	}
	
}

export async function updatePaperById (paperData) {
	try{
		delete paperData["createdAt"];
      	delete paperData["updatedAt"];
	} catch (error) {}
	await API.graphql({
		query: updatePaper,
		variables: {
			input: paperData
		}
	})
}


export async function deletePaperById (id) {
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
export async function getAllPapers() {
	const papers = await API.graphql({
		query: listPapers
	});
	return papers.data.listPapers.items;
}

// Get a specific item
export async function getPaperById (paperId) {
	const paper = await API.graphql({
		query: getPaper,
		variables: { id: paperId }
	});
	return paper.data.getPaper;
}


