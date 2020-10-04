import React, {Component} from 'react';
// import getClient from './client.js';
import './StatusBar.css';

class StatusBar extends Component {
  constructor () {
    super();
    this.state = {
      mode: 'loading',
      showLogInfo: false,
      numberOfItems: 0,
      numberOfLoadedItems: 0,
    };
  }

  setNumberOfItems(count) {
    this.setState({numberOfItems: count});
  }

  thumbnailLoadingFinished() {
    this.setState({mode: "finished"});
  }

  incrementLoadedItems(count) {
    count = count || 1;
    this.setState({numberOfLoadedItems: this.state.numberOfLoadedItems + count});
  }

  componentDidMount() {
  }

  dismiss() {
    this.setState({mode: ""});
  }

  showLogInfo() {
    this.setState({showLogInfo: true});
  }

  render() {
    let logInfo = "";
    if (this.state.showLogInfo) {
      logInfo = <pre className="log">{this.props.logger.getAllInfo()}</pre>;
    }

    if (this.state.mode === 'loading') {
      return (
          <div className="StatusBar">
          <span>loading {this.state.numberOfLoadedItems} / {this.state.numberOfItems} items...</span>
          </div>
      );
    }

    if (this.state.mode === 'finished') {
      if (this.state.numberOfItems === this.state.numberOfLoadedItems) {
      return (
          <div className="StatusBar">
          <span>load {this.state.numberOfLoadedItems} / {this.state.numberOfItems} items.</span>
          </div>
      );
      } else {
        return (
            <div className="StatusBar">
            <span>
            proccessing error while loading {this.state.numberOfItems - this.state.numberOfLoadedItems} file(s).
            <button onClick={this.showLogInfo.bind(this)}>see log</button>
            <button onClick={this.dismiss.bind(this)}>dismiss</button>
            </span>
            {logInfo}
            </div>
        );
      }
    }

    return "";
  }
}

export default StatusBar;
