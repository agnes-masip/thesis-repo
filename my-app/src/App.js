import { createTheme, colors, ThemeProvider } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Home from './components/views/home';
import List from './components/views/list';
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
          <Route path='home' element={<Home/>} />
          <Route path='list' element={<List/>} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;