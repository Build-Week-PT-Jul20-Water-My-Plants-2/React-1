import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
// import NavBar from './components/NavBar'
import SignUpForm from './components/SignUpForm'


function App() {
  return (
    <div className="App">
      {/* <NavBar /> */}
      <Switch>
        <Route path='/form'>

          <SignUpForm />
        </Route>
        {/* <Route exact path='/'>
          <HomePage  />
        </Route> */}
      </Switch>
    </div>
  );
}

export default App;
