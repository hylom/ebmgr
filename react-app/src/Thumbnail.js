import React, {Component} from 'react';
import getClient from './client.js';

class Thumbnail extends Component {
  constructor (props) {
    super(props);
    this.state = { thumbnail: null,
                   status: 'waitToLoad',
                 };
  }

  componentDidMount() {
  }

  loadThumbnail() {
    const client = getClient();
    client.getBookThumbnail(this.props.item.path)
      .then(
        result => {
          //console.log(result);
          const reader = new FileReader();
          reader.readAsDataURL(result.data);
          reader.addEventListener('load', event => {
            this.setState({ thumbnail: reader.result,
                            status: 'loaded',
                          });
            if (this.props.onLoad) {
              this.props.onLoad({});
            }
          });
        }
      )
      .catch(
        err => {
          if (this.props.onLoad) {
            this.setState({ status: 'failToLoad' });
            if (err.message) {
              const mesg = `${this.props.item.path}: ${err.message}`;
              this.props.onLoad({error: mesg});
              return;
            }
            this.props.onLoad({error: err});
          }
        }
      );
  }

  onDoubleClickThumbnail() {
    const client = getClient();
    client.openBook(this.props.item.path).catch(error => {
      console.log(error);
    });
  }

  render() {
    if (this.state.thumbnail) {
      const b64Data = this.state.thumbnail;
      return (
          <div className="Thumbnail">
          <img className="thumbnail" alt={this.props.item.title} src={b64Data}
               onDoubleClick={() => this.onDoubleClickThumbnail()}/>
          </div>
      );
    } else {
      return (
          <div className="Thumbnail">loading...</div>
      );
    }
  }
}

export default Thumbnail;
