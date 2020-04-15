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
require('codemirror-graphql/results/mode');

import {UnControlled as CM} from 'react-codemirror2'

class QueryResult extends Component {

  
  //   componentDidMount() {
  //     this.editor = CodeMirror(document.getElementById('queryresult'), {
  //       value: this.props.result || '',
  //       lineWrapping: true,
  //       readOnly: true,
  //       tabSize: 2,
  //       mode: 'graphql-results',
  //       foldGutter: {
  //         minFoldSize: 4,
  //       },
  //     });
  //   }

  //   componentDidUpdate(prevProps) {
  //     if (this.props.results && this.props.result !== prevProps.result) {
  //       this.editor.setValue(this.props.result);
  //     }
  //   }

  render() {
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
        value={this.props.result || ''}
        options={options}
      />
    );
  }
}

export default QueryResult;
