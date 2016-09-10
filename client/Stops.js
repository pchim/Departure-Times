import React, { Component } from 'react';
import ReactDom from 'react-dom';

// using dropdown module for now, can create and customize my own later
import Dropdown from 'react-dropdown';

class Stops extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stops: [],
      selected: '',
    }
    this.updateStops = this.updateStops.bind(this);
    this._onSelect = this._onSelect.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    console.log("Getting stops: " + nextProps);
    fetch(`/api/stops/${nextProps.agency}/${nextProps.line}`)
    .then(res => res.json())
    .then(res => this.updateStops(res));    
  }

  updateStops(data) {
    let stops = data['IB'].map(stop => ({ value: stop.id, label: `${stop.info.name}` }) );
    this.setState({ stops });

  }

  _onSelect(selected) {
    this.setState({ selected });
    this.props.onClick(selected.value);
    console.log(selected);
  };

  render() {
    return (
      <div>
        <Dropdown options={this.state.stops} onChange={this._onSelect} value={this.state.selected} placeholder={"Select a stop"} />
      </div>
    );
  }
}

export default Stops;


