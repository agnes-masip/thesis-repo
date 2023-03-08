import React from 'react';
import '../../App.css';
import { useState, useEffect } from "react";
import FileUpload from "react-material-file-upload";
import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import DownloadIcon from '@mui/icons-material/Download';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';


//these imports probably should go somewhere else
import Amplify from '@aws-amplify/core';
import {API, graphqlOperation} from '@aws-amplify/api';
import awsconfig from '../../aws-exports';
import {listPapers} from '../../graphql/queries';

//creation of paper necessary import
import { createPaper } from '../../graphql/mutations';

//import {newPaper,deletedPaper,updatedPaper} from '../api/papers';

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



Amplify.configure(awsconfig);

export default function List() {
  const [files, setFiles] = useState([]);
  const [paperRows, setPaperRows] = React.useState([]);
  const [userRows, setUserRows] = React.useState(initialUserRows);

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
    fetchPapers();
}, []);



//fetch all the papers in the database (dynamodb nosql)
const fetchPapers = async () => {

  //folder graphql in component has mutations and queries.js these is where you can find
  // the get, updates, etc. these api features export a data structure, e.g: listPapers is the export of a get

  const paperData = await API.graphql(graphqlOperation(listPapers));
  const paperList = paperData.data.listPapers.items;
  setPaperRows(paperList)

};

// create a new paper
const createNewPaper = async () => {
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
}




  // Currently only deletes item from list visually
  const deleteSource = React.useCallback(
    (id) => () => {
      setTimeout(() => {
        setPaperRows((prevPaperRows) => prevPaperRows.filter((row) => row.id !== id));
      });
    },
    [],
  );

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

  // Currently does nothing
  const listActions = React.useCallback(
    (id) => () => {
    },
    [],
  );

  const userColumns = React.useMemo(
    () => [
      { field: 'username', header: 'Username', headerClassName: 'data-grid-header', type: 'string', flex: 1},
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
          <GridActionsCellItem
          icon={<MoreHorizIcon />}
          label="Like"
          onClick={listActions(params.id)}
          />,
        ],
      },
    ],
    [likeSource, downloadSource, deleteSource, listActions],
  );

  return (
    <div className="Content">
      <div className="Title">
        <Typography variant="h4" align="left" color="primary">
          My Literature List
        </Typography>
      </div>
      <div>
        <Box my={4} sx={{ display: 'grid', gap: 2, gridTemplateColumns: 'repeat(2, 1fr)' }}>
          <Box>
            <Typography variant="h6" align="left" color="primary">
              New Source
            </Typography>
            <Card sx={{height: '100%', width: '100%'}}>
              <CardContent>
                <FileUpload value={files} onChange={setFiles} />
              </CardContent>
            </Card>
          </Box>
          <Box>
            <Box sx={{ display: 'grid', gridAutoColumns: '1fr' }}>
              <Typography variant="h6" align="left" color="primary" sx={{ gridRow: '1', gridColumn: 'span 2' }}>
                Collaborators
              </Typography>
              <Button endIcon={<AddIcon />} sx={{ gridRow: '1', gridColumn: '4 / 5' }}>
                Add user
              </Button>
            </Box>
            <Card sx={{height: '100%', width: '100%'}}>
              <DataGrid columns={userColumns} rows={userRows}/>
            </Card>
          </Box>
        </Box>
        <Box my={8}>
          <Box sx={{ display: 'grid', gridAutoColumns: '1fr' }}>
            <Typography variant="h6" align="left" color="primary" sx={{ gridRow: '1', gridColumn: 'span 2' }}>
              Sources
            </Typography>
            <Button endIcon={<DownloadIcon />} sx={{ gridRow: '1', gridColumn: '7/9', textAlign: 'right' }}>
              Export Citations
            </Button>
            <Button endIcon={<AddIcon />} sx={{ gridRow: '1', gridColumn: '9/10', textAlign: 'right' }}>
              Add Source
            </Button>
          </Box>
          <Card sx={{height: 500, width: '100%' }}>
            <DataGrid columns={paperColumns} rows={paperRows}/>
          </Card>
        </Box>
      </div>
    </div>
  );
}