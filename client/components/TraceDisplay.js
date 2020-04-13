/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import * as d3 from 'd3';


class TraceDisplay extends Component {
  componentDidMount() {
    console.log('component mounted');
    this.drawChart();
  }

  drawChart() {
    console.log("chart draw fired")
    let data = [{
      name: 'Apples',
      value: 20,
    },
    {
      name: 'Bananas',
      value: 12,
    },
    {
      name: 'Grapes',
      value: 19,
    },
    {
      name: 'Lemons',
      value: 5,
    },
    {
      name: 'Limes',
      value: 16,
    },
    {
      name: 'Oranges',
      value: 26,
    },
    {
      name: 'Pears',
      value: 30,
    }];

    // sort bars based on value
    data = data.sort((a, b) => d3.ascending(a.value, b.value));

    // set up svg using margin conventions - we'll need plenty of room on the left for labels
    const margin = {
      top: 15,
      right: 25,
      bottom: 15,
      left: 60,
    };

    const width = 960 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    const svg = d3.select('#tracerD3').append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scale.linear()
      .range([0, width])
      .domain([0, d3.max(data, (d) => d.value)]);

    const y = d3.scale.ordinal()
      .rangeRoundBands([height, 0], 0.1)
      .domain(data.map((d) => d.name));

    // make y axis to show bar names
    const yAxis = d3.svg.axis()
      .scale(y)
    // no tick marks
      .tickSize(0)
      .orient('left');

    const gy = svg.append('g')
      .attr('class', 'y axis')
      .call(yAxis);

    const bars = svg.selectAll('.bar')
      .data(data)
      .enter()
      .append('g');

    // append rects
    bars.append('rect')
      .attr('class', 'bar')
      .attr('y', (d) => y(d.name))
      .attr('height', y.rangeBand())
      .attr('x', 0)
      .attr('width', (d) => x(d.value));

    // add a value label to the right of each bar
    bars.append('text')
      .attr('class', 'label')
    // y position of the label is halfway down the bar
      .attr('y', (d) => y(d.name) + y.rangeBand() / 2 + 4)
    // x position is 3 pixels to the right of the bar
      .attr('x', (d) => x(d.value) + 3)
      .text((d) => d.value);
  }

  render() {
    return (
    <div id="tracedisplay">
      <div id="tracerD3"></div>
    </div>
    );
  }
}


export default TraceDisplay;
