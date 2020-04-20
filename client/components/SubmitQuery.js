import { Button, Alert } from 'antd';
import React, { useState, useEffect } from 'react';
import CodeMirror from 'codemirror';
import '../styles/codemirror.css';

// codemirror imports
require('codemirror/addon/hint/show-hint');
require('codemirror/addon/comment/comment');
require('codemirror/addon/edit/matchbrackets');
require('codemirror/addon/edit/closebrackets');
require('codemirror/addon/fold/foldgutter');
require('codemirror/addon/fold/brace-fold');
require('codemirror/addon/search/search');
require('codemirror/addon/search/searchcursor');
require('codemirror/addon/search/jump-to-line');
require('codemirror/addon/dialog/dialog');
require('codemirror/addon/lint/lint');
require('codemirror/keymap/sublime');
require('codemirror-graphql/hint');
require('codemirror-graphql/lint');
require('codemirror-graphql/info');
require('codemirror-graphql/jump');
require('codemirror-graphql/mode');

function SubmitQuery(props) {
  const [editorMounted, setEditorMounted] = useState(false);
  const isError = props.queryError;
  let errMessage;

  // '' || JSON.parse(localStorage.getItem('query'))
  const codeMirrorOptions = {
    lineNumbers: true,
    tabSize: 2,
    mode: 'graphql',
    autoCloseBrackets: true,
    matchBrackets: true,
    showCursorWhenSelecting: true,
    foldGutter: {
      minFoldSize: 4,
    },
    lint: {
      schema: props.schema,
    },
    hintOptions: {
      schema: props.schema,
      closeOnUnfocus: false,
      completeSingle: false,
    },
  };

  useEffect(() => {
    if (!editorMounted) {
      const editor = CodeMirror.fromTextArea(document.getElementById('queryeditor'), codeMirrorOptions);
      if (localStorage.getItem('query')) editor.setValue(JSON.parse(localStorage.getItem('query')));
      editor.on('change', (editor) => props.onChangeQuery(editor.getValue()));
      setEditorMounted(true);
    }
  }, [props.schema]);

  // query error handling logic
  if (isError === null) errMessage = null;
  else if (isError) errMessage = <Alert message="Error Submitting Query" type="error" showIcon />;

  return (
      <div id="submitquery">
        <Button onClick={props.onSubmitQuery}>Submit</Button>
        {errMessage}
      </div>
  );
}

export default SubmitQuery;
