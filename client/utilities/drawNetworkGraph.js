import * as d3 from 'd3';

const drawNetworkGraph = (data) => {
  const copyData = JSON.parse(JSON.stringify(data));
  const nodes = {};

  const { links } = copyData; // add object passed from state here

  links.forEach((link) => {
    link.source =
      nodes[link.source.name] ||
      (nodes[link.source.name] = {
        name: link.source.name,
        h: link.source.highlighted,
        t: link.source.type,
        parent: link.source.parent,
      });
    if (nodes[link.target.name]) {
      if (nodes[link.target.name].parent) {
        if (
          Array.isArray(nodes[link.target.name].parent) &&
          link.target.parent
        ) {
          nodes[link.target.name].parent.push(link.target.parent);
        } else if (link.target.parent)
          nodes[link.target.name].parent = [link.target.parent];
      }
    }
    link.target =
      nodes[link.target.name] ||
      (nodes[link.target.name] = {
        name: link.target.name,
        h: link.target.highlighted,
        t: link.target.type,
        parent: [link.target.parent],
      });
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
    .attr('id', 'svg-network')
    .attr('width', w)
    .attr('height', h)
    // .attr('preserveAspectRatio', 'xMinYmin meet')
    // .attr('viewBox', '0 0 600 600')
    .classed('svg-content', true)
    .call(
      d3.behavior.zoom().on('zoom', () => {
        svg.attr(
          'transform',
          `translate(${d3.event.translate})` + ` scale(${d3.event.scale})`,
        );
      }),
    )
    .append('g');

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
    .attr('class', (d) => {
      if (d.target.name.split('&')[1] === 'multiple' && d.target.parent) {
        if (
          d.target.parent.includes(d.source.name) ||
          d.target.parent === d.source.name
        )
          return 'link h-true';
        return 'link h-false';
      }
      if (d.source.h && d.target.h) return 'link h-true';
      if (d.target.h && d.source.name.split('&')[1] === 'multiple') {
        d.source.h = true;
        return 'link h-true';
      }
      return 'link h-false';
    })
    .attr('marker-end', () => 'url(#child)');

  const circle = svg
    .append('svg:g')
    .selectAll('circle')
    .data(force.nodes())
    .enter()
    .append('svg:circle')
    .attr('class', (d) => {
      if (d.h) return 'circle-h-true';
      return 'circle-h-false';
    })
    .attr('r', (d) => {
      if (d.t === 'Type') return 10;
      return 6;
    })
    .call(force.drag);

  // stops zoom when clicking on a node to allow dragging
  circle.on("mousedown", () => d3.event.stopPropagation());

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

export default drawNetworkGraph;
