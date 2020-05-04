import React, {Component} from 'react';
import SwaggerClient from 'swagger-client';
import './ThumbnailGrid.css';

class ThumbnailGrid extends Component {
  constructor () {
    super();
    this.state = { items: [],
                   loading: true,
                 };
  }

  componentDidMount() {
    const client = new SwaggerClient('http://localhost:3333/api-docs');
    client.then(c => {
      c.apis.default.getBooks().then(results => {
        this.setState({ items: results.body,
                        loading: false,
                      });
      });
    });
  }

  render() {
    //const listItems = this.state.items.map(x => <li key={x.title}>{x.title}</li>);
    const makeThumb = x => {
      const encodedPath = encodeURIComponent(x.path);
      return (
          <li key={x.title}>
          <img class="thumbnail" src={"/api/v1/books/" + encodedPath + "/thumbnail"} />
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
