import React from 'react';
import '../../App.css';
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Box, Button, Card, FormGroup, TextField, Typography } from '@mui/material';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import DownloadIcon from '@mui/icons-material/Download';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import NavBar from '../navbar';
import EditIcon from '@mui/icons-material/Edit';

import { deletePaperById, getPaperById, likePaper } from '../api/papers';
import { addCollaboratorToList, getListById, deleteCollaboratorFromList, getBibtexForList} from '../api/lists';
import { getUserById, getUserByUsername, usernameExists } from '../api/users';

export default function List() {
  const { username, listOwner, listID } = useParams();
  const [paperRows, setPaperRows] = useState([]);
  const [userRows, setUserRows] = useState([]);
  const [userFormValues, setUserFormValues] = useState([]);
  const [listOwnerID, setListOwnerID] = useState("");
  let papersLikedByUser = [];

  useEffect(async() => {
    await fetchPapers(listID);
    await fetchUsers(listID);
    await highlightLikedPapers();
  },
  []);


  const fetchPapers = async (listID) => {
    const listData = await getListById(listID);
    const paperIds = listData.papers;
    const user = await getUserByUsername(username);
    let paperList = [];
    if (paperIds) {
      for (const paperId of paperIds){
        let paper = await getPaperById(paperId);
        if (paper != null) {
          const likedPapers = paper.likes;
          const nrLikes = likedPapers.length;
          paper.likes = nrLikes;
          paperList.push(paper);
          if (likedPapers.includes(user[0].id)) { papersLikedByUser.push(paperId); }
        }        
      };
    }

    setPaperRows(paperList);
  };

  const fetchUsers = async (listID) => {
    let userList = [];
    const ownerUser = await getUserByUsername(listOwner);
    setListOwnerID(ownerUser[0].id);
    userList.push(ownerUser[0]);

    const listData = await getListById(listID);
    const cIDs = listData.sharedWith;
    for (const cID of cIDs){
      const collaborator = await getUserById(cID);
      userList.push(collaborator);
    };
    setUserRows(userList);
  };

  const highlightLikedPapers = () => {
    for (const paperId of papersLikedByUser){
      const likeBtn = document.getElementById("like" + paperId);
      likeBtn.classList.add("likeButtonHighlighted");
    }
  }

  const addCollaborator = async (username) => {
    const userExists = await usernameExists(username);

    if (userExists) {
      const users = await getUserByUsername(username);
      const user = users[0];
      const userID = user.id;
      if (userID !== listOwner && (userRows.filter((row) => row.id === userID)).length === 0) {
      addCollaboratorToList(listID, userID);
      setUserRows([...userRows, user]);
      }
      else {
        alert(username + ' is already a list collaborator!');
      }
    }
    else {
      alert('No user with username ' + username);
    }
  };

  const deleteSource = async (sourceID) => {
    deletePaperById(sourceID);
  };

  const deleteCollaborator = async (userID) => {
    setTimeout(() => {
      setUserRows((prevRows) => prevRows.filter((row) => row.id !== userID));
    });
    deleteCollaboratorFromList(listID, userID);
  };

  const handleSubmit = async (event) => {
    addCollaborator(userFormValues.username);
    event.preventDefault();
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormValues({
      ...userFormValues,
      [name]: value,
    });
  };

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
  const likeSource = async (paperId, event) => {
    const username = document.cookie.split("=")[1];
    const user = await getUserByUsername(username);
    await likePaper(paperId, user[0].id);
    const likeBtn = document.getElementById("like" + paperId);
    likeBtn.classList.add("likeButtonHighlighted")
    await fetchPapers(listID); // this takes a little while!
  }

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
        renderCell: (params) => {
          // getActions: (params) => [
          if (params.id !== listOwnerID) {
            return <GridActionsCellItem
              icon={<DeleteIcon />}
              label="delete"
              onClick={() => deleteCollaborator(params.id)}
              />;
          }
          else {
            return <p><i>Owner</i></p>
          }
          // ]
        }
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
          id ={ "like" + params.id }
          onClick={ () => likeSource(params.id) }
          />,
          <GridActionsCellItem
          icon={<DownloadIcon />}
          label="Like"
          onClick={() => downloadSource(params.id)}
          />,
          <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => deleteSource(params.id)}
        />,
        <Link to={'/edit/' + username + '/' + listID + '/' + params.id}>
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
        <Box sx={{ display: 'grid', gap: 2, gridAutoColumns: '1fr' }}>
          <Typography variant="h4" align="left" color="primary" sx={{gridRow: '1', gridColumn: '1/5'}}>
            List Details
          </Typography>
          <Button startIcon={<KeyboardBackspaceIcon/>} sx={{gridRow: '1', gridColumn: '9/10'}}>
            <Link to={'/' + username} className="Link" style={{ textDecoration: 'none'}}>
                Back
            </Link>
          </Button>
        </Box>
      </div>
      <div>
        <Box my={4} sx={{ display: 'grid', gap: 2, gridAutoColumns: '1fr' }}>
          <Box sx={{ display: 'grid', gridAutoColumns: '1fr', gridColumn: '1/4' }}>
            <Box sx={{ display: 'grid', gridAutoColumns: '1fr'}}>
              <Typography variant="h6" align="left" color="primary" sx={{ gridRow: '1', gridColumn: 'span 2' }}>
                Sources
              </Typography>
              <Button onClick={async () => { await exportPaperList(listID)} } endIcon={<DownloadIcon />} sx={{ gridRow: '1', gridColumn: '8/9', textAlign: 'right' }}>
                Export
              </Button>
              <Button endIcon={<AddIcon />} sx={{ gridRow: '1', gridColumn: '9/10', textAlign: 'right' }}>
                <Link to={'/add/' + username + '/' + listID} className="Link" style={{ textDecoration: 'none'}}>
                  Add
                </Link>
              </Button>
            </Box>
          <Card sx={{height: 500, width: '100%' }}>
            <DataGrid columns={paperColumns} rows={paperRows}/>
          </Card>
          </Box>
            <Box sx={{ display: 'grid', gridAutoColumns: '1fr', gridColumn: '4/5' }}>
              <Box>
                <Typography variant="h6" align="left" color="primary" sx={{ gridRow: '1', gridColumn: 'span 2' }}>
                  Collaborators
                </Typography>
              </Box>
              <Card sx={{height: 500, width: '100%'}}>
                <form onSubmit={handleSubmit}>
                  <FormGroup sx={{ display: 'grid', gridAutoColumns: '1fr' }}>
                    <TextField sx={{ gridRow: '1', gridColumn: '1/6' }}
                        id="username"
                        name="username"
                        label="Add User"
                        type="text"
                        value={userFormValues.username}
                        onChange={handleInputChange}
                    />
                    <Button type="submit" variant="contained" sx={{gridRow: '1', gridColumn: '6/7' }}>
                      <AddIcon/>
                    </Button>
                  </FormGroup>
                </form>
                <DataGrid columns={userColumns} rows={userRows}/>
              </Card>
          </Box>
        </Box>
      </div>
    </div>
  </div>
  );
}