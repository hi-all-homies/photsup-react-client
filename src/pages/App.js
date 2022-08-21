import Box from '@mui/material/Box';
import './App.css';
import Footer from '../components/footer';
import Header from '../components/header';
import Wall from './wall';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './login';
import Token from './token';
import { useReducer } from 'react';
import AuthenticatedRoute from '../components/authenticated-route';
import { AuthService } from '../api/auth-service';


const init = (initialState) => {
  return AuthService.getUser();
}

const reducer = (user, action) => {
  switch(action.type){
    case 'login':
      return AuthService.getUser();
    case 'logout':{
      AuthService.deleteUser();
      return null;
    }
    default:
      return null;
  }
}


const App = () => {
  const [user, dispatch] = useReducer(reducer, null, init);
  const logIn = () => dispatch({type: 'login'});
  const logOut = () => dispatch({type: 'logout'});

  return (
    <Box className='main-box'>
      <Header user={user} logOut={logOut}/>
      <Routes>
        <Route element={ <AuthenticatedRoute user={user} redirectPath="/login"/> }>
          <Route path="/" element={<Wall user={user}/>} />
        </Route>
        <Route path="/login" element={ !user ? <Login/> : <Navigate to="/"/> }/>
        <Route path="/token" element={ !user ? <Token logIn={logIn}/> : <Navigate to="/"/> }/>
        <Route path="*" element={ user ? <Navigate to="/"/> : <Navigate to="/login"/> }/>
      </Routes>
      <Footer/>
    </Box>
  );
}


export default App;
