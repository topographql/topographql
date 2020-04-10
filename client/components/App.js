import React from 'react';
import ControlPanelContainer from './ControlPanelContainer';
import VisualizerContainer from './VisualizerContainer';
//import { gql } from 'apollo-boost';
import { getIntrospectionQuery } from 'graphql';

// import { execute, makePromise } from 'apollo-link';
// import { HttpLink } from 'apollo-link-http';
import gql from 'graphql-tag';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      endpoint: '',
      query: '',
      filepath: ''
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
    //do something with endpoint
    const { endpoint } = this.state;
    e.preventDefault();
    fetch(this.state.endpoint, {
      method: "Post",
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify({"query": getIntrospectionQuery() })
    }).then(res => res.json())
      // .then(res => JSON.stringify(res, null, 2))
      .then(data => {
        fetch('/getschema', {
          method: "Post",
          headers: { 'Content-Type': 'application/json' }, 
          body: JSON.stringify(data),
        })
          .then(filepath => this.setState({filepath: filepath}))
        });
    }

  //   const uri = this.state.endpoint;
  //   const link = new HttpLink({ uri });
  //   const operation = {
  //     query: query2,
  //   };

  //   makePromise(execute(link, operation))
  //     .then(data => console.log(`received data ${JSON.stringify(data, null, 2)}`))
  //     .catch(error => console.log(`received error ${error}`));
  //   console.log(endpoint);
  // }

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
