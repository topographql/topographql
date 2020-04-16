import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
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
  //const [editor, setEditor] = useState(null);

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

  //const editor = CodeMirror.fromTextArea(document.getElementById('queryeditor'), codeMirrorOptions);

  useEffect(() => {
    if (!editorMounted) {
      const editor = CodeMirror.fromTextArea(document.getElementById('queryeditor'), codeMirrorOptions);
      editor.on('change', (editor) => props.onChangeQuery(editor.getValue()));
      setEditorMounted(true);
    }
  }, [props.schema]);

  return (
      <div id="submitquery">
      {/* <textarea id="queryeditor" rows="2" cols="50"></textarea> */}
      <Button onClick={props.onSubmitQuery}>Submit</Button>
    </div>
  );
}

export default SubmitQuery;
