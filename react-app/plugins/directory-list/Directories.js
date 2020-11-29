import React, {Component} from 'react';
import openIcon from './icons/folder-remove.svg';
import closedIcon from './icons/folder-add.svg';
import folderIcon from './icons/folder.svg';
import './Directories.css';

class Directories extends Component {
  constructor () {
    super();
    this.state = {
      directoryList: {},
      directoryState: {},
    };
    this.filterByDir = this.filterByDir.bind(this);
    this.openDirectory = this.openDirectory.bind(this);
  }

  componentDidMount() {
    const client = window.parent.bookmanager.getClient();
    client.getDirectories().then(result => {
      this.setState({ directoryList: result });
    });
  }

  filterByDir(trace) {
    window.parent.bookmanager.execQuery(`vpath ^= "${trace}"`);
  }

  openDirectory(vpath, opened) {
    this.setState(state => {
      state.directoryState[vpath] = state.directoryState[vpath] || {};
      state.directoryState[vpath].opened = opened;
      return {directoryState: state.directoryState};
    });
  }

  _renderDirectory(dirList, trace) {
    trace = trace || "";
    const nodes = [];
    for (const name in dirList) {
      const currentTrace = trace ? `${trace}/${name}` : name;

      if (Object.keys(dirList[name]).length == 0) {
        nodes.push(<li key={currentTrace}>
                     <img className="dir-icon"
                     src={folderIcon}
                     alt="folder" />
                   <span onClick={() => {this.filterByDir(currentTrace);}}>{name}</span>
                   </li>);
      } else {
        const dirState = this.state.directoryState[currentTrace] || {};
        if (dirState.opened) {
          const subDir = this._renderDirectory(dirList[name], currentTrace);
          nodes.push(<li key={name} className="open">
                     <img className="dir-icon"
                     src={openIcon}
                     alt="open"
                     title="clock to close"
                     onClick={() => {this.openDirectory(currentTrace, false);}} />
                     <span onClick={() => {this.filterByDir(currentTrace);}}>{name}</span>
                     {subDir}</li>);
        } else {
          nodes.push(<li key={name} className="closed">
                     <img className="dir-icon"
                     src={closedIcon}
                     alt="closed"
                     title="clock to open"
                     onClick={() => {this.openDirectory(currentTrace, true);}} />
                     <span onClick={() => {this.filterByDir(currentTrace);}}>{name}</span>
                     </li>);
        }
      }
    }
    return <ul>{nodes}</ul>;
  }

  render() {
    const nodes = this._renderDirectory(this.state.directoryList);
    return (
        <div className="directories">{nodes}</div>
    );
  }
}

export default Directories;
