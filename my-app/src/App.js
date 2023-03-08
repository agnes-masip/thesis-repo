import { createTheme, colors, ThemeProvider } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Home from './components/views/home';
import List from './components/views/list';
import NavBar from './components/navbar';
import './App.css';


const theme = createTheme({
  palette: {
    primary: {
      main: '#FF74B1'
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
    },
    h4: {
      fontSize: 20,
    }
  }
});

function App() {
  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <NavBar/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='home' element={<Home/>} />
          <Route path='list' element={<List/>} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;