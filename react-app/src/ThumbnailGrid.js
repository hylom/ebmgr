import React, {Component} from 'react';
import SwaggerClient from 'swagger-client';

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
    const listItems = this.state.items.map(x => <li key={x.title}>{x.title}</li>);
    return (
        <div className="ThumbnailGrid">
        <ul>{listItems}</ul>
        </div>
    );
  }
}

export default ThumbnailGrid;
