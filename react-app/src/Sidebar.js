import React, {Component} from 'react';
import getClient from './client';
import './Sidebar.css';
import directoryIcon from './icons/folder.svg';

class Sidebar extends Component {
  constructor () {
    super();
  }

  componentDidMount() {
  }

  render() {
    const sidebarHeader = (
        <div className="sidebar-header">
        <img className="inline-icon float-left" src={directoryIcon} alt="directories" title="directories" />
      </div>
    );
    if (this.props.visible) {
      return (
          <div className="Sidebar visible">
          {sidebarHeader}
          <div className="sidebar-contents">
          <iframe id="sidebarIframe" name="sidebarIframe" src="/sidebar.html"></iframe>
          </div>
          </div>
      );
    } else {
      return (
          <div className="Sidebar invisible">
          <div className="sidebar-contents">
          </div>
          </div>
      );
    }
  }
}

export default Sidebar;
