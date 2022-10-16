import React, {Component} from 'react';
import './MessageBar.css';
import circleWarningIcon from './mono-icons/svg/circle-warning.svg';
import warningIcon from './mono-icons/svg/warning.svg';
import closeIcon from './mono-icons/svg/close.svg';

class MessageBar extends Component {
  constructor () {
    super();
    this.state = {
      visible: false,
      showLog: false,
      logLevel: "",
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
      logLevel: "error",
    });
  }

  render() {
    let logInfo = "";
    if (this.state.showLog) {
      logInfo = <pre className="log">{this.props.logger.getAllInfo()}</pre>;
    }

    if (this.state.visible) {
      if (this.state.logLevel === 'error') {
        return (
            <div className="MessageBar alert-error">
            <img className="inline-icon" src={warningIcon} alt="info" />
            <span className="message">{this.state.message}</span>
            <button onClick={this.showLogInfo.bind(this)}>see log</button>
            <img onClick={this.dismiss.bind(this)}
                 className="close-icon"
                 src={closeIcon}
                 alt="close"
                 title="close"
            />
            {logInfo}
          </div>
        );
      }

      // fallback
        return (
            <div className="MessageBar alert-info">
            <img className="inline-icon" src={circleWarningIcon} alt="info" />
            <span className="message">{this.state.message}</span>
            <button onClick={this.showLogInfo.bind(this)}>see log</button>
            <img onClick={this.dismiss.bind(this)}
                 className="icon" src={closeIcon} alt="close" />
            {logInfo}
          </div>
        );
    }

    return "";
  }
}

export default MessageBar;
