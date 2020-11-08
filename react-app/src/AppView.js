import React, {Component} from 'react';
import ThumbnailGrid from './ThumbnailGrid';
import Sidebar from './Sidebar';

class AppView extends Component {
  constructor () {
    super();
    this.state = { showSidebar: false };
    this.toggleSidebar = this.toggleSidebar.bind(this);
  }

  toggleSidebar(visibility) {
    this.setState({showSidebar: visibility});
  }

  render() {
    return (
        <div id="root-wrap">
        <Sidebar visible={this.state.showSidebar}/>
        <ThumbnailGrid toggleSidebar={this.toggleSidebar} />
        </div>
    );

  }
}

export default AppView;
