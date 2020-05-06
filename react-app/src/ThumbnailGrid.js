import React, {Component} from 'react';
import getClient from './client.js';
import './ThumbnailGrid.css';
import Thumbnail from './Thumbnail';

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
    });
  }

  render() {
    const makeThumb = x => {
      return (
          <li key={x.title}>
          <Thumbnail item={x} />
          </li>
      );
    };
    const listItems = this.state.items.map(makeThumb);
    return (
        <div className="ThumbnailGrid">
        <ul>{listItems}</ul>
        </div>
    );
  }
}

export default ThumbnailGrid;
