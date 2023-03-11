import { API } from "aws-amplify";
import { createList, updateList, deleteList} from '../../graphql/mutations';

import { listLists, getList } from "../../graphql/queries";
import { getPaperById } from "./papers";

export async function createNewList (listData) { // provide: title, papers, listOwner, sharedWith
    try{
      const newList = await API.graphql({
        query: createList,
        variables: {
            input: listData
        }
    });
    return newList.data.createList;
    }catch(error){
      console.log('error creating a list', error)
    }


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
      if (listPapers.includes(paperId)) { listPapers = listPapers.filter(id => id !== paperId); }
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

export async function updateListById (listData) {
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

// alter collaborators

export async function deleteCollaboratorFromList (listId, userId) {
    try{
      const list = await getListById(listId);
      let listData = list;
      let collaborators = listData.sharedWith;
      if (collaborators.includes(userId)) { collaborators = collaborators.filter(id => id !== userId); }
      listData.sharedWith = collaborators;
      await updateListById(listData);
    } catch (error) {
      console.error("Error on deleting collaborator from list", error);
    }
}

export async function addCollaboratorToList (listId, userId) {
    try {
      const list = await getListById (listId);
      let listData = list;
      let collaborators = listData.sharedWith;
      if (!collaborators.includes(userId)) { collaborators.push(userId); }
      listData.sharedWith = collaborators;
      await updateListById(listData);
    } catch (error) {
      console.error('Error on adding collaborator to list', error);
    }
}

// get bibtex export for paper

export async function getBibtexReferenceForPaper (paperId) {
    const paperData = await getPaperById(paperId);
    const firstAuthor = paperData.author[0];
    const firstAuthorLastName = firstAuthor.split(".").at(-1).trim();
    const authors = paperData.author.join(" and ");
    const volume = paperData.volume ? paperData.volume : "";
    const issue = paperData.issue ? paperData.issue : "";
    const doi = paperData.doi ? paperData.doi : "";
    const issn = paperData.issn ? paperData.issn : "";
    // missing: pages!
    let reference = `@article{ ${firstAuthorLastName.replace(" ", "_")}:${paperData.year}
        title = { ${paperData.title} },
        author = { ${authors} },
        journal = { ${paperData.journal} },
        year = { ${paperData.year} },
        volume = { ${volume },
        issue = { ${issue} },
        doi = { ${doi} },
        issn = { ${issn} }
    }`;
    return reference;
}

export async function getBibtexForList (listId) {
    const listData = await getListById(listId);
    const paperIds = listData.papers;
    let references = "";
    for (let paperId of paperIds) {
        references += await getBibtexReferenceForPaper(paperId) + "\n\n";
    }
    return references.slice(0, -4);
}