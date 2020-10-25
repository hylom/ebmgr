import React, {Component} from 'react';
import getClient from './client';
import './Toolbar.css';

class Toolbar extends Component {
  constructor () {
    super();
    this.state = { query: "", };
    this.changeQuery = this.changeQuery.bind(this);
    this.executeQuery = this.executeQuery.bind(this);
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

  render() {
    return (
        <div className="Toolbar">
        <form onSubmit={this.executeQuery} >
        <input value={this.state.query} onChange={this.changeQuery} ></input>
        </form>
        </div>
    );
  }
}

export default Toolbar;
