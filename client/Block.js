import React, { Component } from 'react';
import Lines from './Lines';
import Stops from './Stops';
import Predictions from './Predictions';

class Block extends Component {
  constructor(props) {
    super(props);
    this.state = {
      line: '',
      stop: '',
      agency: 'SFMTA',
    };
    this.changeLine = this.changeLine.bind(this);
    this.changeStop = this.changeStop.bind(this);
    this.changeAgency = this.changeAgency.bind(this);
  }

  changeLine(line) {
    this.setState({ line });
  }
  changeStop(stop) {
    this.setState({ stop });
    this.props.onChangeStop(this.state.line, stop);
  }
  changeAgency() {
    this.state.agency === 'SFMTA' ? this.setState({ agency: 'BART' }) : this.setState({ agency: 'SFMTA '});
  }

  render() {
    return (
      <div className="panel panel-default prediction">
        <div className="panel-body prediction-text">
          <Lines onClick={this.changeLine} agency={this.state.agency} />
          <Stops onClick={this.changeStop} line={this.state.line} agency={this.state.agency} />
          <Predictions stop={this.state.stop} line={this.state.line} agency={this.state.agency} />
        </div>
      </div>
    );
  }
}



export default Block;

/*
Button to change agency
<div className="row center">
  <p><button 
    onClick={this.changeAgency} 
    className="btn btn-primary btn-add" 
    role="button">{this.state.agency}</button></p>
</div>
*/