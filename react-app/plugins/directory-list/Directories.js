import React, {Component} from 'react';

class Directories extends Component {
  constructor () {
    super();
    this.state = {
      directoryList: {},
    };
    this.filterByDir = this.filterByDir.bind(this);
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

  _renderDirectory(dirList, trace) {
    trace = trace || "";
    const nodes = [];
    for (const name in dirList) {
      const currentTrace = trace ? `${trace}/${name}` : name;
      if (dirList[name].length == 0) {
        nodes.push(<li key={currentTrace}>
                   <span onClick={() => {this.filterByDir(currentTrace);}}>{name}</span>
                   </li>);
      } else {
        const subDir = this._renderDirectory(dirList[name], currentTrace);
        nodes.push(<li key={name}>
                   <span onClick={() => {this.filterByDir(currentTrace);}}>{name}</span>
                   {subDir}</li>);
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
