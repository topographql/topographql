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
import Header from './Header';
import drawNetworkGraph from './drawNetworkGraph.js';
import { drawTracerGraph, convertTraceData } from './drawTracerGraph.js';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      endpoint: '',
      query: '',
      querydata: {},
      schema: {},
      d3introspectdata: {},
      d3querydata: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmitEndpoint = this.onSubmitEndpoint.bind(this);
    this.onChangeQuery = this.onChangeQuery.bind(this);
    this.onSubmitQuery = this.onSubmitQuery.bind(this);
  }

  // onchange handler for both endpoint and query submit
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  // couldn't get onChange above to work with code mirror
  onChangeQuery(text) {
    this.setState({ query: text });
  }

  onSubmitEndpoint(e) {
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
          .then((res) => res.json())
          .then((data) => {
            // set state, delete previous svg and draw new svg passing in data
            this.setState({ schema: data.schema, d3introspectdata: data.d3json });
            d3.select('#svg-network').remove();
            drawNetworkGraph(this.state.d3introspectdata);
          });
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
      .then(res => {
        const converted = convertTraceData(this.state.querydata)
        d3.select('#svg-trace').remove();
        drawTracerGraph(converted)
      })
      .then(data => {
        fetch('/gql/getquery', {
          method: "Post",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })
          .then(res => res.json())
          // store the d3 file of the query results into state
          .then(data => {
            this.setState({ d3querydata: data })
          });
      });
  }

  render() {
    return (
      <div>
        <Header
          onChange={this.onChange}
          onSubmitEndpoint={this.onSubmitEndpoint}
        />
        <div id='flex-wrapper-1'>
          <ControlPanelContainer
            onChange={this.onChange}
            onSubmitQuery={this.onSubmitQuery}
            onChangeQuery={this.onChangeQuery}
            query={this.state.query}
            schema={this.state.schema}
          />
          <div id="flex-wrapper-2">
            <VisualizerContainer
              d3introspectdata={ this.state.d3introspectdata }
            />
            <TraceDisplay />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
