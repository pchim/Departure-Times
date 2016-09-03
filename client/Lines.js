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
    // const options = [
    //   { value: 'one', label: 'One' },
    //   { value: 'two', label: 'Two' },
    //   {
    //    type: 'group', name: 'group1', items: [
    //      { value: 'three', label: 'Three' },
    //      { value: 'four', label: 'Four' }
    //    ]
    //   },
    //   {
    //    type: 'group', name: 'group2', items: [
    //      { value: 'five', label: 'Five' },
    //      { value: 'six', label: 'Six' }
    //    ]
    //   }
    // ];
    // this.setState({ options });
    fetch('/api/lines/SFMTA')
    .then(res => res.text())
    .then(res => this.updateLines(res));
    // { this.state.lines.map(line => <p>{line.Id} {line.Name}</p>) }
  }

  updateLines(data) {
    let lines = JSON.parse(data).map(line => ({ value: line.Id, label: `${line.Id} - ${line.Name}` }) );
    this.setState({ lines });
  }

  _onSelect(selected) {
    this.setState({ selected });
    console.log(selected);
  };

  render() {
    return (
      <div>
        <Dropdown options={this.state.lines} onChange={this._onSelect} value={this.state.selected} placeholder={"Select a line"} />
      </div>
    );
  }
}

export default Lines;