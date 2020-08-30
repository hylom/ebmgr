import React, {Component} from 'react';
import getClient from './client.js';
import './ThumbnailGrid.css';
import Thumbnail from './Thumbnail';
import StatusBar from './StatusBar';

class ThumbnailGrid extends Component {
  constructor () {
    super();
    this.state = { items: [],
                   loading: true,
                 };
  }

  componentDidMount() {
    const client = getClient();
    client.getBooks().then(results => {
      this.setState({ items: results,
                      loading: false,
                    });
      this.refs.statusBar.setNumberOfItems(results.length);
      if (results.length > 0) {
        const p = 'path:' + results[0].path;
        this.refs[p].loadThumbnail();
      }
    });
  }

  thumbnailLoaded() {
    console.log("thumb loaded");
    this.refs.statusBar.incrementLoadedItems();
    for (const refName in this.refs) {
      if (refName.match(/^path:/) && !this.refs[refName].state.thumbnail) {
        this.refs[refName].loadThumbnail();
        return;
      }
    }
  }

  render() {
    const makeThumb = x => {
      return (
          <li key={x.title}>
          <Thumbnail onLoad={this.thumbnailLoaded.bind(this)}
                     item={x}
                     ref={'path:' + x.path}
          />
          </li>
      );
    };
    const listItems = this.state.items.map(makeThumb);
    return (
        <div className="ThumbnailGrid">
        <StatusBar ref="statusBar"/>
        <ul>{listItems}</ul>
        </div>
    );
  }
}

export default ThumbnailGrid;
