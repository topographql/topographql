import React, { Component } from 'react';
import { UnControlled as CM } from 'react-codemirror2';

import '../styles/codemirror.css';

require('codemirror/addon/fold/foldgutter');
require('codemirror/addon/fold/brace-fold');
require('codemirror/addon/dialog/dialog');
require('codemirror/addon/lint/lint');
require('codemirror/keymap/sublime');

require('codemirror-graphql/results/mode');

function QueryResult(props) {
  const options = {
    lineWrapping: true,
    readOnly: true,
    tabSize: 2,
    mode: 'graphql-results',
    foldGutter: {
      minFoldSize: 4,
    },
    lint: true,
    gutters: ['CodeMirror-foldgutter'],
  };

  return (
      <CM
        value={JSON.stringify(props.result.data, null, 2) || ''}
        options={options}
      />
  );
}

export default QueryResult;
