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
      // .then(res => JSON.stringify(res, null, 2))
      .then(data => {
        fetch('/gql/getschema', {
          method: "Post",
          headers: { 'Content-Type': 'application/json' }, 
          body: JSON.stringify(data),
        })
          .then(res => res.json())
          .then(data => {
            this.setState({ d3introspectdata: data })
            d3.select("svg").remove()
            drawChart( );
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
    // do something with query
    const { query } = this.state;
    e.preventDefault();

    fetch(this.state.endpoint, {
      method: 'Post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: this.state.query }),
    });
    console.log(query);
  }

  // drawChart() {
  //   const nodes = {};

  //   const { links } = this.state.d3introspectdata; // add object passed from state here

  //   links.forEach((link) => {
  //     link.source = nodes[link.source] || (nodes[link.source] = { name: link.source });
  //     link.target = nodes[link.target] || (nodes[link.target] = { name: link.target });
  //   });

  //   const w = 960;
  //   const h = 500;

  //   const force = d3.layout
  //     .force()
  //     .nodes(d3.values(nodes))
  //     .links(links)
  //     .size([w, h])
  //     .linkDistance(60)
  //     .charge(-300)
  //     .on('tick', tick)
  //     .start();

  //   const svg = d3
  //     .select('#myD3')
  //     .append('svg:svg')
  //     .attr('id', 'svgchart')
  //     .attr('width', w)
  //     .attr('height', h);

  //   // Per-type markers, as they don't inherit styles.
  //   svg
  //     .append('svg:defs')
  //     .selectAll('marker')
  //     .data(['suit', 'licensing', 'resolved', 'child'])
  //     .enter()
  //     .append('svg:marker')
  //     .attr('id', String)
  //     .attr('viewBox', '0 -5 10 10')
  //     .attr('refX', 15)
  //     .attr('refY', -1.5)
  //     .attr('markerWidth', 6)
  //     .attr('markerHeight', 6)
  //     .attr('orient', 'auto')
  //     .append('svg:path')
  //     .attr('d', 'M0,-5L10,0L0,5');

  //   const path = svg
  //     .append('svg:g')
  //     .selectAll('path')
  //     .data(force.links())
  //     .enter()
  //     .append('svg:path')
  //     .attr('class', (d) => 'link child')
  //     .attr('marker-end', (d) => 'url(#child)');

  //   const circle = svg
  //     .append('svg:g')
  //     .selectAll('circle')
  //     .data(force.nodes())
  //     .enter()
  //     .append('svg:circle')
  //     .attr('r', 6);
  //     // .call(force.drag);

  //   const text = svg
  //     .append('svg:g')
  //     .selectAll('g')
  //     .data(force.nodes())
  //     .enter()
  //     .append('svg:g');

  //   // A copy of the text with a thick white stroke for legibility.
  //   text
  //     .append('svg:text')
  //     .attr('x', 8)
  //     .attr('y', '.31em')
  //     .attr('class', 'shadow')
  //     .text((d) => d.name.split('&')[0]);

  //   text
  //     .append('svg:text')
  //     .attr('x', 8)
  //     .attr('y', '.31em')
  //     .text((d) => d.name.split('&')[0]);

  //   // Use elliptical arc path segments to doubly-encode directionality.
  //   function tick() {
  //     path.attr('d', (d) => {
  //       const dx = d.target.x - d.source.x;
  //       const dy = d.target.y - d.source.y;
  //       const dr = Math.sqrt(dx * dx + dy * dy);
  //       return `M${d.source.x},${d.source.y}A${dr},${dr} 0 0,1 ${d.target.x},${d.target.y}`;
  //     });

  //     circle.attr('transform', (d) => `translate(${d.x},${d.y})`);
  //     text.attr('transform', (d) => `translate(${d.x},${d.y})`);
  //   }
  // }


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
