import React, { Component } from 'react';
import ReactDom from 'react-dom';
import Lines from './Lines';
import Stops from './Stops';
import Predictions from './Predictions';
import Blocks from './Blocks';


const geo = navigator.geolocation;
geo.getCurrentPosition(position => {
  console.log(position.coords.latitude, position.coords.longitude);
});

const App = () => (
  <div>
  <nav className="navbar navbar-inverse navbar-fixed-top">
    <div className="container">
      <div className="navbar-header">
        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </button>
        <a className="navbar-brand" href="#">SF Muni/Bart Daily</a>
      </div>
      <div id="navbar" className="collapse navbar-collapse">
        <ul className="nav navbar-nav">
          <li className="active"><a href="#">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </div>
    </div>
  </nav>

    <div className="container">  
    <ul className="nav nav-tabs nav-justified prediction">
        <li role="presentation" className="active"><a href="#">New</a></li>
        <li role="presentation"><a href="#">Saved</a></li>
        <li role="presentation"><a href="#">Map</a></li>
    </ul>
      <div>
        <Blocks />
      </div>
    </div>
  </div>
);

/*
class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="container center">
        <div className="container title">SF Muni/Bart Daily</div>
        <div>  
          <Blocks />
        </div>
      </div>
    );
  }
}
*/

ReactDom.render(<App />, document.getElementById('app'));
