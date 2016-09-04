import React, { Component } from 'react';
import ReactDom from 'react-dom';
import Lines from './Lines';
import Stops from './Stops';
import Predictions from './Predictions';


const geo = navigator.geolocation;
geo.getCurrentPosition(position => {
  console.log(position.coords.latitude, position.coords.longitude);
});

// using redux, we could just change the state in lines, which will update stops
// for now, we will do the regular react way and props down, actions up

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      line: '',
      stop: ''
    };
    this.changeLine = this.changeLine.bind(this);
    this.changeStop = this.changeStop.bind(this);
  }

  changeLine(line) {
    this.setState({ line });
  }
  changeStop(stop) {
    this.setState({ stop });
  }

  render() {
    return (
      <div className="container center">
        <div className="container title">SF Muni/Bart Daily</div>
        <div className="container">  
          <Lines onClick={this.changeLine} />
          <Stops onClick={this.changeStop} line={this.state.line} />
          <Predictions stop={this.state.stop} />
        </div>
      </div>
    );
  }
}

ReactDom.render(<App />, document.getElementById('app'));
