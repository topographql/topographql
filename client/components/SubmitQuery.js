import React from 'react';

import '../styles/codemirror.css';

import 'codemirror/addon/hint/show-hint' ;
import 'codemirror/addon/comment/comment';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/brace-fold';
import 'codemirror/addon/search/search';
import 'codemirror/addon/search/searchcursor';
import 'codemirror/addon/search/jump-to-line';
import 'codemirror/addon/dialog/dialog';
import 'codemirror/addon/lint/lint';
import 'codemirror/keymap/sublime';
import 'codemirror-graphql/hint';
import 'codemirror-graphql/lint';
import 'codemirror-graphql/info';
import 'codemirror-graphql/jump';
import 'codemirror-graphql/mode';

import { UnControlled as ReactCodeMirror } from 'react-codemirror2';


function SubmitQuery(props) {
  //codemirror-graphql options
  const options = {
    mode: 'graphql',
    autoCloseBrackets: true,
    matchBrackets: true,
    showCursorWhenSelecting: true,
    // lint: {
    //   schema: props.schema,
    // },
    hintOptions: {
      schema: props.schema,
      closeOnUnfocus: false,
      completeSingle: false,
    },
  };

  // const options = {
  //   mode: 'javascript',
  //   theme: 'dracula',
  //   lineNumbers: true
  // };

  return (
      <div id="submitquery">
        <ReactCodeMirror
          className="codemirror"
          value={props.query}
          options={options}
          onChange={(editor, data, value) => props.onChangeQuery(value)}
        />
        <br/>
        <button onClick={props.onSubmitQuery}> Submit </button>
      </div>
  );
}

export default SubmitQuery;
