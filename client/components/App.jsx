import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  render() {
    function testBackend() {
      axios
        .get('/api')
        .then((response) => {
          console.log({ response });
        })
        .catch((err) => {
          console.log({ err });
        });
    }
    return (
      <div>
        <h1>Hello World!</h1>
        <button onClick={testBackend}>Test Backend</button>
      </div>
    );
  }
}

export default App;
