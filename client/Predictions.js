import React, { Component } from 'react';
import ReactDom from 'react-dom';

// using dropdown module for now, can create and customize my own later
import Dropdown from 'react-dropdown';

class Predictions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      predictions: [],
      selected: '',
    }
    this.updatePredictions = this.updatePredictions.bind(this);
    this._onSelect = this._onSelect.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    fetch(`/api/predictions/SFMTA/${nextProps.stop}`)
    .then(res => res.json())
    .then(res => this.updatePredictions(res));    
  }

  updatePredictions(data) {
    let predictions = data.map(prediction => 
      ({ 
        value: prediction.id, 
        label: `${prediction.info.name} ${Math.floor((new Date(prediction.arrivalTime) - Date.now()) / 60000)} mins` 
      }));
    this.setState({ predictions });
  }

  _onSelect(selected) {
    this.setState({ selected });
    console.log(selected);
  };

  render() {
    return (
      <div>
        { this.state.predictions.map(prediction => <div>{prediction.label}</div>) }
      </div>
    );
  }
}

export default Predictions;


