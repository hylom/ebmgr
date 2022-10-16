
import React, {Component} from 'react';
//import getClient from './client';
import './Dialog.css';
import closeIcon from '../mono-icons/svg/close.svg';

class Dialog extends Component {
  static BUTTON_CLOSE  = 0b1;
  static BUTTON_OK     = 0b10;
  static BUTTON_CANCEL = 0b100;
  static BUTTON_SAVE   = 0b1000;

  constructor () {
    super();
    this.state = {
      title: "",
      buttons: Dialog.BUTTON_CANCEL,
    };
    this.dismiss = this.dismiss.bind(this);
  }

  componentDidMount() {
  }

  dismiss() {
    this.props.closeHandler();
  }

  save() {
    console.log("save() is not implemented...");
  }

  renderContent() {
    return "";
  }

  renderHeader() {
    return (
      <div>
        <img className="close-icon" alt="close" title="close" src={closeIcon}
      onClick={this.dismiss}/>
        <p className="title">{this.state.title}</p>
      </div>
    );
  }

  renderFooter() {
    let buttons = [];
    if (this.state.buttons & Dialog.BUTTON_SAVE) {
      buttons.push(
        (<button key="save" onClick={this.save.bind(this)}>save</button>)
      );
    }
    if (this.state.buttons & Dialog.BUTTON_CANCEL) {
      buttons.push(
        (<button key="cancel" onClick={this.dismiss}>cancel</button>)
      );
    }
    return (
        <div>
        {buttons}
        </div>
    );
  }

  render() {
    const header = this.renderHeader();
    const content = this.renderContent();
    const footer = this.renderFooter();
    return (
        <div className="modalBase">
          <div className="Dialog">
            <div className="header-wrap">{header}</div>
            <div className="content-wrap">{content}</div>
            <div className="footer-wrap">{footer}</div>
          </div>
        </div>
    );
  }
}

export default Dialog;
