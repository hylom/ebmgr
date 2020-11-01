import React, {Component} from 'react';
import getClient from './client';
import './ThumbnailGrid.css';
import Thumbnail from './Thumbnail';
import MessageBar from './MessageBar';
import Logger from './logger';
import Toolbar from './Toolbar';
import TagEditDialog from './TagEditDialog';

import {default as qparser} from './qparser';

class ThumbnailGrid extends Component {
  constructor () {
    super();
    this.messageBar = React.createRef();
    this.state = { items: [],
                   loading: true,
                   queryString: "",
                   scene: "",
                 };
    this.logger = new Logger();

    this.setFavorite = this.setFavorite.bind(this);
    this.setCheck = this.setCheck.bind(this);
    this.thumbnailLoaded = this.thumbnailLoaded.bind(this);
    this.executeQuery = this.executeQuery.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.editTag = this.editTag.bind(this);
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

  executeQuery(query) {
    this.setState({queryString: query});
  }

  setFavorite(vpath, val) {
    const client = getClient();
    client.setStar(vpath, val)
      .then(
        () => {
          this.setState((state, props) => {
            const item = state.items.find(x => x.vpath === vpath);
            if (item) {
              item.starred = val;
              return {items: state.items};
            }
            return {};
          });
        })
      .catch(
        err => {
          // error handling
        });
  }

  setCheck(vpath, val) {
    this.setState((state, props) => {
      const item = state.items.find(x => x.vpath === vpath);
      if (item) {
        item.checked = val;
        return {items: state.items};
      }
      return {};
    });
  }

  editTag() {
    this.setState({scene: "editTag"});
  }
  
  closeDialog() {
    this.setState({scene: ""});
  }

  parseQueryString(query) {
    const s = query.trim();
    if (!s) {
      return {};
    }

    // query string is foo:bar form?
    if (s.indexOf(':') !== -1) {
      let [key, value] = s.split(':', 2);
      value = value.trim();
      if (value === "false") {
        value = false;
      };
      const result = {};
      result[key] = value;
      return result;
    }

    if (s === "starred") {
      return {starred: true};
    }
    if (s === "checked") {
      return {checked: true};
    }
    return {};
  }

  _applyFilter(query, target) {
    function filter(query, item) {
      if (query.starred !== undefined) {
        if (query.starred) {
          return item.starred;
        } else {
          return !item.starred;
        }
      }
      if (query.checked !== undefined) {
        if (query.checked) {
          return item.checked;
        } else {
          return !item.checked;
        }
      }
      if (query.CONTAIN) {
        for (const key in query.CONTAIN) {
          const val = query.CONTAIN[key];
          return item[key].indexOf(val) >= 0;
        }
        return false;
      }
      if (query.PREFIX) {
        for (const key in query.PREFIX) {
          const val = query.PREFIX[key];
          return item[key].indexOf(val) == 0;
        }
        return false;
      }
      if (query.NOT) {
        return !filter(query.NOT, item);
      }
      if (query.AND) {
        for (const subQuery of query.AND) {
          if (!filter(subQuery, item)) {
            return false;
          }
        }
        return true;
      }
      if (query.OR) {
        for (const subQuery of query.OR) {
          if (filter(subQuery, item)) {
            return true;
          }
        }
        return false;
      }
      return false;
    };

    return target.filter(x => filter(query, x));
  }

  render() {
    let targetItems = this.state.items;
    if (this.state.queryString) {
      //const query = this.parseQueryString(this.state.queryString);
      let query = {};
      try {
        query = qparser.parse(this.state.queryString);
        console.log(query);
      } catch (errer) {
        query = {};
      }
      targetItems = this._applyFilter(query, targetItems);
    }
      
    const makeThumb = x => {
      return (
          <li key={x.title}>
          <Thumbnail onLoadThumbnail={this.thumbnailLoaded}
                     setFavorite={this.setFavorite}
                     setCheck={this.setCheck}
                     item={x}
          />
          </li>
      );
    };
    const listItems = targetItems.map(makeThumb);
    let scene = "";
    if (this.state.scene === "editTag") {
      scene = (<TagEditDialog closeHandler={this.closeDialog} />);
    }
    
    return (
        <div className="ThumbnailGrid">
        {scene}
        <Toolbar editTag={this.editTag} executeQuery={this.executeQuery} />
        <MessageBar ref={this.messageBar} logger={this.logger}/>
        <ul>{listItems}</ul>
        <div className="main-bottom-spacer"></div>
        </div>
    );
  }
}

export default ThumbnailGrid;
