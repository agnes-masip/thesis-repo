import React  from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Home from './components/views/home';
import List from './components/views/list';
import User from './components/views/user';
//import Login from './components/views/login';
import AddSource from './components/views/addSource';
import EditSource from './components/views/editSource';

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
          <Route path='/' element={<Home/>} />
          <Route path='list/:listOwner/:listID' element={<List/>} />
          {/* <Route path='user' element={<User/>} /> */}
          <Route path='add/:listID' element={<AddSource/>} />
          <Route path='edit/:listID/:sourceID' element={<EditSource/>} />
          {/* <Route path='login' element={<Login/>} /> */}
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;