import React from 'react';
import './App.css';
import RegisterContainer from './login/RegisterContainer'
import LoginContainer from './login/LoginContainer'
import Profile from './login/ProfileContainer'
import { Route } from 'react-router-dom';

const App = (props) => {
 
  return (
    <div className="App">
      <Route exact path="/" render={() => <LoginContainer />} /> 
      <Route path="/registerpage" render={() => <RegisterContainer />} />
      <Route path="/login" render={() => <LoginContainer />} /> 
      <Route path="/profile" render={() => <Profile />} /> 
    </div>
  )
};



export default (App)
