import React from 'react';
import '../../App.css';
import { useState } from "react";
import FileUpload from "react-material-file-upload";
import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import DownloadIcon from '@mui/icons-material/Download';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const initialUserRows = [
  {
    id: 1,
    username: 'MichelleSchr'
  },
  {
    id: 1,
    username: 'MichelleSchr'
  },
  {
    id: 1,
    username: 'MichelleSchr'
  },
  {
    id: 1,
    username: 'MichelleSchr'
  },
  {
    id: 1,
    username: 'MichelleSchr'
  }
]

const initialPaperRows = [
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
  {
    id: 3,
    title: 'Najma Also Wrote a Paper',
    author: 'Christen et al.',
    likes: 3,
  },
];

export default function List() {
  const [files, setFiles] = useState([]);
  const [paperRows, setPaperRows] = React.useState(initialPaperRows);
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
      { field: 'username', headerClassName: 'data-grid-header', type: 'string', flex: 1},
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
              <Button sx={{ gridRow: '1', gridColumn: '4 / 5' }}>
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
            <Button sx={{ gridRow: '1', gridColumn: '9/10', textAlign: 'right' }}>
              Add Source
            </Button>
          </Box>
          <Card sx={{height: 800, width: '100%' }}>
            <DataGrid columns={paperColumns} rows={paperRows}/>
          </Card>
        </Box>
      </div>
    </div>
  );
}