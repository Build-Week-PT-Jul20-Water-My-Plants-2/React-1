import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
// import NavBar from './components/NavBar'
import SignUpForm from './components/SignUpForm'
import LoginForm from './components/LoginForm';


function App() {
  return (
    <div className="App">
      {/* <NavBar /> */}
      <Switch>
        <Route path='/sign-up'>

          <SignUpForm />
        </Route>
        <Route path='/login'>
          <LoginForm  />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
