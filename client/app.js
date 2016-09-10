import React, { Component } from 'react';
import ReactDom from 'react-dom';
import Blocks from './Blocks';
import NavBar from './NavBar';
import AppView from './AppView';


// const geo = navigator.geolocation;
// geo.getCurrentPosition(position => {
//   console.log(position.coords.latitude, position.coords.longitude);
// });

const App = () => (
  <div>
    <NavBar />
    <AppView />
  </div>
);

ReactDom.render(<App />, document.getElementById('app'));
