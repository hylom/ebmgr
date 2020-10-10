import React, {Component} from 'react';
import getClient from './client.js';
import './ThumbnailGrid.css';
import Thumbnail from './Thumbnail';
import StatusBar from './StatusBar';
import Logger from './logger';

class ThumbnailGrid extends Component {
  constructor () {
    super();
    this.statusBar = React.createRef();
    this.state = { items: [],
                   loading: true,
                 };
    this.logger = new Logger();
  }

  componentDidMount() {
    const client = getClient();
    client.getBooks().then(results => {
      // add refs
      results.map(x => x.ref = React.createRef());
      this.setState({ items: results,
                      loading: false,
                    });
      this.statusBar.current.setNumberOfItems(results.length);
      if (results.length > 0) {
        results[0].ref.current.loadThumbnail();
      }
    });
  }

  thumbnailLoaded(err) {
    if (err.error) {
      this.logger.info(err.error);
    } else {
      this.statusBar.current.incrementLoadedItems();
    }
    for (const thumb of this.state.items) {
      if (thumb.ref.current.state.status === 'waitToLoad') {
        thumb.ref.current.loadThumbnail();
        return;
      }
    }
    /*
    for (const refName in this.refs) {
      if (refName.match(/^path:/)
          && this.refs[refName].state.status === 'waitToLoad') {
        this.refs[refName].loadThumbnail();
        return;
      }
    }
    */
    this._thumbnailLoadingFinished();
  }

  _thumbnailLoadingFinished() {
    this.statusBar.current.thumbnailLoadingFinished();
  }

  render() {
    const makeThumb = x => {
      return (
          <li key={x.title}>
          <Thumbnail onLoad={this.thumbnailLoaded.bind(this)}
                     item={x}
                     ref={x.ref}
          />
          </li>
      );
    };
    const listItems = this.state.items.map(makeThumb);
    return (
        <div className="ThumbnailGrid">
        <StatusBar ref={this.statusBar} logger={this.logger}/>
        <ul>{listItems}</ul>
        </div>
    );
  }
}

export default ThumbnailGrid;
