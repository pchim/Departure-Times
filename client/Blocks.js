import React, { Component } from 'react';
import Block from './Block';
class Blocks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blocks: [<Block key={0} />],
      idCount: 0
    }
    // blocks needs to be a state of 'new' unchangeable blocks, implement later
    this.addBlock = this.addBlock.bind(this);
  }

  addBlock() {
    this.setState({ idCount: this.state.idCount + 1 });
    this.setState({ blocks: this.state.blocks.concat(<Block key={this.state.idCount + 1}/>) });
  }

  render() {
    return (
      <div className="row">
        {this.state.blocks.map(block => block)}
        <div className="center"><button onClick={this.addBlock} className="btn btn-primary btn-add" role="button">+</button></div>
      </div>
    );
  }
}

export default Blocks;