import React from 'react';
import * as d3 from 'd3';
import TraceDisplay from './TraceDisplay';
import ControlPanelContainer from './ControlPanelContainer';
import VisualizerContainer from './VisualizerContainer';
import Header from './Header';
import drawNetworkGraph from './utilities/drawNetworkGraph';
import SettingsBar from './SettingsBar';
import { drawTracerGraph, convertTraceData } from './utilities/drawTracerGraph';
import { highlightQuery } from './utilities/highlighterFunction.js';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      endpoint: '', // user's GraphQL endpoint
      endpointError: null, // if endpoint fetched an error
      query: '', // user's query string
      querydata: {}, // query results retrieved from server
      queryError: null,
      schema: {}, // introspected schema
      d3introspectdata: {}, // d3 file for introspected schema
      d3querydata: {}, // d3 info for query data
      showResults: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmitEndpoint = this.onSubmitEndpoint.bind(this);
    this.onChangeQuery = this.onChangeQuery.bind(this);
    this.onSubmitQuery = this.onSubmitQuery.bind(this);
    this.postQuery = this.postQuery.bind(this);
    this.handleShowResults = this.handleShowResults.bind(this);
  }

  // loads in with previous state when refreshing browser
  componentDidMount() {
    this.loadWithLocalStorage()
      .then(() => {
        if (JSON.stringify(this.state.d3introspectdata) !== '{}' && JSON.stringify(this.state.querydata) !== '{}') {
          drawNetworkGraph(this.state.d3introspectdata);
          const converted = convertTraceData(this.state.querydata);
          d3.select('#svg-trace').remove();
          drawTracerGraph(converted);
          if (localStorage.getItem('endpoint') !== '' && document.getElementById('endpoint')) {
            document.getElementById('endpoint').value = JSON.parse(localStorage.getItem('endpoint'));
          }
        }
      });

    // event listener for leaving / refreshing the page -  saves state to local storage when 
    window.addEventListener(
      'beforeunload',
      this.saveStateToLocalStorage.bind(this)
    );
  }

  componentWillUnmount() {
    window.removeEventListener(
      'beforeunload',
      this.saveStateToLocalStorage.bind(this)
    );

    // saves to local storage if component unmounts
    this.saveStateToLocalStorage();
  }

  saveStateToLocalStorage() {
    /* eslint-disable */
    for (let key in this.state) {
      localStorage.setItem(key, JSON.stringify(this.state[key]));
    }
  };

  async loadWithLocalStorage() {
    for (let key in this.state) {
      if (localStorage.hasOwnProperty(key)) {
        const value = localStorage.getItem(key);
        try {
          this.setState({[key]: JSON.parse(value)});
        } catch (err) {
          // if can't parse an empty ''
          this.setState( {[key]: value})
        }
      }
    }
  }


  // onchange handler for endpoint input
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  // onChange handler for CodeMirror
  onChangeQuery(text) {
    this.setState({ query: text });
  }

  handleShowResults() {
    console.log('hi')
    if(!this.state.showResults) this.setState({ showResults: true });
    else this.setState({ showResults: false });
    console.log(this.state.showResults)
  }

  onSubmitEndpoint(e) {
    e.preventDefault();
    // clears previous query and query results from state
    this.setState({ querydata: {} });
    d3.select('#svg-trace').remove();
    fetch('/gql/getschema', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ endpoint: this.state.endpoint }),
    })
      .then((res) => res.json())
      .then((data) => {
        // set state, delete previous svg and draw new svg passing in data
        this.setState({ schema: data.schema, d3introspectdata: data.d3json, endpointError: false });
        d3.select('#svg-network').remove();
        drawNetworkGraph(this.state.d3introspectdata);
      })
      .catch((err) => {
        if (err) this.setState({ endpointError: true });
      });
  }

  // sends query to client's GraphQL endpoint and saves the query result in state
  async postQuery() {
    try {
      const response = await fetch(this.state.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({"query": this.state.query }),
      });
      const querydata = await response.json();

      this.setState({ querydata, queryError: null });
      const converted = convertTraceData(querydata);
      d3.select('#svg-trace').remove();
      drawTracerGraph(converted);
    } catch (err) {
      this.setState({ querydata: err, queryError: true });
    }
  }

  // takes GraphQL query result from state and fetches /getquery endpoint to update D3 visualization
  async updateD3WithQuery() {
    try {
      console.log(this.state.querydata)
      const response = await fetch('/gql/getquery', {
        method: "Post",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.state.querydata),
      });
      const d3querydata = await response.json();
      this.setState({ d3querydata });
      const schemaCopy = this.state.d3introspectdata;
      const queryPath = d3querydata;
      const highlightedSchema = highlightQuery(schemaCopy, queryPath);
      this.setState({ d3introspectdata: highlightedSchema });
      d3.select('#svg-network').remove();
      drawNetworkGraph(this.state.d3introspectdata);
    } catch (err) {
      console.log(err);
    }
  }

  onSubmitQuery(e) {
    e.preventDefault();
    const resetSchema = this.state.d3introspectdata;
    resetSchema.links.forEach((element) => {
      element.source.highlighted = false;
      element.target.highlighted = false;
      element.target.parent = null; 
    });
    this.postQuery().then(() => {
      if (!this.state.queryError) this.updateD3WithQuery();
    });
  }

  render() {
    return (
      <div>
        <Header
          onChange={this.onChange}
          onSubmitEndpoint={this.onSubmitEndpoint}
          endpointError={this.state.endpointError}
          endpoint = {this.state.endpoint}
        />
        <div id='flex-wrapper-1'>
          <ControlPanelContainer
            onChange={this.onChange}
            onSubmitQuery={this.onSubmitQuery}
            onChangeQuery={this.onChangeQuery}
            query={this.state.query}
            queryError={this.state.queryError}
            schema={this.state.schema}
            result={this.state.querydata}
          />
          <div id="flex-wrapper-2">
            <SettingsBar 
              handleShowResults={this.handleShowResults}
              showResults={this.state.showResults} />
            <VisualizerContainer
              d3introspectdata={ this.state.d3introspectdata }
              result={this.state.querydata}
              showResults={this.state.showResults}
            />
            <TraceDisplay />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
