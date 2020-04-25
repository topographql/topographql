import * as d3 from 'd3';

export const convertTraceData = (rData) => {
  const data = rData.extensions.tracing.execution.resolvers;
  const result = [];
  data.forEach((obj) => {
    // create new obj and push it into result
    const temp = {};
    temp.name = obj.path;

    // if duration is less than 1000000 convert to microseconds
    if (obj.duration < 1000000) {
      temp.value = Math.ceil(obj.duration / 1000);
      temp.type = 'µs';
      // else converst to milliseconds
    } else {
      temp.value = Math.ceil(obj.duration / 1000000);
      temp.type = 'ms';
    }
    result.push(temp);
  });
  // draw chart passing in converted data
  return result;
};

export const drawTracerGraph = (rData) => {
  // sort bars based on value
  const data = rData.sort((a, b) => d3.descending(a.name, b.name));

  // set up svg using margin conventions - we'll need plenty of room on the left for labels
  const margin = {
    top: 15,
    right: 100,
    bottom: 15,
    left: 60,
  };

  const width = 960 - margin.left - margin.right;
  const height = Math.min(900, 20 * data.length);

  const svg = d3
    .select('#tracerD3')
    .append('svg')
    .attr('id', 'svg-trace')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    // .attr("viewBox", `0 0 960 ${height}`)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  const x = d3.scale
    .linear()
    .range([0, width])
    .domain([0, d3.max(data, (d) => d.value)]);

  const y = d3.scale
    .ordinal()
    .rangeRoundBands([height, 0], 0.85)
    .domain(data.map((d) => d.name));

  // make y axis to show bar names
  const yAxis = d3.svg
    .axis()
    .scale(y)
    // no tick marks
    .tickSize(0)
    .orient('left');

  const gy = svg
    .append('g')
    .attr('class', 'y axis')
    .call(yAxis);

  const bars = svg
    .selectAll('.bar')
    .data(data)
    .enter()
    .append('g');

  // append rects
  bars
    .append('rect')
    .attr('class', 'bar')
    .attr('y', (d) => y(d.name))
    .attr('height', y.rangeBand())
    .attr('x', 0)
    .attr('width', (d) => x(d.value));

  // add a value label to the right of each bar
  bars
    .append('text')
    .attr('class', 'label')
    // y position of the label is halfway down the bar
    .attr('y', (d) => y(d.name) + y.rangeBand() / 2 + 4)
    // x position is 3 pixels to the right of the bar
    .attr('x', (d) => x(d.value) + 3)
    .text((d) => {
      if (d.type === 'ms') return `${d.value} ms`;
      return `${d.value} µs`;
    });
};
