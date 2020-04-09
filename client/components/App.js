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
    this.onSubmitEndpoint = this.onSubmitEndpoint.bind(this)
    this.onSubmitQuery = this.onSubmitQuery.bind(this)
  }

  onChange(e) {
    //onchange handler for both endpoint and query submit 
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmitEndpoint(e) {
    //do something with endpoint
    e.preventDefault();
    const { endpoint } = this.state;
    console.log(endpoint)
  }

  onSubmitQuery(e) {
    //do something with query
    e.preventDefault();
    console.log('q')
  }

  render() {
    return (
      <div id='wrapper'>
        <ControlPanelContainer 
          onChange={this.onChange}
          onSubmitEndpoint={this.onSubmitEndpoint} 
          onSubmitQuery={this.onSubmitQuery}
        />
        <VisualizerContainer />
      </div>
    );
  }
}

export default App;
