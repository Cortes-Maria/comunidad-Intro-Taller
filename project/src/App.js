import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import UserProvider from './providers/UserProvider';
import Application from './Application';

function App() {
  

  return (
    <UserProvider>
      <Application />
    </UserProvider>
  );
}

export default App;
