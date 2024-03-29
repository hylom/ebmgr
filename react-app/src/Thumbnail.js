import React, {Component} from 'react';
import './Thumbnail.css';
import getClient from './client';
import favoriteIcon from './mono-icons/svg/favorite.svg';
import checkIcon from './mono-icons/svg/check.svg';

class Thumbnail extends Component {
  constructor (props) {
    super(props);
    this.state = { thumbnail: null,
                   status: 'waitToLoad',
                 };
    this.rootRef = React.createRef();

    this.onChangeIntersection = this.onChangeIntersection.bind(this);
    this.loadThumbnail = this.loadThumbnail.bind(this);
    this.onDoubleClickThumbnail = this.onDoubleClickThumbnail.bind(this);
    this.toggleFav = this.toggleFav.bind(this);
    this.toggleCheck = this.toggleCheck.bind(this);
    this.openBook = props.openBook;
  }

  componentDidMount() {
    // register IntersectionObserver
    const options = {
      root: null,
      threshold: 0,
    };
    this.observer = new IntersectionObserver(this.onChangeIntersection,
                                             options);
    this.observer.observe(this.rootRef.current);
  }

  // handlers
  onChangeIntersection(entries) {
    if (entries.length > 0) {
      const entry = entries[0];
      if (entry.isIntersecting && !this.state.thumbnail) {
        this.loadThumbnail();
        this.observer.disconnect();
      }
    }
  }

  loadThumbnail() {
    const client = getClient();
    client.getBookThumbnail(this.props.item.vpath)
      .then(
        result => {
          const reader = new FileReader();
          reader.readAsDataURL(result.data);
          reader.addEventListener('load', event => {
            this.setState({ thumbnail: reader.result,
                            status: 'loaded',
                          });
            if (this.props.onLoadThumbnail) {
              this.props.onLoadThumbnail({});
            }
          });
        }
      )
      .catch(
        err => {
          console.log(err);
          if (this.props.onLoadThumbnail) {
            this.setState({ status: 'failToLoad' });
            const mesg = err.message || err;
            this.props.onLoadThumbnail({error: `${this.props.item.vpath}: ${mesg}`});
          }
        }
      );
  }

  onDoubleClickThumbnail() {
    /*
    const client = getClient();
    client.openBook(this.props.item.vpath).catch(error => {
      console.log(error);
      });
    */
    this.props.openBook(this.props.item.vpath);
  }

  toggleFav() {
    this.props.setFavorite(this.props.item.vpath,
                           this.props.item.starred ? false : true,
                          );
  }

  toggleCheck() {
    this.props.setCheck(this.props.item.vpath,
                        this.props.item.checked ? false : true,
                       );
  }

  render() {
    if (this.state.thumbnail) {
      const b64Data = this.state.thumbnail;
      let header = "";
      if (this.props.item.starred) {
        header = <img className="icon favorite" src={favoriteIcon}
                      alt="favorite" title="favorite"
                      onClick={this.toggleFav} />;
      } else {
        header = <img className="icon non-favorite" src={favoriteIcon}
                      alt="favorite" title="favorite"
                      onClick={this.toggleFav} />;
      }
      let header2 = "";
      if (this.props.item.checked) {
        header2 = <img className="icon checked"
        src={checkIcon} alt="check" title="check" onClick={this.toggleCheck} />;
      } else {
        header2 = <img className="icon non-checked" src={checkIcon}
        alt="check" title="check"
        onClick={this.toggleCheck} />;
      }
      return (
          <div className="Thumbnail" ref={this.rootRef}>
          <div className="thumbnail-header">{header2} {header}</div>
          <img className="thumbnail" alt={this.props.item.title} src={b64Data}
               onDoubleClick={this.onDoubleClickThumbnail}/>
          <div className="thumbnail-footer">{this.props.item.title}</div>
          </div>
      );
    } else {
      return (
          <div className="Thumbnail" ref={this.rootRef}>loading...</div>
      );
    }
  }
}

export default Thumbnail;
