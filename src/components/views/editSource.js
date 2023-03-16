import React from 'react';
import '../../App.css';
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Box, Button, Card, CardContent, FormLabel, FormGroup, Snackbar,
         TextField, Typography } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Alert } from '@material-ui/lab';


import { updatePaperById, getPaperById } from "../api/papers";



export default function EditSource() {
  const { listID, sourceID } = useParams();
  const [formValues, setFormValues] = useState([]);
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({});

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
    if (typeof formValues.year !== 'integer') {
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

  const handleSubmit = (event) => {
    event.preventDefault();
    if(validateForm()){
        updatePaperById(formValues);
        setOpen(true); 
    }
  }

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
    <div className="Content">
      <div className="Title">
        <Box sx={{ display: 'grid', gridAutoColumns: '1fr'}}>
                <Typography variant="h4" align="left" color="primary" sx={{gridRow: '1', gridColumn: 'span 4'}}>
                Edit Source
                </Typography>
                <Button startIcon={<KeyboardBackspaceIcon/>} sx={{gridRow: '1', gridColumn: '9/10'}}>
                    <Link to={'/list/' + listID} className="Link" style={{ textDecoration: 'none'}}>
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
                            {/* this one should probably be different bc its a list (first + last name) */}
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
                                    id="desc"
                                    name="desc"
                                    type="text"
                                    error={!!errors.description}
                                    helperText={errors.description}
                                    value={formValues.desc}
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
                                    error={!!errors.integer}
                                    helperText={errors.integer}
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
  );
}