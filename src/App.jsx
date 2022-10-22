import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import Body from './ChatComponents/body';
import Body2 from './ChatComponents/Body2';
import { ReactDOM } from 'react';
import Home from './ChatComponents/homePage';

function App({ socket }) {

  return (
    <div className="App">
      <Home
        socket={socket}
      />
    </div>
  )
}

export default App;
