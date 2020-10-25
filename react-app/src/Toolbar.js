import React, {Component} from 'react';
import getClient from './client';
import './Toolbar.css';
import tagIcon from './icons/tag.svg';

class Toolbar extends Component {
  constructor () {
    super();
    this.state = {
      query: "",
      buttons: [],
    };
    this.changeQuery = this.changeQuery.bind(this);
    this.executeQuery = this.executeQuery.bind(this);

    this.addIconButton("editTag", {
      src: tagIcon,
      alt: "edit tag",
      title: "edit tag",
    }, this.editTag.bind(this));
  }

  editTag() {
    this.props.editTag();
  }

  componentDidMount() {
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

    return (
        <div className="Toolbar">
        <form className="float-left" onSubmit={this.executeQuery} >
        <input value={this.state.query} onChange={this.changeQuery} ></input>
        </form>
        {buttons}
        </div>
    );
  }
}

export default Toolbar;
