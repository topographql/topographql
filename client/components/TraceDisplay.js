/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import * as d3 from 'd3';


class TraceDisplay extends Component {
  componentDidMount() {
    const rawData = [
      {
        path: [
          'people',
        ],
        parentType: 'RootQueryType',
        fieldName: 'people',
        returnType: '[Person]',
        startOffset: 121432,
        duration: 221880173,
      },
      {
        path: [
          'people',
          0,
          'name',
        ],
        parentType: 'Person',
        fieldName: 'name',
        returnType: 'String',
        startOffset: 222120559,
        duration: 35212,
      },
      {
        path: [
          'people',
          1,
          'name',
        ],
        parentType: 'Person',
        fieldName: 'name',
        returnType: 'String',
        startOffset: 222175957,
        duration: 11931,
      },
      {
        path: [
          'people',
          2,
          'name',
        ],
        parentType: 'Person',
        fieldName: 'name',
        returnType: 'String',
        startOffset: 222201009,
        duration: 8032,
      },
      {
        path: [
          'people',
          3,
          'name',
        ],
        parentType: 'Person',
        fieldName: 'name',
        returnType: 'String',
        startOffset: 222218935,
        duration: 7224,
      },
      {
        path: [
          'people',
          4,
          'name',
        ],
        parentType: 'Person',
        fieldName: 'name',
        returnType: 'String',
        startOffset: 222232246,
        duration: 6619,
      },
      {
        path: [
          'people',
          5,
          'name',
        ],
        parentType: 'Person',
        fieldName: 'name',
        returnType: 'String',
        startOffset: 222247264,
        duration: 6459,
      },
      {
        path: [
          'people',
          6,
          'name',
        ],
        parentType: 'Person',
        fieldName: 'name',
        returnType: 'String',
        startOffset: 222261871,
        duration: 6099,
      },
      {
        path: [
          'people',
          7,
          'name',
        ],
        parentType: 'Person',
        fieldName: 'name',
        returnType: 'String',
        startOffset: 222728148,
        duration: 14685,
      },
      {
        path: [
          'people',
          8,
          'name',
        ],
        parentType: 'Person',
        fieldName: 'name',
        returnType: 'String',
        startOffset: 222753883,
        duration: 6527,
      },
      {
        path: [
          'people',
          9,
          'name',
        ],
        parentType: 'Person',
        fieldName: 'name',
        returnType: 'String',
        startOffset: 222766115,
        duration: 9170,
      },
      {
        path: [
          'people',
          10,
          'name',
        ],
        parentType: 'Person',
        fieldName: 'name',
        returnType: 'String',
        startOffset: 222781024,
        duration: 5869,
      },
      {
        path: [
          'people',
          11,
          'name',
        ],
        parentType: 'Person',
        fieldName: 'name',
        returnType: 'String',
        startOffset: 222795715,
        duration: 5984,
      },
      {
        path: [
          'people',
          12,
          'name',
        ],
        parentType: 'Person',
        fieldName: 'name',
        returnType: 'String',
        startOffset: 222807355,
        duration: 9063,
      },
      {
        path: [
          'people',
          13,
          'name',
        ],
        parentType: 'Person',
        fieldName: 'name',
        returnType: 'String',
        startOffset: 222822075,
        duration: 8918,
      },
      {
        path: [
          'people',
          14,
          'name',
        ],
        parentType: 'Person',
        fieldName: 'name',
        returnType: 'String',
        startOffset: 222839695,
        duration: 15500,
      },
      {
        path: [
          'people',
          15,
          'name',
        ],
        parentType: 'Person',
        fieldName: 'name',
        returnType: 'String',
        startOffset: 222860976,
        duration: 10369,
      },
      {
        path: [
          'people',
          16,
          'name',
        ],
        parentType: 'Person',
        fieldName: 'name',
        returnType: 'String',
        startOffset: 222877225,
        duration: 8742,
      },
      {
        path: [
          'people',
          17,
          'name',
        ],
        parentType: 'Person',
        fieldName: 'name',
        returnType: 'String',
        startOffset: 222895325,
        duration: 6190,
      },
      {
        path: [
          'people',
          18,
          'name',
        ],
        parentType: 'Person',
        fieldName: 'name',
        returnType: 'String',
        startOffset: 222911600,
        duration: 5986,
      },
      {
        path: [
          'people',
          19,
          'name',
        ],
        parentType: 'Person',
        fieldName: 'name',
        returnType: 'String',
        startOffset: 223084314,
        duration: 15375,
      },
      {
        path: [
          'people',
          20,
          'name',
        ],
        parentType: 'Person',
        fieldName: 'name',
        returnType: 'String',
        startOffset: 223110325,
        duration: 6420,
      },
      {
        path: [
          'people',
          21,
          'name',
        ],
        parentType: 'Person',
        fieldName: 'name',
        returnType: 'String',
        startOffset: 223128458,
        duration: 5926,
      },
      {
        path: [
          'people',
          22,
          'name',
        ],
        parentType: 'Person',
        fieldName: 'name',
        returnType: 'String',
        startOffset: 223140160,
        duration: 9340,
      },
      {
        path: [
          'people',
          23,
          'name',
        ],
        parentType: 'Person',
        fieldName: 'name',
        returnType: 'String',
        startOffset: 223155011,
        duration: 5615,
      },
      {
        path: [
          'people',
          24,
          'name',
        ],
        parentType: 'Person',
        fieldName: 'name',
        returnType: 'String',
        startOffset: 223169055,
        duration: 5820,
      },
      {
        path: [
          'people',
          25,
          'name',
        ],
        parentType: 'Person',
        fieldName: 'name',
        returnType: 'String',
        startOffset: 223180409,
        duration: 8783,
      },
      {
        path: [
          'people',
          26,
          'name',
        ],
        parentType: 'Person',
        fieldName: 'name',
        returnType: 'String',
        startOffset: 223194774,
        duration: 5512,
      },
      {
        path: [
          'people',
          27,
          'name',
        ],
        parentType: 'Person',
        fieldName: 'name',
        returnType: 'String',
        startOffset: 223226741,
        duration: 35740,
      },
      {
        path: [
          'people',
          28,
          'name',
        ],
        parentType: 'Person',
        fieldName: 'name',
        returnType: 'String',
        startOffset: 223270514,
        duration: 9189,
      },
      {
        path: [
          'people',
          29,
          'name',
        ],
        parentType: 'Person',
        fieldName: 'name',
        returnType: 'String',
        startOffset: 223285543,
        duration: 5558,
      },
      {
        path: [
          'people',
          30,
          'name',
        ],
        parentType: 'Person',
        fieldName: 'name',
        returnType: 'String',
        startOffset: 223299770,
        duration: 5634,
      },
      {
        path: [
          'people',
          31,
          'name',
        ],
        parentType: 'Person',
        fieldName: 'name',
        returnType: 'String',
        startOffset: 223310740,
        duration: 8807,
      },
      {
        path: [
          'people',
          32,
          'name',
        ],
        parentType: 'Person',
        fieldName: 'name',
        returnType: 'String',
        startOffset: 223325070,
        duration: 5546,
      },
      {
        path: [
          'people',
          33,
          'name',
        ],
        parentType: 'Person',
        fieldName: 'name',
        returnType: 'String',
        startOffset: 223356336,
        duration: 6726,
      },
      {
        path: [
          'people',
          34,
          'name',
        ],
        parentType: 'Person',
        fieldName: 'name',
        returnType: 'String',
        startOffset: 223369414,
        duration: 8964,
      },
      {
        path: [
          'people',
          35,
          'name',
        ],
        parentType: 'Person',
        fieldName: 'name',
        returnType: 'String',
        startOffset: 223384312,
        duration: 6109,
      },
      {
        path: [
          'people',
          36,
          'name',
        ],
        parentType: 'Person',
        fieldName: 'name',
        returnType: 'String',
        startOffset: 223399115,
        duration: 5799,
      },
      {
        path: [
          'people',
          37,
          'name',
        ],
        parentType: 'Person',
        fieldName: 'name',
        returnType: 'String',
        startOffset: 223410384,
        duration: 9083,
      },
      {
        path: [
          'people',
          38,
          'name',
        ],
        parentType: 'Person',
        fieldName: 'name',
        returnType: 'String',
        startOffset: 223424919,
        duration: 5514,
      },
      {
        path: [
          'people',
          39,
          'name',
        ],
        parentType: 'Person',
        fieldName: 'name',
        returnType: 'String',
        startOffset: 223439035,
        duration: 103012,
      },
      {
        path: [
          'people',
          40,
          'name',
        ],
        parentType: 'Person',
        fieldName: 'name',
        returnType: 'String',
        startOffset: 223552015,
        duration: 10706,
      },
      {
        path: [
          'people',
          41,
          'name',
        ],
        parentType: 'Person',
        fieldName: 'name',
        returnType: 'String',
        startOffset: 223568737,
        duration: 6156,
      },
      {
        path: [
          'people',
          42,
          'name',
        ],
        parentType: 'Person',
        fieldName: 'name',
        returnType: 'String',
        startOffset: 223583645,
        duration: 6407,
      },
      {
        path: [
          'people',
          43,
          'name',
        ],
        parentType: 'Person',
        fieldName: 'name',
        returnType: 'String',
        startOffset: 223595612,
        duration: 9110,
      },
      {
        path: [
          'people',
          44,
          'name',
        ],
        parentType: 'Person',
        fieldName: 'name',
        returnType: 'String',
        startOffset: 223611722,
        duration: 5685,
      },
      {
        path: [
          'people',
          45,
          'name',
        ],
        parentType: 'Person',
        fieldName: 'name',
        returnType: 'String',
        startOffset: 223628194,
        duration: 8951,
      },
      {
        path: [
          'people',
          46,
          'name',
        ],
        parentType: 'Person',
        fieldName: 'name',
        returnType: 'String',
        startOffset: 223646962,
        duration: 6006,
      },
      {
        path: [
          'people',
          47,
          'name',
        ],
        parentType: 'Person',
        fieldName: 'name',
        returnType: 'String',
        startOffset: 223658483,
        duration: 5450,
      },
      {
        path: [
          'people',
          48,
          'name',
        ],
        parentType: 'Person',
        fieldName: 'name',
        returnType: 'String',
        startOffset: 223672488,
        duration: 5604,
      },
      {
        path: [
          'people',
          49,
          'name',
        ],
        parentType: 'Person',
        fieldName: 'name',
        returnType: 'String',
        startOffset: 223686510,
        duration: 5693,
      },
      {
        path: [
          'people',
          50,
          'name',
        ],
        parentType: 'Person',
        fieldName: 'name',
        returnType: 'String',
        startOffset: 223697759,
        duration: 5558,
      },
      {
        path: [
          'people',
          51,
          'name',
        ],
        parentType: 'Person',
        fieldName: 'name',
        returnType: 'String',
        startOffset: 223712090,
        duration: 5745,
      },
      {
        path: [
          'people',
          52,
          'name',
        ],
        parentType: 'Person',
        fieldName: 'name',
        returnType: 'String',
        startOffset: 223726265,
        duration: 5721,
      },
      {
        path: [
          'people',
          53,
          'name',
        ],
        parentType: 'Person',
        fieldName: 'name',
        returnType: 'String',
        startOffset: 223737381,
        duration: 5566,
      },
      {
        path: [
          'people',
          54,
          'name',
        ],
        parentType: 'Person',
        fieldName: 'name',
        returnType: 'String',
        startOffset: 223751708,
        duration: 5920,
      },
      {
        path: [
          'people',
          55,
          'name',
        ],
        parentType: 'Person',
        fieldName: 'name',
        returnType: 'String',
        startOffset: 223766298,
        duration: 5949,
      },
      {
        path: [
          'people',
          56,
          'name',
        ],
        parentType: 'Person',
        fieldName: 'name',
        returnType: 'String',
        startOffset: 223777692,
        duration: 5439,
      },
      {
        path: [
          'people',
          57,
          'name',
        ],
        parentType: 'Person',
        fieldName: 'name',
        returnType: 'String',
        startOffset: 223791990,
        duration: 5641,
      },
      {
        path: [
          'people',
          58,
          'name',
        ],
        parentType: 'Person',
        fieldName: 'name',
        returnType: 'String',
        startOffset: 223806297,
        duration: 5926,
      },
      {
        path: [
          'people',
          59,
          'name',
        ],
        parentType: 'Person',
        fieldName: 'name',
        returnType: 'String',
        startOffset: 223817630,
        duration: 5414,
      },
      {
        path: [
          'people',
          60,
          'name',
        ],
        parentType: 'Person',
        fieldName: 'name',
        returnType: 'String',
        startOffset: 223831797,
        duration: 5632,
      },
      {
        path: [
          'people',
          61,
          'name',
        ],
        parentType: 'Person',
        fieldName: 'name',
        returnType: 'String',
        startOffset: 223845939,
        duration: 5672,
      },
      {
        path: [
          'people',
          62,
          'name',
        ],
        parentType: 'Person',
        fieldName: 'name',
        returnType: 'String',
        startOffset: 223857189,
        duration: 5691,
      },
      {
        path: [
          'people',
          63,
          'name',
        ],
        parentType: 'Person',
        fieldName: 'name',
        returnType: 'String',
        startOffset: 223871784,
        duration: 5814,
      },
      {
        path: [
          'people',
          64,
          'name',
        ],
        parentType: 'Person',
        fieldName: 'name',
        returnType: 'String',
        startOffset: 223882901,
        duration: 8945,
      },
      {
        path: [
          'people',
          65,
          'name',
        ],
        parentType: 'Person',
        fieldName: 'name',
        returnType: 'String',
        startOffset: 223897372,
        duration: 5326,
      },
      {
        path: [
          'people',
          66,
          'name',
        ],
        parentType: 'Person',
        fieldName: 'name',
        returnType: 'String',
        startOffset: 223910746,
        duration: 5677,
      },
      {
        path: [
          'people',
          67,
          'name',
        ],
        parentType: 'Person',
        fieldName: 'name',
        returnType: 'String',
        startOffset: 223921912,
        duration: 9130,
      },
      {
        path: [
          'people',
          68,
          'name',
        ],
        parentType: 'Person',
        fieldName: 'name',
        returnType: 'String',
        startOffset: 223936911,
        duration: 5543,
      },
      {
        path: [
          'people',
          69,
          'name',
        ],
        parentType: 'Person',
        fieldName: 'name',
        returnType: 'String',
        startOffset: 223951051,
        duration: 5729,
      },
      {
        path: [
          'people',
          70,
          'name',
        ],
        parentType: 'Person',
        fieldName: 'name',
        returnType: 'String',
        startOffset: 223962029,
        duration: 9767,
      },
      {
        path: [
          'people',
          71,
          'name',
        ],
        parentType: 'Person',
        fieldName: 'name',
        returnType: 'String',
        startOffset: 223977328,
        duration: 5586,
      },
      {
        path: [
          'people',
          72,
          'name',
        ],
        parentType: 'Person',
        fieldName: 'name',
        returnType: 'String',
        startOffset: 223991396,
        duration: 5757,
      },
      {
        path: [
          'people',
          73,
          'name',
        ],
        parentType: 'Person',
        fieldName: 'name',
        returnType: 'String',
        startOffset: 224002547,
        duration: 9027,
      },
      {
        path: [
          'people',
          74,
          'name',
        ],
        parentType: 'Person',
        fieldName: 'name',
        returnType: 'String',
        startOffset: 224017131,
        duration: 5548,
      },
      {
        path: [
          'people',
          75,
          'name',
        ],
        parentType: 'Person',
        fieldName: 'name',
        returnType: 'String',
        startOffset: 224031375,
        duration: 5740,
      },
      {
        path: [
          'people',
          76,
          'name',
        ],
        parentType: 'Person',
        fieldName: 'name',
        returnType: 'String',
        startOffset: 224042704,
        duration: 9029,
      },
      {
        path: [
          'people',
          77,
          'name',
        ],
        parentType: 'Person',
        fieldName: 'name',
        returnType: 'String',
        startOffset: 224057184,
        duration: 5503,
      },
      {
        path: [
          'people',
          78,
          'name',
        ],
        parentType: 'Person',
        fieldName: 'name',
        returnType: 'String',
        startOffset: 224071423,
        duration: 5506,
      },
      {
        path: [
          'people',
          79,
          'name',
        ],
        parentType: 'Person',
        fieldName: 'name',
        returnType: 'String',
        startOffset: 224082583,
        duration: 9010,
      },
      {
        path: [
          'people',
          80,
          'name',
        ],
        parentType: 'Person',
        fieldName: 'name',
        returnType: 'String',
        startOffset: 224096958,
        duration: 5405,
      },
      {
        path: [
          'people',
          81,
          'name',
        ],
        parentType: 'Person',
        fieldName: 'name',
        returnType: 'String',
        startOffset: 224111016,
        duration: 5804,
      },
      {
        path: [
          'people',
          82,
          'name',
        ],
        parentType: 'Person',
        fieldName: 'name',
        returnType: 'String',
        startOffset: 224125606,
        duration: 5943,
      },
      {
        path: [
          'people',
          83,
          'name',
        ],
        parentType: 'Person',
        fieldName: 'name',
        returnType: 'String',
        startOffset: 224140640,
        duration: 6033,
      },
      {
        path: [
          'people',
          84,
          'name',
        ],
        parentType: 'Person',
        fieldName: 'name',
        returnType: 'String',
        startOffset: 224152014,
        duration: 9054,
      },
      {
        path: [
          'people',
          85,
          'name',
        ],
        parentType: 'Person',
        fieldName: 'name',
        returnType: 'String',
        startOffset: 224166694,
        duration: 5577,
      },
      {
        path: [
          'people',
          86,
          'name',
        ],
        parentType: 'Person',
        fieldName: 'name',
        returnType: 'String',
        startOffset: 224181067,
        duration: 5661,
      },
    ];

    console.log('component mounted');
    this.convertData(rawData);
  }

  convertData(data) {
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
    this.drawChart(result);
  }


  drawChart(data) {
    // sort bars based on value
    data = data.sort((a, b) => d3.descending(a.name, b.name));

    // set up svg using margin conventions - we'll need plenty of room on the left for labels
    const margin = {
      top: 15,
      right: 25,
      bottom: 15,
      left: 60,
    };

    const width = 960 - margin.left - margin.right;
    const height = window.innerHeight - margin.top - margin.bottom;

    const svg = d3.select('#tracerD3').append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scale.linear()
      .range([0, width])
      .domain([0, d3.max(data, (d) => d.value)]);

    const y = d3.scale.ordinal()
      .rangeRoundBands([height, 0], 0.85)
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
      .text((d) => {
        console.log(d.type);
        if (d.type === 'ms') return `${d.value} ms`;
        return `${d.value} µs`;
      });
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
