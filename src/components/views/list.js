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

//these imports probably should go somewhere else
import Amplify from '@aws-amplify/core';
import awsconfig from '../../aws-exports';

import { deletePaperById, getPaperById } from '../api/papers';
import { getListById } from '../api/lists';
import { getUserById } from '../api/users';

export default function List() {
  const [paperRows, setPaperRows] = React.useState([]);
  const [userRows, setUserRows] = React.useState([]);
  const { listID } = useParams();

  useEffect(() => {
    fetchPapers(listID);
    fetchUsers(listID);
  },
  []);


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
  };

  const fetchUsers = async (listID) => {
    let userList = [];
    const listData = await getListById(listID);
    const ownerID = listData.listOwner;
    const owner = await getUserById(ownerID);
    userList.push(owner);

    const peersIDs = listData.sharedWith;
    userList.push()
    for (const id of peersIDs){
      const peer = await getUserById(id);
      userList.push(peer);
    };

    setUserRows(userList);
  };

  const deleteSource = async (sourceID) => {
    deletePaperById(sourceID);
  };

  const deleteCollaborator = async (userID) => {
    deleteCollaborator(userID);
  };

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
    const listData = await getListById(listID);
    const paperIds = listData.papers;

    let paperList = [];
    if (paperIds != null) {
      for (const paperId of paperIds) {
        const paper = await getPaperById(paperId);
        paperList.push(paper);
      }
    }
    exportJSONFile(paperList, 'paper-list.json');
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
          onClick={deleteCollaborator(params.id)}
          />,
        ]
      },
    ],
    [deleteCollaborator],
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
                <Link to={'/add/' + listID} className="Link" style={{ textDecoration: 'none'}}>
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
                {/* <form onSubmit={addUser}>
                  <FormGroup>
                    <FormLabel>
                        Title:
                    </FormLabel>
                    <TextField
                        id="title"
                        name="title"
                        type="text"
                        value={formValues.title}
                        onChange={handleInputChange}
                    />
                  </FormGroup>
                </form> */}
                <DataGrid columns={userColumns} rows={userRows}/>
              </Card>
          </Box>
        </Box>
      </div>
    </div>
  </div>
  );
}