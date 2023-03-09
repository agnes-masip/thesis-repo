import React from 'react';
import '../../App.css';
import {useState } from "react";
import {useParams} from "react-router-dom"
import FileUpload from "react-material-file-upload";
import { Box, Button, Card, CardContent, FormLabel, FormGroup, TextField, Typography } from '@mui/material';

//these imports probably should go somewhere else
import Amplify from '@aws-amplify/core';
import awsconfig from '../../aws-exports';
import {newPaper} from '../api/papers';
import {addPaperToList} from '../api/lists'

Amplify.configure(awsconfig);

export default function AddSource() {

    const { listID } = useParams();
    const [files, setFiles] = useState([]);
    const [formValues, setFormValues] = useState([]);
  

  const handleSubmit = (event) => {
    event.preventDefault();
    newPaper(formValues).then(PaperId => addPaperToList(listID, PaperId))

    
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

    return (
    <div className="Content">
      <div className="Title">
        <Typography variant="h4" align="left" color="primary">
          Add New Source to ListName
        </Typography>
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
            <Typography variant="h6" align="left" color="primary">
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
                    </form>
                </CardContent>
            </Card>
        </Box>
      </div>
    </div>
  );
}