import Box from '@mui/material/Box';
import './App.css';
import Footer from '../components/footer';
import Header from '../components/header';
import Wall from './wall';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './login';
import Token from './token';
import React, { useReducer } from 'react';
import AuthenticatedRoute from '../components/authenticated-route';
import { initUserState, userReducer } from '../reducers/user-reducer';

export const UserContext = React.createContext({});

const App = () => {
  const [user, dispatch] = useReducer(userReducer, null, initUserState);
  const logIn = () => dispatch({type: 'login'});
  const logOut = () => dispatch({type: 'logout'});

  return (
    <UserContext.Provider value={user}>
    <Box className='main-box'>
      <Header logOut={logOut}/>
      <Routes>
        <Route element={ <AuthenticatedRoute redirectPath="/login"/> }>
          <Route path="/" element={<Wall/>} />
        </Route>
        <Route path="/login" element={ !user ? <Login/> : <Navigate to="/"/> }/>
        <Route path="/token" element={ !user ? <Token logIn={logIn}/> : <Navigate to="/"/> }/>
        <Route path="*" element={ user ? <Navigate to="/"/> : <Navigate to="/login"/> }/>
      </Routes>
      <Footer/>
    </Box>
    </UserContext.Provider>
  );
}


export default App;
