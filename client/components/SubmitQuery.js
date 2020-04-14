import React from 'react';
import { Button } from 'antd';
import CodeMirror from 'codemirror';
import '../styles/codemirror.css';
// @import 'codemirror/lib/codemirror.css';
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

// import 'codemirror/addon/hint/show-hint';
// import 'codemirror/addon/lint/lint';
//import 'codemirror-graphql/hint';
// import 'codemirror/addon/hint/show-hint' ;
// import 'codemirror/addon/comment/comment';
// import 'codemirror/addon/edit/matchbrackets';
// import 'codemirror/addon/edit/closebrackets';
// import 'codemirror/addon/fold/foldgutter';
// import 'codemirror/addon/fold/brace-fold';
// import 'codemirror/addon/search/search';
// import 'codemirror/addon/search/searchcursor';
// import 'codemirror/addon/search/jump-to-line';
// import 'codemirror/addon/dialog/dialog';
// import 'codemirror/addon/lint/lint';
// import 'codemirror/keymap/sublime';
// import 'codemirror-graphql/hint';
// import 'codemirror-graphql/lint';
// import 'codemirror-graphql/info';
// import 'codemirror-graphql/jump';
// import 'codemirror-graphql/mode';

import { UnControlled as ReactCodeMirror } from 'react-codemirror2';


class SubmitQuery extends React.Component {
  constructor(props) {
    super(props);
    this.currentQuery = props.query;
  }
  //codemirror-graphql options
  // const options = {
  //   mode: 'graphql',
  //   autoCloseBrackets: true,
  //   matchBrackets: true,
  //   showCursorWhenSelecting: true,
  //   lint: {
  //     schema: props.schema,
  //   },
  //   hintOptions: {
  //     schema: props.schema,
  //     closeOnUnfocus: false,
  //     completeSingle: false,
  //   },
  // };

  // const options = {
  //   mode: 'javascript',
  //   theme: 'dracula',
  //   lineNumbers: true
  // };
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
