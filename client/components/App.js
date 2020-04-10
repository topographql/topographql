import React from 'react';
import ControlPanelContainer from './ControlPanelContainer';
import VisualizerContainer from './VisualizerContainer';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      endpoint: '',
      query: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmitEndpoint = this.onSubmitEndpoint.bind(this);
    this.onSubmitQuery = this.onSubmitQuery.bind(this);
  }

  //onchange handler for both endpoint and query submit
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmitEndpoint(e) {
    //do something with endpoint
    const { endpoint } = this.state;
    e.preventDefault();
    console.log(endpoint);
  }

  onSubmitQuery(e) {
    //do something with query
    const { query } = this.state;
    e.preventDefault();
    console.log(query);
  }

  render() {
    return (
      <div id="wrapper">
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
