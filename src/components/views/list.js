import React from 'react';
import '../../App.css';
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Box, Button, Card, Typography } from '@mui/material';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import DownloadIcon from '@mui/icons-material/Download';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
//import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import NavBar from '../navbar';
import EditIcon from '@mui/icons-material/Edit';



//import {newPaper,deletedPaper,updatedPaper} from '../api/papers';
import {deletePaperById, getPaperById} from '../api/papers';
import {getListById, getBibtexForList} from '../api/lists';

const initialUserRows = [
  {
    id: 1,
    username: 'MichelleSchr'
  },
  {
    id: 2,
    username: 'MichelleSchr'
  },
  {
    id: 3,
    username: 'MichelleSchr'
  },
  {
    id: 4,
    username: 'MichelleSchr'
  },
  {
    id: 5,
    username: 'MichelleSchr'
  }
]



export default function List() {
  const [paperRows, setPaperRows] = React.useState([]);
  const [userRows, setUserRows] = React.useState(initialUserRows);
  const { listID } = useParams();

  // Currently only deletes item from list visually
  const deleteUser = React.useCallback(
    (id) => () => {
      setTimeout(() => {
        setUserRows((prevUserRows) => prevUserRows.filter((row) => row.id !== id));
      });
    },
    [],
  );

  useEffect(() => {
    fetchPapers(listID);
  },
  []);


  //fetch all the papers in the database (dynamodb nosql)
  const fetchPapers = async (listID) => {

    const listData = await getListById(listID);
    const paperIds = listData.papers;
    //console.log(listData);
    let paperList = [];
    if(paperIds != null){
      for (const paperId of paperIds){
        const paper = await getPaperById(paperId)
        paperList.push(paper);
      };
    }
    
    setPaperRows(paperList);

    // some test functions
    // deletePaperFromList("l12", 'a14');
    // addPaperToList("l12", 'a14');
  };

  
  const deleteSource = React.useCallback(
    (id) => () => {
      setTimeout(() => {
        
        setPaperRows((prevPaperRows) => prevPaperRows.filter((row) => row.id !== id));
        deletePaperById(id);
      });
    },
    [],
  );

  function exportJSONFile(jsonData, filename) {
    const blob = new Blob([JSON.stringify(jsonData)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
  
    const link = document.createElement('a');
    link.setAttribute('download', filename);
    link.setAttribute('href', url);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  
  async function exportPaperList(listID) {
    const references = await getBibtexForList(listID);
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(references));
    element.setAttribute('download', "references.bib");

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

  // Currently does nothing
  const likeSource = React.useCallback(
    (id) => () => {

    },
    [],
  );

  // Currently does nothing
  const downloadSource = React.useCallback(
    (id) => () => {
    },
    [],
  );

  const userColumns = React.useMemo(
    () => [
      { field: 'username', headerName: 'Username', headerClassName: 'data-grid-header', type: 'string', flex: 1},
      {
        field: 'actions',
        headerClassName: 'data-grid-header',
        type: 'actions',
        flex: 0.25,
        getActions: (params) => [
          <GridActionsCellItem
          icon={<DeleteIcon />}
          label="delete"
          onClick={deleteUser(params.id)}
          />,
        ]
      },
    ],
    [deleteUser],
  );

  const paperColumns = React.useMemo(
    () => [
      { field: 'title', headerName: 'Title', headerClassName: 'data-grid-header', type: 'string', flex: 1.5 },
      { field: 'author', headerName: 'Author', headerClassName: 'data-grid-header', type: 'string', flex: 1 },
      { field: 'likes', headerName: 'Likes', headerClassName: 'data-grid-header', type: 'number', flex: 0.25 },
      {
        field: 'actions',
        headerClassName: 'data-grid-header',
        type: 'actions',
        flex: 0.5,
        getActions: (params) => [
          <GridActionsCellItem
          icon={<ThumbUpIcon />}
          label="Like"
          onClick={likeSource(params.id)}
          />,
          <GridActionsCellItem
          icon={<DownloadIcon />}
          label="Like"
          onClick={downloadSource(params.id)}
          />,
          <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={deleteSource(params.id)}
        />,
        <Link to={'/edit/' + listID + '/' + params.id}>
          <GridActionsCellItem
          icon={<EditIcon />}
          label="Like"
          />
        </Link>,
        ],
      },
    ],
    [likeSource, downloadSource, deleteSource],
  );

  return (
  <div>
    <NavBar/>
    <div className="Content">
      <div className="Title">
        <Typography variant="h4" align="left" color="primary">
          My Literature List
        </Typography>
        <Button startIcon={<KeyboardBackspaceIcon/>} sx={{gridRow: '1', gridColumn: '9/10'}}>
                      <Link to={'/'} className="Link" style={{ textDecoration: 'none'}}>
                          Back
                      </Link>
                  </Button>
      </div>
      <div>
        <Box my={4} sx={{ display: 'grid', gap: 2, gridAutoColumns: '1fr' }}>
          <Box sx={{ display: 'grid', gridAutoColumns: '1fr', gridColumn: '1/4' }}>
            <Box sx={{ display: 'grid', gridAutoColumns: '1fr'}}>
              <Typography variant="h6" align="left" color="primary" sx={{ gridRow: '1', gridColumn: 'span 2' }}>
                Sources
              </Typography>
              <Button onClick={() => exportPaperList(listID)} endIcon={<DownloadIcon />} sx={{ gridRow: '1', gridColumn: '8/9', textAlign: 'right' }}>
                Export
              </Button>
              <Button endIcon={<AddIcon />} sx={{ gridRow: '1', gridColumn: '9/10', textAlign: 'right' }}>
                <Link to={'/add/' + listID} class="Link" style={{ textDecoration: 'none'}}>
                  Add
                </Link>
              </Button>
            </Box>
          <Card sx={{height: 500, width: '100%' }}>
            <DataGrid columns={paperColumns} rows={paperRows}/>
          </Card>
          </Box>
            <Box sx={{ display: 'grid', gridAutoColumns: '1fr', gridColumn: '4/5' }}>
              <Box sx={{ display: 'grid', gridAutoColumns: '1fr'}}>
                <Typography variant="h6" align="left" color="primary" sx={{ gridRow: '1', gridColumn: 'span 2' }}>
                  Collaborators
                </Typography>
                <Button endIcon={<AddIcon />} sx={{ gridRow: '1', gridColumn: '5/6', textAlign: 'right' }}>
                  Add
                </Button>
              </Box>
              <Card sx={{height: 500, width: '100%'}}>
                <DataGrid columns={userColumns} rows={userRows}/>
              </Card>
          </Box>
        </Box>
      </div>
    </div>
  </div>
  );
}