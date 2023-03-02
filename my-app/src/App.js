// import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/views/home';
import List from './components/views/list';
  

function App() {
  return (
    <div className="app">
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='home' element={<Home/>} />
          <Route path='list' element={<List/>} />
        </Routes>
    </div>
  );
}

export default App;