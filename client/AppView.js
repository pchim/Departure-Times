import React, {Component} from 'react';
import Blocks from './Blocks';

class AppView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: this.props.defaultView || <Blocks />,
      block: null,
      viewType: 'block',
      save: null,
      map: null
    }
  }

  componentWillReceiveProps(nextProps) {

  }

  setView(view) {
    /*
    if (this.state.viewType === 'block') {
      this.setState({ block: this.state.view });
    } else if (this.state.viewType === 'save') {
      this.setState({ save: this.state.view });
    } else if (this.state.viewType === 'map') {
      this.setState({ map: this.state.view });
    }

    this.setState({ view: this.state[view] || <div><Blocks /></div> });
    this.setState({ viewType: view });
    */
  }


  render() {
    return (
      <div className="container">  
        <ul className="nav nav-tabs nav-justified prediction">
            <li role="presentation" className="active"><a onClick={this.setView.bind(this, "block")}>New</a></li>
            <li role="presentation"><a>Saved (Under Construction)</a></li>
            <li role="presentation"><a>Map (Under Construction)</a></li>
        </ul>
        <div>
          {this.state.view}
        </div>
      </div>
    );
  }
}

export default AppView;