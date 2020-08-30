import React, {Component} from 'react';
import getClient from './client.js';
import './StatusBar.css';

class StatusBar extends Component {
  constructor () {
    super();
    this.state = {
      state: 'loading',
      numberOfItems: 0,
      numberOfLoadedItems: 0,
    };
  }

  setNumberOfItems(count) {
    this.setState({numberOfItems: count});
  }

  incrementLoadedItems(count) {
    count = count || 1;
    this.setState({numberOfLoadedItems: this.state.numberOfLoadedItems + count});
  }

  componentDidMount() {
  }

  render() {
    return (
        <div className="StatusBar">
          <span>loading {this.state.numberOfLoadedItems} / {this.state.numberOfItems} items...</span>
        </div>
    );
  }
}

export default StatusBar;
