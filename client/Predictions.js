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
    fetch(`/api/predictions/${nextProps.agency}/${nextProps.stop}`)
    .then(res => res.json())
    .then(res => this.updatePredictions(res));    
  }

  updatePredictions(data) {
    let predictions = {};
    let nextPredictions = [];
    data.forEach(prediction => {
      if(predictions[prediction.info.line]) {
        predictions[prediction.info.line].push(prediction);
      } else {
        predictions[prediction.info.line] = [prediction];
      }
    });
    for (let line in predictions) {
      let predictionString = `${predictions[line][0].info.name}: `;
      for (let i = 0; i < predictions[line].length; i++) {
        let prediction = predictions[line][i];
        predictionString += `${Math.floor((new Date(prediction.arrivalTime) - Date.now()) / 60000)}`;
        if (i < predictions[line].length - 1) 
          predictionString += ', ';
        else
          predictionString += ' mins';
      }
      if (line === this.props.line)
        nextPredictions.push(({ value: predictions[line][0].id, label: predictionString }));
    }
    this.setState({ predictions: nextPredictions });
  }

  _onSelect(selected) {
    this.setState({ selected });
    console.log(selected);
  };

  render() {
    return (
      <div>
        { this.state.predictions.length ? 
          this.state.predictions.map((prediction, i) => <div key={i}>{prediction.label}</div>) :
          "No Current Predictions" }
      </div>
    );
  }
}

export default Predictions;


