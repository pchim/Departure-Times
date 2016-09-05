import React, { Component } from 'react';
import Lines from './Lines';
import Stops from './Stops';
import Predictions from './Predictions';

class Block extends Component {
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
      <div className="container">
        <Lines onClick={this.changeLine} />
        <Stops onClick={this.changeStop} line={this.state.line} />
        <Predictions stop={this.state.stop} />
      </div>
    );
  }
}

export default Block;