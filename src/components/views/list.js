import React from 'react';
import '../../App.css';
import { useState, useEffect } from "react";
import FileUpload from "react-material-file-upload";
import { Box, Card, CardContent, Typography } from '@mui/material';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import DownloadIcon from '@mui/icons-material/Download';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

//these imports probably should go somewhere else
import Amplify from '@aws-amplify/core';
import {API, graphqlOperation} from '@aws-amplify/api';
import awsconfig from '../../aws-exports';
import {listPapers} from '../../graphql/queries';

const initialRows = [
  {
    id: 1,
    title: 'Some Long Ass Paper Title',
    author: 'Schrijnemaekers et al.',
    likes: 5,
  },
  {
    id: 2,
    title: 'An Even Longer Paper Title Because Real',
    author: 'Masip-Gomez et al.',
    likes: 10,
  },
  {
    id: 3,
    title: 'A Small Paper Title',
    author: 'van Brummelen et al.',
    likes: 3,
  },
];

Amplify.configure(awsconfig);

export default function List() {
  const [files, setFiles] = useState([]);
  const [papers, setPapers] = useState([]);

  const [rows, setRows] = React.useState(initialRows);

  

  const fetchPapers = () => {
    API.graphql(graphqlOperation(listPapers))
      .then((paperData) => {
        const paperList = paperData.data.listPapers.items;
        console.log(paperList);
        setPapers(paperList);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  

  // Currently only deletes item from list visually
  const deleteSource = React.useCallback(
    (id) => () => {
      setTimeout(() => {
        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
      });
    },
    [],
  );

  // Currently does nothing
  const likeSource = React.useCallback(
    (id) => () => {
      fetchPapers();
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

  const columns = React.useMemo(
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
            icon={<DeleteIcon />}
            label="Delete"
            onClick={deleteSource(params.id)}
          />,
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
          icon={<MoreHorizIcon />}
          label="Like"
          onClick={listActions(params.id)}
          />,
        ],
      },
    ],
    [deleteSource, likeSource, downloadSource, listActions],
  );

  return (
    <div className="Content">
      <div className="Title">
        <Typography variant="h4" align="left" color="primary">
          My Literature List
        </Typography>
      </div>
      <div>
        <Box my={4}>
          <Typography variant="h6" align="left" color="primary">
            New Source
          </Typography>
          <Card>
            <CardContent>
              <FileUpload value={files} onChange={setFiles} />
            </CardContent>
          </Card>
        </Box>
        <Box my={4}>
          <Typography variant="h6" align="left" color="primary">
            Sources
          </Typography>
          <Card sx={{height: 800, width: '100%' }}>
            <DataGrid columns={columns} rows={rows}/>
          </Card>
        </Box>
      </div>
    </div>
  );
}