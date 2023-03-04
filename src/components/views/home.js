
import React, { useState, useEffect} from 'react';
import '../../App.css';
// import Amplify, { API, graphqlOperation } from 'aws-amplify';
import Amplify from '@aws-amplify/core';
import {API, graphqlOperation} from '@aws-amplify/api';
// import awsconfig from '../../aws-exports';
import { listPapers} from '../../graphql/queries';


// Amplify.configure(awsconfig);

function Home() {
  // the variable papers is the data you can use in frontend
  const [papers, setPapers] = useState([])

  // useEffect is to call the fetch every time we go to home.js
  useEffect(() => {
        fetchPapers();
    }, []);

  

  //fetch all the papers in the database (dynamodb nosql)
  const fetchPapers = async () => {
    
      //folder graphql in component has mutations and queries.js these is where you can find 
      // the get, updates, etc. these api features export a data structure, e.g: listPapers is the export of a get
      const paperData = await API.graphql(graphqlOperation(listPapers));
      const paperList = paperData.data.listPapers.items;
      console.log(paperList)
      setPapers(paperList)

    
  };

  const updatePaper = async id => {
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


  return (
    <div className="App">
      <header className="App-header">
        <p>
          yeehaw home
          {papers.map((paper) => {
            return (
            <p>paper.title</p>
            );
          })}
        </p>
       
      </header>
    </div>
  );
}

export default Home;
