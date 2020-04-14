import React from 'react';
// import { gql } from 'apollo-boost';
import { getIntrospectionQuery } from 'graphql';
// import { execute, makePromise } from 'apollo-link';
// import { HttpLink } from 'apollo-link-http';
import gql from 'graphql-tag';
import * as d3 from 'd3';
import TraceDisplay from './TraceDisplay';
import ControlPanelContainer from './ControlPanelContainer';
import VisualizerContainer from './VisualizerContainer';
import drawChart from './drawintrochart.js';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      endpoint: '',
      query: '',
      querydata: {},
      d3introspectdata: {},
      d3querydata: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmitEndpoint = this.onSubmitEndpoint.bind(this);
    this.onSubmitQuery = this.onSubmitQuery.bind(this);
  }

  // onchange handler for both endpoint and query submit
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
    // do something with endpoint
    const { endpoint } = this.state;
    e.preventDefault();
    fetch(this.state.endpoint, {
      method: "Post",
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify({"query": getIntrospectionQuery() })
    }).then(res => res.json())
      .then(data => {
        fetch('/gql/getschema', {
          method: "Post",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data.data),
        })
          .then(res => res.json())
          .then(data => {
            this.setState({ d3introspectdata: data })
            d3.select("svg").remove()
            drawChart(this.state.d3introspectdata);
          })
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
    e.preventDefault();

    fetch(this.state.endpoint, {
      method: "Post",
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify({"query": this.state.query })
    })
      .then(res => res.json())
      // stores the original result from posting a query into state
      .then(querydata => this.setState({ querydata: querydata }))
      .then(res => console.log(this.state.querydata))
      .then(data => {
        fetch('/gql/getquery', {
          method: "Post",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })
          .then(res => res.json())
          //store the d3 file of the query results into state
          .then(data => this.setState({ d3querydata: data }))
          .then(data => console.log(data));
      });
  }

  render() {
    return (
      <div id='wrapper'>
        <ControlPanelContainer
          onChange={this.onChange}
          onSubmitEndpoint={this.onSubmitEndpoint}
          onSubmitQuery={this.onSubmitQuery}
        />
        <div id="wrapper-2">
          <VisualizerContainer
            d3introspectdata={ this.state.d3introspectdata }
            d3querydata = { this.state.d3querydata }
          />
          <TraceDisplay />
        </div>
      </div>
    );
  }
}

export default App;
