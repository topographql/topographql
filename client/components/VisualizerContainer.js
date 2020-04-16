/* eslint-disable class-methods-use-this */
import React from 'react';
import QueryResult from './QueryResult';

function VisualizerContainer(props) {
  let view = props.view;
  let display;
  if (view === 'graph') display = <div id="myD3"></div>;
  else display = <QueryResult result={props.result}/>;
  return (
    <div id="visualizer-container">
      <button onClick={props.handleGraphView}>Graph View</button>
      <button onClick={props.handleResultsView}>Results View</button>
      {display}
    </div>
  );
}

export default VisualizerContainer;
