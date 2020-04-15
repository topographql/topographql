import React from 'react';
import { getIntrospectionQuery } from 'graphql';
import * as d3 from 'd3';
import TraceDisplay from './TraceDisplay';
import ControlPanelContainer from './ControlPanelContainer';
import VisualizerContainer from './VisualizerContainer';
import Header from './Header';
import drawNetworkGraph from './drawNetworkGraph';
import { drawTracerGraph, convertTraceData } from './drawTracerGraph';


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

  // onchange handler for endpoint input
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  // onChange handler for CodeMirror
  onChangeQuery(text) {
    this.setState({ query: text });
  }

  onSubmitEndpoint(e) {
    e.preventDefault();
    // fetch(this.state.endpoint, {
    //   method: "Post",
    //   headers: { 'Content-Type': 'application/json' }, 
    //   body: JSON.stringify({"query": getIntrospectionQuery()})
    // }).then(res => res.json())
    //   .then(data => {
    fetch('/gql/getschema', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state.endpoint),
    })
      .then((res) => res.json())
      .then((data) => {
        // set state, delete previous svg and draw new svg passing in data
        this.setState({ schema: data.schema, d3introspectdata: data.d3json });
        d3.select('#svg-network').remove();
        drawNetworkGraph(this.state.d3introspectdata);
      });
    //  });
  }

  onSubmitQuery(e) {
    e.preventDefault();

    fetch(this.state.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify({"query": this.state.query })
    })
      .then((res) => res.json())
      // stores the original result from posting a query into state
      .then((querydata) => this.setState({ querydata }))
      .then((res) => {
        const converted = convertTraceData(this.state.querydata);
        d3.select('#svg-trace').remove();
        drawTracerGraph(converted);
      })
      .then(data => {
        fetch('/gql/getquery', {
          method: "Post",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.state.querydata),
        })
          .then(res => res.json())
          .then(data => console.log(data))
          // store the d3 file of the query results into state
          .then(data => {
            this.setState({ d3querydata: data });
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
