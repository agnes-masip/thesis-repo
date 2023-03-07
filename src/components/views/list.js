import React from 'react';
import '../../App.css';
import { useState } from "react";
import FileUpload from "react-material-file-upload";
import { Box, Card, CardContent, Paper, styled, Stack, Typography } from '@mui/material';

export default function List() {
  const [files, setFiles] = useState([]);
  // More styling for the items can be done in here
  const Item = styled(Paper)(() => ({
    padding: 10,
  }));


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
                <Stack spacing={0.5}>
                  <Item>
                    Paper 1
                  </Item>
                  <Item>
                    Paper 2
                  </Item>
                  <Item>
                    Paper 3
                  </Item>
                  <Item>
                    Paper 4
                  </Item>
                </Stack>
          </Box>
        </div>
      </div>
  );
}