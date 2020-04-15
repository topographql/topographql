import React, { Component } from 'react';
import CodeMirror from 'codemirror';

import '../styles/codemirror.css';

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

class QueryResult extends Component {
  constructor(props) {
    super(props);
    this.editor;
  };

  componentDidMount() {
    this.editor = CodeMirror.fromTextArea(document.getElementById('queryresult'), {
      tabSize: 2,
      mode: 'graphql',
      autoCloseBrackets: true,
      matchBrackets: true,
      showCursorWhenSelecting: true,
      foldGutter: {
        minFoldSize: 4,
      },
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.result !== prevProps.result) {
      this.editor.setValue(this.props.result);
    }
  }

  render() {
    return (
     <div>
        <textarea id="queryresult" rows="5" cols="40"></textarea>
     </div>
    );
  }
  
}

export default QueryResult;
