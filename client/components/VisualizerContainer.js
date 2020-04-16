/* eslint-disable class-methods-use-this */
import React from 'react';
import QueryResult from './QueryResult';

function VisualizerContainer(props) {
  console.log(props)
  return (
    <div id="visualizer-container">
      <button onClick={props.handleShowResults}>Results View</button>
      <div id="myD3"></div>
      { props.showResults ? <QueryResult result={props.result}/> : null }
    </div>
  );
}

export default VisualizerContainer;
