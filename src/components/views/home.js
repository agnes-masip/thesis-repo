
import React, { useState } from 'react';
import '../../App.css';
import { API, graphqlOperation} from "aws-amplify";
import { listPapers} from './graphql/queries';

function Home() {
  const [papers, setPapers] = useState([])

  const fetchPapers = async () => {
    try{
      const paperData = await API.graphql(graphqlOperation(listPapers));
      const paperList = paperData.data.listPapers.items;
      setPapers(paperList)

    }catch{
      console.log("error fetching papers")
    }
  }


  return (
    <div className="App">
      <header className="App-header">
        <p>
          yeehaw home
        </p>
        <div className='papers'>
        {papers.map(paper => <p>paper.title</p>)}
        </div>
      </header>
    </div>
  );
}

export default Home;
