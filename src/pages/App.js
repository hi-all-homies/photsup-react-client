import { Box } from '@mui/material';
import './App.css';
import Footer from '../components/footer';
import Header from '../components/header';
import Wall from './wall';
import { Routes, Route } from 'react-router-dom';
import Login from './login';
import Token from './token';


const App = () => {

  return (
    <Box>
      <Header/>
      <Routes>
        <Route path="/" element={<Wall/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/token" element={<Token/>} />
      </Routes>
      <Footer/>
    </Box>
  );
}


export default App;
