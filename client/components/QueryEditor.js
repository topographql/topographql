/* eslint-disable react/prop-types */
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
  const [errMessage, setErrorMessage] = useState(null);
  const [queryEditor, setQueryEditor] = useState(null);

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
    console.log('test', props.query);
    const editor = CodeMirror.fromTextArea(document.getElementById('queryeditor'), codeMirrorOptions);
    if (props.query !== undefined) {
      editor.setValue(props.query);
      editor.clearHistory();
      editor.clearGutter(".CodeMirror-gutter")
      setTimeout(() => {
        editor.codeMirrorInstance.refresh();
      }, 1);
    } else {
      editor.clearHistory();
      editor.clearGutter(".CodeMirror-gutter")
      setTimeout(() => {
        editor.codeMirrorInstance.refresh();
      }, 1);
    }
  }, [props.query]);

  useEffect(() => {
    // editorMounted state hook prevents extraneous CodeMirror from rendering
    if (!queryEditor) {
      const editor = CodeMirror.fromTextArea(document.getElementById('queryeditor'), codeMirrorOptions);
      if (localStorage.getItem('query')) {
        if (localStorage.getItem('query') !== '') {
          editor.setValue(JSON.parse(localStorage.getItem('query')));
          editor.clearHistory();
          editor.clearGutter(".CodeMirror-gutter")
          setTimeout(() => {
            editor.codeMirrorInstance.refresh();
          }, 1);
        }
      }
      editor.on('change', (editor) => props.onChangeQuery(editor.getValue()));
      setQueryEditor(editor);
    }
  }, [props.schema]);

  // query error handling logic
  useEffect(() => {
    // if GraphQL server sent back a 400 response, the result object would have only an errors property
    if (props.result.errors && !props.result.data) {
      setErrorMessage(<Alert
          message={`Error Submitting Query: ${JSON.stringify(props.result.errors[0].message, 2)}`}
          type="error"
          showIcon
          />);
    } else if (props.result.data) setErrorMessage(null);
  }, [props.result]);

  return (
      <div id="submitquery">
        <Button onClick={props.onSubmitQuery}>Submit</Button>
        <Button onClick={() => queryEditor.setValue('')}>Clear Query</Button>
        <Button onClick={props.handleSaveQuery}>Save Query</Button>
        {errMessage}
      </div>
  );
}

export default SubmitQuery;
