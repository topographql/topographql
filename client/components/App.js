import React from 'react';
import ControlPanelContainer from './ControlPanelContainer'
import VisualizerContainer from './VisualizerContainer'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      endpoint: '',
      query: '',
    };
    this.onChange = this.onChange.bind(this)
  }

  onChange(e) {
    //onchange handler for both endpoint and query submit 
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div id='wrapper'>
        <ControlPanelContainer onChange={this.onChange} />
        <VisualizerContainer />
      </div>
    );
  }
}

export default App;
