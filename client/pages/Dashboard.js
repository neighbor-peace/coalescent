import React, { Component } from 'react';
import axios from 'axios';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  //this.handleClick = this.handleClick.bind(this);
  componentDidMount() {
    // login or signup attaches cookie token
    // request for state contains cookie token
    // server serves proper state
    // axios.get(/api/user)
  }
  render() {
    return (
      <>
        <h1>Dashboard</h1>
      </>
    );
  }
}
export default Dashboard;
