import React from 'react';

import '../styles/codemirror.css';

// import 'codemirror/addon/hint/show-hint';
// import 'codemirror/addon/lint/lint';
//import 'codemirror-graphql/hint';
// import 'codemirror-graphql/mode';

import { UnControlled as ReactCodeMirror } from 'react-codemirror2';


function SubmitQuery(props) {
  //codemirror-graphql options
  const options = {
    mode: 'graphql',
    lint: {
      schema: props.schema,
    },
    hintOptions: {
      schema: props.schema,
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
