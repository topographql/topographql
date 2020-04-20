/* eslint-disable class-methods-use-this */
import React from 'react';
import QueryResult from './QueryResult';

function VisualizerContainer(props) {
  return (
      <div id="visualizer-container">
          <div id="myD3"></div>
          { props.showResults === true ? <QueryResult result={props.result}/> : null }
      </div>
  );
}

export default VisualizerContainer;
