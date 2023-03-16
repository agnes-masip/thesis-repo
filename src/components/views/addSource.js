import React from 'react';
import '../../App.css';
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import FileUpload from "react-material-file-upload";
import { Box, Button, Card, CardContent, FormLabel, FormGroup,
         Snackbar, TextField, Typography } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Alert } from '@material-ui/lab';

import NavBar from "../navbar";
import {newPaper} from '../api/papers';
import { addPaperToList } from '../api/lists';


export default function AddSource() {
  const { username, listID } = useParams();
  const [files, setFiles] = useState([]);
  const [formValues, setFormValues] = useState([]);
  const [open, setOpen] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    formValues.likes = 0;
    newPaper(formValues).then(PaperId => {addPaperToList(listID, PaperId)});
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

const handleClose = () => {
  setOpen(false);
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
                      <Link to={'/list/' + username  + '/' + listID} className="Link" style={{ textDecoration: 'none'}}>
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
                  <form onSubmit={handleSubmit}>
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
                                      value={formValues.title}
                                      onChange={handleInputChange}
                                  />
                              </FormGroup>
                              {/* this one should probably be different bc its a list (first + last name) */}
                              <FormGroup>
                                  <FormLabel>
                                      Author:
                                  </FormLabel>
                                  <TextField
                                      id="author"
                                      name="author"
                                      label="Author"
                                      type="text"
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
                                      value={formValues.year}
                                      onChange={handleInputChange}
                                  />
                              </FormGroup>
                          </Box>
                          <Box my={2}>
                              <Button type="submit" variant="contained" my={4}>
                                  Submit
                              </Button>
                          </Box>
                          <Snackbar
                              open={open}
                              autoHideDuration={3000}
                              onClose={handleClose}
                              anchorOrigin={{ vertical: 'top', horizontal: 'left' }}>
                              <Alert onClose={handleClose} severity="success">
                                  Paper updated!
                              </Alert>
                          </Snackbar>
                      </form>
                  </CardContent>
              </Card>
          </Box>
        </div>
      </div>
    </div>
  );
}