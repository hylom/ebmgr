import React, {Component} from 'react';
import getClient from './client.js';

class Thumbnail extends Component {
  constructor (props) {
    super(props);
    this.state = { thumbnail: null,
                 };
  }

  componentDidMount() {
    const client = getClient();
    client.getBookThumbnail(this.props.item.path).then(
      result => {
        //console.log(result);
        const reader = new FileReader();
        reader.readAsDataURL(result.data);
        reader.addEventListener('load', event => {
          this.setState({thumbnail: reader.result});
        });
      }
    );
  }

  render() {
    if (this.state.thumbnail) {
      const b64Data = this.state.thumbnail;
      return (
          <div className="Thumbnail">
          <img className="thumbnail" alt={this.props.item.title} src={b64Data} />
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
