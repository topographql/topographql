import React from 'react';
import { Button } from 'antd';
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

class SubmitQuery extends React.Component {
  constructor(props) {
    super(props);
    this.currentQuery = props.query;
  }

  componentDidMount() {
    const editor = CodeMirror.fromTextArea(document.getElementById('queryeditor'), {
      //value: this.props.query,
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
        schema: this.props.schema,
      },
      hintOptions: {
        schema: this.props.schema,
        closeOnUnfocus: false,
        completeSingle: false,
      },
    });
    if (editor) {
      editor.on('change', (editor) => this.props.onChangeQuery(editor.getValue()));
    }
  }

  render() {
    return (
      <div id="submitquery">
      <textarea id="queryeditor" rows="5" cols="50"></textarea>
      <Button onClick={this.props.onSubmitQuery}>Submit</Button>
    </div>
    );
  }
}

export default SubmitQuery;
