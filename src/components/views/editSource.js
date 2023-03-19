import React from 'react';
import '../../App.css';
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Box, Button, Card, CardContent, FormLabel, FormGroup, TextField, Typography } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';


import { updatePaperById, getPaperById } from "../api/papers";

export default function EditSource() {
  const { username, listID, sourceID, listOwner } = useParams();
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

  useEffect(() => {
    setInitialFormValues(sourceID);
  },
  []);


  const setInitialFormValues = async(paperId) => {
    const paperData = await getPaperById(paperId);
    setFormValues(paperData);
  }

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
    if (validateForm()){
        await updatePaperById(formValues);
        navigate('/list/' + username + '/' + listOwner + '/' + listID);
    }
  }

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
        <Box sx={{ display: 'grid', gridAutoColumns: '1fr'}}>
                <Typography variant="h4" align="left" color="primary" sx={{gridRow: '1', gridColumn: 'span 4'}}>
                Edit Source
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
                                    type="text"
                                    value={formValues.title}
                                    error={!!errors.title}
                                    helperText={errors.title}
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
                            <Button name="edit-submit-btn" id="edit-submit-btn" type="submit" variant="contained" my={4}>
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