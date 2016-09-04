import React, { Component } from 'react';
import ReactDom from 'react-dom';
import Lines from './Lines';
import Stops from './Stops';

const geo = navigator.geolocation;
geo.getCurrentPosition(position => {
  console.log(position.coords.latitude, position.coords.longitude);
});

// using redux, we could just change the state in lines, which will update stops
// for now, we will do the regular react way and props down, actions up

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      line: '9'
    };
    this.changeLine = this.changeLine.bind(this);
  }

  changeLine(line) {
    this.setState({ line });
  }

  render() {
    return (
      <div>
        SF Muni/Bart Daily
        <div>
          <Lines onClick={this.changeLine} />
          <Stops line={this.state.line} />
        </div>
      </div>
    );
  }
}

ReactDom.render(<App />, document.getElementById('app'));
