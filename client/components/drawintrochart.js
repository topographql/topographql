import * as d3 from 'd3';

const drawChart = (data) => {
  const nodes = {};

  const { links } = data; // add object passed from state here

  links.forEach((link) => {
    link.source = nodes[link.source] || (nodes[link.source] = { name: link.source });
    link.target = nodes[link.target] || (nodes[link.target] = { name: link.target });
  });

  const w = 960;
  const h = 500;

  const force = d3.layout
    .force()
    .nodes(d3.values(nodes))
    .links(links)
    .size([w, h])
    .linkDistance(60)
    .charge(-300)
    .on('tick', tick)
    .start();

  const svg = d3
    .select('#myD3')
    .append('svg:svg')
    .attr('id', 'svgchart')
    .attr('width', w)
    .attr('height', h);

  // Per-type markers, as they don't inherit styles.
  svg
    .append('svg:defs')
    .selectAll('marker')
    .data(['suit', 'licensing', 'resolved', 'child'])
    .enter()
    .append('svg:marker')
    .attr('id', String)
    .attr('viewBox', '0 -5 10 10')
    .attr('refX', 15)
    .attr('refY', -1.5)
    .attr('markerWidth', 6)
    .attr('markerHeight', 6)
    .attr('orient', 'auto')
    .append('svg:path')
    .attr('d', 'M0,-5L10,0L0,5');

  const path = svg
    .append('svg:g')
    .selectAll('path')
    .data(force.links())
    .enter()
    .append('svg:path')
    .attr('class', (d) => 'link child')
    .attr('marker-end', (d) => 'url(#child)');

  const circle = svg
    .append('svg:g')
    .selectAll('circle')
    .data(force.nodes())
    .enter()
    .append('svg:circle')
    .attr('r', 6);
  // .call(force.drag);

  const text = svg
    .append('svg:g')
    .selectAll('g')
    .data(force.nodes())
    .enter()
    .append('svg:g');

  // A copy of the text with a thick white stroke for legibility.
  text
    .append('svg:text')
    .attr('x', 8)
    .attr('y', '.31em')
    .attr('class', 'shadow')
    .text((d) => d.name.split('&')[0]);

  text
    .append('svg:text')
    .attr('x', 8)
    .attr('y', '.31em')
    .text((d) => d.name.split('&')[0]);

  // Use elliptical arc path segments to doubly-encode directionality.
  function tick() {
    path.attr('d', (d) => {
      const dx = d.target.x - d.source.x;
      const dy = d.target.y - d.source.y;
      const dr = Math.sqrt(dx * dx + dy * dy);
      return `M${d.source.x},${d.source.y}A${dr},${dr} 0 0,1 ${d.target.x},${d.target.y}`;
    });

    circle.attr('transform', (d) => `translate(${d.x},${d.y})`);
    text.attr('transform', (d) => `translate(${d.x},${d.y})`);
  }
};

export default drawChart;
