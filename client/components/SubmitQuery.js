import React from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2';

import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/lint/lint';
import 'codemirror-graphql/hint';
import 'codemirror-graphql/lint';
import 'codemirror-graphql/mode';


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

  return (
      <div id="submitquery">
        <CodeMirror
          value={props.query}
          options={options}
          onChange={props.onChange}
        />
        <button onClick={props.onSubmitQuery}>Submit Query</button>
      </div>
  );
}

export default SubmitQuery;
