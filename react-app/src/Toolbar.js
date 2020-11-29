import React, {Component} from 'react';
import getClient from './client';
import './Toolbar.css';
import tagIcon from './icons/tag.svg';
import sidebarOpenIcon from './icons/chevron-double-right.svg';
import sidebarCloseIcon from './icons/chevron-double-left.svg';

class Toolbar extends Component {
  constructor () {
    super();
    this.state = {
      query: "",
      buttons: [],
      showSidebar: false,
    };
    this.changeQuery = this.changeQuery.bind(this);
    this.executeQuery = this.executeQuery.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.onExecQuery = this.onExecQuery.bind(this);

    this.addIconButton("editTag", {
      src: tagIcon,
      alt: "edit tag",
      title: "edit tag",
    }, this.editTag.bind(this));

  }

  editTag() {
    this.props.editTag();
  }

  onExecQuery(event) {
    //console.log(event.detail.query);
    if (event.detail && event.detail.query) {
      this.setState({query: event.detail.query});
      this.props.executeQuery(event.detail.query);
    }
  }

  componentDidMount() {
    window.addEventListener('ebmExecQuery', this.onExecQuery);
  }

  componentWillUnmount() {
    window.removeEventListener('ebmExecQuery', this.onExecQuery);
  }

  executeQuery(event) {
    event.preventDefault();
    this.props.executeQuery(this.state.query);
  }

  changeQuery(event) {
    this.setState({query: event.target.value});
  }

  addIconButton(name, content, handler) {
    //    this.setState((state, props) => {
    this.state.buttons.push({ type: "icon",
                              name: name,
                              content: content,
                              handler: handler });
    //      return { buttons: state.buttons };
    //  });
  }

  toggleSidebar() {
    this.setState({showSidebar: !this.state.showSidebar});
    this.props.toggleSidebar(!this.state.showSidebar);
  }

  render() {
    const buttons = this.state.buttons.map(btn => {
      if (btn.type === "icon") {
        return (
            <img className="inline-icon"
          src={btn.content.src}
          alt={btn.content.alt}
          title={btn.content.title}
          onClick={btn.handler}
          key={btn.name}
            />
        );
      }
      return "";
    });

    const sidebarIcon = this.state.showSidebar ?
          <img className="inline-icon float-left" src={sidebarCloseIcon} alt="hide sidebar" title="hide sidebar" onClick={this.toggleSidebar} />
          : <img className="inline-icon float-left" src={sidebarOpenIcon} alt="open sidebar" title="open sidebar" onClick={this.toggleSidebar} />;
          

    return (
        <div className="Toolbar">
        {sidebarIcon}
        <form className="float-left" onSubmit={this.executeQuery} >
        <input value={this.state.query} onChange={this.changeQuery} ></input>
        </form>
        {buttons}
        </div>
    );
  }
}

export default Toolbar;
