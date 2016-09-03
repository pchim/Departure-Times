import React from 'react';
import ReactDom from 'react-dom';
import Lines from './Lines';

const geo = navigator.geolocation;
geo.getCurrentPosition(position => {
  console.log(position.coords.latitude, position.coords.longitude);
});

const App = () => (
  <div>
    React Init
    <Lines />
  </div>
);

ReactDom.render(<App />, document.getElementById('app'));
