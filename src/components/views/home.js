
import React, { useState, useEffect} from 'react';
import '../../App.css';
// import Amplify, { API, graphqlOperation } from 'aws-amplify';
import Amplify from '@aws-amplify/core';
import {API, graphqlOperation} from '@aws-amplify/api';
import awsconfig from '../../aws-exports';
import { listPapers} from '../../graphql/queries';


Amplify.configure(awsconfig);

function Home() {
  // the variable papers is the data you can use in frontend
  const [papers, setPapers] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  // useEffect is to call the fetch every time we go to home.js
  useEffect(() => {
        fetchPapers();
    }, []);



  //fetch all the papers in the database (dynamodb nosql)
  const fetchPapers = async () => {

      //folder graphql in component has mutations and queries.js these is where you can find
      // the get, updates, etc. these api features export a data structure, e.g: listPapers is the export of a get
      console.log("fuckmylife")
      const paperData = await API.graphql(graphqlOperation(listPapers));
      const paperList = paperData.data.listPapers.items;
      console.log(paperList)
      setPapers(paperList)


  };

  const updatePaper = async (id, title) => {
    try {
        const paper = papers[id];
        paper.title = "we need to pass a variable here";
        delete paper.createdAt;
        delete paper.updatedAt;

        const paperData = await API.graphql(graphqlOperation(updatePaper, { input: paper }));
        const paperList = [...papers];
        paperList[id] = paperData.data.updatePaper;
        setPapers(paperList);
    } catch (error) {
        console.log('error on updating paper info', error);
    }
};

const deletePaper = async (id) => {
    try {
        const paper = papers[id];
        delete paper.createdAt;
        delete paper.updatedAt;

        const paperData = await API.graphql(graphqlOperation(deletePaper, { input: paper }));
        const paperList = [...papers];
        paperList[id] = paperData.data.deletePaper;
        setPapers(paperList);
    } catch (error) {
        console.log('error on deleting a paper', error);
    }
};


  return (
    <div className="App">
      <header className="App-header">
      
        <h1>Papers</h1>
          <table>
            <tbody>
              <tr>
                <th>Paper ID</th>
                <th>Paper Title</th>
                <th>Paper Author</th>
                <th>Button to edit data</th>
              </tr>
                {papers.map((paper) => {
                  return (
                    <tr key='${paper.id}'>
                      <td>{paper.id}</td>
                      <td>{paper.title}</td>
                      
                       {/*This button is to use if you create a form for the changes. Right now,
                         it only changes the title. */}

                         <button onClick={() => updatePaper(paper.id, "idList")}> </button>

                        {/* This button is to delete the paper.
                         <button onClick={() => deletePaper(paper.id)}> </button> */}
                    </tr>
                  );
                })}
              </tbody>
          </table>
          <h1>Papers in a specific list</h1>
          
              {/*This is the form to upload papers.*/}
          {/* <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="title">Title:</label>
              <input type="text" id="title" value={title} onChange={(event) => setTitle(event.target.value)} />
            </div>
            <div>
              <label htmlFor="body">Author:</label>
              <input type="text" id="author" value={author}  onChange={(event) => setAuthor(event.target.value)} />
            </div>
             <button type="submit">Create paper</button>
          </form> */}





      </header>
    </div>
  );
}

export default Home;
