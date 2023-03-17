import React, { useState }  from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Home from './components/views/home';
import List from './components/views/list';
import Login from './components/views/login';
import AddSource from './components/views/addSource';
import EditSource from './components/views/editSource';
import { ProtectedRoute } from './components/protectedRoute';

import Amplify from '@aws-amplify/core';
import awsconfig from './aws-exports';
import './App.css';
import '@aws-amplify/ui-react/styles.css';

Amplify.configure(awsconfig);

const theme = createTheme({
  palette: {
    primary: {
      main: '#F875AA'
    },
    secondary: {
      main: '#FFA1CF',
    },
    dark: {
      main: '#FFD6EC'
    },
    background: {
      main: '#fde4f2'
    }
  },
  typography: {
    h2: {
      fontSize: 70,
    },
    h3: {
      fontWeight: 'bold',
    }
  }
});


function App() {

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <Routes>
          <Route
            path='/:username'
            element={
              <ProtectedRoute>
                <Home/>
              </ProtectedRoute>
            }
          />
          <Route
            path='list/:username/:listOwner/:listID'
            element={
              <ProtectedRoute>
                <List/>
              </ProtectedRoute>
            }
          />
          <Route
            path='add/:username/:listOwner/:listID'
            element={
              <ProtectedRoute>
                <AddSource/>
              </ProtectedRoute>
            }
          />
          <Route
            path='edit/:username/:listOwner/:listID/:sourceID'
            element={
              <ProtectedRoute>
                <AddSource/>
              </ProtectedRoute>
            }
          />
          <Route path='/' element={<Login/>} />
          <Route path='login' element={<Login/>} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;