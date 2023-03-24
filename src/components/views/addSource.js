import React from 'react';
import '../../App.css';
import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import FileUpload from "react-material-file-upload";
import { Box, Button, Card, CardContent, FormLabel, FormGroup,
         TextField, Typography } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

import NavBar from "../navbar";
import {newPaper} from '../api/papers';
import { addPaperToList, getListById } from '../api/lists';
import { useEffect } from 'react';
import { getUserById } from '../api/users';


export default function AddSource() {
  const { username, listID } = useParams();
  const [files, setFiles] = useState([]);
  const [formValues, setFormValues] = useState({
    id: '',
    author: [],
    citationStorageLocation: "https://www.google.com",
    createdAt: '',
    description: '',
    doi: '',
    issn: '',
    issue: '',
    journal: '',
    likes: [],
    title: '',
    updatedAt: '',
    volume: '',
    year: 0
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [listOwner, setListOwner] = useState("");

  useEffect(async() => {
    const listData = await getListById(listID);
    let listOwnerId = listData.listOwner;
    const ownerData = await getUserById(listOwnerId);
    setListOwner(ownerData.username);
  },
  []);

  const validateForm = () => {
    const newErrors = {};
    if (typeof parseInt(formValues.year) !== 'number') {
      newErrors.integer = 'Sadly, this is not an integer :(';
    }
    if (!formValues.description) {
        newErrors.description = 'No description? This is not allowed, sorry :(';
    }
    if (!formValues.title) {
        newErrors.title = 'No title? Title is necessary, sorry :(';
    }
    if (!formValues.author) {
        newErrors.title = 'No author? That is not possible, sorry :(';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    formValues.likes = [];
    if (validateForm()){
        const createdPaperId = await newPaper(formValues);
        await addPaperToList(listID, createdPaperId);
        navigate('/list/' + username + '/' + listOwner + '/' + listID);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  return (
  <div>
    <NavBar/>
      <div className="Content">
        <div className="Title">
          <Box sx={{ display: 'grid', gridAutoColumns: '1fr'}}>
                  <Typography variant="h4" align="left" color="primary" sx={{gridRow: '1', gridColumn: 'span 4'}}>
                  Add New Source to ListName
                  </Typography>
                  <Button startIcon={<KeyboardBackspaceIcon/>} sx={{gridRow: '1', gridColumn: '9/10'}}>
                      <Link to={'/list/' + username  + '/' + listOwner + '/' + listID} className="Link" style={{ textDecoration: 'none'}}>
                          Back
                      </Link>
                  </Button>
              </Box>
        </div>
        <div>
          <Box my={4}>
              <Typography variant="h6" align="left" color="primary">
                  Upload File
              </Typography>
              <Card sx={{height: '100%', width: '100%'}}>
                  <CardContent>
                      <FileUpload value={files} onChange={setFiles} />
                  </CardContent>
              </Card>
          </Box>
          <Box my={4}>
              <Typography variant="h6" align="left" color="primary" sx={{gridRow: '1', gridColumn: '1/3'}}>
                  Source Information
              </Typography>
              <Card sx={{height: '100%', width: '100%'}}>
                  <CardContent>
                  <form onSubmit={handleSubmit} className="addSourceForm">
                          <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: 'repeat(2, 1fr)' }}>
                              <FormGroup>
                                  <FormLabel>
                                      Title:
                                  </FormLabel>
                                  <TextField
                                      id="title"
                                      name="title"
                                      label="Title"
                                      type="text"
                                      error={!!errors.title}
                                      helperText={errors.title}
                                      value={formValues.title}
                                      onChange={handleInputChange}
                                  />
                              </FormGroup>
                              <FormGroup>
                                  <FormLabel>
                                      Author:
                                  </FormLabel>
                                  <TextField
                                      id="author"
                                      name="author"
                                      label="Author"
                                      type="text"
                                      error={!!errors.author}
                                      helperText={errors.author}
                                      value={formValues.author}
                                      onChange={handleInputChange}
                                  />
                              </FormGroup>
                              <FormGroup>
                                  <FormLabel>
                                      Description:
                                  </FormLabel>
                                  <TextField
                                      id="description"
                                      name="description"
                                      label="description"
                                      type="text"
                                      error={!!errors.description}
                                      helperText={errors.description}
                                      value={formValues.description}
                                      onChange={handleInputChange}
                                  />
                              </FormGroup>
                              <FormGroup>
                                  <FormLabel>
                                      DOI:
                                  </FormLabel>
                                  <TextField
                                      id="doi"
                                      name="doi"
                                      label="DOI"
                                      type="text"
                                      value={formValues.doi}
                                      onChange={handleInputChange}
                                  />
                              </FormGroup>
                              <FormGroup>
                                  <FormLabel>
                                      ISSN:
                                  </FormLabel>
                                  <TextField
                                      id="issn"
                                      name="issn"
                                      label="ISSN"
                                      type="text"
                                      value={formValues.issn}
                                      onChange={handleInputChange}
                                  />
                              </FormGroup>
                              <FormGroup>
                                  <FormLabel>
                                      Issue:
                                  </FormLabel>
                                  <TextField
                                      id="issue"
                                      name="issue"
                                      label="Issue"
                                      type="text"
                                      value={formValues.issue}
                                      onChange={handleInputChange}
                                  />
                              </FormGroup>
                              <FormGroup>
                                  <FormLabel>
                                      Journal:
                                  </FormLabel>
                                  <TextField
                                      id="journal"
                                      name="journal"
                                      label="Journal"
                                      type="text"
                                      value={formValues.journal}
                                      onChange={handleInputChange}
                                  />
                              </FormGroup>
                              <FormGroup>
                                  <FormLabel>
                                      Volume:
                                  </FormLabel>
                                  <TextField
                                      id="volume"
                                      name="volume"
                                      label="Volume"
                                      type="text"
                                      value={formValues.volume}
                                      onChange={handleInputChange}
                                  />
                              </FormGroup>
                              <FormGroup>
                                  <FormLabel>
                                      Year:
                                  </FormLabel>
                                  <TextField
                                      id="year"
                                      name="year"
                                      label="Year"
                                      type="number"
                                      inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                      error={!!errors.integer}
                                      helperText={errors.integer}
                                      value={formValues.year}
                                      onChange={handleInputChange}
                                  />
                              </FormGroup>
                          </Box>
                          <Box my={2}>
                              <Button type="submit" variant="contained" my={4} className="addSourceButton">
                                  Submit
                              </Button>
                          </Box>
                      </form>
                  </CardContent>
              </Card>
          </Box>
        </div>
      </div>
    </div>
  );
}