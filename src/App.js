import React  from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Home from './components/views/home';
import List from './components/views/list';
import NavBar from './components/navbar';
import User from './components/views/user';
import AddSource from './components/views/addSource';
import EditSource from './components/views/editSource';

import Amplify from '@aws-amplify/core';
import API from '@aws-amplify/api';
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

// const newTodo = await API.graphql({
//   query: createTodo,
//   variables: {
//       input: {
//   "name": "Lorem ipsum dolor sit amet",
//   "description": "Lorem ipsum dolor sit amet"
// }
//   }
// });

function App() {

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <NavBar/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='list/:listID' element={<List/>} />
          <Route path='user' element={<User/>} />
          <Route path='add/:listID' element={<AddSource/>} />
          <Route path='edit/:sourceID' element={<EditSource/>} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;