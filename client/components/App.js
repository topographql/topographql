import React from 'react';
import ControlPanelContainer from './ControlPanelContainer';
import VisualizerContainer from './VisualizerContainer';
import { gql } from 'apollo-boost';


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

  //onchange handler for both endpoint and query submit 
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmitEndpoint(e) {
    const query2 = gql`
   {
    person (id: 1) {
      name
      mass
    }
  }
  `;
  console.log(query2)
    //do something with endpoint
    const { endpoint } = this.state;
    e.preventDefault();
    fetch(this.state.endpoint, {
      method: "Post",
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify({"query": query2.loc.source.body })
    }).then(res => res.json())
      .then(res => console.log(JSON.stringify(res)));
    console.log(endpoint);
  }

  onSubmitQuery(e) {
    //do something with query
    const { query } = this.state
    e.preventDefault();
    console.log(query);
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
