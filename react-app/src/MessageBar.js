import React, {Component} from 'react';
import './MessageBar.css';

class MessageBar extends Component {
  constructor () {
    super();
    this.state = {
      visible: false,
      showLog: false,
      mesage: "",
    };
  }

  componentDidMount() {
  }

  dismiss() {
    this.setState({visible: false});
  }

  showLogInfo() {
    this.setState({showLog: true});
  }

  showLoadErrorMessage() {
    this.setState({
      message: "loading error",
      visible: true,
    });
  }

  render() {
    let logInfo = "";
    if (this.state.showLog) {
      logInfo = <pre className="log">{this.props.logger.getAllInfo()}</pre>;
    }

    if (this.state.visible) {
      return (
          <div className="MessageBar">
          <span>{this.state.message}</span>
          <button onClick={this.showLogInfo.bind(this)}>see log</button>
          <button onClick={this.dismiss.bind(this)}>dismiss</button>
          {logInfo}
          </div>
      );
    }

    return "";
  }
}

export default MessageBar;
