import React, {Component} from 'react';
import getClient from './client.js';
import './ThumbnailGrid.css';
import Thumbnail from './Thumbnail';
import StatusBar from './StatusBar';
import Logger from './logger';

class ThumbnailGrid extends Component {
  constructor () {
    super();
    this.state = { items: [],
                   loading: true,
                 };
    this.logger = new Logger();
  }

  componentDidMount() {
    const client = getClient();
    client.getBooks().then(results => {
      this.setState({ items: results,
                      loading: false,
                    });
      this.refs.statusBar.setNumberOfItems(results.length);
      if (results.length > 0) {
        const p = 'path:' + results[0].vpath;
        this.refs[p].loadThumbnail();
      }
    });
  }

  thumbnailLoaded(err) {
    if (err.error) {
      this.logger.info(err.error);
    } else {
      this.refs.statusBar.incrementLoadedItems();
    }
    for (const refName in this.refs) {
      if (refName.match(/^path:/)
          && this.refs[refName].state.status === 'waitToLoad') {
        this.refs[refName].loadThumbnail();
        return;
      }
    }
    this._thumbnailLoadingFinished();
  }

  _thumbnailLoadingFinished() {
    this.refs.statusBar.thumbnailLoadingFinished();
  }

  render() {
    const makeThumb = x => {
      return (
          <li key={x.title}>
          <Thumbnail onLoad={this.thumbnailLoaded.bind(this)}
                     item={x}
                     ref={'path:' + x.vpath}
          />
          </li>
      );
    };
    const listItems = this.state.items.map(makeThumb);
    return (
        <div className="ThumbnailGrid">
        <StatusBar ref="statusBar" logger={this.logger}/>
        <ul>{listItems}</ul>
        </div>
    );
  }
}

export default ThumbnailGrid;
