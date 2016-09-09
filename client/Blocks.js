import React, { Component } from 'react';
import Block from './Block';
class Blocks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blocks: [{ key: 0 }],
      saves: [],
      idCount: 0,
      line: '',
      stop: ''
    }
    // blocks needs to be a state of 'new' unchangeable blocks, implement later
    this.addBlock = this.addBlock.bind(this);
    this.setLineStop = this.setLineStop.bind(this);
    this.saveBlock = this.saveBlock.bind(this);
  }

  addBlock() {
    this.setState({ saves: this.state.saves.concat([{ line: this.state.line, stop: this.state.stop }]) });
    this.setState({ blocks: this.state.blocks.concat([{ key: this.state.idCount + 1}]) });
    this.setState({ idCount: this.state.idCount + 1 });

  }

  setLineStop(line, stop) {
    this.setState({ line, stop });
  }

  saveBlock() {

  }

  render() {
    return (
      <div>
        <div className="row">
          {this.state.blocks.map(block => <Block key={block.key} onChangeStop={this.setLineStop} />)}
        </div>
      <div className="row center">
        <p><button onClick={this.addBlock} className="btn btn-primary btn-add" role="button">+</button></p>
        <p><button onClick={this.saveBlock} className="btn btn-primary btn-add" role="button">Save</button></p>
      </div>
      <div>Saves: { this.state.saves.map(save => <p>{save.line}: {save.stop}</p>) } </div>
      </div>
    );
  }
}

export default Blocks;