import React, { Component } from 'react';
import ReactDom from 'react-dom';

// using dropdown module for now, can create and customize my own later
import Dropdown from 'react-dropdown';

class Stops extends Component {
  constructor(props) {
    super(props);
    this.state = {
      line: '',
      stops: { IB: [], OB: [] },
      selected: '',
      bound: 'IB',
    }
    this.updateStops = this.updateStops.bind(this);
    this._onSelect = this._onSelect.bind(this);
    this.changeBound = this.changeBound.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.line !== this.state.line) {
      this.setState({ line: nextProps.line });
      this.setState({ selected: '' });
      fetch(`/api/stops/${nextProps.agency}/${nextProps.line}`)
      .then(res => res.json())
      .then(res => this.updateStops(res));
    }    
  }

  updateStops(data) {
    let stops = {};
    stops.IB = data['IB'].map(stop => ({ value: stop.id, label: `${stop.info.name}` }) );
    stops.OB = data['OB'].map(stop => ({ value: stop.id, label: `${stop.info.name}` }) );
    this.setState({ stops });
  }

  _onSelect(selected) {
    this.changeSelect(selected);
  };

  changeSelect(selected) {
    this.setState({ selected });
    this.props.onClick(selected.value);    
  }

  changeBound() {
    this.state.bound === 'IB' ? this.setState({ bound: 'OB' }) : this.setState({ bound: 'IB' });
    this.changeSelect({ value: '', label: "Select a stop"});
  }

  render() {
    return (
      <div className="options">
        <div className="outline drop-container">
          <Dropdown options={this.state.stops[this.state.bound]} 
            onChange={this._onSelect} 
            value={this.state.selected} 
            placeholder={"Select a stop"} />
        </div>
        <div>
          <button onClick={this.changeBound} 
            className="btn btn-primary btn-add" 
            role="button">{(() => this.state.bound === 'IB' ? "InB" : "OutB")()}</button>
        </div>
      </div>
      
    
    );
  }
}

export default Stops;


