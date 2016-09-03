import React, { Component } from 'react';
import ReactDom from 'react-dom';
// const parseLineIds from '../utils/parseLineIds';

class Lines extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lines: [],
    }
    this.updateLines = this.updateLines.bind(this);
  }


  componentWillMount() {
    fetch('/api/lines/SFMTA')
    .then(res => res.text())
    .then(res => this.updateLines(res));
  }

  updateLines(data) {
    this.setState({'lines': JSON.parse(data)});
  }

  render() {
    return (
      <div>
        { this.state.lines.map(line => <p>{line.Id} {line.Name}</p>) }
      </div>
    );
  }
}

export default Lines;