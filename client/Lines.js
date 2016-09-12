import React, { Component } from 'react';
import ReactDom from 'react-dom';

// using dropdown module for now, can create and customize my own later
import Dropdown from 'react-dropdown';

class Lines extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lines: [],
      options: [],
      selected: '',
    }
    this.updateLines = this.updateLines.bind(this);
    this._onSelect = this._onSelect.bind(this);
  }


  componentWillMount() {
    fetch('/api/lines/SFMTA')
    .then(res => res.text())
    .then(res => this.updateLines(res));
  }

  componentWillReceiveProps(nextProps) {
    // this.setState({ agency: next})
    // fetch(`/api/lines/${nextProps.agency}`)
    // .then(res => res.text())
    // .then(res => this.updateLines(res));
  }

  updateLines(data) {
    let lines = JSON.parse(data).map(line => ({ value: line.Id, label: `${line.Id} - ${line.Name}` }) );
    this.setState({ lines });
  }

  _onSelect(selected) {
    this.setState({ selected });
    this.props.onClick(selected.value);
  };

  render() {
    return (
      <div className="options">
        <div className="outline drop-container">
          <Dropdown options={this.state.lines} onChange={this._onSelect} value={this.state.selected} placeholder={"Select a line"} />
        </div>
        <div>
          <button className="btn btn-primary btn-add" role="button">M</button>
        </div>
      </div>
    );
  }
}

export default Lines;