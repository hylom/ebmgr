import React, {Component} from 'react';
import getClient from './client.js';
import './ThumbnailGrid.css';
import Thumbnail from './Thumbnail';
import MessageBar from './MessageBar';
import Logger from './logger';

class ThumbnailGrid extends Component {
  constructor () {
    super();
    this.messageBar = React.createRef();
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
    });
  }

  thumbnailLoaded(err) {
    if (err && err.error) {
      this.logger.info(err.error);
      this.messageBar.current.showLoadErrorMessage();
    }
  }

  render() {
    const makeThumb = x => {
      return (
          <li key={x.title}>
          <Thumbnail onLoadThumbnail={this.thumbnailLoaded.bind(this)}
                     item={x}
          />
          </li>
      );
    };
    const listItems = this.state.items.map(makeThumb);
    return (
        <div className="ThumbnailGrid">
        <MessageBar ref={this.messageBar} logger={this.logger}/>
        <ul>{listItems}</ul>
        </div>
    );
  }
}

export default ThumbnailGrid;
